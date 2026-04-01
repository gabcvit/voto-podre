describe('site interactions', () => {
  beforeEach(() => {
    cy.intercept('https://www.camara.leg.br/**', { statusCode: 200, body: '' })
  })

  it('toggles theme and navigates through the mobile menu', () => {
    cy.visit('/')

    cy.get('nav[aria-label="Navegação principal"]').should('be.visible')
    cy.get('footer').should('contain.text', 'Privacidade')

    cy.get('button[aria-label="Mudar para modo escuro"]').first().click()
    cy.get('html').should('have.class', 'dark')
    cy.window().its('localStorage.theme').should('eq', 'dark')

    cy.viewport(390, 844)
    cy.visit('/')
    cy.get('button[aria-label="Abrir menu"]').click()
    cy.get('#mobile-menu').should('be.visible')
    cy.contains('#mobile-menu a', 'Glossário').click()
    cy.url().should('include', '/glossario')
    cy.get('#mobile-menu').should('not.exist')
    cy.contains('h1', 'Glossário').should('be.visible')
  })

  it('filters deputies and opens a deputy detail page', () => {
    cy.visit('/deputados')

    cy.get('#filter-search').type('Acácio')
    cy.contains('[role="status"]', '1 deputado encontrado').should('be.visible')
    cy.contains('button', 'Por Partido').click()
    cy.contains('distribuição por partido').should('be.visible')
    cy.contains('button', 'Deputados').click()
    cy.contains('a', 'Acácio Favacho').click()

    cy.url().should('include', '/deputado/204379')
    cy.contains('button', 'Compartilhar').should('be.visible')
    cy.contains('h2', 'Informações completas').should('be.visible')
    cy.contains('h2', 'Pautas Podres apoiadas').should('be.visible')
  })

  it('filters pautas and exercises the pauta detail interactions', () => {
    cy.visit('/pautas')

    cy.contains('button', 'democracia').click()
    cy.contains('button', 'democracia').should('have.attr', 'aria-pressed', 'true')
    cy.contains('a', 'PEC 3/2021 da Bandidagem').click()

    cy.url().should('include', '/pauta/2270800')
    cy.contains('button', 'Mostrar materiais de leitura').click()
    cy.contains('h2', 'Leia mais').should('be.visible')
    cy.contains('button', 'Por Partido').click()
    cy.contains('por partido').should('be.visible')
    cy.contains('button', 'Deputados').click()
    cy.contains('button', 'Compartilhar').click()
    cy.contains('button', 'Por estado').click()
    cy.get('select').first().find('option').its('length').should('be.greaterThan', 1)
    cy.get('select').first().select(1)
    cy.contains('button', 'Gerar imagem').should('not.be.disabled')
  })

  it('copies the PIX key on the support page', () => {
    cy.visit('/apoio', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'clipboard', {
          configurable: true,
          value: {
            writeText: cy.stub().as('writeText'),
          },
        })
      },
    })

    cy.contains('button', 'Copiar chave PIX').click()
    cy.get('@writeText').should('have.been.calledWith', '32eea521-52c1-4048-92e0-bdcc9233efb5')
    cy.contains('button', 'Chave copiada!').should('be.visible')
  })

  it('redirects /sobre to the homepage and keeps legal pages reachable from the footer', () => {
    cy.visit('/sobre')

    cy.url().should('match', /\/$/)
    cy.contains('h1', 'Voto').should('contain.text', 'Podre')

    cy.get('footer').contains('Privacidade').click()
    cy.url().should('include', '/privacidade')
    cy.contains('h1', 'Política de Privacidade').should('be.visible')

    cy.get('footer').contains('Termos de Uso').click()
    cy.url().should('include', '/termos')
    cy.contains('h1', 'Termos de Uso').should('be.visible')
  })
})
