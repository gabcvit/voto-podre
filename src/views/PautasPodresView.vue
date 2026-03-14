<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <PageTitle
      title="Pautas Podres"
      subtitle="Proposições legislativas consideradas prejudiciais aos interesses do povo brasileiro."
    />
    <PautasList :pautas="pautasPodres" :show-title="false" />
  </div>
</template>

<script setup lang="ts">
import PautasList from '@/components/PautasList.vue';
import PageTitle from '@/components/PageTitle.vue';
import { usePautasPodresStore } from '@/stores/usePautasPodresStore';

const { pautasPodres } = usePautasPodresStore();
</script>
