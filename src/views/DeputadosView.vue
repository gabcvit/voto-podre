<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <PageTitle
      title="Lista de Deputados"
      subtitle="Quem está do lado do povo?"
    />

    <DeputadosFilters
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
      class="text-zinc-500 dark:text-zinc-400 text-sm py-12 text-center"
    >
      Nenhum deputado encontrado com os filtros selecionados.
    </p>

    <template v-else>
      <p class="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-3">
        {{ filteredDeputados.length }} deputado{{ filteredDeputados.length !== 1 ? 's' : '' }} encontrado{{ filteredDeputados.length !== 1 ? 's' : '' }}
      </p>
      <div class="w-full">
        <BaseDeputado
          v-for="deputado in filteredDeputados"
          :key="deputado.id"
          :deputado="deputado"
          :pautasPodres="pautasPodres"
        />
      </div>
    </template>
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
