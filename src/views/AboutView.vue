<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <PageTitle
      title="Sobre o Voto Podre"
      subtitle="Transparência. Memória. Responsabilidade."
    />

    <section class="mb-10 border-b border-zinc-200 pb-10 dark:border-zinc-800 c">
      <p class="text-zinc-500 leading-relaxed text-md">
        O <strong class="text-red-500 font-bold">Voto Podre</strong> é uma ferramenta de
        memória coletiva e transparência de classe. Ele extrai dados públicos da Câmara dos Deputados
        e expõe quais parlamentares votaram contra os trabalhadores
        — retrocedem conquistas históricas arrancadas com organização, greve e luta nas ruas,
        não com benevolência do Estado.
      </p>
    </section>

    <section class="mb-10 border-b border-zinc-200 pb-10 dark:border-zinc-800 animate-fade-in-up" style="animation-delay: 100ms">
      <h2 class="text-xl font-black uppercase tracking-tight text-zinc-900 mb-3 dark:text-white" style="font-family: 'Syne', sans-serif;">Por que monitoramos o Congresso?</h2>
      <p class="text-zinc-500 leading-relaxed text-md mb-4">
        Nenhuma conquista da classe trabalhadora foi dada de presente pelo parlamento.
        Direitos trabalhistas, reforma agrária, acesso à saúde e à educação —
        tudo foi resultado de organização coletiva, pressão das ruas, sindicatos e movimentos populares.
        O Congresso costuma responder à correlação de forças, não à consciência individual.
      </p>
      <p class="text-zinc-500 leading-relaxed text-md">
        Mas quando deputados ignoram completamente o que acontece nas ruas e votam abertamente
        contra trabalhadores, camponeses, mulheres e povos originários, precisam ser nomeados e cobrados.
        Este projeto fornece essa memória — para que movimentos, sindicatos e eleitores
        saibam exatamente com quem não podem contar.
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
            Uma proposta que representa ataque direto a direitos conquistados na luta trabalhista, criminalização de movimentos sociais,
            entrega de território e recursos naturais ao capital, ou blindagem de quem explora e oprime.
            Os deputados listados nessa pauta votaram <strong class="text-zinc-900 dark:text-white">a favor</strong> dela.
          </p>
        </div>
        <div class="border-l-2 border-green-500 pl-4 py-1">
          <span class="text-xs font-black uppercase tracking-widest text-green-500 block mb-1">Pauta Positiva</span>
          <p class="text-zinc-500 leading-relaxed text-md">
            Uma proposta que avança direitos, protege populações vulneráveis ou cria obrigações concretas para o Estado.
            Os deputados listados nessa pauta votaram <strong class="text-zinc-900 dark:text-white">contra</strong> ela —
            escolheram o retrocesso quando tinham a chance de mudar.
          </p>
        </div>
      </div>
    </section>

    <section class="mb-10 border-b border-zinc-200 pb-10 dark:border-zinc-800 animate-fade-in-up" style="animation-delay: 300ms">
      <h2 class="text-xl font-black uppercase tracking-tight text-zinc-900 mb-3 dark:text-white" style="font-family: 'Syne', sans-serif;">Como usar este site</h2>
      <ol class="space-y-3 text-md">
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">01</span>
          <span class="text-zinc-500"><strong class="text-zinc-900 dark:text-white">Organize-se.</strong> Sindicatos, associações de moradores, coletivos, movimentos do campo e da cidade — a luta coletiva transforma estruturas. Nenhuma urna faz isso sozinha.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">02</span>
          <span class="text-zinc-500">Consulte a lista de <RouterLink to="/pautas-podres" class="text-zinc-900 font-bold hover:text-red-500 transition-colors dark:text-white">Pautas</RouterLink> para entender o que está em jogo em cada votação.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">03</span>
          <span class="text-zinc-500">Veja quais <RouterLink to="/deputados" class="text-zinc-900 font-bold hover:text-red-500 transition-colors dark:text-white">Deputados</RouterLink> votaram contra os trabalhadores — e quais ao menos acompanharam o que acontecia nas ruas.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">04</span>
          <span class="text-zinc-500">Use essa informação nas urnas — sem ilusão, mas sem abrir mão de nenhuma frente de disputa. Votar em quem respeita a luta popular é parte da estratégia, não o fim dela.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-md font-black text-red-500 w-5 flex-shrink-0 pt-0.5">05</span>
          <span class="text-zinc-500">Compartilhe com o seu movimento, sindicato, grupo e comunidade. Memória coletiva é arma política.</span>
        </li>
      </ol>
    </section>

    <section class="border-l-2 border-red-500 pl-5 py-1 mb-10 animate-fade-in-up" style="animation-delay: 400ms">
      <h2 class="text-md font-black uppercase tracking-widest text-red-500 mb-2">Posicionamento</h2>
      <p class="text-zinc-500 text-md leading-relaxed">
        Este projeto tem perspectiva de classe: defende os interesses dos trabalhadores,
        dos povos da terra, dos oprimidos. Não pretende ser neutro — neutralidade
        diante da exploração é cumplicidade. Os registros de votação e as informações dos deputados são públicos, obtidos da API oficial da Câmara dos Deputados do Brasil e verificáveis por qualquer pessoa. As descrições das pautas são análises editoriais da equipe do Voto Podre — texto independente, com perspectiva de classe declarada.
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
  description: 'Sobre o Voto Podre — ferramenta de memória coletiva que expõe deputados que votaram contra trabalhadores e movimentos populares no Brasil.',

  canonicalPath: '/sobre',
});
</script>
