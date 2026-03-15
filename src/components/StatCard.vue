<template>
  <div
    class="p-6 border-t-2 bg-zinc-50 flex flex-col items-start gap-1 dark:bg-zinc-950"
    :class="borderClasses"
  >
    <span class="text-5xl font-black tabular-nums" :class="valueClasses">{{ value }}</span>
    <span class="text-xs font-bold uppercase tracking-widest text-zinc-600 mt-1 dark:text-zinc-300">{{ label }}</span>
    <p class="text-sm text-zinc-500 mt-0.5 leading-relaxed dark:text-zinc-500">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value: number;
  label: string;
  description: string;
  color: 'zinc' | 'red' | 'orange';
}>();

const borderClasses = computed(() => ({
  'border-zinc-600': props.color === 'zinc',
  'border-red-500': props.color === 'red',
  'border-orange-500': props.color === 'orange',
}));

const valueClasses = computed(() => ({
  'text-zinc-900 dark:text-white': props.color === 'zinc',
  'text-red-500': props.color === 'red',
  'text-orange-400': props.color === 'orange',
}));
</script>
