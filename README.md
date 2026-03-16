# Voto Podre

![Voto Podre](public/og-image.png)

**Transparência · Memória · Responsabilidade**

Voto Podre é um projeto de transparência eleitoral que monitora os 513 deputados federais brasileiros e identifica aqueles com votos questionáveis em proposições catalogadas. Os dados são extraídos da [API pública da Câmara dos Deputados](https://dadosabertos.camara.leg.br/).

🔗 **[voto-podre.com.br](https://voto-podre.com.br)**

---

## Funcionalidades

- **Listagem de deputados** com busca por nome, filtro por partido, estado (UF), status ("podre" / "limpo") e quantidade mínima de pautas
- **Perfil individual** de cada deputado com seus dados, botões de redes sociais (com identificação da plataforma) e pautas em que teve voto questionável
- **Catálogo de pautas** com descrição detalhada e lista de todos os deputados flagrados
- **Glossário de termos** com explicações simples para siglas e conceitos legislativos (ex.: PEC, PL, proposição)
- **Estatísticas** em tempo real: total de deputados monitorados, pautas catalogadas e deputados flagrados
- **Tema escuro/claro** com preferência persistida em `localStorage` (escuro por padrão)
- **Navegação responsiva** com menu burger para dispositivos móveis
- **SEO completo** com meta tags Open Graph, Twitter/X Card e sitemap estático

## Pautas Catalogadas

| Proposição | Tipo | Descrição resumida |
|---|---|---|
| **PEC da Bandidagem** | PEC | Proposta que beneficia membros de organizações criminosas como o PCC |
| **PEC do Aborto** | PEC | Proposta que criminaliza o aborto em todas as circunstâncias, incluindo estupro e risco de vida |
| **PL da Devastação** | PL | Projeto que desmonta o licenciamento ambiental e abre caminho para desastres como Mariana e Brumadinho |

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

# Atualizar redeSocial dos deputados a partir da API da Câmara
pnpm sync:deputados:rede-social

# Deploy para GitHub Pages
pnpm deploy
```

---

## Aviso

Este repositório reflete uma perspectiva crítica sobre votações parlamentares e busca promover o engajamento eleitoral informado com base em dados públicos. As classificações das pautas representam a posição editorial do projeto.