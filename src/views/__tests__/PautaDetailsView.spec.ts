import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import BaseDeputado from '@/components/BaseDeputado.vue'
import PartyStatsChart from '@/components/PartyStatsChart.vue'
import PautaDetailsView from '@/views/PautaDetailsView.vue'
import type { Deputado, Pauta } from '@/types'

const routeState = vi.hoisted(() => ({ params: { id: '1' } }))
const backSpy = vi.hoisted(() => vi.fn())
const generateSpy = vi.hoisted(() => vi.fn())
const mockedData = vi.hoisted(() => ({
  deputados: [
    {
      id: 1,
      uri: 'https://www.camara.leg.br/deputados/1',
      nome: 'Ana Silva',
      siglaPartido: 'PT',
      uriPartido: 'https://www.camara.leg.br/partidos/pt',
      siglaUf: 'SP',
      idLegislatura: 57,
      urlFoto: 'https://example.com/ana.jpg',
      email: 'ana@camara.leg.br',
      redeSocial: [],
    },
    {
      id: 2,
      uri: 'https://www.camara.leg.br/deputados/2',
      nome: 'Bruno Costa',
      siglaPartido: 'PL',
      uriPartido: 'https://www.camara.leg.br/partidos/pl',
      siglaUf: 'RJ',
      idLegislatura: 57,
      urlFoto: 'https://example.com/bruno.jpg',
      email: 'bruno@camara.leg.br',
      redeSocial: [],
    },
    {
      id: 3,
      uri: 'https://www.camara.leg.br/deputados/3',
      nome: 'Carla Souza',
      siglaPartido: 'PT',
      uriPartido: 'https://www.camara.leg.br/partidos/pt',
      siglaUf: 'SP',
      idLegislatura: 57,
      urlFoto: 'https://example.com/carla.jpg',
      email: 'carla@camara.leg.br',
      redeSocial: [],
    },
  ] as Deputado[],
  pautas: [
    {
      id: 1,
      nome: 'Pauta Teste Negativa',
      descricao: 'Descricao longa da pauta negativa.',
      urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/1/votos',
      urlProposicao: 'https://www.camara.leg.br/proposicoes/1',
      idsDeputadosPodres: [1, 3],
      tipo: 'negativa',
      temas: ['democracia'],
      explicacao: 'Explicacao editorial da pauta negativa.',
      referencias: [
        {
          title: 'Referencia importante',
          source: 'Fonte teste',
          url: 'https://example.com/referencia',
        },
      ],
    },
    {
      id: 2,
      nome: 'Pauta Teste Positiva',
      descricao: 'Descricao longa da pauta positiva.',
      urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/2/votos',
      urlProposicao: 'https://www.camara.leg.br/proposicoes/2',
      idsDeputadosPodres: [2],
      tipo: 'positiva',
      temas: ['saúde'],
      explicacao: 'Explicacao editorial da pauta positiva.',
      referencias: [],
    },
  ] as Pauta[],
}))

vi.mock('vue-router', async () => {
  const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
  return {
    ...actual,
    useRoute: () => routeState,
    useRouter: () => ({ back: backSpy }),
  }
})

vi.mock('@/data/deputados', () => ({
  TODOS_DEPUTADOS: { dados: mockedData.deputados },
}))

vi.mock('@/data/pautas', () => ({
  PAUTAS: mockedData.pautas,
}))

vi.mock('@/composables/useMeta', () => ({
  useMeta: vi.fn(),
}))

vi.mock('@/composables/useShareImage', async () => {
  const { ref } = await import('vue')
  return {
    useShareImage: () => ({ generating: ref(false), generate: generateSpy }),
  }
})

describe('PautaDetailsView', () => {
  beforeEach(() => {
    routeState.params.id = '1'
    backSpy.mockReset()
    generateSpy.mockReset()
  })

  it('renders references, share flows and tab switching for a pauta', async () => {
    const wrapper = mount(PautaDetailsView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          TransitionGroup: { template: '<div><slot /></div>' },
        },
      },
    })

    expect(wrapper.text()).toContain('Pauta Teste Negativa')
    expect(wrapper.text()).toContain('Pauta Podre')
    expect(wrapper.text()).not.toContain('Referencia importante')

    await wrapper.get('button[type="button"]').trigger('click')
    expect(wrapper.text()).toContain('Referencia importante')

    await wrapper.findAll('button').find((button) => button.text().includes('Compartilhar'))!.trigger('click')
    await wrapper.findAll('button').find((button) => button.text().includes('Por partido'))!.trigger('click')

    expect(generateSpy).toHaveBeenCalledWith({
      mode: 'pauta',
      pauta: mockedData.pautas[0],
      deputadosCount: 2,
      topParties: [{ sigla: 'PT', count: 2 }],
    })

    await wrapper.findAll('button').find((button) => button.text().includes('Compartilhar'))!.trigger('click')
    await wrapper.findAll('button').find((button) => button.text().includes('Por estado'))!.trigger('click')
    await wrapper.get('select').setValue('SP')
    await wrapper.findAll('button').find((button) => button.text().includes('Gerar imagem'))!.trigger('click')

    expect(generateSpy).toHaveBeenLastCalledWith({
      mode: 'pauta-by-uf',
      pauta: mockedData.pautas[0],
      uf: 'SP',
      deputadosCount: 2,
      deputadoItems: [
        { nome: 'Ana Silva', siglaPartido: 'PT' },
        { nome: 'Carla Souza', siglaPartido: 'PT' },
      ],
    })

    expect(wrapper.findAllComponents(BaseDeputado)).toHaveLength(2)
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs).toHaveLength(2)
    await tabs[1]!.trigger('click')
    expect(wrapper.findComponent(PartyStatsChart).exists()).toBe(true)
  })

  it('uses the positive wording for pautas flagged by no votes', () => {
    routeState.params.id = '2'

    const wrapper = mount(PautaDetailsView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          TransitionGroup: { template: '<div><slot /></div>' },
        },
      },
    })

    expect(wrapper.text()).toContain('Pauta Positiva')
    expect(wrapper.text()).toContain('que votaram contra')
  })

  it('shows a fallback state when the pauta does not exist', async () => {
    routeState.params.id = '999'

    const wrapper = mount(PautaDetailsView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.text()).toContain('Pauta não encontrada.')

    await wrapper.get('button').trigger('click')

    expect(backSpy).toHaveBeenCalledTimes(1)
  })
})
