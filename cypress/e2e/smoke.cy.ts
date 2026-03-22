type SmokePage = {
  name: string
  path: string
  title: string
  assertContent: () => void
}

const deputado = {
  id: 204379,
  nome: 'Acácio Favacho',
}

const pauta = {
  id: 2270800,
  nome: 'PEC da Bandidagem',
}

const smokePages: SmokePage[] = [
  {
    name: 'home',
    path: '/',
    title: 'Voto Podre',
    assertContent: () => {
      cy.contains('h1', 'Voto').should('contain.text', 'Podre')
      cy.contains('a', 'Ver Pautas').should('be.visible')
      cy.contains('a', 'Ver Deputados').should('be.visible')
      cy.contains('section', 'Deputados monitorados').should('be.visible')
    },
  },
  {
    name: 'deputados list',
    path: '/deputados',
    title: 'Deputados Federais',
    assertContent: () => {
      cy.contains('h1', 'Lista de Deputados').should('be.visible')
      cy.contains('label', 'Buscar por nome').should('be.visible')
      cy.contains('label', 'Partido').should('be.visible')
      cy.contains('label', 'Estado (UF)').should('be.visible')
    },
  },
  {
    name: 'deputado details',
    path: `/deputado/${deputado.id}`,
    title: deputado.nome,
    assertContent: () => {
      cy.contains('span', deputado.nome).should('be.visible')
      cy.contains('button', 'Compartilhar').should('be.visible')
      cy.contains('h2', 'Redes sociais').should('be.visible')
      cy.contains('h2', 'Pautas Podres apoiadas').should('be.visible')
    },
  },
  {
    name: 'pautas list',
    path: '/pautas',
    title: 'Pautas',
    assertContent: () => {
      cy.contains('h1', 'Pautas').should('be.visible')
      cy.contains('button', 'Todos').should('have.attr', 'aria-pressed', 'true')
      cy.contains('a', pauta.nome).should('be.visible')
    },
  },
  {
    name: 'pauta details',
    path: `/pauta/${pauta.id}`,
    title: pauta.nome,
    assertContent: () => {
      cy.contains('h1', pauta.nome).should('be.visible')
      cy.contains('button', 'Compartilhar').should('be.visible')
      cy.contains('a', 'Ver tramitação na Câmara').should('be.visible')
      cy.contains('button', 'Mostrar materiais de leitura').should('be.visible')
    },
  },
  {
    name: 'about',
    path: '/sobre',
    title: 'Sobre',
    assertContent: () => {
      cy.contains('h1', 'Sobre o Voto Podre').should('be.visible')
      cy.contains('h2', 'Por que monitoramos o Congresso?').should('be.visible')
      cy.contains('h2', 'Como usar este site').should('be.visible')
    },
  },
  {
    name: 'glossary',
    path: '/glossario',
    title: 'Glossário',
    assertContent: () => {
      cy.contains('h1', 'Glossário').should('be.visible')
      cy.contains('h2', 'PEC').should('be.visible')
      cy.contains('h2', 'Pauta podre / pauta positiva').should('be.visible')
    },
  },
  {
    name: 'privacy policy',
    path: '/privacidade',
    title: 'Política de Privacidade',
    assertContent: () => {
      cy.contains('h1', 'Política de Privacidade').should('be.visible')
      cy.contains('h2', 'Declaração Principal').should('be.visible')
      cy.contains('h2', '1. Identificação do Responsável').should('be.visible')
    },
  },
  {
    name: 'terms of use',
    path: '/termos',
    title: 'Termos de Uso',
    assertContent: () => {
      cy.contains('h1', 'Termos de Uso').should('be.visible')
      cy.contains('h2', 'Aceitação dos Termos').should('be.visible')
      cy.contains('h2', '1. Objeto e Finalidade').should('be.visible')
    },
  },
  {
    name: 'support',
    path: '/apoio',
    title: 'Apoie o Projeto',
    assertContent: () => {
      cy.contains('h1', 'Apoie o Voto Podre').should('be.visible')
      cy.contains('h2', 'Contribua via PIX').should('be.visible')
      cy.contains('button', 'Copiar chave PIX').should('be.visible')
    },
  },
]

describe('public page smoke tests', () => {
  beforeEach(() => {
    // Deputy photo URLs (camara.leg.br) are external. Without stubbing them,
    // cy.visit() waits for window.load which only fires after all <img> requests
    // complete — stalling tests on pages that render hundreds of deputies.
    cy.intercept('https://www.camara.leg.br/**', { statusCode: 200, body: '' })
  })

  smokePages.forEach(({ name, path, title, assertContent }) => {
    it(`opens the ${name} page`, () => {
      cy.visit(path)
      cy.title().should('include', title)
      assertContent()
    })
  })
})
