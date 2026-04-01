import type { Deputado, Pauta } from '@/types'

export function makeDeputado(overrides: Partial<Deputado> = {}): Deputado {
  return {
    id: 1,
    uri: 'https://www.camara.leg.br/deputados/1',
    nome: 'Ana Silva',
    siglaPartido: 'PSOL',
    uriPartido: 'https://www.camara.leg.br/partidos/psol',
    siglaUf: 'SP',
    idLegislatura: 57,
    urlFoto: 'https://example.com/ana.jpg',
    email: 'ana.silva@camara.leg.br',
    redeSocial: [],
    ...overrides,
  }
}

export function makePauta(overrides: Partial<Pauta> = {}): Pauta {
  return {
    id: 101,
    nome: 'Pauta de Teste',
    descricao: 'Descricao padrao para a pauta de teste.',
    urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/101/votos',
    urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=101',
    idsDeputadosPodres: [1],
    tipo: 'negativa',
    temas: ['democracia'],
    ...overrides,
  }
}
