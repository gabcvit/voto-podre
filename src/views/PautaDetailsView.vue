<template>
  <div v-if="pauta" class="max-w-3xl mx-auto px-4 py-12">
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

    <div
      class="pl-6 mb-10"
      :class="pauta.tipo === 'positiva' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'"
    >
      <p
        class="text-xs font-black uppercase tracking-widest mb-2"
        :class="pauta.tipo === 'positiva' ? 'text-green-500' : 'text-red-500'"
      >{{ pauta.tipo === 'positiva' ? 'Pauta Positiva' : 'Pauta Podre' }}</p>
      <h1
        class="font-black uppercase leading-tight text-zinc-900 mb-3 dark:text-white"
        style="font-family: 'Syne', sans-serif; font-size: clamp(1.5rem, 4vw, 2.25rem);"
      >{{ pauta.nome }}</h1>
      <p class="text-zinc-500 text-sm leading-relaxed mb-2">{{ pauta.descricao }}</p>
      <p class="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4">Análise editorial — Equipe Voto Podre</p>
      <a
        v-if="pauta.urlProposicao"
        :href="pauta.urlProposicao"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-3 inline-block text-xs font-black uppercase tracking-widest border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors px-4 py-2 mr-3 "
      >Ver tramitação na Câmara →</a>
      <button
        v-if="references.length"
        type="button"
        @click="showReferences = !showReferences"
        class="mt-3 inline-block text-xs font-black uppercase tracking-widest border-2 border-zinc-300 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-colors px-4 py-2 dark:border-zinc-800 dark:text-zinc-600 dark:hover:border-white dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        {{ showReferences ? 'Ocultar materiais de leitura' : 'Mostrar materiais de leitura' }}
      </button>
    </div>

    <section v-if="references.length && showReferences" class="mb-10">
      <h2 class="mb-4 text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-600">
        Leia mais
      </h2>
      <ul class="flex flex-col gap-3">
        <li
          v-for="reference in references"
          :key="`${reference.url}-${reference.title}`"
          class="border-l-2 border-zinc-300 pl-4 dark:border-zinc-800"
        >
          <a
            :href="reference.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-black uppercase tracking-wide text-zinc-900 transition-colors hover:text-red-500 dark:text-white"
          >
            {{ reference.title }}
          </a>
          <p class="mt-1 text-sm font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            {{ reference.source }}
          </p>
        </li>
      </ul>
    </section>

    <div class="mb-6">
      <p class="text-sm font-black uppercase tracking-widest text-zinc-500 mb-4 dark:text-zinc-600">
        {{ deputados.length }} deputado{{ deputados.length !== 1 ? 's' : '' }}
        {{ pauta.tipo === 'positiva' ? 'que votaram contra' : 'que apoiaram' }}
      </p>
      <TransitionGroup name="fade-up" tag="div" class="flex flex-col">
        <BaseDeputado
          v-for="(deputado, index) in deputados"
          :key="deputado.id"
          :style="{ '--enter-delay': `${Math.min(index, 15) * 30}ms` }"
          :deputado="deputado"
          :pautasPodres="[pauta]"
        />
      </TransitionGroup>
    </div>
  </div>
  <div v-else class="text-center py-16">
    <p class="text-zinc-500 uppercase tracking-widest text-sm dark:text-zinc-600">Pauta não encontrada.</p>
    <button @click="goBack" class="mt-6 flex items-center gap-2 mx-auto text-sm font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
      <IconArrowBack />
      Voltar
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import IconArrowBack from '@/components/icons/IconArrowBack.vue';
import IconShare from '@/components/icons/IconShare.vue';
import BaseDeputado from '@/components/BaseDeputado.vue';
import { TODOS_DEPUTADOS } from '@/data/deputados';
import { PAUTAS_PODRES } from '@/data/pautasPodres';
import { useMeta } from '@/composables/useMeta';

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
const references = computed(() => pauta.value?.referencias ?? []);

const metaDescription = computed(() => {
  if (!pauta.value) return 'Detalhes sobre esta pauta e os deputados com voto questionável.';
  const count = deputados.value.length;
  const action = pauta.value.tipo === 'positiva' ? 'votaram contra' : 'apoiaram';
  return `${count} deputado${count !== 1 ? 's' : ''} ${action} ${pauta.value.nome}. ${pauta.value.descricao.slice(0, 100)} Compartilhe e mostre quem votou.`;
});

useMeta({
  title: computed(() => pauta.value?.nome ?? 'Pauta'),
  description: metaDescription,
  canonicalPath: computed(() => pauta.value ? `/pauta/${pauta.value.id}` : '/pautas-podres'),
});

const copied = ref(false);
const showReferences = ref(false);

async function share() {
  const url = window.location.href;
  const title = pauta.value ? `${pauta.value.nome} — Voto Podre` : 'Voto Podre';
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
