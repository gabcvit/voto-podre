<template>
  <div v-if="pauta" class="max-w-3xl mx-auto px-4 py-12">
    <button @click="goBack" class="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white">
      <IconArrowBack />
      Voltar
    </button>

    <div class="border-l-4 border-red-500 pl-6 mb-10">
      <p class="text-xs font-black uppercase tracking-widest text-red-500 mb-2">Pauta Podre</p>
      <h1
        class="font-black uppercase leading-tight text-zinc-900 mb-3 dark:text-white"
        style="font-family: 'Syne', sans-serif; font-size: clamp(1.5rem, 4vw, 2.25rem);"
      >{{ pauta.nome }}</h1>
      <p class="text-zinc-500 text-sm leading-relaxed mb-4">{{ pauta.descricao }}</p>
      <a
        v-if="pauta.urlProposicao"
        :href="pauta.urlProposicao"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white"
      >Ver tramitação na Câmara →</a>
    </div>

    <div class="mb-6">
      <p class="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 dark:text-zinc-600">
        {{ deputados.length }} deputado{{ deputados.length !== 1 ? 's' : '' }} que apoiaram
      </p>
      <div class="flex flex-col">
        <BaseDeputado
          v-for="deputado in deputados"
          :key="deputado.id"
          :deputado="deputado"
          :pautasPodres="[pauta]"
        />
      </div>
    </div>
  </div>
  <div v-else class="text-center py-16">
    <p class="text-zinc-500 uppercase tracking-widest text-sm dark:text-zinc-600">Pauta não encontrada.</p>
    <button @click="goBack" class="mt-6 flex items-center gap-2 mx-auto text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white">
      <IconArrowBack />
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
