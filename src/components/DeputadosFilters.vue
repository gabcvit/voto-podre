<template>
  <div class="border border-zinc-200 dark:border-zinc-800 mb-6">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
      <span
        class="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
        style="font-family: 'Syne', sans-serif;"
      >Filtros</span>
      <button
        v-if="hasActiveFilters"
        class="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
        @click="$emit('reset')"
      >
        Limpar filtros
      </button>
    </div>

    <div class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Search by name -->
      <div class="sm:col-span-2 lg:col-span-3">
        <label for="filter-search" class="block text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5">
          Buscar por nome
        </label>
        <input
          id="filter-search"
          :value="searchQuery"
          type="text"
          placeholder="Ex: João Silva"
          class="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 transition-colors"
          @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Status filter -->
      <div class="sm:col-span-2 lg:col-span-3">
        <p id="status-filter-label" class="block text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5">
          Status
        </p>
        <div class="flex flex-wrap gap-2" role="group" aria-labelledby="status-filter-label">
          <button
            v-for="option in STATUS_OPTIONS"
            :key="option.value"
            :aria-pressed="statusFilter === option.value"
            :class="[
              'px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-colors border focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500',
              statusFilter === option.value
                ? activeStatusClass(option.value)
                : 'bg-transparent border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-500 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            ]"
            @click="$emit('update:statusFilter', option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Partido filter -->
      <div>
        <label for="filter-partido" class="block text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5">
          Partido
        </label>
        <div class="relative">
          <select
            id="filter-partido"
            :value="partidoFilter"
            class="w-full appearance-none bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 px-3 py-2 pr-8 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 transition-colors"
            @change="$emit('update:partidoFilter', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">Todos os partidos</option>
            <option v-for="partido in availablePartidos" :key="partido" :value="partido">
              {{ partido }}
            </option>
          </select>
          <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400 text-xs">▾</span>
        </div>
      </div>

      <!-- UF filter -->
      <div>
        <label for="filter-uf" class="block text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5">
          Estado (UF)
        </label>
        <div class="relative">
          <select
            id="filter-uf"
            :value="ufFilter"
            class="w-full appearance-none bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 px-3 py-2 pr-8 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 transition-colors"
            @change="$emit('update:ufFilter', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">Todos os estados</option>
            <option v-for="uf in availableUfs" :key="uf" :value="uf">{{ uf }}</option>
          </select>
          <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400 text-xs">▾</span>
        </div>
      </div>

      <!-- Min pautas podres -->
      <div>
        <label for="filter-min-pautas" class="block text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5">
          Mín. pautas podres
        </label>
        <input
          id="filter-min-pautas"
          :value="minPautasPodres"
          type="number"
          min="0"
          placeholder="0"
          class="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 transition-colors"
          @input="$emit('update:minPautasPodres', Number(($event.target as HTMLInputElement).value))"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { STATUS_OPTIONS } from '@/composables/useDeputadosFilters'
import type { StatusFilter } from '@/composables/useDeputadosFilters'

interface Props {
  searchQuery: string
  statusFilter: StatusFilter
  partidoFilter: string
  ufFilter: string
  minPautasPodres: number
  availablePartidos: string[]
  availableUfs: string[]
  hasActiveFilters: boolean
}

defineProps<Props>()

defineEmits<{
  'update:searchQuery': [value: string]
  'update:statusFilter': [value: StatusFilter]
  'update:partidoFilter': [value: string]
  'update:ufFilter': [value: string]
  'update:minPautasPodres': [value: number]
  'reset': []
}>()

function activeStatusClass(status: StatusFilter): string {
  if (status === 'podres') return 'bg-red-500 border-red-500 text-white'
  if (status === 'clean') return 'bg-zinc-200 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white'
  return 'bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-zinc-900'
}
</script>
