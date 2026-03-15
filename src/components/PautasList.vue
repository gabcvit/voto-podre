<template>
  <h2 v-if="showTitle" class="text-xl font-black uppercase tracking-tight mb-4" style="font-family: 'Syne', sans-serif;">Pautas Podres apoiadas por este Deputado</h2>
  <div v-if="pautas.length > 0" class="flex flex-col gap-2">
    <div
      v-for="pauta in pautas"
      :key="pauta.id"
      class="border-l-2 border-red-500 bg-zinc-50 px-4 py-3 cursor-pointer hover:bg-zinc-100 transition-colors dark:bg-zinc-950 dark:hover:bg-zinc-900"
      @click="goToPautaDetails(pauta.id)"
    >
      <div class="flex items-center gap-2 mb-1">
        <span class="text-xs font-black uppercase tracking-widest text-red-500">PAUTA</span>
        <span class="font-bold text-zinc-900 text-sm dark:text-white">{{ pauta.nome }}</span>
      </div>
      <div class="text-xs text-zinc-500 leading-relaxed">{{ pauta.descricao }}</div>
    </div>
  </div>
  <div v-else class="text-zinc-600 text-sm uppercase tracking-widest">Nenhuma pauta podre encontrada para este deputado.</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

withDefaults(defineProps<{
  pautas: Array<{ id: string | number; nome: string; descricao: string }>;
  showTitle?: boolean;
}>(), { showTitle: true });

const router = useRouter();

function goToPautaDetails(id: string | number) {
  router.push({ name: 'PautaDetails', params: { id } });
}
</script>
