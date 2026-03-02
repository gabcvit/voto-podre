<template>
  <div v-if="pauta" class="max-w-2xl mx-auto p-6">
    <button @click="goBack" class="mb-6 px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2">
      <IconArrowBack class="text-blue-400" />
      Voltar
    </button>

    <div class="flex items-center gap-6 bg-red-950 rounded-lg p-6 shadow-lg mb-8 border border-red-800">
      <div>
        <h1 class="text-3xl font-bold mb-2 flex items-center gap-2">
          <span class="text-red-200">{{ pauta.nome }}</span>
        </h1>
        <div class="text-lg text-red-100 mb-1">{{ pauta.descricao }}</div>
        <div v-if="pauta.urlProposicao" class="text-sm text-red-300 mb-1">
          <a :href="pauta.urlProposicao" target="_blank" class="underline hover:text-red-400">Ver tramitação na Câmara</a>
        </div>
      </div>
    </div>

    <h3 class="text-xl font-semibold mb-2 text-red-200">Deputados que apoiaram:</h3>
    <ul class="space-y-2">
      <li
        v-for="deputado in deputados"
        :key="deputado.id"
        class="bg-red-900/80 rounded-lg p-3 flex items-center gap-3 shadow cursor-pointer hover:bg-red-800/90 transition border border-red-800"
        @click="goToDeputadoDetails(deputado.id)"
      >
        <img :src="deputado.urlFoto" :alt="deputado.nome" class="w-10 h-10 rounded-full border-2 border-red-700 object-cover object-top aspect-square" />
        <span class="font-medium text-red-100">{{ deputado.nome }}</span>
        <span class="text-xs text-red-300">{{ deputado.siglaPartido }} - {{ deputado.siglaUf }}</span>
      </li>
    </ul>
  </div>
  <div v-else class="text-center py-16">
    <p class="text-xl text-red-300">Pauta não encontrada.</p>
    <button @click="goBack" class="mt-6 px-4 py-2 rounded bg-red-900 hover:bg-red-800 text-red-100 flex items-center gap-2 border border-red-700">
      <IconArrowBack class="text-red-300" />
      Voltar
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import IconArrowBack from '@/components/icons/IconArrowBack.vue';
import { TODOS_DEPUTADOS } from '@/data/deputados';
import { PAUTAS_PODRES } from '@/data/pautasPodres';

const route = useRoute();
const router = useRouter();

function getPautaById(id: string | number) {
  return PAUTAS_PODRES.find(pauta => String(pauta.id) === String(id));
}

function getDeputadosByIds(ids: Array<string | number>) {
  return TODOS_DEPUTADOS.dados.filter(deputado => ids.includes(deputado.id));
}

const pautaId = computed(() => {
  const id = route.params.id;
  return Array.isArray(id) ? id[0] : id;
});
const pauta = computed(() => pautaId.value ? getPautaById(pautaId.value) : undefined);
const deputados = computed(() => {
  if (!pauta.value || !Array.isArray(pauta.value.idsDeputadosPodres)) return [];
  return getDeputadosByIds(pauta.value.idsDeputadosPodres.filter((id): id is string | number => id !== undefined));
});

// --- Navigation ---
function goBack() {
  router.back();
}

function goToDeputadoDetails(id: string | number) {
  router.push({ name: 'DeputadoDetails', params: { id } });
}
</script>

<style scoped>
.material-icons {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>
