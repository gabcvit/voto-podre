export type Deputado = {
    id: number,
    uri: string,
    nome: string,
    siglaPartido: string,
    uriPartido: string,
    siglaUf: string,
    idLegislatura: number,
    urlFoto: string,
    email: string,
    redeSocial: string[]
}

export type Tema = 'segurança pública' | 'direitos humanos' | 'meio ambiente' | 'democracia'

export type SocialPlatform = 'facebook' | 'instagram' | 'youtube' | 'x'

export type DeputadoSocialLink = {
    url: string,
    platform: SocialPlatform,
    label: string,
}

export type PautaReference = {
    title: string,
    url: string,
    source: string,
    summary?: string,
}

export type PautaPodre = {
    id: number,
    nome: string,
    descricao: string,
    urlVotos: string,
    urlProposicao: string,
    idsDeputadosPodres: (number | undefined)[],
    /**
     * 'negativa' — deputies who voted FOR this proposal are flagged (voting Sim = bad).
     * 'positiva' — deputies who voted AGAINST this proposal are flagged (voting Não = bad).
     */
    tipo: 'negativa' | 'positiva',
    temas: Tema[],
    referencias?: PautaReference[],
}
