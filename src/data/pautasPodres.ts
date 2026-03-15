import IDS_DEPUTADOS_PODRES_PEC_BANDIDAGEM from './pecs-podres/pec-bandidagem';
import IDS_DEPUTADOS_PODRES_PEC_ABORTO from './pecs-podres/pec-aborto';
import IDS_DEPUTADOS_PODRES_PEC_ANISTIA from './pecs-podres/pec-anistia';
import IDS_DEPUTADOS_PODRES_PL_DEVASTACAO from './pecs-podres/pl-devastacao';
import IDS_DEPUTADOS_PODRES_PL_MARCO_TEMPORAL from './pecs-podres/pl-marco-temporal';
import IDS_DEPUTADOS_PODRES_PL_ANTI_MOVIMENTOS_RURAIS from './pecs-podres/pl-anti-movimentos-trabalhadores-rurais-e-indigenas';
import IDS_DEPUTADOS_PODRES_PL_MERCADO_DE_CARBONO from './pecs-podres/pl-mercado-de-carbono';
import type { PautaPodre } from '@/types';

export const PAUTAS_PODRES: PautaPodre[] = [
    {
        id: 2270800,
        nome: 'PEC da Bandidagem',
        descricao: 'A PEC da Bandidagem é um projeto de emenda constitucional que, na prática, tenta criar um escudo para criminosos de terno. Se aprovada, ela vai permitir que deputados e senadores investigados por crimes graves como corrupção, desvio de dinheiro público, feminicídio e até assassinato, só possam ser processados se a própria Câmara dos Deputados autorizar, em votação secreta. Ou seja, um bando de políticos acusados de crimes vai poder decidir, escondido do povo, se os seus próprios colegas vão para a cadeia ou não. Isso não é só um privilégio absurdo: é um afronte direto à Constituição e ao princípio de que todos são iguais perante a lei, transformando o Congresso em um clube de proteção mútua às custas da justiça e da sociedade brasileira.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/2270800-175/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2270800',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PEC_BANDIDAGEM,
        tipo: 'negativa',
        temas: ['segurança pública'],
    },
    {
        id: 543252,
        nome: 'PEC do Estupro',
        descricao: 'A PEC 164/2012, também chamada por críticos de "PEC do Estupro", é uma proposta que tenta rasgar a Constituição para impor uma visão religiosa e punitivista a todo o país. Na prática, ela quer mudar o artigo 5º para incluir que a vida começa "desde a concepção", sem uma vírgula de exceção. Isso acaba, por tabela, com o direito ao aborto legal nos três únicos casos que a lei brasileira permite hoje: gravidez de risco para a mãe, estupro e anencefalia fetal. Se aprovada, uma menina de 10 anos estuprada pelo tio será obrigada pelo Estado a levar a gestação adiante. Uma mulher com risco de morte na gravidez será deixada para morrer junto com o feto. Além desse sadismo disfarçado de fé, a PEC ainda inviabiliza a fertilização in vitro, o congelamento de óvulos e pesquisas com células-tronco que poderiam curar doenças graves. Não se trata de "defender a vida", mas de controlar corpos femininos e enterrar a ciência e a dignidade humana num poço de fundamentalismo',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/543252-60/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=543252',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PEC_ABORTO,
        tipo: 'negativa',
        temas: ['direitos humanos'],
    },
    {
        id: 257161,
        nome: 'PL da Devastação',
        descricao: 'O PL 2.159/2021, apelidado de "PL da Devastação", é um projeto que rasga a legislação ambiental para entregar o país ao saque desenfreado do agronegócio predatório e da mineração criminosa. Aprovado no Senado, ele acaba com o licenciamento ambiental sério ao permitir que o próprio empreendedor — o mesmo que quer derrubar a floresta ou construir uma barragem — ateste que seu projeto é "seguro" num esquema de autolicenciamento sem fiscalização efetiva. Na prática, a proposta institucionaliza a tragédia: abre caminho para novos desastres como os de Mariana e Brumadinho, ignora os direitos de povos indígenas, quilombolas e comunidades tradicionais, e atropela leis como a da Mata Atlântica. Não se trata apenas de destruir árvores, mas de aprofundar a fome, expulsar famílias pobres do campo e condenar o futuro do povo brasileiro para garantir o lucro de meia dúzia de empresas.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/257161-483/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=257161',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PL_DEVASTACAO,
        tipo: 'negativa',
        temas: ['meio ambiente'],
    },
    {
        id: 2352476,
        nome: 'PL da Anistia',
        descricao: 'A PEC 9/2023, a chamada "PEC da Anistia", é um ataque frontal à democracia e à justiça eleitoral, aprovado às pressas num plenário esvaziado, sem transparência ou debate com a sociedade . Na prática, a proposta pega carona na justa luta por representatividade negra para oferecer uma anistia ampla e irrestrita aos partidos políticos . Ela perdoa todas as punições pelo descumprimento das regras de financiamento de candidaturas negras e de gênero, anula multas e sanções de processos eleitorais — inclusive por caixa dois — e permite que os partilos usem dinheiro público do Fundo Partidário para pagar essas dívidas e penalidades . Ou seja, os partidos que fraudaram as regras, roubaram a vez de mulheres e negros e cometeram irregularidades agora se autoanistiam, institucionalizam um Refis permanente e empurram a conta para o contribuinte, num ciclo vicioso que estimula a impunidade e enterra a prestação de contas até 2033.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/2352476-171/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2352476',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PEC_ANISTIA,
        tipo: 'negativa',
        temas: ['democracia'],
    },
    {
        id: 345311,
        nome: 'PL 490/2007 e marco temporal',
        descricao: 'O PL 490/2007, que impõe a tese do marco temporal, é uma das medidas mais cruéis e inconstitucionais já votadas pela Câmara dos Deputados. Na prática, o projeto decreta que os povos indígenas só têm direito às terras que estavam fisicamente ocupando em 5 de outubro de 1988 — data da promulgação da Constituição —, apagando séculos de violência colonial, expulsão forçada e genocídio que afastaram esses povos de seus territórios ancestrais. A lógica é perversa: se uma comunidade foi massacrada ou expulsa antes daquela data, perdeu o direito ao seu próprio território para sempre, recompensando quem praticou o crime e punindo quem sobreviveu a ele. Além de ameaçar a sobrevivência física de dezenas de povos, o texto escancarou as portas de terras indígenas para o avanço do agronegócio predatório e da mineração ilegal, acelerando o desmatamento e a destruição de biomas inteiros. Não é legislação — é cumplicidade histórica com o genocídio indígena embrulhada em juridiquês.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/345311-279/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=345311',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PL_MARCO_TEMPORAL,
        tipo: 'negativa',
        temas: ['meio ambiente', 'direitos humanos'],
    },
    {
        id: 2349493,
        nome: 'PL 709/2023 contra movimentos trabalhistas rurais e indígenas',
        descricao: 'O PL 709/2023 é um projeto elaborado sob medida para criminalizar a luta de quem não tem nada e proteger as fortunas de quem tem tudo. Ao impor penas mais severas para a ocupação de terras improdutivas, ele mira diretamente movimentos como o MST e comunidades indígenas que, sem alternativa, ocupam latifúndios que descumprem a função social da propriedade prevista na própria Constituição. Na prática, enquanto grandes proprietários que mantêm milhões de hectares ociosos seguem blindados pelo poder econômico e pela bancada ruralista, famílias sem-terra que buscam o direito de plantar e comer são tratadas como criminosas perigosas. O projeto não combate a violência no campo — ele a legitima, protegendo quem tem e perseguindo quem precisa. É a bancada do boi legislando contra os pobres, disfarçando grilagem e exploração em discurso de ordem e propriedade.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/2349493-103/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2349493',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PL_ANTI_MOVIMENTOS_RURAIS,
        tipo: 'negativa',
        temas: ['direitos humanos'],
    },
    {
        id: 2357053,
        nome: 'PL 182/2024 e mercado de carbono',
        descricao: 'O PL 182/2024, que regulamenta o mercado brasileiro de carbono, é uma das iniciativas básicas para que o Brasil cumpra seus compromissos climáticos no Acordo de Paris e gere renda real para as comunidades que vivem de preservar nossas florestas. Ao criar um sistema regulado e transparente de negociação de créditos de carbono, a lei estabelece limites reais de emissão para os maiores poluidores do país, tornando financeiramente inevitável que a indústria e o agronegócio pesado reduzam seus impactos ambientais. Votar contra esse projeto não foi posição técnica nem ideológica: foi uma escolha deliberada de proteger os setores que mais poluem, que mais desmatam e que mais lucram com a ausência de qualquer regra ambiental séria. Os deputados que rejeitaram a proposta viraram as costas para as comunidades indígenas e ribeirinhas que dependem das florestas, para os compromissos internacionais do Brasil e para o próprio futuro do planeta — tudo para não incomodar os financiadores do agronegócio e da indústria pesada.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/1548579-194/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=1548579',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PL_MERCADO_DE_CARBONO,
        tipo: 'positiva',
        temas: ['meio ambiente'],
    },
];
