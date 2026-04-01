<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import { useThemeStore } from '@/stores/useThemeStore';

// Instantiates the store, triggering the immediate watch to sync the theme class on <html>
useThemeStore();
</script>

<template>
  <div class="bg-white text-zinc-950 min-h-screen flex flex-col dark:bg-zinc-950 dark:text-zinc-50">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-red-500 focus:text-white focus:text-xs focus:font-black focus:uppercase focus:tracking-widest focus:outline-none"
    >
      Pular para o conteúdo principal
    </a>
    <TheNavbar />
    <main id="main-content" class="flex-1" tabindex="-1">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>

</style>
