<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <PageTitle
      class="animate-fade-in-up"
      title="Lista de Deputados"
      subtitle="Quem está do lado do povo?"
    />

    <DeputadosFilters
      class="animate-fade-in-up"
      style="animation-delay: 100ms"
      v-model:searchQuery="searchQuery"
      v-model:partidoFilter="partidoFilter"
      v-model:ufFilter="ufFilter"
      v-model:minPautaComVotoPodre="minPautaComVotoPodre"
      v-model:sortOrder="sortOrder"
      :availablePartidos="availablePartidos"
      :availableUfs="availableUfs"
      :hasActiveFilters="hasActiveFilters"
      @reset="resetFilters"
    />

    <!-- Tab navigation -->
    <div
      class="flex mb-6 animate-fade-in-up"
      style="animation-delay: 120ms"
      role="tablist"
      aria-label="Tipo de visualização"
    >
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
    <template v-if="activeTab === 'list'">
      <p
        v-if="filteredDeputados.length === 0"
        role="status"
        aria-live="polite"
        class="text-zinc-500 dark:text-zinc-400 text-sm py-12 text-center animate-fade-in-up"
        style="animation-delay: 150ms"
      >
        Nenhum deputado encontrado com os filtros selecionados.
      </p>

      <div v-else class="animate-fade-in-up" style="animation-delay: 150ms">
        <p
          role="status"
          aria-live="polite"
          class="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-3"
        >
          {{ filteredDeputados.length }} deputado{{ filteredDeputados.length !== 1 ? 's' : '' }} encontrado{{ filteredDeputados.length !== 1 ? 's' : '' }}
        </p>
        <TransitionGroup name="fade-up" tag="div" class="w-full">
          <BaseDeputado
            v-for="(deputado, index) in filteredDeputados"
            :key="deputado.id"
            :style="{ '--enter-delay': `${Math.min(index, 15) * 30}ms` }"
            :deputado="deputado"
            :pautas="pautas"
          />
        </TransitionGroup>
      </div>
    </template>

    <!-- Tab: stats -->
    <template v-else>
      <p class="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4 animate-fade-in-up">
        {{ filteredDeputados.length }} deputado{{ filteredDeputados.length !== 1 ? 's' : '' }} · distribuição por partido
      </p>
      <PartyStatsChart :deputados="filteredDeputados" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import BaseDeputado from '@/components/BaseDeputado.vue'
import DeputadosFilters from '@/components/DeputadosFilters.vue'
import PageTitle from '@/components/PageTitle.vue'
import PartyStatsChart from '@/components/PartyStatsChart.vue'
import { useDeputadosStore } from '@/stores/useDeputadosStore'
import { usePautasStore } from '@/stores/usePautasStore'
import { useDeputadosFilters } from '@/composables/useDeputadosFilters'
import { useMeta } from '@/composables/useMeta'

useMeta({
  title: 'Deputados Federais',
  description: 'Lista completa de deputados federais monitorados pelo Voto Podre. Filtre por partido, estado e veja quem tem votos questionáveis no Congresso.',
  canonicalPath: '/deputados',
})

const { deputados } = storeToRefs(useDeputadosStore())
const { pautas } = storeToRefs(usePautasStore())

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
} = useDeputadosFilters(deputados, pautas)

const activeTab = ref<'list' | 'stats'>('list')
</script>
