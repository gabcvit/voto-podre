<template>
    <div 
        :key="deputado.id" 
        class="grid grid-cols-6 grid-rows-2 items-center my-2 border-1 rounded-md w-full max-w-xl"
        :class="isPodre ? 'bg-red-950 border-red-400' : 'bg-zinc-950 border-zinc-400'">
        <div class="col-span-1 row-span-2 p-2"><img :src="deputado.urlFoto" alt="Foto do deputado" class="w-14 h-14 avatar-picture"></div>
        <span class="col-span-4 row-span-1 text-bold">{{ deputado.nome }} ({{ deputado.siglaPartido }} - {{ deputado.siglaUf }})</span>
        <span v-if="isPodre" class="col-span-1 row-span-1 text-red-400 bg-red-900 border-red-400 border-1 px-2 py-1 rounded-md text-right">Podre</span>
        <span class="col-start-2 col-span-4 row-span-1 text-sm opacity-75">{{ deputado.email }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Deputado, PautaPodre } from '@/types';

interface Props {
    deputado: Deputado
    pautasPodres: PautaPodre[]
}

const props = defineProps<Props>()

const isPodre = computed(() => {
    return props.pautasPodres.some(pauta => pauta.idsDeputadosPodres.includes(props.deputado.id))
})
</script>

<style scoped>
.avatar-picture {
    border-radius: 50%;
    object-fit: cover;
    object-position: top
} 
</style>