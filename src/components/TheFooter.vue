<template>
  <footer class="bg-white border-t border-zinc-200 dark:bg-black dark:border-zinc-800 mt-auto">
    <div class="max-w-5xl mx-auto px-4 py-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <p class="text-zinc-500 text-xs leading-relaxed text-center sm:text-left">
        Desenvolvido por
        <a
          href="https://gabcvit.dev/"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-zinc-900 hover:text-red-500 transition-colors dark:text-white dark:hover:text-red-500"
        >gabcvit</a>.
        Todos os dados são públicos e provenientes da
        <a
          href="https://dadosabertos.camara.leg.br/"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-zinc-900 hover:text-red-500 transition-colors dark:text-white dark:hover:text-red-500"
        >API aberta da Câmara dos Deputados</a>.
      </p>

      <nav aria-label="Links de política" class="flex items-center gap-5 flex-shrink-0">
        <RouterLink
          to="/privacidade"
          class="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Privacidade
        </RouterLink>
        <RouterLink
          to="/termos"
          class="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Termos de Uso
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>
