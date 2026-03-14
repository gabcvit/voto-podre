import IDS_DEPUTADOS_PODRES_PEC_BANDIDAGEM from './pecs-podres/pec-bandidagem';
import IDS_DEPUTADOS_PODRES_PEC_ABORTO from './pecs-podres/pec-aborto';

export const PAUTAS_PODRES = [
    {
        id: 2270800,
        nome: 'PEC da Bandidagem',
        descricao: 'A PEC da Bandidagem é uma proposta de emenda à Constituição que visa reduzir as penas para crimes cometidos por membros de organizações criminosas, como o PCC. A proposta tem sido criticada por especialistas em segurança pública, que afirmam que ela pode aumentar a impunidade e a violência no país.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/2270800-175/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2270800',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PEC_BANDIDAGEM,
    },
    {
        id: 543252,
        nome: 'PEC do Aborto',
        descricao: 'A PEC do Aborto é uma proposta de emenda à Constituição que visa criminalizar o aborto em todas as circunstâncias, incluindo casos de estupro, risco de vida para a mãe e anencefalia. A proposta tem sido criticada por especialistas em saúde pública, que afirmam que ela pode aumentar a mortalidade materna e a violência contra as mulheres.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/543252-60/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=543252',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PEC_ABORTO,
    },
];
