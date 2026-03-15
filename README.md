# Voto Podre

![Voto Podre](public/og-image.png)

**Transparência · Memória · Responsabilidade**

Voto Podre é um projeto de transparência eleitoral que monitora os 513 deputados federais brasileiros e identifica aqueles que votaram a favor de "pautas podres" — proposições consideradas prejudiciais ao povo brasileiro. Os dados são extraídos da [API pública da Câmara dos Deputados](https://dadosabertos.camara.leg.br/).

🔗 **[gabcvit.github.io/voto-podre](https://gabcvit.github.io/voto-podre)**

---

## Funcionalidades

- **Listagem de deputados** com busca por nome, filtro por partido, estado (UF), status ("podre" / "limpo") e quantidade mínima de pautas podres
- **Perfil individual** de cada deputado com seus dados e as pautas podres em que votou a favor
- **Catálogo de pautas podres** com descrição detalhada e lista de todos os deputados que votaram a favor
- **Estatísticas** em tempo real: total de deputados monitorados, pautas catalogadas e deputados flagrados
- **Tema escuro/claro** com preferência persistida em `localStorage` (escuro por padrão)
- **Navegação responsiva** com menu burger para dispositivos móveis
- **SEO completo** com meta tags Open Graph, Twitter/X Card e sitemap estático

## Pautas Podres Catalogadas

| PEC | Descrição resumida |
|---|---|
| **PEC da Bandidagem** | Proposta que beneficia membros de organizações criminosas como o PCC |
| **PEC do Aborto** | Proposta que criminaliza o aborto em todas as circunstâncias, incluindo estupro e risco de vida |

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Linguagem | TypeScript |
| Build | Vite |
| Estilo | Tailwind CSS v4 |
| Estado | Pinia |
| Roteamento | Vue Router v5 |
| Testes | Vitest + `@vue/test-utils` |
| Deploy | GitHub Pages (`gh-pages`) |

## Rodando localmente

```bash
# Instalar dependências
pnpm install

# Servidor de desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Rodar testes
pnpm test:unit

# Deploy para GitHub Pages
pnpm deploy
```

---

## Aviso

Este repositório reflete uma perspectiva crítica sobre votações parlamentares e busca promover o engajamento eleitoral informado com base em dados públicos. As classificações das pautas representam a posição editorial do projeto.