import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Deputado, Pauta } from '@/types'

export type SortOrder = 'desc' | 'asc'

export const SORT_OPTIONS = [
  { value: 'desc' as SortOrder, label: 'Mais votos podres primeiro' },
  { value: 'asc' as SortOrder, label: 'Menos votos podres primeiro' },
] as const

export function useDeputadosFilters(
  deputados: Ref<Deputado[]>,
  pautas: Ref<Pauta[]>,
) {
  const searchQuery = ref('')
  const partidoFilter = ref('')
  const ufFilter = ref('')
  const minPautaComVotoPodre = ref(0)
  const sortOrder = ref<SortOrder>('desc')

  function podreCountFor(id: number): number {
    return pautas.value.filter(p => p.idsDeputadosPodres.includes(id)).length
  }

  const availablePartidos = computed<string[]>(() =>
    [...new Set(deputados.value.map(d => d.siglaPartido))].sort(),
  )

  const availableUfs = computed<string[]>(() =>
    [...new Set(deputados.value.map(d => d.siglaUf))].sort(),
  )

  function matchesSearch(d: Deputado): boolean {
    if (!searchQuery.value.trim()) return true
    return d.nome.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
  }

  function matchesPartido(d: Deputado): boolean {
    if (!partidoFilter.value) return true
    return d.siglaPartido === partidoFilter.value
  }

  function matchesUf(d: Deputado): boolean {
    if (!ufFilter.value) return true
    return d.siglaUf === ufFilter.value
  }

  function matchesMinPautas(d: Deputado): boolean {
    if (minPautaComVotoPodre.value <= 0) return true
    return podreCountFor(d.id) >= minPautaComVotoPodre.value
  }

  const filteredDeputados = computed<Deputado[]>(() => {
    const filtered = deputados.value
      .filter(matchesSearch)
      .filter(matchesPartido)
      .filter(matchesUf)
      .filter(matchesMinPautas)

    return [...filtered].sort((a, b) => {
      const diff = podreCountFor(a.id) - podreCountFor(b.id)
      return sortOrder.value === 'desc' ? -diff : diff
    })
  })

  const hasActiveFilters = computed<boolean>(() =>
    searchQuery.value.trim() !== '' ||
    partidoFilter.value !== '' ||
    ufFilter.value !== '' ||
    minPautaComVotoPodre.value > 0,
  )

  function resetFilters(): void {
    searchQuery.value = ''
    partidoFilter.value = ''
    ufFilter.value = ''
    minPautaComVotoPodre.value = 0
  }

  return {
    searchQuery,
    partidoFilter,
    ufFilter,
    minPautaComVotoPodre,
    sortOrder,
    availablePartidos,
    availableUfs,
    filteredDeputados,
    hasActiveFilters,
    resetFilters,
  }
}
