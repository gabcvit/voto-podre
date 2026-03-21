import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pauta } from '@/types'
import { PAUTAS } from '@/data/pautas'

export const usePautasStore = defineStore('pautas', () => {
  const pautas = ref<Array<Pauta>>(PAUTAS)

  return { pautas }
})
