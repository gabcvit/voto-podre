<template>
  <div class="max-w-4xl mx-auto px-4">

    <!-- Hero -->
    <section aria-label="Apresentação" class="pt-16 pb-14 border-b border-zinc-200 dark:border-zinc-800 animate-fade-in-up">
      <p class="text-md font-black uppercase tracking-widest text-red-500 mb-4">Transparência · Memória · Responsabilidade</p>
      <h1
        class="font-black uppercase leading-none tracking-tighter text-zinc-900 mb-6 dark:text-white"
        style="font-family: 'Syne', sans-serif; font-size: clamp(3rem, 10vw, 7rem);"
      >
        Voto<br><span class="text-red-500">Podre</span>
      </h1>
      <p class="text-zinc-600 max-w-xl leading-relaxed mb-8 text-md dark:text-zinc-400">
        Transparência é a arma do cidadão.<br>
        Aqui você descobre quais deputados votaram
        <strong class="text-zinc-900 font-bold dark:text-white">contra o povo</strong>.
      </p>
      <div class="flex flex-wrap gap-3">
        <RouterLink
          to="/pautas"
          class="px-5 py-2 bg-red-500 hover:bg-red-400 text-white text-sm font-black uppercase tracking-widest transition-colors"
        >
          Ver Pautas
        </RouterLink>
        <RouterLink
          to="/deputados"
          class="px-5 py-2 border border-zinc-300 hover:border-zinc-500 text-zinc-900 text-sm font-black uppercase tracking-widest transition-colors dark:border-zinc-700 dark:hover:border-zinc-500 dark:text-white"
        >
          Ver Deputados
        </RouterLink>
      </div>
    </section>

    <!-- Statistics -->
    <section aria-label="Estatísticas" class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 mb-0 border-b border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800 animate-fade-in-up" style="animation-delay: 100ms">
      <StatCard
        :value="totalDeputadosMonitorados"
        label="Deputados monitorados"
        description="Parlamentares cujos votos estão sendo acompanhados de perto."
        color="zinc"
      />
      <StatCard
        :value="totalPautas"
        label="Pautas catalogadas"
        description="Proposições legislativas classificadas e monitoradas."
        color="red"
      />
      <StatCard
        :value="totalDeputadosPodres"
        label="Deputados flagrados"
        description="Parlamentares detectados com ao menos um voto questionável catalogado."
        color="orange"
      />
    </section>

    <!-- Callout -->
    <section aria-label="Mantenha a memória" class="border-b border-zinc-200 py-12 dark:border-zinc-800 animate-fade-in-up" style="animation-delay: 200ms">
      <h2
        class="font-black uppercase leading-none tracking-tight text-zinc-900 mb-4 dark:text-white"
        style="font-family: 'Syne', sans-serif; font-size: clamp(1.5rem, 4vw, 2.5rem);"
      >
        Saiba quem votou <span class="text-red-500">contra seus direitos.</span>
      </h2>
      <p class="text-zinc-500 leading-relaxed max-w-2xl text-md">
        Cada votação registrada aqui representa uma posição concreta de um parlamentar eleito
        — sobre direitos trabalhistas, saúde pública, meio ambiente, igualdade de gênero e
        proteção de povos originários. Registre, compartilhe e leve essas informações para as urnas.
      </p>
    </section>

    <!-- Messages -->
    <section aria-label="Mensagens" class="grid grid-cols-1 sm:grid-cols-2 gap-8 py-12 animate-fade-in-up" style="animation-delay: 300ms">
      <MessageCard
        title="Seu voto tem peso"
        body="A democracia funciona melhor quando cidadãos conhecem o histórico de seus representantes. O registro das votações é público — e está aqui."
      />
      <MessageCard
        title="Transparência muda o jogo"
        body="Quando eleitores sabem como seus representantes votam, a fiscalização democrática se fortalece. Compartilhe, discuta, conscientize."
      />
      <MessageCard
        title="Responsabilidade eleitoral"
        body="Parlamentares que sistematicamente votam contra direitos fundamentais devem ser cobrados. Registre, divulgue e exija responsabilidade dos seus representantes."
      />
      <MessageCard
        title="A mudança começa com informação"
        body="Conhecer os votos, acompanhar as pautas, conversar com quem está ao seu redor. A participação informada é o ponto de partida para qualquer mudança real."
      />
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDeputadosStore } from '@/stores/useDeputadosStore';
import { usePautasStore } from '@/stores/usePautasStore';
import StatCard from '@/components/StatCard.vue';
import MessageCard from '@/components/MessageCard.vue';
import { useMeta } from '@/composables/useMeta';

useMeta({
  title: 'Voto Podre',
  description: 'Descubra quais deputados federais têm votos questionáveis no Congresso. Transparência, memória e responsabilidade eleitoral.',
  canonicalPath: '/',
});

const { deputados } = useDeputadosStore();
const { pautas } = usePautasStore();

const totalDeputadosMonitorados = computed(() => deputados.length);

const totalPautas = computed(() => pautas.length);

const totalDeputadosPodres = computed(() =>
  deputados.filter(d =>
    pautas.some(p => p.idsDeputadosPodres.includes(d.id))
  ).length
);
</script>
