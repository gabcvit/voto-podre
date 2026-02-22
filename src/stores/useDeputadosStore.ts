import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Deputado } from '@/types'
import { TODOS_DEPUTADOS } from '@/data/deputados'

export const useDeputadosStore = defineStore('deputados', () => {
  const deputados = ref<Array<Deputado>>(TODOS_DEPUTADOS.dados)

  return { deputados }
})
