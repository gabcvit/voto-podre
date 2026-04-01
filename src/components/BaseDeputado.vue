
<template>
    <component
      :is="isCard ? 'div' : RouterLink"
      v-bind="isCard ? undefined : { to: { name: 'DeputadoDetails', params: { id: deputado.id } } }"
      class="relative flex items-center overflow-hidden transition-colors duration-150"
      :class="[
        isCard
          ? 'gap-6 p-6 w-full'
          : 'gap-4 px-4 py-3 my-1 w-full max-w-3xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500',
        isPodre
          ? isCard
            ? 'bg-zinc-50 border-l-4 border-red-500 dark:bg-zinc-950'
            : 'bg-zinc-50 border-l-4 border-red-500 border-r border-t border-b border-r-zinc-200 border-t-zinc-200 border-b-zinc-200 hover:bg-zinc-100 dark:bg-zinc-950 dark:border-r-zinc-700 dark:border-t-zinc-700 dark:border-b-zinc-700 dark:hover:bg-zinc-900'
          : isCard
            ? 'bg-zinc-50 border-l-4 border-zinc-400 dark:bg-zinc-950 dark:border-zinc-600'
            : 'bg-zinc-50 border-l-4 border-zinc-400 border-r border-t border-b border-r-zinc-200 border-t-zinc-200 border-b-zinc-200 hover:bg-zinc-100 hover:border-l-zinc-500 dark:bg-zinc-950 dark:border-zinc-700 dark:border-r-zinc-700 dark:border-t-zinc-700 dark:border-b-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-l-zinc-500'
      ]"
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
              : isCard ? 'ring-2 ring-zinc-300 dark:ring-zinc-700' : 'ring-1 ring-zinc-300 dark:ring-zinc-700'
          ]"
        />
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap" :class="isCard ? 'mb-2' : ''">
          <span
            :class="[
              isCard ? 'text-2xl font-black uppercase tracking-tight' : 'font-bold text-zinc-950 dark:text-zinc-50 text-md',
              isPodre ? 'text-red-800 dark:text-red-100' : 'text-zinc-950 dark:text-zinc-50'
            ]"
            style="font-family: 'Syne', sans-serif;"
          >{{ deputado.nome }}</span>
          <span
            class="font-bold uppercase tracking-widest"
            :class="[
              isCard ? 'text-xs px-2 py-0.5' : 'text-xs px-1.5 py-0.5',
              isPodre ? 'bg-red-500/20 text-red-700 dark:text-red-200' : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'
            ]"
          >
            {{ deputado.siglaPartido }} · {{ deputado.siglaUf }}
          </span>
        </div>
        <!-- Card-only extra info -->
        <template v-if="isCard">
          <a
            :href="deputado.uri"
            class="text-xs text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors"
            @click.stop
          >{{ deputado.uri }}</a>
          <br>
          <a
            :href="'mailto:' + deputado.email"
            class="text-xs text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors"
            @click.stop
          >{{ deputado.email }}</a>
        </template>
        <span v-else class="text-xs text-zinc-700 dark:text-zinc-300 block truncate">{{ deputado.email }}</span>
      </div>

      <!-- Podre badge -->
      <div v-if="isPodre" class="flex-shrink-0 flex flex-col items-end gap-0 text-right">
        <span
          class="font-black uppercase tracking-wider text-red-500 leading-none"
          :class="isCard ? 'text-2xl' : 'text-base'"
          style="font-family: 'Syne', sans-serif;"
        >{{ podreCount }}</span>
        <span
          class="font-bold uppercase tracking-widest text-red-700 dark:text-red-300"
          :class="isCard ? 'text-xs' : 'text-[11px]'"
        >
          voto{{ podreCount > 1 ? 's' : '' }}<br>podre{{ podreCount > 1 ? 's' : '' }}
        </span>
      </div>
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { Deputado, Pauta } from '@/types';

interface Props {
    deputado: Deputado
    pautas: Pauta[]
    variant?: 'list' | 'card'
}

const props = defineProps<Props>()

const isCard = computed(() => props.variant === 'card');

const isPodre = computed(() =>
    props.pautas.some(pauta => pauta.idsDeputadosPodres.includes(props.deputado.id))
)

const podreCount = computed(() =>
    props.pautas.filter(pauta => pauta.idsDeputadosPodres.includes(props.deputado.id)).length
)
</script>
