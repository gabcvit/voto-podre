import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseDeputado from '@/components/BaseDeputado.vue'
import { makeDeputado, makePauta } from '@/test/fixtures'

describe('BaseDeputado', () => {
  it('renders the list variant as a route link with flagged vote count', () => {
    const wrapper = mount(BaseDeputado, {
      props: {
        deputado: makeDeputado({ id: 7, nome: 'Joana Lima' }),
        pautas: [
          makePauta({ id: 101, idsDeputadosPodres: [7] }),
          makePauta({ id: 102, idsDeputadosPodres: [7, 99] }),
        ],
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const link = wrapper.getComponent(RouterLinkStub)

    expect(link.props('to')).toEqual({ name: 'DeputadoDetails', params: { id: 7 } })
    expect(wrapper.get('img').attributes('alt')).toBe('Foto de Joana Lima')
    expect(wrapper.text()).toContain('Joana Lima')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text().toLowerCase()).toContain('podre')
  })

  it('renders the card variant with profile links and without router navigation', () => {
    const wrapper = mount(BaseDeputado, {
      props: {
        deputado: makeDeputado({
          id: 8,
          nome: 'Carlos Rocha',
          uri: 'https://www.camara.leg.br/deputados/8',
          email: 'carlos.rocha@camara.leg.br',
        }),
        pautas: [],
        variant: 'card',
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(false)
    expect(wrapper.get('a[href="https://www.camara.leg.br/deputados/8"]').attributes('href')).toBe('https://www.camara.leg.br/deputados/8')
    expect(wrapper.get('a[href="mailto:carlos.rocha@camara.leg.br"]').attributes('href')).toBe('mailto:carlos.rocha@camara.leg.br')
    expect(wrapper.text().toLowerCase()).not.toContain('voto podre')
  })
})
