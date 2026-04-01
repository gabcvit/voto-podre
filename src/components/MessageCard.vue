<template>
  <div class="border-l-2 border-zinc-400 pl-5 py-2 dark:border-zinc-600">
    <h3 class="text-md font-black text-zinc-950 uppercase tracking-widest mb-2 dark:text-zinc-50">{{ title }}</h3>
    <p class="text-zinc-700 dark:text-zinc-300 text-md leading-relaxed">{{ body }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  body: string;
}>();
</script>
