<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';
</script>

<template>
  <div class="bg-black text-white min-h-screen">
    <TheNavbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>
