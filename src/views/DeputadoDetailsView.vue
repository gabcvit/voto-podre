<template>
    <div v-if="deputado" class="max-w-2xl mx-auto p-6">
      <button @click="goBack" class="mb-6 px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2">
        <IconArrowBack class="text-blue-400" />
        Voltar
      </button>

      <div class="flex items-center gap-6 bg-zinc-900 rounded-lg p-6 shadow-lg mb-8">
        <img :src="deputado.urlFoto" :alt="'Foto de ' + deputado.nome" class="w-24 h-24 rounded-full border-4 border-zinc-800 shadow object-cover object-top aspect-square" />
        <div>
          <h1 class="text-3xl font-bold mb-2 flex items-center gap-2">
            <span>{{ deputado.nome }}</span>
            <IconCommunity class="text-blue-400" />
          </h1>
          <div class="text-lg text-zinc-300 mb-1">{{ deputado.siglaPartido }} - {{ deputado.siglaUf }}</div>
          <div class="text-sm text-zinc-400 mb-1">Legislatura: {{ deputado.idLegislatura }}</div>
          <div class="text-sm text-zinc-400 mb-1">Email: <a :href="'mailto:' + deputado.email" class="underline hover:text-blue-400">{{ deputado.email }}</a></div>
        </div>
      </div>

      <InfoList :info="deputado" />

      <PautasList :pautas="pautasDoDeputado" />
    </div>
    <div v-else class="text-center py-16">
      <p class="text-xl text-zinc-300">Deputado não encontrado.</p>
      <button @click="goBack" class="mt-6 px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2">
        <IconArrowBack class="text-blue-400" />
        Voltar
      </button>
    </div>
  </template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useDeputadoDetails } from '@/composables/useDeputadoDetails';
import IconCommunity from '@/components/icons/IconCommunity.vue';
import IconArrowBack from '@/components/icons/IconArrowBack.vue';
import InfoList from '@/components/InfoList.vue';
import PautasList from '@/components/PautasList.vue';

const route = useRoute();
const router = useRouter();
const idParam =
  typeof route.params.id === 'string' || typeof route.params.id === 'number'
    ? route.params.id
    : Array.isArray(route.params.id) && route.params.id.length > 0
      ? route.params.id[0]
      : '';
const { deputado, pautasDoDeputado } = useDeputadoDetails(idParam ?? '');

function goBack() {
  router.back();
}
</script>
<style scoped>
.material-icons {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
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
