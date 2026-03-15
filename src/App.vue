<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import { useThemeStore } from '@/stores/useThemeStore';

// Instantiates the store, triggering the immediate watch to sync the theme class on <html>
useThemeStore();
</script>

<template>
  <div class="bg-white text-zinc-900 min-h-screen flex flex-col dark:bg-black dark:text-white">
    <TheNavbar />
    <main class="flex-1">
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
