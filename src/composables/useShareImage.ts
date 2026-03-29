import { ref, nextTick, createApp, defineComponent, h } from 'vue';
import { toPng } from 'html-to-image';
import ShareCard from '@/components/ShareCard.vue';
import type { Deputado, Pauta } from '@/types';

type DeputadoShareOptions = {
  mode: 'deputado';
  deputado: Deputado;
  pautas: Pauta[];
};

type PautaShareOptions = {
  mode: 'pauta';
  pauta: Pauta;
  deputadosCount: number;
  topParties: { sigla: string; count: number }[];
};

type PautaByUfShareOptions = {
  mode: 'pauta-by-uf';
  pauta: Pauta;
  uf: string;
  deputadosCount: number;
  deputadoItems: { nome: string; siglaPartido: string }[];
};

export type ShareImageOptions = DeputadoShareOptions | PautaShareOptions | PautaByUfShareOptions;

export function useShareImage() {
  const generating = ref(false);

  async function generate(options: ShareImageOptions): Promise<void> {
    generating.value = true;

    // Mount an isolated Vue app with ShareCard into a temporary DOM node.
    // We cannot use teleport because we need the element to exist in the real
    // document body so html-to-image can compute styles.
    // The host is positioned off-screen so the browser fully paints it
    // (unlike visibility:hidden or display:none, which skip painting).
    const host = document.createElement('div');
    host.style.cssText =
      'position:absolute;left:-1200px;top:0;width:1080px;height:1350px;overflow:hidden;pointer-events:none;';
    document.body.appendChild(host);

    const props =
      options.mode === 'deputado'
        ? {
            mode: 'deputado' as const,
            deputado: options.deputado,
            pautas: options.pautas,
          }
        : options.mode === 'pauta'
        ? {
            mode: 'pauta' as const,
            pauta: options.pauta,
            deputadosCount: options.deputadosCount,
            topParties: options.topParties,
          }
        : {
            mode: 'pauta-by-uf' as const,
            pauta: options.pauta,
            uf: options.uf,
            deputadosCount: options.deputadosCount,
            deputadoItems: options.deputadoItems,
          };

    // Wrap in a thin component so we can grab the exposed `cardEl` ref via
    // the app's root component instance.
    const WrapperComponent = defineComponent({
      setup() {
        const cardRef = ref<InstanceType<typeof ShareCard> | null>(null);
        return () => h(ShareCard, { ...props, ref: cardRef });
      },
    });

    const app = createApp(WrapperComponent);
    app.mount(host);

    // Wait for the DOM to settle so images and fonts can load
    await nextTick();
    await document.fonts.ready;
    // Extra tick to allow img elements to paint
    await new Promise((resolve) => setTimeout(resolve, 400));

    // The ShareCard root div is the first element rendered inside host
    const cardEl = host.firstElementChild as HTMLElement | null;

    let blob: Blob | null = null;
    try {
      if (cardEl) {
        const dataUrl = await toPng(cardEl as HTMLElement, {
          pixelRatio: 2,
          width: 1080,
          height: 1350,
          // Fonts are already loaded via document.fonts.ready above.
          // skipFonts prevents html-to-image from reading cross-origin
          // Google Fonts stylesheets, which the browser blocks with a SecurityError.
          skipFonts: true,
        });
        blob = dataUrlToBlob(dataUrl);
      }
    } finally {
      app.unmount();
      document.body.removeChild(host);
      generating.value = false;
    }

    if (!blob) return;

    const filename =
      options.mode === 'deputado'
        ? `voto-podre-${slugify(options.deputado.nome)}.png`
        : options.mode === 'pauta'
        ? `voto-podre-${slugify(options.pauta.nome)}.png`
        : `voto-podre-${slugify(options.pauta.nome)}-${options.uf.toLowerCase()}.png`;

    const file = new File([blob], filename, { type: 'image/png' });

    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file] });
      } catch {
        // User cancelled — no-op
      }
    } else {
      // Desktop fallback: trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    }
  }

  return { generating, generate };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const header = parts[0] ?? '';
  const data = parts[1] ?? '';
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/png';
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}
