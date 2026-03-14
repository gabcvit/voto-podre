<template>
  <div class="bg-zinc-800 border border-zinc-600 rounded-xl p-6">
    <h3 class="text-lg font-bold text-white mb-2">{{ title }}</h3>
    <p class="text-zinc-300 text-sm leading-relaxed">{{ body }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  body: string;
}>();
</script>
