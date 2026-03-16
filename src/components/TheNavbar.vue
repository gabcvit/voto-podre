<template>
  <nav aria-label="Navegação principal" class="bg-white border-b border-zinc-200 sticky top-0 z-50 dark:bg-black dark:border-zinc-800">
    <div class="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
      <RouterLink to="/" class="text-zinc-900 font-black text-lg uppercase tracking-tighter hover:text-red-500 transition-colors dark:text-white" style="font-family: 'Syne', sans-serif;">
        Voto Podre
      </RouterLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-widest"
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

      <!-- Mobile right side: theme toggle + burger -->
      <div class="flex items-center gap-2 md:hidden">
        <button
          @click="themeStore.toggle()"
          class="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          :aria-label="themeStore.isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'"
        >
          <IconSun v-if="themeStore.isDark" class="w-4 h-4" />
          <IconMoon v-else class="w-4 h-4" />
        </button>
        <button
          @click="menuOpen = !menuOpen"
          class="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
        >
          <!-- Burger / X icon -->
          <svg v-if="!menuOpen" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="square" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="square" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    <div
      id="mobile-menu"
      v-if="menuOpen"
      class="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black"
    >
      <RouterLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="block px-4 py-3 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 last:border-b-0"
        active-class="text-zinc-900 dark:text-white"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '@/stores/useThemeStore';
import IconSun from '@/components/icons/IconSun.vue';
import IconMoon from '@/components/icons/IconMoon.vue';

const themeStore = useThemeStore();
const menuOpen = ref(false);

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/glossario', label: 'Glossário' },
  { to: '/deputados', label: 'Deputados' },
  { to: '/pautas-podres', label: 'Pautas' },
];
</script>
