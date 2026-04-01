<template>
  <div v-if="pauta" class="max-w-3xl mx-auto px-4 py-12">
    <div class="mb-8 flex items-center justify-between">
      <button @click="goBack" class="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
        <IconArrowBack />
        Voltar
      </button>
      <div class="flex items-center gap-3">
        <template v-if="!shareExpanded">
          <button
            @click="shareExpanded = true"
            :disabled="generating"
            class="flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-50 disabled:cursor-wait text-zinc-500 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white"
          >
            <IconShare class="w-4 h-4" />
            {{ generating ? 'Gerando imagem…' : 'Compartilhar' }}
          </button>
        </template>
        <template v-else>
          <span class="hidden sm:inline text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Compartilhar:</span>
          <button
            @click="shareByPartido"
            :disabled="generating"
            class="text-sm font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >Por partido</button>
          <span class="text-zinc-300 dark:text-zinc-700 select-none">·</span>
          <button
            @click="ufPickerVisible = !ufPickerVisible"
            :disabled="generating"
            class="text-sm font-black uppercase tracking-widest transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            :class="ufPickerVisible ? 'text-red-500' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white'"
          >Por estado</button>
          <button
            @click="shareExpanded = false; ufPickerVisible = false; shareUf = ''"
            class="text-xs text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white transition-colors focus:outline-none"
            aria-label="Fechar opções de compartilhar"
          >✕</button>
        </template>
      </div>
    </div>

    <!-- UF picker -->
    <div v-if="shareExpanded && ufPickerVisible" class="mb-8 flex flex-wrap gap-3 items-center border-b border-zinc-200 dark:border-zinc-800 pb-6 -mt-2">
      <div class="relative">
        <select
          v-model="shareUf"
          class="appearance-none bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 px-3 py-2 pr-8 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 transition-colors font-black uppercase tracking-widest"
        >
          <option value="" disabled>Selecione um estado</option>
          <option v-for="uf in deputadoUfs" :key="uf" :value="uf">{{ uf }} ({{ ufDeputadoCounts[uf] }} dep.)</option>
        </select>
        <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400 text-sm">▾</span>
      </div>
      <button
        @click="shareByUf"
        :disabled="!shareUf || generating"
        class="text-sm font-black uppercase tracking-widest px-4 py-2 bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-wait transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >{{ generating ? 'Gerando…' : 'Gerar imagem' }}</button>
      <p v-if="shareUf" class="text-xs text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
        {{ ufDeputadoCounts[shareUf] ?? 0 }} deputado{{ (ufDeputadoCounts[shareUf] ?? 0) !== 1 ? 's' : '' }} de {{ shareUf }}
      </p>
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
      <div v-if="pauta.explicacao" class="mt-5 pt-5 border-t border-zinc-200 dark:border-zinc-800 mb-1">
        <p
          class="text-xs font-black uppercase tracking-widest mb-2"
          :class="pauta.tipo === 'positiva' ? 'text-green-500' : 'text-red-500'"
        >{{ pauta.tipo === 'positiva' ? 'Por que essa pauta é importante?' : 'Por que essa pauta é podre?' }}</p>
        <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{{ pauta.explicacao }}</p>
      </div>
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

    <DeputadosFilters
      v-model:searchQuery="searchQuery"
      v-model:partidoFilter="partidoFilter"
      v-model:ufFilter="ufFilter"
      v-model:minPautaComVotoPodre="minPautaComVotoPodre"
      v-model:sortOrder="sortOrder"
      :availablePartidos="availablePartidos"
      :availableUfs="availableUfs"
      :hasActiveFilters="hasActiveFilters"
      :showSortOrder="false"
      :showMinPautas="false"
      @reset="resetFilters"
    />

    <!-- Tab navigation -->
    <div class="flex mb-6" role="tablist" aria-label="Tipo de visualização">
      <button
        role="tab"
        :aria-selected="activeTab === 'list'"
        @click="activeTab = 'list'"
        class="flex-1 py-2.5 text-xs font-black uppercase tracking-widest border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset"
        :class="activeTab === 'list'
          ? 'border-red-500 text-red-500'
          : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300'"
      >Deputados</button>
      <button
        role="tab"
        :aria-selected="activeTab === 'stats'"
        @click="activeTab = 'stats'"
        class="flex-1 py-2.5 text-xs font-black uppercase tracking-widest border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset"
        :class="activeTab === 'stats'
          ? 'border-red-500 text-red-500'
          : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300'"
      >Por Partido</button>
    </div>

    <!-- Tab: list -->
    <div v-if="activeTab === 'list'" class="mb-6">
      <p class="text-sm font-black uppercase tracking-widest text-zinc-500 mb-4 dark:text-zinc-600">
        {{ filteredDeputados.length }} deputado{{ filteredDeputados.length !== 1 ? 's' : '' }}
        {{ pauta.tipo === 'positiva' ? 'que votaram contra' : 'que apoiaram' }}
        <span v-if="hasActiveFilters" class="text-zinc-400 dark:text-zinc-700">(de {{ deputados.length }} total)</span>
      </p>
      <TransitionGroup name="fade-up" tag="div" class="flex flex-col">
        <BaseDeputado
          v-for="(deputado, index) in filteredDeputados"
          :key="deputado.id"
          :style="{ '--enter-delay': `${Math.min(index, 15) * 30}ms` }"
          :deputado="deputado"
          :pautas="[pauta]"
        />
      </TransitionGroup>
      <p v-if="hasActiveFilters && filteredDeputados.length === 0" class="text-sm text-zinc-500 dark:text-zinc-600 uppercase tracking-widest text-center py-8">
        Nenhum deputado encontrado com esses filtros.
      </p>
    </div>

    <!-- Tab: stats -->
    <div v-else class="mb-6">
      <p class="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4">
        {{ filteredDeputados.length }} deputado{{ filteredDeputados.length !== 1 ? 's' : '' }}
        {{ pauta.tipo === 'positiva' ? 'que votaram contra' : 'que apoiaram' }} · por partido
      </p>
      <PartyStatsChart
        :deputados="filteredDeputados"
        :emptyLabel="pauta.tipo === 'positiva' ? 'Nenhum deputado flagrado nesta pauta.' : 'Nenhum deputado flagrado nesta pauta.'"
        :stackedRows="true"
      />
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
import DeputadosFilters from '@/components/DeputadosFilters.vue';
import PartyStatsChart from '@/components/PartyStatsChart.vue';
import { TODOS_DEPUTADOS } from '@/data/deputados';
import { PAUTAS } from '@/data/pautas';
import { useMeta } from '@/composables/useMeta';
import { useDeputadosFilters } from '@/composables/useDeputadosFilters';
import { useShareImage } from '@/composables/useShareImage';

const route = useRoute();
const router = useRouter();

function getPautaById(id: string | number) {
  return PAUTAS.find(pauta => String(pauta.id) === String(id));
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

const pautaAsArray = computed(() => pauta.value ? [pauta.value] : []);

const {
  searchQuery,
  partidoFilter,
  ufFilter,
  minPautaComVotoPodre,
  sortOrder,
  availablePartidos,
  availableUfs,
  filteredDeputados,
  hasActiveFilters,
  resetFilters,
} = useDeputadosFilters(deputados, pautaAsArray);

const metaDescription = computed(() => {
  if (!pauta.value) return 'Detalhes sobre esta pauta e os deputados com voto questionável.';
  const count = deputados.value.length;
  const action = pauta.value.tipo === 'positiva' ? 'votaram contra' : 'apoiaram';
  return `${count} deputado${count !== 1 ? 's' : ''} ${action} ${pauta.value.nome}. ${pauta.value.descricao.slice(0, 100)} Compartilhe e mostre quem votou.`;
});

useMeta({
  title: computed(() => pauta.value?.nome ?? 'Pauta'),
  description: metaDescription,
  canonicalPath: computed(() => pauta.value ? `/pauta/${pauta.value.id}` : '/pautas'),
});

const showReferences = ref(false);
const activeTab = ref<'list' | 'stats'>('list');

const { generating, generate } = useShareImage();

const shareExpanded = ref(false);
const ufPickerVisible = ref(false);
const shareUf = ref('');

const deputadoUfs = computed(() => {
  const ufs = new Set(deputados.value.map((d) => d.siglaUf));
  return [...ufs].sort();
});

const ufDeputadoCounts = computed(() => {
  const counts: Record<string, number> = {};
  for (const d of deputados.value) {
    counts[d.siglaUf] = (counts[d.siglaUf] ?? 0) + 1;
  }
  return counts;
});

const topParties = computed(() => {
  const counts: Record<string, number> = {};
  for (const d of deputados.value) {
    counts[d.siglaPartido] = (counts[d.siglaPartido] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([sigla, count]) => ({ sigla, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
});

async function shareByPartido() {
  if (!pauta.value) return;
  shareExpanded.value = false;
  await generate({
    mode: 'pauta',
    pauta: pauta.value,
    deputadosCount: deputados.value.length,
    topParties: topParties.value,
  });
}

async function shareByUf() {
  if (!pauta.value || !shareUf.value) return;
  const ufDeputados = deputados.value.filter((d) => d.siglaUf === shareUf.value);
  await generate({
    mode: 'pauta-by-uf',
    pauta: pauta.value,
    uf: shareUf.value,
    deputadosCount: ufDeputados.length,
    deputadoItems: ufDeputados.map((d) => ({ nome: d.nome, siglaPartido: d.siglaPartido })),
  });
}

function goBack() {
  router.back();
}
</script>
