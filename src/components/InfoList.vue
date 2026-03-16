<template>
  <div class="mb-4">
    <h2 class="text-xs font-black uppercase tracking-widest text-zinc-600 mb-3">Informações completas</h2>
    <dl class="border border-zinc-200 dark:border-zinc-800">
      <div
        v-for="([key, value], index) in displayEntries"
        :key="key"
        class="flex items-start gap-4 px-4 py-3 border-b border-zinc-200 last:border-b-0 dark:border-zinc-800"
        :class="index % 2 === 0 ? 'bg-white dark:bg-black' : 'bg-zinc-50 dark:bg-zinc-950'"
      >
        <dt class="text-xs font-black uppercase tracking-widest text-zinc-500 w-28 flex-shrink-0 pt-0.5 dark:text-zinc-600">{{ labelFor(key) }}</dt>
        <dd class="text-zinc-600 text-sm break-all dark:text-zinc-400">{{ value }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ info: Record<string, string | number | string[]> }>();

const HIDDEN_KEYS = new Set(['uri', 'uriPartido', 'urlFoto', 'redeSocial']);

const LABELS: Record<string, string> = {
  id: 'ID',
  nome: 'Nome',
  siglaPartido: 'Partido',
  siglaUf: 'Estado',
  idLegislatura: 'Legislatura',
  email: 'E-mail',
  redeSocial: 'Redes sociais',
};

const displayEntries = computed(() =>
  Object.entries(props.info).filter(([key]) => !HIDDEN_KEYS.has(key))
);

function labelFor(key: string): string {
  return LABELS[key] ?? key;
}
</script>
