import { mount, RouterLinkStub } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import DeputadoDetailsView from '@/views/DeputadoDetailsView.vue'
import type { Deputado, Pauta } from '@/types'

const routeState = vi.hoisted(() => ({ params: { id: '77' } }))
const backSpy = vi.hoisted(() => vi.fn())
const generateSpy = vi.hoisted(() => vi.fn())
const mockedData = vi.hoisted(() => ({
  deputados: [
    {
      id: 77,
      uri: 'https://www.camara.leg.br/deputados/77',
      nome: 'Marina Alves',
      siglaPartido: 'PSB',
      uriPartido: 'https://www.camara.leg.br/partidos/psb',
      siglaUf: 'BA',
      idLegislatura: 57,
      urlFoto: 'https://example.com/marina.jpg',
      email: 'marina@camara.leg.br',
      redeSocial: [
        'https://instagram.com/marina',
        'https://facebook.com/marina',
        'https://youtube.com/@marina',
        'https://x.com/marina',
        'ftp://invalid.example.com',
        'https://bsky.app/profile/marina',
      ],
    },
  ] as Deputado[],
  pautas: [
    {
      id: 1,
      nome: 'Pauta Negativa',
      descricao: 'Descricao da pauta negativa.',
      urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/1/votos',
      urlProposicao: 'https://www.camara.leg.br/proposicoes/1',
      idsDeputadosPodres: [77],
      tipo: 'negativa',
      temas: ['democracia'],
    },
    {
      id: 2,
      nome: 'Pauta Positiva',
      descricao: 'Descricao da pauta positiva.',
      urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/2/votos',
      urlProposicao: 'https://www.camara.leg.br/proposicoes/2',
      idsDeputadosPodres: [77],
      tipo: 'positiva',
      temas: ['saúde'],
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

describe('DeputadoDetailsView', () => {
  beforeEach(() => {
    routeState.params.id = '77'
    backSpy.mockReset()
    generateSpy.mockReset()
  })

  it('renders supported social links, split pauta lists and sharing', async () => {
    const wrapper = mount(DeputadoDetailsView, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const socialSection = wrapper.get('section')

    expect(socialSection.text()).toContain('Instagram')
    expect(socialSection.text()).toContain('Facebook')
    expect(socialSection.text()).toContain('YouTube')
    expect(socialSection.text()).toContain('X / Twitter')
    expect(socialSection.text()).not.toContain('bsky')
    expect(wrapper.text()).toContain('Pautas Podres apoiadas')
    expect(wrapper.text()).toContain('Pautas Positivas negadas')

    await wrapper.findAll('button').find((button) => button.text().includes('Compartilhar'))!.trigger('click')

    expect(generateSpy).toHaveBeenCalledWith({
      mode: 'deputado',
      deputado: mockedData.deputados[0],
      pautas: mockedData.pautas,
    })
  })

  it('shows a fallback state when the deputy does not exist', async () => {
    routeState.params.id = '999'

    const wrapper = mount(DeputadoDetailsView, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.text()).toContain('Deputado não encontrado.')

    await wrapper.get('button').trigger('click')

    expect(backSpy).toHaveBeenCalledTimes(1)
  })
})
