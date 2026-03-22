<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <PageTitle
      title="Sobre o Voto Podre"
      subtitle="Transparência. Memória. Responsabilidade."
    />

    <section class="mb-10 border-b border-zinc-200 pb-10 dark:border-zinc-800 c">
      <p class="text-zinc-500 leading-relaxed text-md">
        O <strong class="text-red-500 font-bold">Voto Podre</strong> é uma ferramenta de
        transparência e memória eleitoral. Ele reúne dados públicos da Câmara dos Deputados
        e registra como parlamentares votaram nas proposições que afetam trabalhadores,
        mulheres, povos indígenas, meio ambiente e serviços públicos essenciais.
      </p>
    </section>

    <section class="mb-10 border-b border-zinc-200 pb-10 dark:border-zinc-800 animate-fade-in-up" style="animation-delay: 100ms">
      <h2 class="text-xl font-black uppercase tracking-tight text-zinc-900 mb-3 dark:text-white" style="font-family: 'Syne', sans-serif;">Por que monitoramos o Congresso?</h2>
      <p class="text-zinc-500 leading-relaxed text-md mb-4">
        O Congresso representa interesses variados — e nem sempre os que mais precisam de proteção
        são os que têm mais voz na política institucional. Direitos trabalhistas, acesso à saúde
        pública, proteção ambiental e demarcação de terras indígenas são conquistas que precisam
        de atenção constante, porque estão em permanente disputa no legislativo.
      </p>
      <p class="text-zinc-500 leading-relaxed text-md">
        Quando parlamentares votam contra o interesse de trabalhadores, mulheres, comunidades
        indígenas e do meio ambiente, é importante que os eleitores saibam. Este projeto fornece
        esse registro — para que qualquer cidadão possa verificar, com base em dados oficiais,
        qual foi o posicionamento concreto de cada deputado.
      </p>
    </section>

    <section class="mb-10 border-b border-zinc-200 pb-10 dark:border-zinc-800 animate-fade-in-up" style="animation-delay: 200ms">
      <h2 class="text-xl font-black uppercase tracking-tight text-zinc-900 mb-3 dark:text-white" style="font-family: 'Syne', sans-serif;">O que são as Pautas?</h2>
      <p class="text-zinc-500 leading-relaxed text-md mb-6">
        São proposições legislativas — Propostas de Emenda à Constituição (PECs),
        Projetos de Lei (PLs), Projetos de Lei Complementar (PLPs) e Medidas Provisórias (MPs)
        — cujos registros de votação revelam o posicionamento real de cada parlamentar.
        As votações são documentadas com fontes oficiais da Câmara e verificáveis por qualquer pessoa.
        As descrições são resumos editoriais da equipe do Voto Podre, em linguagem direta —
        para que qualquer pessoa possa entender o que estava em jogo, sem precisar de formação jurídica.
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

    <section class="mb-10 border-b border-zinc-200 pb-10 dark:border-zinc-800 animate-fade-in-up" style="animation-delay: 300ms">
      <h2 class="text-xl font-black uppercase tracking-tight text-zinc-900 mb-3 dark:text-white" style="font-family: 'Syne', sans-serif;">Como usar este site</h2>
      <ol class="space-y-3 text-md">
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">01</span>
          <span class="text-zinc-500"><strong class="text-zinc-900 dark:text-white">Participe.</strong> Associações de moradores, sindicatos, grupos locais e redes comunitárias fortalecem a democracia além do voto. A eleição é uma frente importante dessa participação, não a única.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">02</span>
          <span class="text-zinc-500">Consulte a lista de <RouterLink to="/pautas" class="text-zinc-900 font-bold hover:text-red-500 transition-colors dark:text-white">Pautas</RouterLink> para entender o que estava em jogo em cada votação monitorada.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">03</span>
          <span class="text-zinc-500">Veja quais <RouterLink to="/deputados" class="text-zinc-900 font-bold hover:text-red-500 transition-colors dark:text-white">Deputados</RouterLink> votaram nas pautas monitoradas e qual foi o posicionamento concreto de cada um.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">04</span>
          <span class="text-zinc-500">Use essas informações para escolher seus representantes com mais critério. O histórico de votações é um indicador concreto de como um parlamentar age quando a decisão importa.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">05</span>
          <span class="text-zinc-500">Compartilhe com amigos, familiares e sua comunidade. Quanto mais pessoas tiverem acesso a essas informações, mais saudável é o debate público.</span>
        </li>
      </ol>
    </section>

    <section class="border-l-2 border-red-500 pl-5 py-1 mb-10 animate-fade-in-up" style="animation-delay: 400ms">
      <h2 class="text-md font-black uppercase tracking-widest text-red-500 mb-2">Posicionamento</h2>
      <p class="text-zinc-500 text-md leading-relaxed">
        Este projeto tem perspectiva declarada: defende os interesses de trabalhadores,
        mulheres, povos indígenas, meio ambiente e serviços públicos. Não pretende ser neutro
        quanto a valores — mas os dados são rigorosamente baseados em registros oficiais.
        Os votos e informações dos deputados são obtidos da API pública da Câmara dos Deputados
        do Brasil e verificáveis por qualquer pessoa. As descrições das pautas são análises
        editoriais da equipe do Voto Podre, com essa perspectiva claramente declarada.
      </p>
    </section>

    <section class="animate-fade-in-up" style="animation-delay: 500ms">
      <p class="text-zinc-500 text-md uppercase tracking-widest dark:text-zinc-500 mb-2">
        Dados extraídos da
        <a
          href="https://dadosabertos.camara.leg.br/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-zinc-500 hover:text-zinc-900 transition-colors dark:hover:text-white"
        >API de Dados Abertos da Câmara dos Deputados</a>.
      </p>
      <p class="text-zinc-500 text-md uppercase tracking-widest dark:text-zinc-500">
        Acompanhe o projeto no
        <a
          href="https://www.instagram.com/voto.podre/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-zinc-500 hover:text-zinc-900 transition-colors dark:hover:text-white"
        >Instagram @voto.podre</a>.
      </p>
    </section>

  </div>
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue';
import { useMeta } from '@/composables/useMeta';

useMeta({
  title: 'Sobre',
  description: 'Sobre o Voto Podre — ferramenta de transparência eleitoral que registra como deputados federais votaram em pautas que afetam trabalhadores, mulheres, povos indígenas e meio ambiente.',

  canonicalPath: '/sobre',
});
</script>
