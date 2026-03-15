/**
 * Post-build pre-render script.
 *
 * Vite builds a single dist/index.html for the SPA. GitHub Pages only serves
 * that file for the root URL; all other routes return HTTP 404, which prevents
 * social-media crawlers (Bluesky, Twitter/X, LinkedIn, etc.) from generating
 * rich link previews even when they execute JavaScript.
 *
 * This script runs after `vite build` and:
 *  1. For every static route, copies dist/index.html into a subdirectory
 *     (e.g. dist/sobre/index.html) with its OG / Twitter meta tags pre-patched
 *     so crawlers get a 200 response with the correct metadata already in the HTML.
 *  2. Writes dist/404.html (a copy of dist/index.html with the homepage defaults)
 *     as a fallback for dynamic routes (/deputado/:id, /pauta/:id) so that GitHub
 *     Pages at least serves the SPA instead of its own error page.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '..', 'dist')
const SITE_URL = 'https://gabcvit.github.io/voto-podre'

// ---------------------------------------------------------------------------
// Route definitions — must mirror the useMeta() calls inside each view.
// ---------------------------------------------------------------------------
const routes = [
  {
    path: '/deputados',
    title: 'Deputados Federais — Voto Podre',
    description:
      'Lista completa de deputados federais monitorados pelo Voto Podre. Filtre por partido, estado e veja quem tem votos questionáveis no Congresso.',
  },
  {
    path: '/pautas-podres',
    title: 'Pautas — Voto Podre',
    description:
      'Conheça as pautas catalogadas pelo Voto Podre — proposições legislativas monitoradas no Congresso brasileiro.',
  },
  {
    path: '/sobre',
    title: 'Sobre — Voto Podre',
    description:
      'Sobre o Voto Podre — ferramenta de memória coletiva que expõe deputados que votaram contra trabalhadores e movimentos populares no Brasil.',
  },
  {
    path: '/privacidade',
    title: 'Política de Privacidade — Voto Podre',
    description:
      'Política de privacidade do Voto Podre. Este site não coleta dados pessoais, não utiliza cookies e está em conformidade com a LGPD.',
  },
  {
    path: '/termos',
    title: 'Termos de Uso — Voto Podre',
    description:
      'Termos de uso do Voto Podre. Projeto de transparência eleitoral baseado em dados públicos da Câmara dos Deputados, sob a Lei de Acesso à Informação.',
  },
]

// ---------------------------------------------------------------------------
// Patch the meta tags in the HTML string for a given route.
// Uses simple regex replacement — safe because we own the template shape.
// ---------------------------------------------------------------------------
function patchHtml(html, { title, description, url }) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/,   `$1${description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/,  `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/,  `$1${description}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/,    `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/,       `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/,`$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/,         `$1${url}$2`)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const indexHtml = readFileSync(`${distDir}/index.html`, 'utf-8')

// 1. Fallback for dynamic routes (/deputado/:id, /pauta/:id) — HTTP 404 but
//    at least serves the SPA so client-side routing still works for real users.
writeFileSync(`${distDir}/404.html`, indexHtml)
console.log('✓  dist/404.html')

// 2. One HTML file per static route with pre-patched OG/Twitter meta tags.
for (const route of routes) {
  const url = `${SITE_URL}${route.path}`
  const patched = patchHtml(indexHtml, { ...route, url })
  const dir = `${distDir}${route.path}`
  mkdirSync(dir, { recursive: true })
  writeFileSync(`${dir}/index.html`, patched)
  console.log(`✓  dist${route.path}/index.html`)
}

console.log('\nPre-render complete.')
