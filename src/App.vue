<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';
import { useThemeStore } from '@/stores/useThemeStore';

// Instantiates the store, triggering the immediate watch to sync the theme class on <html>
useThemeStore();
</script>

<template>
  <div class="bg-white text-zinc-900 min-h-screen dark:bg-black dark:text-white">
    <TheNavbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>
