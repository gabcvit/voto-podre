<template>
  <nav class="bg-white border-b border-zinc-200 sticky top-0 z-50 dark:bg-black dark:border-zinc-800">
    <div class="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
      <RouterLink to="/" class="text-zinc-900 font-black text-lg uppercase tracking-tighter hover:text-red-500 transition-colors dark:text-white" style="font-family: 'Syne', sans-serif;">
        Voto Podre
      </RouterLink>
      <div class="flex items-center">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-widest"
          active-class="text-zinc-900 dark:text-white"
        >
          {{ link.label }}
        </RouterLink>
        <button
          @click="themeStore.toggle()"
          class="ml-4 p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          :aria-label="themeStore.isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'"
        >
          <IconSun v-if="themeStore.isDark" class="w-4 h-4" />
          <IconMoon v-else class="w-4 h-4" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/useThemeStore';
import IconSun from '@/components/icons/IconSun.vue';
import IconMoon from '@/components/icons/IconMoon.vue';

const themeStore = useThemeStore();

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/deputados', label: 'Deputados' },
  { to: '/pautas-podres', label: 'Pautas Podres' },
];
</script>
