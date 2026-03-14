<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <PageTitle
      title="Sobre o Voto Podre"
      subtitle="Transparência. Memória. Responsabilidade."
    />

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-3">O que é o Voto Podre?</h2>
      <p class="text-zinc-300 leading-relaxed">
        O <strong class="text-red-300">Voto Podre</strong> é um projeto de
        transparência eleitoral que extrai dados públicos da Câmara dos Deputados
        e identifica parlamentares que votaram a favor de
        <em>"pautas podres"</em> — proposições impopulares que não melhoram a
        vida do povo brasileiro e, muitas vezes, retrocedem conquistas históricas.
      </p>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-3">Por que monitoramos o Congresso?</h2>
      <p class="text-zinc-300 leading-relaxed mb-4">
        Deputados são eleitos para representar o povo. Quando votam contra os
        interesses da população — seja criminalizando vítimas de estupro, seja
        beneficiando organizações criminosas ou a si mesmos — precisam ser responsabilizados.
      </p>
      <p class="text-zinc-300 leading-relaxed">
        Nosso objetivo é fornecer informações claras e acessíveis para auxiliar
        eleitores na escolha consciente de seus representantes nas próximas
        eleições, destacando votações consideradas prejudiciais aos interesses
        da população.
      </p>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-3">O que são as Pautas Podres?</h2>
      <p class="text-zinc-300 leading-relaxed">
        São proposições legislativas — como Propostas de Emenda à Constituição
        (PECs) — que, na análise deste projeto, representam retrocesso social,
        ofensa a direitos fundamentais ou benefício a grupos com interesses
        contrários ao bem-estar da população. Cada pauta é documentada com
        fontes oficiais da Câmara dos Deputados para completa verificação.
      </p>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-3">Como usar este site</h2>
      <ol class="list-decimal list-inside space-y-2 text-zinc-300">
        <li>Consulte a lista de <RouterLink to="/pautas-podres" class="text-red-400 underline hover:text-red-300">Pautas Podres</RouterLink> para entender cada votação problemática.</li>
        <li>Veja quais <RouterLink to="/deputados" class="text-red-400 underline hover:text-red-300">Deputados</RouterLink> apoiaram essas pautas.</li>
        <li>Leve essa informação para as urnas — não vote em quem votou contra você.</li>
        <li>Compartilhe com amigos, familiares e colegas. Informação é poder.</li>
      </ol>
    </section>

    <section class="bg-red-950 border border-red-700 rounded-xl p-6 mb-10">
      <h2 class="text-xl font-bold text-red-300 mb-2">Aviso</h2>
      <p class="text-zinc-300 leading-relaxed">
        Este projeto reflete uma perspectiva crítica das políticas governamentais
        e busca promover engajamento eleitoral informado. Todos os dados
        apresentados são públicos e provenientes de fontes oficiais da
        Câmara dos Deputados do Brasil.
      </p>
    </section>

    <section class="text-center">
      <p class="text-zinc-400 text-sm">
        Dados extraídos da
        <a
          href="https://dadosabertos.camara.leg.br/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-red-400 underline hover:text-red-300"
        >API de Dados Abertos da Câmara dos Deputados</a>.
      </p>
    </section>

  </div>
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue';
</script>
