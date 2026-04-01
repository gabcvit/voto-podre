<template>
  <div>
    <p
      v-if="sortedParties.length === 0"
      class="text-zinc-700 dark:text-zinc-300 text-sm py-8 text-center uppercase tracking-widest"
    >
      {{ emptyLabel }}
    </p>
    <div v-else class="flex flex-col gap-2.5">
      <div
        v-for="entry in sortedParties"
        :key="entry.party"
        :class="stackedRows ? 'flex flex-col gap-1.5' : 'flex items-center gap-3'"
      >
        <span
          :class="stackedRows
            ? 'text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white break-words'
            : 'w-20 flex-shrink-0 text-xs font-black uppercase tracking-widest text-right text-zinc-900 dark:text-white'"
          style="font-family: 'Syne', sans-serif;"
        >{{ entry.party }}</span>
        <div :class="stackedRows ? 'flex items-center gap-3' : 'contents'">
          <div class="flex-1 min-w-0 h-4 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              class="h-full bg-red-500 transition-[width] duration-700 ease-out"
              :style="{ width: `${(entry.count / maxCount) * 100}%` }"
            />
          </div>
          <span
            class="w-6 flex-shrink-0 text-xs font-black tabular-nums text-right text-zinc-900 dark:text-white"
            style="font-family: 'Syne', sans-serif;"
          >{{ entry.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Deputado } from '@/types'

interface Props {
  deputados: Deputado[]
  emptyLabel?: string
  stackedRows?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  emptyLabel: 'Nenhum deputado encontrado.',
  stackedRows: false,
})

const stackedRows = computed(() => props.stackedRows)

const sortedParties = computed(() => {
  const counts: Record<string, number> = {}
  for (const d of props.deputados) {
    counts[d.siglaPartido] = (counts[d.siglaPartido] ?? 0) + 1
  }
  return Object.entries(counts)
    .map(([party, count]) => ({ party, count }))
    .sort((a, b) => b.count - a.count)
})

const maxCount = computed(() => sortedParties.value[0]?.count ?? 1)
</script>
