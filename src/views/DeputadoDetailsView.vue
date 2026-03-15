<template>
    <div v-if="deputado" class="max-w-3xl mx-auto px-4 py-12">
      <div class="mb-8 flex items-center justify-between">
        <button @click="goBack" class="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
          <IconArrowBack />
          Voltar
        </button>
        <button @click="share" class="flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500" :class="copied ? 'text-green-500' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white'">
          <IconShare class="w-4 h-4" />
          {{ copied ? 'Link copiado!' : 'Compartilhar' }}
        </button>
      </div>

      <BaseDeputado
        :deputado="deputado"
        :pautasPodres="pautasDoDeputado"
        variant="card"
        class="mb-8"
      />

      <InfoList :info="deputado" />
      <PautasList
        v-if="pautasNegativas.length"
        :pautas="pautasNegativas"
        title="Pautas Podres apoiadas"
        class="mb-8"
      />
      <PautasList
        v-if="pautasPositivas.length"
        :pautas="pautasPositivas"
        title="Pautas Positivas negadas"
      />
    </div>
    <div v-else class="text-center py-16">
      <p class="text-zinc-500 uppercase tracking-widest text-md dark:text-zinc-600">Deputado não encontrado.</p>
      <button @click="goBack" class="mt-6 flex items-center gap-2 mx-auto text-sm font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
        <IconArrowBack />
        Voltar
      </button>
    </div>
  </template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDeputadoDetails } from '@/composables/useDeputadoDetails';
import BaseDeputado from '@/components/BaseDeputado.vue';
import IconArrowBack from '@/components/icons/IconArrowBack.vue';
import IconShare from '@/components/icons/IconShare.vue';
import InfoList from '@/components/InfoList.vue';
import PautasList from '@/components/PautasList.vue';
import { useMeta } from '@/composables/useMeta';

const route = useRoute();
const router = useRouter();
const idParam =
  typeof route.params.id === 'string' || typeof route.params.id === 'number'
    ? route.params.id
    : Array.isArray(route.params.id) && route.params.id.length > 0
      ? route.params.id[0]
      : '';
const { deputado, pautasDoDeputado } = useDeputadoDetails(idParam ?? '');

const pautasNegativas = computed(() => pautasDoDeputado.value.filter(p => p.tipo === 'negativa'));
const pautasPositivas = computed(() => pautasDoDeputado.value.filter(p => p.tipo === 'positiva'));

const metaTitle = computed(() =>
  deputado.value
    ? `${deputado.value.nome} (${deputado.value.siglaPartido}/${deputado.value.siglaUf})`
    : 'Deputado'
);
const metaDescription = computed(() =>
  deputado.value
    ? `${deputado.value.nome} (${deputado.value.siglaPartido}/${deputado.value.siglaUf}) tem votos registrados em pautas polêmicas na Câmara. Veja o histórico e compartilhe — o voto dos deputados é público e você merece saber.`
    : 'Histórico de votos deste deputado federal.'
);

useMeta({
  title: metaTitle,
  description: metaDescription,
  canonicalPath: computed(() => deputado.value ? `/deputado/${deputado.value.id}` : '/deputados'),
});

const copied = ref(false);

async function share() {
  const url = window.location.href;
  const title = deputado.value
    ? `${deputado.value.nome} (${deputado.value.siglaPartido}/${deputado.value.siglaUf}) — Voto Podre`
    : 'Voto Podre';
  const text = metaDescription.value;
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
    } catch {
      // user cancelled
    }
  } else {
    await navigator.clipboard.writeText(url);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2500);
  }
}

function goBack() {
  router.back();
}
</script>
