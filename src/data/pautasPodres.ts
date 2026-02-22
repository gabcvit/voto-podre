import { IDS_DEPUTADOS_PODRES } from './pecs-podres/pec-bandidagem';

export const PAUTAS_PODRES = [
    {
        id: 1,
        nome: 'PEC da Bandidagem',
        descricao: 'A PEC da Bandidagem é uma proposta de emenda à Constituição que visa reduzir as penas para crimes cometidos por membros de organizações criminosas, como o PCC. A proposta tem sido criticada por especialistas em segurança pública, que afirmam que ela pode aumentar a impunidade e a violência no país.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/2270800-175/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2270800',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES,
    },
];