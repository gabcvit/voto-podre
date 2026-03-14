<template>
  <div>
    <h1 class="text-4xl font-extrabold text-red-400" :class="subtitle ? 'mb-2' : 'mb-8'">{{ title }}</h1>
    <p v-if="subtitle" class="text-zinc-400 text-sm mb-8">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>
