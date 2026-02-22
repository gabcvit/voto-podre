<template>
    <div class="md:px-8 px-2">
        <h1 class="pt-8 mb-8 text-center text-3xl font-bold">Lista de Deputados</h1>
        
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
import { useDeputadosStore } from '@/stores/useDeputadosStore'
import { usePautasPodresStore } from '@/stores/usePautasPodresStore';

const { deputados } = useDeputadosStore()
const { pautasPodres } = usePautasPodresStore()
</script>