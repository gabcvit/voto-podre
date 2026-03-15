<template>
  <div class="max-w-4xl mx-auto px-4">

    <!-- Hero -->
    <section class="pt-16 pb-14 border-b border-zinc-200 dark:border-zinc-800">
      <p class="text-xs font-black uppercase tracking-widest text-red-500 mb-4">Transparência · Memória · Responsabilidade</p>
      <h1
        class="font-black uppercase leading-none tracking-tighter text-zinc-900 mb-6 dark:text-white"
        style="font-family: 'Syne', sans-serif; font-size: clamp(3rem, 10vw, 7rem);"
      >
        Voto<br><span class="text-red-500">Podre</span>
      </h1>
      <p class="text-zinc-600 max-w-xl leading-relaxed mb-8 text-base dark:text-zinc-400">
        Aqui você descobre quais deputados votaram
        <strong class="text-zinc-900 font-bold dark:text-white">contra o seu futuro</strong>.
        Transparência é a arma do cidadão. Nunca mais os esqueça na hora de votar.
      </p>
      <div class="flex flex-wrap gap-3">
        <RouterLink
          to="/pautas-podres"
          class="px-5 py-2 bg-red-500 hover:bg-red-400 text-white text-xs font-black uppercase tracking-widest transition-colors"
        >
          Ver Pautas Podres
        </RouterLink>
        <RouterLink
          to="/deputados"
          class="px-5 py-2 border border-zinc-300 hover:border-zinc-500 text-zinc-900 text-xs font-black uppercase tracking-widest transition-colors dark:border-zinc-700 dark:hover:border-zinc-500 dark:text-white"
        >
          Ver Deputados
        </RouterLink>
      </div>
    </section>

    <!-- Statistics -->
    <section class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 mb-0 border-b border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      <StatCard
        :value="totalDeputadosMonitorados"
        label="Deputados monitorados"
        description="Parlamentares cujos votos estão sendo acompanhados de perto."
        color="zinc"
      />
      <StatCard
        :value="totalPautasPodres"
        label="Pautas Podres catalogadas"
        description="Proposições consideradas prejudiciais aos interesses do povo."
        color="red"
      />
      <StatCard
        :value="totalDeputadosPodres"
        label="Deputados flagrados"
        description="Parlamentares detectados apoiando ao menos uma pauta podre."
        color="orange"
      />
    </section>

    <!-- Callout -->
    <section class="border-b border-zinc-200 py-12 dark:border-zinc-800">
      <h2
        class="font-black uppercase leading-none tracking-tight text-zinc-900 mb-4 dark:text-white"
        style="font-family: 'Syne', sans-serif; font-size: clamp(1.5rem, 4vw, 2.5rem);"
      >
        Nunca esqueça quem votou <span class="text-red-500">contra o seu futuro.</span>
      </h2>
      <p class="text-zinc-500 leading-relaxed max-w-2xl text-sm">
        Cada voto podre é uma escolha deliberada de um parlamentar em prejudicar
        trabalhadores, mulheres, os mais vulneráveis e a democracia brasileira.
        Guarde esses nomes. Compartilhe com as pessoas ao seu redor. Leve essa informação
        para as urnas.
      </p>
    </section>

    <!-- Messages -->
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-8 py-12">
      <MessageCard
        title="Seu voto tem poder"
        body="A democracia só funciona quando cidadãos informados exercem seu direito de voto. Não deixe que candidatos com histórico de traição ao povo sejam reeleitos."
      />
      <MessageCard
        title="Informação é resistência"
        body="Quando o povo sabe como seus representantes votam, fica muito mais difícil governar contra o interesse público. Compartilhe, discuta, conscientize."
      />
      <MessageCard
        title="Responsabilidade eleitoral"
        body="Deputados que apoiam pautas contrárias aos direitos fundamentais não merecem uma segunda chance. Registre, divulgue e cobre seus representantes."
      />
      <MessageCard
        title="Seja melhor que eles"
        body="Enquanto esses parlamentares servem a interesses escusos, o povo brasileiro continua resistindo, se organizando e construindo um futuro mais justo."
      />
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDeputadosStore } from '@/stores/useDeputadosStore';
import { usePautasPodresStore } from '@/stores/usePautasPodresStore';
import StatCard from '@/components/StatCard.vue';
import MessageCard from '@/components/MessageCard.vue';

const { deputados } = useDeputadosStore();
const { pautasPodres } = usePautasPodresStore();

const totalDeputadosMonitorados = computed(() => deputados.length);

const totalPautasPodres = computed(() => pautasPodres.length);

const totalDeputadosPodres = computed(() => {
  const ids = new Set(
    pautasPodres.flatMap(p => p.idsDeputadosPodres.filter(Boolean))
  );
  return ids.size;
});
</script>
