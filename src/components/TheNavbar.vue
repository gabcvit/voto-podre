<template>
  <nav class="bg-zinc-900 border-b border-zinc-700 sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
      <RouterLink to="/" class="text-red-400 font-bold text-xl tracking-wide hover:text-red-300 transition">
        Voto Podre
      </RouterLink>
      <div class="flex gap-1 sm:gap-4">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1.5 rounded text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
          active-class="text-white bg-zinc-800"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/deputados', label: 'Deputados' },
  { to: '/pautas-podres', label: 'Pautas Podres' },
  { to: '/sobre', label: 'Sobre' },
];
</script>
