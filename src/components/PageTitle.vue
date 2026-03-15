<template>
  <div :class="subtitle ? 'mb-4' : 'mb-10'">
    <h1
      class="font-black text-white uppercase leading-none tracking-tight"
      :class="[subtitle ? 'mb-3' : '', 'text-4xl sm:text-5xl']"
    >
      {{ title }}
    </h1>
    <p v-if="subtitle" class="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>
