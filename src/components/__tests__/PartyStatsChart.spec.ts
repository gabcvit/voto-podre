import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PartyStatsChart from '@/components/PartyStatsChart.vue'
import { makeDeputado } from '@/test/fixtures'

describe('PartyStatsChart', () => {
  it('aggregates and sorts deputies by party', () => {
    const wrapper = mount(PartyStatsChart, {
      props: {
        deputados: [
          makeDeputado({ id: 1, siglaPartido: 'PT' }),
          makeDeputado({ id: 2, siglaPartido: 'PSOL' }),
          makeDeputado({ id: 3, siglaPartido: 'PT' }),
        ],
      },
    })

    const rows = wrapper.findAll('div[class*="gap-3"]')

    expect(wrapper.text()).toContain('PT')
    expect(wrapper.text()).toContain('PSOL')
    expect(rows[0].text()).toContain('PT')
    expect(wrapper.findAll('.bg-red-500')[0].attributes('style')).toContain('width: 100%')
    expect(wrapper.findAll('.bg-red-500')[1].attributes('style')).toContain('width: 50%')
  })

  it('renders the provided empty label', () => {
    const wrapper = mount(PartyStatsChart, {
      props: {
        deputados: [],
        emptyLabel: 'Sem deputados neste recorte.',
      },
    })

    expect(wrapper.text()).toContain('Sem deputados neste recorte.')
  })
})
