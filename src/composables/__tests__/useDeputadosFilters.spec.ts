import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useDeputadosFilters } from '@/composables/useDeputadosFilters'
import { makeDeputado, makePauta } from '@/test/fixtures'

describe('useDeputadosFilters', () => {
  const deputados = ref([
    makeDeputado({ id: 1, nome: 'Ana Silva', siglaPartido: 'PSOL', siglaUf: 'SP' }),
    makeDeputado({ id: 2, nome: 'Bruno Costa', siglaPartido: 'PT', siglaUf: 'RJ' }),
    makeDeputado({ id: 3, nome: 'Carla Souza', siglaPartido: 'PT', siglaUf: 'SP' }),
  ])

  const pautas = ref([
    makePauta({ id: 101, idsDeputadosPodres: [1, 2] }),
    makePauta({ id: 102, idsDeputadosPodres: [1] }),
    makePauta({ id: 103, idsDeputadosPodres: [3] }),
  ])

  it('lists available parties and UFs in sorted order', () => {
    const filters = useDeputadosFilters(deputados, pautas)

    expect(filters.availablePartidos.value).toEqual(['PSOL', 'PT'])
    expect(filters.availableUfs.value).toEqual(['RJ', 'SP'])
  })

  it('filters by search, party, UF and minimum flagged pauta count', () => {
    const filters = useDeputadosFilters(deputados, pautas)

    filters.searchQuery.value = 'ana'
    expect(filters.filteredDeputados.value.map((item) => item.id)).toEqual([1])

    filters.searchQuery.value = ''
    filters.partidoFilter.value = 'PT'
    expect(filters.filteredDeputados.value.map((item) => item.id)).toEqual([2, 3])

    filters.ufFilter.value = 'SP'
    expect(filters.filteredDeputados.value.map((item) => item.id)).toEqual([3])

    filters.partidoFilter.value = ''
    filters.minPautaComVotoPodre.value = 2
    expect(filters.filteredDeputados.value.map((item) => item.id)).toEqual([1])
  })

  it('sorts by podre count in both directions', () => {
    const filters = useDeputadosFilters(deputados, pautas)

    expect(filters.filteredDeputados.value.map((item) => item.id)).toEqual([1, 2, 3])

    filters.sortOrder.value = 'asc'
    expect(filters.filteredDeputados.value.map((item) => item.id)).toEqual([2, 3, 1])
  })

  it('tracks active filters and resets only filter inputs', () => {
    const filters = useDeputadosFilters(deputados, pautas)

    filters.searchQuery.value = 'bruno'
    filters.partidoFilter.value = 'PT'
    filters.ufFilter.value = 'RJ'
    filters.minPautaComVotoPodre.value = 1
    filters.sortOrder.value = 'asc'

    expect(filters.hasActiveFilters.value).toBe(true)

    filters.resetFilters()

    expect(filters.searchQuery.value).toBe('')
    expect(filters.partidoFilter.value).toBe('')
    expect(filters.ufFilter.value).toBe('')
    expect(filters.minPautaComVotoPodre.value).toBe(0)
    expect(filters.sortOrder.value).toBe('asc')
    expect(filters.hasActiveFilters.value).toBe(false)
  })
})
