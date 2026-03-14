<template>
  <div
    class="rounded-xl p-6 border text-center flex flex-col items-center gap-2"
    :class="colorClasses"
  >
    <span class="text-5xl font-extrabold">{{ value }}</span>
    <span class="text-lg font-semibold">{{ label }}</span>
    <p class="text-sm opacity-75">{{ description }}</p>
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

const colorClasses = computed(() => ({
  'bg-zinc-800 border-zinc-600 text-zinc-100': props.color === 'zinc',
  'bg-red-950 border-red-700 text-red-100': props.color === 'red',
  'bg-orange-950 border-orange-700 text-orange-100': props.color === 'orange',
}));
</script>
