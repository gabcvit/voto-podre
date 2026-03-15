type Voto = {
  tipoVoto: string
  deputado_: { id: number }
}

type VotosData = {
  dados: Voto[]
}

/**
 * Extracts the IDs of deputies who voted "Sim" from a Câmara votações API payload.
 * Use for NEGATIVE pautas — voting Sim flags a deputy as podre.
 * Returns `undefined` entries for non-Sim votes, preserving array shape.
 */
export function extractIdsPodres(votos: VotosData): (number | undefined)[] {
  return votos.dados.map(voto => {
    if (voto.tipoVoto === 'Sim') {
      return voto.deputado_.id
    }
  })
}

/**
 * Extracts the IDs of deputies who voted "Não" from a Câmara votações API payload.
 * Use for POSITIVE pautas — voting Não flags a deputy as podre.
 * Returns `undefined` entries for non-Não votes, preserving array shape.
 */
export function extractIdsContraPauta(votos: VotosData): (number | undefined)[] {
  return votos.dados.map(voto => {
    if (voto.tipoVoto === 'Não') {
      return voto.deputado_.id
    }
  })
}
