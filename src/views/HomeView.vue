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

    <!-- O que é um Voto Podre -->
    <section aria-label="O que é um Voto Podre" class="py-12 border-b border-zinc-200 dark:border-zinc-800 animate-fade-in-up" style="animation-delay: 100ms">
      <h2
        class="font-black uppercase leading-none tracking-tight text-zinc-900 mb-4 dark:text-white"
        style="font-family: 'Syne', sans-serif; font-size: clamp(1.5rem, 4vw, 2.5rem);"
      >
        O que é um Voto Podre?
      </h2>
      <p class="text-zinc-500 leading-relaxed text-md mb-4">
        Um voto podre é quando um deputado eleito pelo povo usa seu mandato para votar
        <strong class="text-zinc-900 dark:text-white">contra os interesses da população.</strong>
        Favorecendo pautas que prejudicam trabalhadores, enfraquecem direitos, destroem o meio ambiente
        ou entregam o bem coletivo a interesses privados.
      </p>
      <p class="text-zinc-500 leading-relaxed text-md mb-6">
        Para identificar esses votos, monitoramos proposições legislativas concretas e classificamos
        cada uma como <strong class="text-zinc-900 dark:text-white">Pauta Podre</strong> ou <strong class="text-zinc-900 dark:text-white">Pauta Positiva</strong>:
      </p>
      <div class="space-y-4">
        <div class="border-l-2 border-red-500 pl-4 py-1">
          <span class="text-xs font-black uppercase tracking-widest text-red-500 block mb-1">Pauta Podre</span>
          <p class="text-zinc-500 leading-relaxed text-md">
            Uma proposta que, na avaliação do Voto Podre, prejudica direitos de trabalhadores,
            enfraquece a proteção ambiental, criminaliza movimentos sociais ou favorece interesses
            privados em detrimento do bem coletivo.
            Os deputados listados nessa pauta votaram <strong class="text-zinc-900 dark:text-white">a favor</strong> dela.
          </p>
        </div>
        <div class="border-l-2 border-green-500 pl-4 py-1">
          <span class="text-xs font-black uppercase tracking-widest text-green-500 block mb-1">Pauta Positiva</span>
          <p class="text-zinc-500 leading-relaxed text-md">
            Uma proposta que, na avaliação do Voto Podre, amplia direitos, protege populações
            vulneráveis ou fortalece serviços públicos essenciais.
            Os deputados listados nessa pauta votaram <strong class="text-zinc-900 dark:text-white">contra</strong> ela.
          </p>
        </div>
      </div>
    </section>

    <!-- Por que monitoramos -->
    <section aria-label="Propósito" class="py-12 animate-fade-in-up" style="animation-delay: 200ms">
      <h2
        class="font-black uppercase leading-none tracking-tight text-zinc-900 mb-4 dark:text-white"
        style="font-family: 'Syne', sans-serif; font-size: clamp(1.5rem, 4vw, 2.5rem);"
      >
        Por que monitoramos o Congresso?
      </h2>
      <p class="text-zinc-500 leading-relaxed text-md mb-4">
        O Congresso representa interesses variados — e nem sempre os que mais precisam de proteção
        são os que têm mais voz na política institucional. Direitos trabalhistas, acesso à saúde
        pública, proteção ambiental e demarcação de terras indígenas são conquistas que precisam
        de atenção constante, porque estão em permanente disputa no legislativo.
      </p>
      <p class="text-zinc-500 leading-relaxed text-md mb-8">
        Quando parlamentares votam contra o interesse de trabalhadores, o direitos das mulheres, pessoas
        em situação de vulnerabilidade, comunidades indígenas e do meio ambiente, é importante que os eleitores saibam.
        Este projeto fornece esse registro — para que qualquer cidadão possa verificar, com base em dados oficiais,
        qual foi o posicionamento concreto de cada deputado.
      </p>
      <div class="border-l-2 border-red-500 pl-5 py-1">
        <h3 class="text-sm font-black uppercase tracking-widest text-red-500 mb-2">Posicionamento</h3>
        <p class="text-zinc-500 text-md leading-relaxed">
          Este projeto tem perspectiva declarada: defende os interesses da classe trabalhadora brasileira,
          dos direitos humanos, do meio ambiente e dos serviços públicos. Não pretende ser neutro
          quanto a valores — mas os dados são rigorosamente baseados em registros oficiais.
          Os votos e informações dos deputados são obtidos da API pública da Câmara dos Deputados
          do Brasil e verificáveis por qualquer pessoa.
        </p>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDeputadosStore } from '@/stores/useDeputadosStore';
import { usePautasStore } from '@/stores/usePautasStore';
import StatCard from '@/components/StatCard.vue';
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
