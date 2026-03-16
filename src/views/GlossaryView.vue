<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <PageTitle
      title="Glossário"
      subtitle="Termos do Congresso explicados em linguagem simples."
    />

    <section class="mb-10 border-l-2 border-red-500 pl-5 py-1">
      <p class="text-zinc-500 text-md leading-relaxed">
        Esta página reúne expressões que aparecem no Voto Podre e em votações da Câmara.
        A ideia é facilitar a leitura para quem não acompanha política institucional todos os dias.
      </p>
    </section>

    <section class="space-y-8">
      <article
        v-for="item in terms"
        :key="item.term"
        class="border-b border-zinc-200 pb-6 dark:border-zinc-800"
      >
        <h2
          class="text-xl font-black uppercase tracking-tight text-zinc-900 mb-2 dark:text-white"
          style="font-family: 'Syne', sans-serif;"
        >
          {{ item.term }}
        </h2>
        <p class="text-zinc-500 leading-relaxed text-md">
          {{ item.description }}
        </p>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue';
import { useMeta } from '@/composables/useMeta';

const terms = [
  {
    term: 'PEC',
    description:
      'Sigla para Proposta de Emenda à Constituição. É uma proposta para mudar o texto da Constituição Federal. Em geral, exige regras de votação mais rígidas que um projeto de lei comum.',
  },
  {
    term: 'PL',
    description:
      'Sigla para Projeto de Lei. Cria ou altera leis que não são parte da Constituição. Depois de aprovado no Congresso e sancionado, vira lei.',
  },
  {
    term: 'Pauta',
    description:
      'No site, “pauta” é uma proposta legislativa monitorada pelo projeto. Pode ser uma PEC, um PL ou outro tipo de votação considerada relevante.',
  },
  {
    term: 'Proposição',
    description:
      'Nome técnico para qualquer matéria em tramitação no Congresso, como PEC, PL, requerimento e outros instrumentos legislativos.',
  },
  {
    term: 'Votação nominal',
    description:
      'Tipo de votação em que o voto de cada deputado fica registrado individualmente. É isso que permite saber quem votou “Sim”, “Não” ou se ausentou.',
  },
  {
    term: 'Deputado federal',
    description:
      'Parlamentar eleito para a Câmara dos Deputados. Atua na elaboração e votação de leis federais e na fiscalização do Poder Executivo.',
  },
  {
    term: 'Legislatura',
    description:
      'Período de 4 anos de funcionamento do Congresso após as eleições. Cada legislatura reúne os parlamentares eleitos para aquele ciclo.',
  },
  {
    term: 'Partido (sigla)',
    description:
      'Partido político ao qual o deputado está filiado. No site, aparece em forma de sigla, como PT, PSOL, PL, MDB, entre outras.',
  },
  {
    term: 'UF',
    description:
      'Unidade Federativa, ou seja, o estado que o deputado representa. Exemplo: SP, RJ, BA, RS.',
  },
  {
    term: 'Câmara dos Deputados',
    description:
      'Uma das casas do Congresso Nacional. É a principal fonte dos dados exibidos no Voto Podre, por meio da API oficial de Dados Abertos.',
  },
  {
    term: 'API de Dados Abertos',
    description:
      'Serviço público que disponibiliza dados em formato digital para consulta automática. O Voto Podre usa a API da Câmara para obter votações e informações de deputados.',
  },
  {
    term: 'Pauta podre / pauta positiva',
    description:
      'Classificação editorial do projeto. Em pauta podre, votar “Sim” é considerado voto podre. Em pauta positiva, votar “Não” é considerado voto podre.',
  },
] as const;

useMeta({
  title: 'Glossário',
  description:
    'Glossário do Voto Podre com explicações simples de termos como PEC, PL, pauta, proposição e outros conceitos usados no Congresso Nacional.',
  canonicalPath: '/glossario',
});
</script>
