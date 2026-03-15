<template>
    <div v-if="deputado" class="max-w-3xl mx-auto px-4 py-12">
      <button @click="goBack" class="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white">
        <IconArrowBack />
        Voltar
      </button>

      <BaseDeputado
        :deputado="deputado"
        :pautasPodres="pautasDoDeputado"
        variant="card"
        class="mb-8"
      />

      <InfoList :info="deputado" />
      <PautasList :pautas="pautasDoDeputado" />
    </div>
    <div v-else class="text-center py-16">
      <p class="text-zinc-500 uppercase tracking-widest text-sm dark:text-zinc-600">Deputado não encontrado.</p>
      <button @click="goBack" class="mt-6 flex items-center gap-2 mx-auto text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white">
        <IconArrowBack />
        Voltar
      </button>
    </div>
  </template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useDeputadoDetails } from '@/composables/useDeputadoDetails';
import BaseDeputado from '@/components/BaseDeputado.vue';
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
