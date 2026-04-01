import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PautasList from '@/components/PautasList.vue'
import { makePauta } from '@/test/fixtures'

describe('PautasList', () => {
  it('renders pauta type labels, theme badges and truncated descriptions', () => {
    const longDescription = 'a'.repeat(305)

    const wrapper = mount(PautasList, {
      props: {
        pautas: [
          makePauta({ id: 1, nome: 'Pauta Negativa', descricao: longDescription, tipo: 'negativa', temas: ['democracia'] }),
          makePauta({ id: 2, nome: 'Pauta Positiva', descricao: 'Descricao curta', tipo: 'positiva', temas: ['saúde'] }),
        ],
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const links = wrapper.findAllComponents(RouterLinkStub)

    expect(links).toHaveLength(2)
  expect(links[0]!.props('to')).toEqual({ name: 'PautaDetails', params: { id: 1 } })
    expect(wrapper.text()).toContain('PAUTA PODRE')
    expect(wrapper.text()).toContain('PAUTA POSITIVA')
    expect(wrapper.text()).toContain('democracia')
    expect(wrapper.text()).toContain('saúde')
    expect(wrapper.text()).toContain(`${'a'.repeat(300)}...`)
  })

  it('renders an empty state when there are no pautas', () => {
    const wrapper = mount(PautasList, {
      props: {
        pautas: [],
        showTitle: false,
      },
    })

    expect(wrapper.text()).toContain('Nenhum voto encontrado.')
  })
})
