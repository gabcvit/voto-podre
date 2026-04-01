<template>
  <h2 v-if="showTitle" class="text-xl font-black uppercase tracking-tight my-8" style="font-family: 'Syne', sans-serif;">{{ title }}</h2>
  <TransitionGroup v-if="pautas.length > 0" name="fade-up" tag="div" class="flex flex-col gap-2">
    <RouterLink
      v-for="(pauta, index) in pautas"
      :key="pauta.id"
      :to="{ name: 'PautaDetails', params: { id: pauta.id } }"
      :style="{ '--enter-delay': `${Math.min(index, 10) * 30}ms` }"
      :class="[
        'block px-4 py-3 transition-colors bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500',
        pauta.tipo === 'positiva'
          ? 'border-l-2 border-green-500 hover:bg-zinc-100 dark:hover:bg-zinc-900'
          : 'border-l-2 border-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-900',
      ]"
    >
      <div class="flex items-center gap-2 mb-1">
        <span
          :class="[
            'text-xs font-black uppercase tracking-widest',
            pauta.tipo === 'positiva' ? 'text-green-500' : 'text-red-500',
          ]"
        >{{ pauta.tipo === 'positiva' ? 'PAUTA POSITIVA' : 'PAUTA PODRE' }}</span>
        <span class="font-bold text-zinc-900 text-sm dark:text-white">{{ pauta.nome }}</span>
      </div>
      <div v-if="pauta.temas?.length" class="flex flex-wrap gap-2 mb-1">
        <span
          v-for="tema in pauta.temas"
          :key="tema"
          :class="['text-xs font-black uppercase tracking-widest', TEMA_CONFIG[tema].colorClass]"
        >
          {{ TEMA_CONFIG[tema].emoji }} {{ tema }}
        </span>
      </div>
      <div class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {{ pauta.descricao.slice(0, 300) }}{{ pauta.descricao.length > 300 ? '...' : '' }}
      </div>
    </RouterLink>
  </TransitionGroup>
  <div v-else class="text-zinc-700 dark:text-zinc-300 text-sm uppercase tracking-widest">Nenhum voto encontrado.</div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Tema } from '@/types';
import { TEMA_CONFIG } from '@/data/temas';

withDefaults(defineProps<{
  pautas: Array<{ id: string | number; nome: string; descricao: string; tipo: 'negativa' | 'positiva'; temas?: Tema[] }>;
  showTitle?: boolean;
  title?: string;
}>(), { showTitle: true, title: 'Votos deste Deputado' });
</script>
