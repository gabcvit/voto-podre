import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  viewportWidth: 1440,
  viewportHeight: 900,
  pageLoadTimeout: 30000,
  defaultCommandTimeout: 8000,
  e2e: {
    baseUrl: 'http://localhost:5173/',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: false,
  },
})
