<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <PageTitle
      class="animate-fade-in-up"
      title="Pautas"
      subtitle="Proposições legislativas monitoradas — pautas que deputados apoiaram ou rejeitaram."
    />

    <!-- Filters -->
    <div class="animate-fade-in-up flex flex-wrap gap-3 mb-6" style="animation-delay: 80ms">
      <button
        @click="temaFilter = ''"
        :aria-pressed="temaFilter === ''"
        class="px-3 py-1 text-xs font-black uppercase tracking-widest border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        :class="temaFilter === ''
          ? 'border-red-500 text-red-500'
          : 'border-zinc-300 text-zinc-500 hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-500 dark:hover:border-zinc-500 dark:hover:text-white'"
      >Todos</button>
      <button
        v-for="tema in availableTemas"
        :key="tema"
        @click="temaFilter = tema"
        :aria-pressed="temaFilter === tema"
        class="px-3 py-1 text-xs font-black uppercase tracking-widest border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        :class="temaFilter === tema
          ? TEMA_CONFIG[tema].buttonActiveClass
          : 'border-zinc-300 text-zinc-500 hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-500 dark:hover:border-zinc-500 dark:hover:text-white'"
      >{{ TEMA_CONFIG[tema].emoji }} {{ tema }}</button>
    </div>

    <div class="animate-fade-in-up" style="animation-delay: 150ms">
      <PautasList :pautas="filteredPautas" :show-title="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import PautasList from '@/components/PautasList.vue';
import PageTitle from '@/components/PageTitle.vue';
import { usePautasPodresStore } from '@/stores/usePautasPodresStore';
import { useMeta } from '@/composables/useMeta';
import type { Tema } from '@/types';
import { TEMA_CONFIG } from '@/data/temas';

const { pautasPodres } = usePautasPodresStore();

const temaFilter = ref<Tema | ''>('');

const availableTemas = computed<Tema[]>(() => {
  const temas = pautasPodres.flatMap(p => p.temas).filter((t): t is Tema => Boolean(t));
  return [...new Set(temas)].sort();
});

const filteredPautas = computed(() =>
  temaFilter.value === ''
    ? pautasPodres
    : pautasPodres.filter(p => p.temas.includes(temaFilter.value as Tema))
);

useMeta({
  title: 'Pautas',
  description: 'Conheça as pautas catalogadas pelo Voto Podre — proposições legislativas monitoradas no Congresso brasileiro.',
  canonicalPath: '/pautas-podres',
});
</script>
