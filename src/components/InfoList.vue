<template>
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Informações completas</h2>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 bg-zinc-800 rounded-lg p-4">
      <li v-for="(value, key) in info" :key="key" class="flex gap-2 min-w-0">
        <span class="font-semibold text-zinc-300 whitespace-nowrap">{{ key }}:</span>
        <span class="text-zinc-400 break-words overflow-hidden text-ellipsis" style="word-break:break-word;max-width:100%">{{ value }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ info: Record<string, any> }>();
</script>