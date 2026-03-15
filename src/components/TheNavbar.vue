<template>
  <nav class="bg-black border-b border-zinc-800 sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
      <RouterLink to="/" class="text-white font-black text-lg uppercase tracking-tighter hover:text-red-500 transition-colors" style="font-family: 'Syne', sans-serif;">
        Voto Podre
      </RouterLink>
      <div class="flex">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1 text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
          active-class="text-white"
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
  { to: '/sobre', label: 'Sobre' },
  { to: '/deputados', label: 'Deputados' },
  { to: '/pautas-podres', label: 'Pautas Podres' },
];
</script>
