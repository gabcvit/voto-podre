<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <PageTitle
      class="animate-fade-in-up"
      title="Pautas Podres"
      subtitle="Proposições legislativas monitoradas — pautas podres que deputados apoiaram e pautas positivas que deputados rejeitaram."
    />
    <div class="animate-fade-in-up" style="animation-delay: 100ms">
      <PautasList :pautas="pautasPodres" :show-title="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PautasList from '@/components/PautasList.vue';
import PageTitle from '@/components/PageTitle.vue';
import { usePautasPodresStore } from '@/stores/usePautasPodresStore';
import { useMeta } from '@/composables/useMeta';

const { pautasPodres } = usePautasPodresStore();

useMeta({
  title: 'Pautas Podres',
  description: 'Conheça as pautas podres catalogadas pelo Voto Podre — proposições legislativas que votaram contra os interesses do povo brasileiro.',
  canonicalPath: '/pautas-podres',
});
</script>
