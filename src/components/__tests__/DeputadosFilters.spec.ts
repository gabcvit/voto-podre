import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DeputadosFilters from '@/components/DeputadosFilters.vue'

describe('DeputadosFilters', () => {
  it('emits updates for every filter input and sort option', async () => {
    const wrapper = mount(DeputadosFilters, {
      props: {
        searchQuery: '',
        partidoFilter: '',
        ufFilter: '',
        minPautaComVotoPodre: 0,
        sortOrder: 'desc',
        availablePartidos: ['PSOL', 'PT'],
        availableUfs: ['RJ', 'SP'],
        hasActiveFilters: true,
      },
    })

    await wrapper.get('#filter-search').setValue('Ana')
    await wrapper.get('#filter-partido').setValue('PT')
    await wrapper.get('#filter-uf').setValue('SP')
    await wrapper.get('#filter-min-pautas').setValue('2')
    await wrapper.get('button[aria-pressed="false"]').trigger('click')
    await wrapper.get('button.text-red-500').trigger('click')

    expect(wrapper.emitted('update:searchQuery')?.[0]).toEqual(['Ana'])
    expect(wrapper.emitted('update:partidoFilter')?.[0]).toEqual(['PT'])
    expect(wrapper.emitted('update:ufFilter')?.[0]).toEqual(['SP'])
    expect(wrapper.emitted('update:minPautaComVotoPodre')?.[0]).toEqual([2])
    expect(wrapper.emitted('update:sortOrder')?.[0]).toEqual(['asc'])
    expect(wrapper.emitted('reset')).toHaveLength(1)
  })

  it('hides optional controls when disabled', () => {
    const wrapper = mount(DeputadosFilters, {
      props: {
        searchQuery: '',
        partidoFilter: '',
        ufFilter: '',
        minPautaComVotoPodre: 0,
        sortOrder: 'desc',
        availablePartidos: [],
        availableUfs: [],
        hasActiveFilters: false,
        showSortOrder: false,
        showMinPautas: false,
      },
    })

    expect(wrapper.text()).not.toContain('Ordenar por')
    expect(wrapper.text()).not.toContain('Mín. votos podres')
    expect(wrapper.text()).not.toContain('Limpar filtros')
  })
})
