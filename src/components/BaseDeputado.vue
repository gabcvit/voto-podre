
<template>
    <div
      class="relative flex items-center overflow-hidden transition-all duration-200"
      :class="[
        isCard
          ? 'gap-6 rounded-xl p-6 shadow-lg w-full'
          : 'gap-4 px-4 py-3 my-1.5 rounded-xl w-full max-w-3xl cursor-pointer',
        isPodre
          ? isCard
            ? 'bg-red-950/90 border border-red-500 shadow-[0_0_22px_4px_rgba(239,68,68,0.35)]'
            : 'bg-red-950/90 border border-red-500 shadow-[0_0_14px_2px_rgba(239,68,68,0.35)] hover:shadow-[0_0_22px_5px_rgba(239,68,68,0.55)] hover:bg-red-950'
          : isCard
            ? 'bg-zinc-900 border border-zinc-700'
            : 'bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500'
      ]"
      @click="handleClick"
    >
      <!-- Left accent stripe -->
      <div v-if="isPodre" class="absolute left-0 top-0 bottom-0 w-2 bg-red-500"></div>

      <!-- Avatar -->
      <div class="relative flex-shrink-0 ml-2">
        <img
          :src="deputado.urlFoto"
          :alt="'Foto de ' + deputado.nome"
          class="rounded-full object-cover object-top"
          :class="[
            isCard ? 'w-24 h-24' : 'w-12 h-12',
            isPodre
              ? isCard ? 'ring-4 ring-red-500' : 'ring-2 ring-red-500'
              : isCard ? 'ring-2 ring-zinc-600' : 'ring-1 ring-zinc-600'
          ]"
        />
        <span
          v-if="isPodre"
          class="absolute -top-1 -right-1 leading-none select-none"
          :class="isCard ? 'text-2xl' : 'text-base'"
        >☠️</span>
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap" :class="isCard ? 'mb-2' : ''">
          <span :class="isCard ? 'text-3xl font-bold' : 'font-semibold text-white'">{{ deputado.nome }}</span>
          <span
            class="font-medium rounded"
            :class="[
              isCard ? 'text-sm px-2 py-0.5' : 'text-xs px-1.5 py-0.5',
              isPodre ? 'bg-red-800/80 text-red-200' : 'bg-zinc-700 text-zinc-300'
            ]"
          >
            {{ deputado.siglaPartido }} · {{ deputado.siglaUf }}
          </span>
        </div>
        <!-- Card-only extra info -->
        <template v-if="isCard">
          <a
            :href="deputado.uri"
            class="text-sm text-zinc-400 underline hover:text-blue-400"
            @click.stop
          >{{ deputado.uri }}</a>
          <br>
          <a
            :href="'mailto:' + deputado.email"
            class="text-sm text-zinc-400 underline hover:text-blue-400"
            @click.stop
          >{{ deputado.email }}</a>
        </template>
        <span v-else class="text-xs text-zinc-400 block truncate">{{ deputado.email }}</span>
      </div>

      <!-- Podre badge -->
      <div v-if="isPodre" class="flex-shrink-0 flex flex-col items-center gap-0.5 text-center">
        <span class="leading-none select-none" :class="isCard ? 'text-4xl' : 'text-2xl'">🚨</span>
        <span
          class="font-extrabold uppercase tracking-wide text-red-300 leading-tight"
          :class="isCard ? 'text-xs' : 'text-[10px]'"
        >
          {{ podreCount }} pauta{{ podreCount > 1 ? 's' : '' }}<br>podre{{ podreCount > 1 ? 's' : '' }}
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
