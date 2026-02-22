export type Deputado = {
    id: number,
    uri: string,
    nome: string,
    siglaPartido: string,
    uriPartido: string,
    siglaUf: string,
    idLegislatura: number,
    urlFoto: string,
    email: string
}

export type PautaPodre = {
    id: number,
    nome: string,
    descricao: string,
    urlVotos: string,
    urlProposicao: string,
    idsDeputadosPodres: number[],
}
