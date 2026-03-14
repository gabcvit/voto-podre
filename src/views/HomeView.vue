<template>
  <div class="max-w-4xl mx-auto px-4 py-12">

    <!-- Hero -->
    <section class="text-center mb-16">
      <h1 class="text-5xl font-extrabold text-red-400 mb-4 leading-tight">
        Voto Podre
      </h1>
      <p class="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
        Transparência é a arma do cidadão. Aqui você descobre quais deputados
        votaram <strong class="text-red-300">contra o seu futuro</strong>.
        Nunca mais os esqueça na hora de votar.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <RouterLink
          to="/pautas-podres"
          class="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-lg transition"
        >
          Ver Pautas Podres
        </RouterLink>
        <RouterLink
          to="/deputados"
          class="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-lg transition"
        >
          Ver Deputados
        </RouterLink>
      </div>
    </section>

    <!-- Statistics -->
    <section class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
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
    <section class="bg-red-950 border border-red-700 rounded-xl p-8 text-center mb-16">
      <h2 class="text-2xl font-bold text-red-300 mb-3">
        Nunca esqueça quem votou contra o seu futuro.
      </h2>
      <p class="text-zinc-300 leading-relaxed max-w-2xl mx-auto">
        Cada voto podre é uma escolha deliberada de um parlamentar em prejudicar
        trabalhadores, mulheres, os mais vulneráveis e a democracia brasileira.
        Guarde esses nomes. Compartilhe com sua família. Leve essa informação
        para as urnas.
      </p>
    </section>

    <!-- Messages -->
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
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
