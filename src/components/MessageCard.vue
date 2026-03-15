<template>
  <div class="border-l-2 border-zinc-700 pl-5 py-2">
    <h3 class="text-sm font-black text-white uppercase tracking-widest mb-2">{{ title }}</h3>
    <p class="text-zinc-500 text-sm leading-relaxed">{{ body }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  body: string;
}>();
</script>
