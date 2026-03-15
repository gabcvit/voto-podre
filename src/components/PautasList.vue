<template>
  <h2 v-if="showTitle" class="text-xl font-black uppercase tracking-tight mb-4" style="font-family: 'Syne', sans-serif;">Votos Podres deste Deputado</h2>
  <TransitionGroup v-if="pautas.length > 0" name="fade-up" tag="div" class="flex flex-col gap-2">
    <div
      v-for="(pauta, index) in pautas"
      :key="pauta.id"
      :style="{ '--enter-delay': `${Math.min(index, 10) * 30}ms` }"
      :class="[
        'px-4 py-3 cursor-pointer transition-colors bg-zinc-50 dark:bg-zinc-950',
        pauta.tipo === 'positiva'
          ? 'border-l-2 border-green-500 hover:bg-zinc-100 dark:hover:bg-zinc-900'
          : 'border-l-2 border-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-900',
      ]"
      @click="goToPautaDetails(pauta.id)"
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
      <div class="text-xs text-zinc-500 leading-relaxed">{{ pauta.descricao }}</div>
    </div>
  </TransitionGroup>
  <div v-else class="text-zinc-600 text-sm uppercase tracking-widest">Nenhum voto podre encontrado para este deputado.</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

withDefaults(defineProps<{
  pautas: Array<{ id: string | number; nome: string; descricao: string; tipo: 'negativa' | 'positiva' }>;
  showTitle?: boolean;
}>(), { showTitle: true });

const router = useRouter();

function goToPautaDetails(id: string | number) {
  router.push({ name: 'PautaDetails', params: { id } });
}
</script>
