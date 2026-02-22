import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PautaPodre } from '@/types'
import { PAUTAS_PODRES } from '@/data/pautasPodres'

export const usePautasPodresStore = defineStore('pautasPodres', () => {
  const pautasPodres = ref<Array<PautaPodre>>(PAUTAS_PODRES)

  return { pautasPodres }
})
