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
      v-model:statusFilter="statusFilter"
      v-model:partidoFilter="partidoFilter"
      v-model:ufFilter="ufFilter"
      v-model:minPautasPodres="minPautasPodres"
      :availablePartidos="availablePartidos"
      :availableUfs="availableUfs"
      :hasActiveFilters="hasActiveFilters"
      @reset="resetFilters"
    />

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
        class="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-3"
      >
        {{ filteredDeputados.length }} deputado{{ filteredDeputados.length !== 1 ? 's' : '' }} encontrado{{ filteredDeputados.length !== 1 ? 's' : '' }}
      </p>
      <TransitionGroup name="fade-up" tag="div" class="w-full">
        <BaseDeputado
          v-for="(deputado, index) in filteredDeputados"
          :key="deputado.id"
          :style="{ '--enter-delay': `${Math.min(index, 15) * 30}ms` }"
          :deputado="deputado"
          :pautasPodres="pautasPodres"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import BaseDeputado from '@/components/BaseDeputado.vue'
import DeputadosFilters from '@/components/DeputadosFilters.vue'
import PageTitle from '@/components/PageTitle.vue'
import { useDeputadosStore } from '@/stores/useDeputadosStore'
import { usePautasPodresStore } from '@/stores/usePautasPodresStore'
import { useDeputadosFilters } from '@/composables/useDeputadosFilters'
import { useMeta } from '@/composables/useMeta'

useMeta({
  title: 'Deputados Federais',
  description: 'Lista completa de deputados federais monitorados pelo Voto Podre. Filtre por partido, estado e veja quem apoiou pautas podres no Congresso.',
  canonicalPath: '/deputados',
})

const { deputados } = storeToRefs(useDeputadosStore())
const { pautasPodres } = storeToRefs(usePautasPodresStore())

const {
  searchQuery,
  statusFilter,
  partidoFilter,
  ufFilter,
  minPautasPodres,
  availablePartidos,
  availableUfs,
  filteredDeputados,
  hasActiveFilters,
  resetFilters,
} = useDeputadosFilters(deputados, pautasPodres)
</script>
