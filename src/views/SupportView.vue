<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <PageTitle
      title="Apoie o Voto Podre"
      subtitle="Independente. Sem publicidade. Sem financiamento externo."
    />

    <section class="mb-10 border-b border-zinc-200 pb-10 dark:border-zinc-800">
      <p class="text-zinc-500 leading-relaxed text-md mb-4">
        O <strong class="text-red-500 font-bold">Voto Podre</strong> é um projeto pessoal mantido de forma independente,
        e sem patrocínio corporativo e sem nenhum vínculo com partidos políticos.
        Todo o trabalho de pesquisa, curadoria de dados e desenvolvimento é feito voluntariamente.
      </p>
      <p class="text-zinc-500 leading-relaxed text-md">
        Porém, toda a infraestrutura necessária para desenvolver, testar e hospedar o site — domínio, ferramentas de desenvolvimento
        e serviços de hospedagem — é paga do meu próprio bolso. Qualquer contribuição ajuda a cobrir esses custos e a manter o projeto no ar!
      </p>
    </section>

    <section class="mb-10 border-b border-zinc-200 pb-10 dark:border-zinc-800 animate-fade-in-up" style="animation-delay: 100ms">
      <h2 class="text-xl font-black uppercase tracking-tight text-zinc-900 mb-3 dark:text-white" style="font-family: 'Syne', sans-serif;">Por que apoiar?</h2>
      <ul class="space-y-3">
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">—</span>
          <span class="text-zinc-500">Manter o registro de votações atualizado à medida que novas proposições são votadas no Congresso.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">—</span>
          <span class="text-zinc-500">Expandir a cobertura para mais deputados, proposições e temas relevantes.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">—</span>
          <span class="text-zinc-500">Garantir que a ferramenta esteja disponível e funcionando para qualquer cidadão que queira consultar os dados.</span>
        </li>
      </ul>
    </section>

    <section class="animate-fade-in-up" style="animation-delay: 200ms">
      <h2 class="text-xl font-black uppercase tracking-tight text-zinc-900 mb-3 dark:text-white" style="font-family: 'Syne', sans-serif;">Me compre um cafézinho</h2>
      <p class="text-zinc-500 leading-relaxed text-md mb-6">
        Qualquer valor é bem-vindo e ajuda a manter o projeto vivo. Não há valor mínimo.
      </p>

      <div class="border border-zinc-200 dark:border-zinc-800 p-6">
        <div class="mb-4">
          <span class="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-2">Chave PIX</span>
          <span class="text-zinc-900 dark:text-white font-mono text-lg font-bold break-all select-all">{{ PIX_KEY }}</span>
        </div>

        <button
          @click="copyPix"
          class="flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          :class="copied ? 'text-green-500' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white'"
        >
          <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="0" ry="0" stroke-linecap="square" />
            <path stroke-linecap="square" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="square" d="M20 6L9 17l-5-5" />
          </svg>
          {{ copied ? 'Chave copiada!' : 'Copiar chave PIX' }}
        </button>
      </div>

      <p class="mt-6 text-xs text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
        O PIX é processado diretamente entre você e o responsável pelo projeto. Nenhum dado seu é coletado ou armazenado por este site.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageTitle from '@/components/PageTitle.vue';
import { useMeta } from '@/composables/useMeta';

useMeta({
  title: 'Apoie o Projeto — Voto Podre',
  description: 'Apoie o Voto Podre via PIX. Um projeto independente de transparência eleitoral que monitora os votos de deputados federais no Congresso brasileiro.',
  canonicalPath: '/apoio',
});

const PIX_KEY = '32eea521-52c1-4048-92e0-bdcc9233efb5';
const copied = ref(false);

async function copyPix() {
  try {
    await navigator.clipboard.writeText(PIX_KEY);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2500);
  } catch {
    // fallback: select the text so the user can copy manually
  }
}
</script>
