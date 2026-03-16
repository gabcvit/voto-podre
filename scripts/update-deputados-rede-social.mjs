import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const API_BASE_URL = 'https://dadosabertos.camara.leg.br/api/v2/deputados'
const INPUT_FILE = resolve(process.cwd(), 'src/data/deputados.ts')
const OUTPUT_FILE = INPUT_FILE
const MAX_CONCURRENCY = 8
const MAX_RETRIES = 3

function extractDeputadosPayload(sourceText) {
  const match = sourceText.match(/export\s+const\s+TODOS_DEPUTADOS\s*=\s*(\{[\s\S]*\})\s*$/)
  if (!match) {
    throw new Error('Não foi possível localizar o export TODOS_DEPUTADOS em src/data/deputados.ts')
  }

  return JSON.parse(match[1])
}

function toOutputSource(payload) {
  return `export const TODOS_DEPUTADOS = ${JSON.stringify(payload, null, 2)}\n`
}

function normalizeRedeSocial(value) {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((item) => typeof item === 'string' && item.trim().length > 0)
}

async function fetchDeputadoRedeSocial(id, attempt = 1) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const body = await response.json()
    return normalizeRedeSocial(body?.dados?.redeSocial)
  } catch (error) {
    if (attempt >= MAX_RETRIES) {
      throw new Error(`Falha ao buscar deputado ${id} após ${MAX_RETRIES} tentativas: ${String(error)}`)
    }

    const backoffMs = 300 * attempt
    await new Promise((resolveDelay) => setTimeout(resolveDelay, backoffMs))
    return fetchDeputadoRedeSocial(id, attempt + 1)
  }
}

async function mapWithConcurrency(items, mapper, concurrency) {
  const result = new Array(items.length)
  let cursor = 0

  async function worker() {
    while (true) {
      const currentIndex = cursor
      cursor += 1
      if (currentIndex >= items.length) {
        return
      }

      result[currentIndex] = await mapper(items[currentIndex], currentIndex)
    }
  }

  const workerCount = Math.min(concurrency, items.length)
  await Promise.all(Array.from({ length: workerCount }, () => worker()))
  return result
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const source = await readFile(INPUT_FILE, 'utf8')
  const payload = extractDeputadosPayload(source)

  if (!Array.isArray(payload?.dados)) {
    throw new Error('Estrutura inválida: esperado objeto com propriedade dados: []')
  }

  const deputados = payload.dados
  console.log(`Atualizando redeSocial de ${deputados.length} deputados...`)

  let processed = 0
  const updatedDeputados = await mapWithConcurrency(
    deputados,
    async (deputado) => {
      const redeSocial = await fetchDeputadoRedeSocial(deputado.id)
      processed += 1

      if (processed % 25 === 0 || processed === deputados.length) {
        console.log(`Progresso: ${processed}/${deputados.length}`)
      }

      return {
        ...deputado,
        redeSocial,
      }
    },
    MAX_CONCURRENCY,
  )

  const nextPayload = {
    ...payload,
    dados: updatedDeputados,
  }

  if (!dryRun) {
    await writeFile(OUTPUT_FILE, toOutputSource(nextPayload), 'utf8')
  }

  const totalComRede = updatedDeputados.filter((d) => d.redeSocial.length > 0).length
  const totalSemRede = updatedDeputados.length - totalComRede

  if (dryRun) {
    console.log('Dry run concluído. Nenhum arquivo foi alterado.')
  } else {
    console.log(`Arquivo atualizado: ${OUTPUT_FILE}`)
  }

  console.log(`Deputados com redeSocial: ${totalComRede}`)
  console.log(`Deputados sem redeSocial: ${totalSemRede}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
