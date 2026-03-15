
<template>
    <div
      class="relative flex items-center overflow-hidden transition-colors duration-150"
      :class="[
        isCard
          ? 'gap-6 p-6 w-full'
          : 'gap-4 px-4 py-3 my-1 w-full max-w-3xl cursor-pointer',
        isPodre
          ? isCard
            ? 'bg-zinc-950 border-l-4 border-red-500'
            : 'bg-zinc-950 border-l-4 border-red-500 border-r border-t border-b border-r-zinc-800 border-t-zinc-800 border-b-zinc-800 hover:bg-zinc-900'
          : isCard
            ? 'bg-zinc-950 border-l-4 border-zinc-700'
            : 'bg-zinc-950 border-l-4 border-zinc-800 border-r border-t border-b border-r-zinc-800 border-t-zinc-800 border-b-zinc-800 hover:bg-zinc-900 hover:border-l-zinc-600'
      ]"
      @click="handleClick"
    >
      <!-- Avatar -->
      <div class="relative flex-shrink-0 ml-2">
        <img
          :src="deputado.urlFoto"
          :alt="'Foto de ' + deputado.nome"
          class="object-cover object-top"
          :class="[
            isCard ? 'w-20 h-20' : 'w-11 h-11',
            isPodre
              ? isCard ? 'ring-2 ring-red-500' : 'ring-1 ring-red-500'
              : isCard ? 'ring-2 ring-zinc-700' : 'ring-1 ring-zinc-700'
          ]"
        />
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap" :class="isCard ? 'mb-2' : ''">
          <span
            :class="[
              isCard ? 'text-2xl font-black uppercase tracking-tight' : 'font-bold text-white text-sm',
              isPodre ? 'text-red-100' : 'text-white'
            ]"
            style="font-family: 'Syne', sans-serif;"
          >{{ deputado.nome }}</span>
          <span
            class="font-bold uppercase tracking-widest"
            :class="[
              isCard ? 'text-xs px-2 py-0.5' : 'text-[10px] px-1.5 py-0.5',
              isPodre ? 'bg-red-500/20 text-red-400' : 'bg-zinc-800 text-zinc-500'
            ]"
          >
            {{ deputado.siglaPartido }} · {{ deputado.siglaUf }}
          </span>
        </div>
        <!-- Card-only extra info -->
        <template v-if="isCard">
          <a
            :href="deputado.uri"
            class="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            @click.stop
          >{{ deputado.uri }}</a>
          <br>
          <a
            :href="'mailto:' + deputado.email"
            class="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            @click.stop
          >{{ deputado.email }}</a>
        </template>
        <span v-else class="text-xs text-zinc-600 block truncate">{{ deputado.email }}</span>
      </div>

      <!-- Podre badge -->
      <div v-if="isPodre" class="flex-shrink-0 flex flex-col items-end gap-0 text-right">
        <span
          class="font-black uppercase tracking-wider text-red-500 leading-none"
          :class="isCard ? 'text-2xl' : 'text-base'"
          style="font-family: 'Syne', sans-serif;"
        >{{ podreCount }}</span>
        <span
          class="font-bold uppercase tracking-widest text-red-600"
          :class="isCard ? 'text-[10px]' : 'text-[9px]'"
        >
          pauta{{ podreCount > 1 ? 's' : '' }}<br>podre{{ podreCount > 1 ? 's' : '' }}
        </span>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Deputado, PautaPodre } from '@/types';

interface Props {
    deputado: Deputado
    pautasPodres: PautaPodre[]
    variant?: 'list' | 'card'
}

const props = defineProps<Props>()
const router = useRouter();

const isCard = computed(() => props.variant === 'card');

const isPodre = computed(() =>
    props.pautasPodres.some(pauta => pauta.idsDeputadosPodres.includes(props.deputado.id))
)

const podreCount = computed(() =>
    props.pautasPodres.filter(pauta => pauta.idsDeputadosPodres.includes(props.deputado.id)).length
)

function handleClick() {
    if (!isCard.value) {
        router.push({ name: 'DeputadoDetails', params: { id: props.deputado.id } });
    }
}
</script>
