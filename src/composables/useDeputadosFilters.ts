import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Deputado, Pauta } from '@/types'

export type StatusFilter = 'all' | 'podres' | 'clean'

export const STATUS_OPTIONS = [
  { value: 'all' as StatusFilter, label: 'Todos' },
  { value: 'podres' as StatusFilter, label: 'Somente podres' },
  { value: 'clean' as StatusFilter, label: 'Somente limpos' },
] as const

export function useDeputadosFilters(
  deputados: Ref<Deputado[]>,
  pautas: Ref<Pauta[]>,
) {
  const searchQuery = ref('')
  const statusFilter = ref<StatusFilter>('all')
  const partidoFilter = ref('')
  const ufFilter = ref('')
  const minPautaComVotoPodre = ref(0)

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

  function matchesStatus(d: Deputado): boolean {
    const count = podreCountFor(d.id)
    if (statusFilter.value === 'podres') return count > 0
    if (statusFilter.value === 'clean') return count === 0
    return true
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

  const filteredDeputados = computed<Deputado[]>(() =>
    deputados.value
      .filter(matchesSearch)
      .filter(matchesStatus)
      .filter(matchesPartido)
      .filter(matchesUf)
      .filter(matchesMinPautas),
  )

  const hasActiveFilters = computed<boolean>(() =>
    searchQuery.value.trim() !== '' ||
    statusFilter.value !== 'all' ||
    partidoFilter.value !== '' ||
    ufFilter.value !== '' ||
    minPautaComVotoPodre.value > 0,
  )

  function resetFilters(): void {
    searchQuery.value = ''
    statusFilter.value = 'all'
    partidoFilter.value = ''
    ufFilter.value = ''
    minPautaComVotoPodre.value = 0
  }

  return {
    searchQuery,
    statusFilter,
    partidoFilter,
    ufFilter,
    minPautaComVotoPodre,
    availablePartidos,
    availableUfs,
    filteredDeputados,
    hasActiveFilters,
    resetFilters,
  }
}
