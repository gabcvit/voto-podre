<template>
    <div class="max-w-3xl mx-auto px-4 py-12">
        <PageTitle
          title="Lista de Deputados"
          subtitle="Quem está do lado do povo?"
        />

        <div class="w-full place-items-center">
          <BaseDeputado
            v-for="deputado in deputados"
            :key="deputado.id"
            :deputado="deputado"
            :pautasPodres="pautasPodres"
          />
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseDeputado from '@/components/BaseDeputado.vue';
import PageTitle from '@/components/PageTitle.vue';
import { useDeputadosStore } from '@/stores/useDeputadosStore'
import { usePautasPodresStore } from '@/stores/usePautasPodresStore';

const { deputados } = useDeputadosStore()
const { pautasPodres } = usePautasPodresStore()
</script>
