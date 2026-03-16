<template>
    <div v-if="deputado" class="max-w-3xl mx-auto px-4 py-12">
      <div class="mb-8 flex items-center justify-between">
        <button @click="goBack" class="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
          <IconArrowBack />
          Voltar
        </button>
        <button @click="share" class="flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500" :class="copied ? 'text-green-500' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white'">
          <IconShare class="w-4 h-4" />
          {{ copied ? 'Link copiado!' : 'Compartilhar' }}
        </button>
      </div>

      <BaseDeputado
        :deputado="deputado"
        :pautasPodres="pautasDoDeputado"
        variant="card"
        class="mb-8"
      />

      <section v-if="socialLinks.length" class="mb-8 border-l-2 border-red-500 bg-zinc-100 p-4 dark:bg-zinc-900">
        <h2 class="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
          Redes sociais
        </h2>
        <ul class="mt-4 grid gap-2 sm:grid-cols-2">
          <li v-for="social in socialLinks" :key="social.url">
            <a
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-3 border border-zinc-300 px-3 py-2 text-zinc-600 transition-colors hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white"
              :aria-label="`Abrir ${social.label} de ${deputado.nome} em nova aba`"
            >
              <span class="flex h-8 w-8 items-center justify-center border border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                <component :is="social.icon" class="h-4 w-4" />
              </span>
              <span class="text-xs font-black uppercase tracking-widest">{{ social.label }}</span>
            </a>
          </li>
        </ul>
      </section>

      <InfoList :info="deputado" />
      <PautasList
        v-if="pautasNegativas.length"
        :pautas="pautasNegativas"
        title="Pautas Podres apoiadas"
        class="mb-8"
      />
      <PautasList
        v-if="pautasPositivas.length"
        :pautas="pautasPositivas"
        title="Pautas Positivas negadas"
      />
    </div>
    <div v-else class="text-center py-16">
      <p class="text-zinc-500 uppercase tracking-widest text-md dark:text-zinc-600">Deputado não encontrado.</p>
      <button @click="goBack" class="mt-6 flex items-center gap-2 mx-auto text-sm font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
        <IconArrowBack />
        Voltar
      </button>
    </div>
  </template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDeputadoDetails } from '@/composables/useDeputadoDetails';
import BaseDeputado from '@/components/BaseDeputado.vue';
import IconArrowBack from '@/components/icons/IconArrowBack.vue';
import IconFacebook from '@/components/icons/IconFacebook.vue';
import IconInstagram from '@/components/icons/IconInstagram.vue';
import IconShare from '@/components/icons/IconShare.vue';
import IconX from '@/components/icons/IconX.vue';
import IconYoutube from '@/components/icons/IconYoutube.vue';
import InfoList from '@/components/InfoList.vue';
import PautasList from '@/components/PautasList.vue';
import { useMeta } from '@/composables/useMeta';
import type { DeputadoSocialLink, SocialPlatform } from '@/types';

type SocialButtonLink = DeputadoSocialLink & {
  icon: Component;
};

const route = useRoute();
const router = useRouter();
const idParam =
  typeof route.params.id === 'string' || typeof route.params.id === 'number'
    ? route.params.id
    : Array.isArray(route.params.id) && route.params.id.length > 0
      ? route.params.id[0]
      : '';
const { deputado, pautasDoDeputado } = useDeputadoDetails(idParam ?? '');

const socialLabelsByPlatform: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  x: 'X / Twitter',
};

const socialIconsByPlatform: Record<SocialPlatform, Component> = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  youtube: IconYoutube,
  x: IconX,
};

const socialLinks = computed<SocialButtonLink[]>(() => {
  const redes = deputado.value?.redeSocial ?? [];

  return redes
    .map((url) => buildSocialLink(url))
    .filter((social): social is DeputadoSocialLink => social !== null)
    .map((social) => ({
      ...social,
      icon: socialIconsByPlatform[social.platform],
    }));
});

const pautasNegativas = computed(() => pautasDoDeputado.value.filter(p => p.tipo === 'negativa'));
const pautasPositivas = computed(() => pautasDoDeputado.value.filter(p => p.tipo === 'positiva'));

const metaTitle = computed(() =>
  deputado.value
    ? `${deputado.value.nome} (${deputado.value.siglaPartido}/${deputado.value.siglaUf})`
    : 'Deputado'
);
const metaDescription = computed(() =>
  deputado.value
    ? `${deputado.value.nome} (${deputado.value.siglaPartido}/${deputado.value.siglaUf}) tem votos registrados em pautas polêmicas na Câmara. Veja o histórico e compartilhe — o voto dos deputados é público e você merece saber.`
    : 'Histórico de votos deste deputado federal.'
);

useMeta({
  title: metaTitle,
  description: metaDescription,
  canonicalPath: computed(() => deputado.value ? `/deputado/${deputado.value.id}` : '/deputados'),
});

const copied = ref(false);

function buildSocialLink(url: string): DeputadoSocialLink | null {
  const normalizedUrl = normalizeUrl(url);
  if (!normalizedUrl) {
    return null;
  }

  const platform = detectPlatform(normalizedUrl);
  if (!platform) {
    return null;
  }

  return {
    url: normalizedUrl,
    platform,
    label: socialLabelsByPlatform[platform],
  };
}

function normalizeUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return null;
    }
    return parsedUrl.href;
  } catch {
    return null;
  }
}

function detectPlatform(url: string): SocialPlatform | null {
  try {
    const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, '').replace(/^m\./, '').replace(/^pt-br\./, '');

    if (hostname === 'instagram.com') {
      return 'instagram';
    }

    if (hostname === 'facebook.com') {
      return 'facebook';
    }

    if (hostname === 'youtube.com' || hostname === 'youtu.be') {
      return 'youtube';
    }

    if (hostname === 'twitter.com' || hostname === 'x.com') {
      return 'x';
    }

    return null;
  } catch {
    return null;
  }
}

async function share() {
  const url = window.location.href;
  const title = deputado.value
    ? `${deputado.value.nome} (${deputado.value.siglaPartido}/${deputado.value.siglaUf}) — Voto Podre`
    : 'Voto Podre';
  const text = metaDescription.value;
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
    } catch {
      // user cancelled
    }
  } else {
    await navigator.clipboard.writeText(url);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2500);
  }
}

function goBack() {
  router.back();
}
</script>
