<template>
  <div class="border border-zinc-200 dark:border-zinc-700 mb-6">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
      <span
        class="text-sm font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-200"
        style="font-family: 'Syne', sans-serif;"
      >Filtros</span>
      <button
        v-if="hasActiveFilters"
        class="text-sm font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
        @click="$emit('reset')"
      >
        Limpar filtros
      </button>
    </div>

    <div class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Search by name -->
      <div class="sm:col-span-2 lg:col-span-3">
        <label for="filter-search" class="block text-sm font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-200 mb-1.5">
          Buscar por nome
        </label>
        <input
          id="filter-search"
          :value="searchQuery"
          type="text"
          placeholder="Ex: João Silva"
          class="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 transition-colors"
          @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Partido filter -->
      <div>
        <label for="filter-partido" class="block text-sm font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-200 mb-1.5">
          Partido
        </label>
        <div class="relative">
          <select
            id="filter-partido"
            :value="partidoFilter"
            class="w-full appearance-none bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 px-3 py-2 pr-8 text-sm text-zinc-950 dark:text-zinc-50 focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 transition-colors"
            @change="$emit('update:partidoFilter', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">Todos os partidos</option>
            <option v-for="partido in availablePartidos" :key="partido" :value="partido">
              {{ partido }}
            </option>
          </select>
          <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-700 dark:text-zinc-200 text-sm">▾</span>
        </div>
      </div>

      <!-- UF filter -->
      <div>
        <label for="filter-uf" class="block text-sm font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-200 mb-1.5">
          Estado (UF)
        </label>
        <div class="relative">
          <select
            id="filter-uf"
            :value="ufFilter"
            class="w-full appearance-none bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 px-3 py-2 pr-8 text-sm text-zinc-950 dark:text-zinc-50 focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 transition-colors"
            @change="$emit('update:ufFilter', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">Todos os estados</option>
            <option v-for="uf in availableUfs" :key="uf" :value="uf">{{ uf }}</option>
          </select>
          <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-700 dark:text-zinc-200 text-sm">▾</span>
        </div>
      </div>

      <!-- Sort order -->
      <div v-if="showSortOrder" class="sm:col-span-2 lg:col-span-3">
        <p id="sort-order-label" class="block text-sm font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-200 mb-1.5">
          Ordenar por
        </p>
        <div class="flex flex-wrap gap-2" role="group" aria-labelledby="sort-order-label">
          <button
            v-for="option in SORT_OPTIONS"
            :key="option.value"
            :aria-pressed="sortOrder === option.value"
            :class="[
              'px-3 py-1.5 text-sm font-black uppercase tracking-widest transition-colors border focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500',
              sortOrder === option.value
                ? 'bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-zinc-900'
                : 'bg-transparent border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:border-zinc-500 dark:hover:border-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50'
            ]"
            @click="$emit('update:sortOrder', option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Min votos podres -->
      <div v-if="showMinPautas">
        <label for="filter-min-pautas" class="block text-sm font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-200 mb-1.5">
          Mín. votos podres
        </label>
        <input
          id="filter-min-pautas"
          :value="minPautaComVotoPodre"
          type="number"
          min="0"
          placeholder="0"
          class="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 transition-colors"
          @input="$emit('update:minPautaComVotoPodre', Number(($event.target as HTMLInputElement).value))"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SORT_OPTIONS } from '@/composables/useDeputadosFilters'
import type { SortOrder } from '@/composables/useDeputadosFilters'

interface Props {
  searchQuery: string
  partidoFilter: string
  ufFilter: string
  minPautaComVotoPodre: number
  sortOrder: SortOrder
  availablePartidos: string[]
  availableUfs: string[]
  hasActiveFilters: boolean
  showSortOrder?: boolean
  showMinPautas?: boolean
}

withDefaults(defineProps<Props>(), {
  showSortOrder: true,
  showMinPautas: true,
})

defineEmits<{
  'update:searchQuery': [value: string]
  'update:partidoFilter': [value: string]
  'update:ufFilter': [value: string]
  'update:minPautaComVotoPodre': [value: number]
  'update:sortOrder': [value: SortOrder]
  'reset': []
}>()

</script>
