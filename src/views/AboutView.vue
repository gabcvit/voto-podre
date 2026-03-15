<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <PageTitle
      title="Sobre o Voto Podre"
      subtitle="Transparência. Memória. Responsabilidade."
    />

    <section class="mb-10 border-b border-zinc-800 pb-10">
      <h2 class="text-xl font-black uppercase tracking-tight text-white mb-3" style="font-family: 'Syne', sans-serif;">O que é o Voto Podre?</h2>
      <p class="text-zinc-500 leading-relaxed text-sm">
        O <strong class="text-red-500 font-bold">Voto Podre</strong> é um projeto de
        transparência eleitoral que extrai dados públicos da Câmara dos Deputados
        e identifica parlamentares que votaram a favor de
        <em>"pautas podres"</em> — proposições impopulares que não melhoram a
        vida do povo brasileiro e, muitas vezes, retrocedem conquistas históricas.
      </p>
    </section>

    <section class="mb-10 border-b border-zinc-800 pb-10">
      <h2 class="text-xl font-black uppercase tracking-tight text-white mb-3" style="font-family: 'Syne', sans-serif;">Por que monitoramos o Congresso?</h2>
      <p class="text-zinc-500 leading-relaxed text-sm mb-4">
        Deputados são eleitos para representar o povo. Quando votam contra os
        interesses da população — seja criminalizando vítimas de estupro, seja
        beneficiando organizações criminosas ou a si mesmos — precisam ser responsabilizados.
      </p>
      <p class="text-zinc-500 leading-relaxed text-sm">
        Nosso objetivo é fornecer informações claras e acessíveis para auxiliar
        eleitores na escolha consciente de seus representantes nas próximas
        eleições, destacando votações consideradas prejudiciais aos interesses
        da população.
      </p>
    </section>

    <section class="mb-10 border-b border-zinc-800 pb-10">
      <h2 class="text-xl font-black uppercase tracking-tight text-white mb-3" style="font-family: 'Syne', sans-serif;">O que são as Pautas Podres?</h2>
      <p class="text-zinc-500 leading-relaxed text-sm">
        São proposições legislativas — como Propostas de Emenda à Constituição
        (PECs) — que, na análise deste projeto, representam retrocesso social,
        ofensa a direitos fundamentais ou benefício a grupos com interesses
        contrários ao bem-estar da população. Cada pauta é documentada com
        fontes oficiais da Câmara dos Deputados para completa verificação.
      </p>
    </section>

    <section class="mb-10 border-b border-zinc-800 pb-10">
      <h2 class="text-xl font-black uppercase tracking-tight text-white mb-3" style="font-family: 'Syne', sans-serif;">Como usar este site</h2>
      <ol class="space-y-3 text-sm">
        <li class="flex items-start gap-3">
          <span class="text-xs font-black text-red-500 w-5 flex-shrink-0 pt-0.5">01</span>
          <span class="text-zinc-500">Consulte a lista de <RouterLink to="/pautas-podres" class="text-white font-bold hover:text-red-500 transition-colors">Pautas Podres</RouterLink> para entender cada votação problemática.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-xs font-black text-red-500 w-5 flex-shrink-0 pt-0.5">02</span>
          <span class="text-zinc-500">Veja quais <RouterLink to="/deputados" class="text-white font-bold hover:text-red-500 transition-colors">Deputados</RouterLink> apoiaram essas pautas.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-xs font-black text-red-500 w-5 flex-shrink-0 pt-0.5">03</span>
          <span class="text-zinc-500">Leve essa informação para as urnas — não vote em quem votou contra você.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-xs font-black text-red-500 w-5 flex-shrink-0 pt-0.5">04</span>
          <span class="text-zinc-500">Compartilhe com amigos, familiares e colegas. Informação é poder.</span>
        </li>
      </ol>
    </section>

    <section class="border-l-2 border-red-500 pl-5 py-1 mb-10">
      <h2 class="text-xs font-black uppercase tracking-widest text-red-500 mb-2">Aviso</h2>
      <p class="text-zinc-500 text-sm leading-relaxed">
        Este projeto reflete uma perspectiva crítica das políticas governamentais
        e busca promover engajamento eleitoral informado. Todos os dados
        apresentados são públicos e provenientes de fontes oficiais da
        Câmara dos Deputados do Brasil.
      </p>
    </section>

    <section>
      <p class="text-zinc-700 text-xs uppercase tracking-widest">
        Dados extraídos da
        <a
          href="https://dadosabertos.camara.leg.br/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-zinc-500 hover:text-white transition-colors"
        >API de Dados Abertos da Câmara dos Deputados</a>.
      </p>
    </section>

  </div>
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue';
</script>
