<template>
  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-3 text-zinc-200">Informações completas</h2>
    <div class="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
      <div
        v-for="([key, value], index) in displayEntries"
        :key="key"
        class="flex items-start gap-4 px-4 py-3"
        :class="index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-800/50'"
      >
        <span class="text-xs font-semibold uppercase tracking-widest text-zinc-500 w-32 flex-shrink-0 pt-0.5">{{ labelFor(key) }}</span>
        <span class="text-zinc-300 break-all">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ info: Record<string, string | number> }>();

const HIDDEN_KEYS = new Set(['uri', 'uriPartido', 'urlFoto']);

const LABELS: Record<string, string> = {
  id: 'ID',
  nome: 'Nome',
  siglaPartido: 'Partido',
  siglaUf: 'Estado',
  idLegislatura: 'Legislatura',
  email: 'E-mail',
};

const displayEntries = computed(() =>
  Object.entries(props.info).filter(([key]) => !HIDDEN_KEYS.has(key))
);

function labelFor(key: string): string {
  return LABELS[key] ?? key;
}
</script>
