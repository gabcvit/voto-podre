<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Pautas Podres apoiadas por este Deputado</h2>
    <div v-if="pautas.length > 0" class="flex flex-col gap-3">
      <div
        v-for="pauta in pautas"
        :key="pauta.id"
        class="bg-red-950 border border-red-400 rounded-lg p-4 cursor-pointer hover:bg-red-900 transition"
        @click="goToPautaDetails(pauta.id)"
      >
        <div class="flex items-center gap-2 mb-1">
          <IconDocumentation class="text-red-300" />
          <span class="font-bold text-red-200">{{ pauta.nome }}</span>
        </div>
        <div class="text-sm text-red-100 mb-1">{{ pauta.descricao }}</div>
      </div>
    </div>
    <div v-else class="text-zinc-400">Nenhuma pauta podre encontrada para este deputado.</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import IconDocumentation from '@/components/icons/IconDocumentation.vue';

defineProps<{ pautas: Array<{ id: string | number; nome: string; descricao: string }> }>();
const router = useRouter();

function goToPautaDetails(id: string | number) {
  router.push({ name: 'PautaDetails', params: { id } });
}
</script>
