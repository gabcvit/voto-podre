<template>
  <div v-if="pauta" class="max-w-3xl mx-auto px-4 py-12">
    <button @click="goBack" class="mb-6 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2 transition">
      <IconArrowBack class="text-blue-400" />
      Voltar
    </button>

    <div class="relative overflow-hidden bg-red-950/90 border border-red-500 shadow-[0_0_22px_4px_rgba(239,68,68,0.35)] rounded-xl p-6 mb-8">
      <div class="absolute left-0 top-0 bottom-0 w-2 bg-red-500"></div>
      <div class="ml-4">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl leading-none select-none">⚠️</span>
          <h1 class="text-3xl font-bold text-red-200">{{ pauta.nome }}</h1>
        </div>
        <p class="text-red-100 mb-3">{{ pauta.descricao }}</p>
        <a
          v-if="pauta.urlProposicao"
          :href="pauta.urlProposicao"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-red-300 underline hover:text-red-200 transition"
        >Ver tramitação na Câmara →</a>
      </div>
    </div>

    <h3 class="text-lg font-semibold mb-3 text-red-200 uppercase tracking-wide">
      🚨 {{ deputados.length }} deputado{{ deputados.length !== 1 ? 's' : '' }} que apoiaram
    </h3>
    <div class="flex flex-col">
      <BaseDeputado
        v-for="deputado in deputados"
        :key="deputado.id"
        :deputado="deputado"
        :pautasPodres="[pauta]"
      />
    </div>
  </div>
  <div v-else class="text-center py-16">
    <p class="text-xl text-red-300">Pauta não encontrada.</p>
    <button @click="goBack" class="mt-6 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2 transition">
      <IconArrowBack class="text-blue-400" />
      Voltar
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import IconArrowBack from '@/components/icons/IconArrowBack.vue';
import BaseDeputado from '@/components/BaseDeputado.vue';
import { TODOS_DEPUTADOS } from '@/data/deputados';
import { PAUTAS_PODRES } from '@/data/pautasPodres';

const route = useRoute();
const router = useRouter();

function getPautaById(id: string | number) {
  return PAUTAS_PODRES.find(pauta => String(pauta.id) === String(id));
}

function getDeputadosByIds(ids: Array<number | undefined>) {
  return TODOS_DEPUTADOS.dados.filter(deputado => ids.includes(deputado.id));
}

const pautaId = computed(() => {
  const id = route.params.id;
  return Array.isArray(id) ? id[0] : id;
});
const pauta = computed(() => pautaId.value ? getPautaById(pautaId.value) : undefined);
const deputados = computed(() => {
  if (!pauta.value || !Array.isArray(pauta.value.idsDeputadosPodres)) return [];
  return getDeputadosByIds(pauta.value.idsDeputadosPodres.filter((id) => id !== undefined));
});

function goBack() {
  router.back();
}
</script>
