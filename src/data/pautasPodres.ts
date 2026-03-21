import IDS_DEPUTADOS_PODRES_PEC_BANDIDAGEM from './pecs-podres/pec-bandidagem';
import IDS_DEPUTADOS_PODRES_PEC_ABORTO from './pecs-podres/pec-aborto';
import IDS_DEPUTADOS_PODRES_PEC_ANISTIA from './pecs-podres/pec-anistia';
import IDS_DEPUTADOS_PODRES_PL_DEVASTACAO from './pecs-podres/pl-devastacao';
import IDS_DEPUTADOS_PODRES_PL_MARCO_TEMPORAL from './pecs-podres/pl-marco-temporal';
import IDS_DEPUTADOS_PODRES_PL_ANTI_MOVIMENTOS_RURAIS from './pecs-podres/pl-anti-movimentos-trabalhadores-rurais-e-indigenas';
import IDS_DEPUTADOS_PODRES_PL_MERCADO_DE_CARBONO from './pecs-podres/pl-mercado-de-carbono';
import IDS_DEPUTADOS_PODRES_PLP_ARCABOUCO_FISCAL from './pecs-podres/plp-arcabouco-fiscal';
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
        temas: ['democracia'],
        referencias: [
          {
            title: '‘PEC da Bandidagem’ é atentado à sociedade e à democracia, denuncia cientista político',
            source: 'Brasil de Fato',
            url: 'https://www.brasildefato.com.br/2025/09/17/pec-da-bandidagem-e-atentado-a-sociedade-e-a-democracia-denuncia-cientista-politico/',
          },
          {
            title: 'Manifestações em todo o país marcam repúdio à PEC da Blindagem e à anistia a golpistas',
            source: 'Andes Sindicato Nacional',
            url: 'https://www.andes.org.br/conteudos/noticia/manifestacoes-em-todo-o-pais-marcam-repudio-a-pEC-da-blindagem-e-a-anistia-a-golpistas1',
          },
          {
            title: 'Entenda como PEC blinda parlamentares de investigações do STF e de prisões',
            source: 'Folha de S.Paulo',
            url: 'https://www1.folha.uol.com.br/poder/2025/09/entenda-como-pec-blinda-parlamentares-de-investigacoes-do-stf-e-de-prisoes.shtml',
          },
          {
            title: 'PEC da blindagem: entenda a regra atual e o que muda com projeto que beneficia parlamentares',
            source: 'O Globo',
            url: 'https://oglobo.globo.com/politica/noticia/2025/09/21/pec-da-blindagem-entenda-a-regra-atual-e-o-que-muda-com-projeto-que-beneficia-parlamentares.ghtml',
          }
        ],
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
        referencias: [
          {
            title: 'Sob protestos, CCJ da Câmara aprova PEC do Estupro, que acaba com aborto legal, por 35 votos a 15',
            source: 'Brasil de Fato',
            url: 'https://www.brasildefato.com.br/2024/11/27/sob-protestos-ccj-da-camara-aprova-pec-do-estupro-que-acaba-com-aborto-legal-por-35-votos-a-15/',
          },
          {
            title: 'Aborto é problema de saúde pública',
            source: 'Nexojornal',
            url: 'https://pp.nexojornal.com.br/opiniao/2021/04/12/aborto-e-problema-de-saude-publica',
          },
          {
            title: 'Aborto inseguro no Brasil: revisão sistemática da produção científica, 2008-2018',
            source: 'CSP - Cadernos de Saúde Pública',
            url: 'https://cadernos.ensp.fiocruz.br/ojs/index.php/csp/article/view/7357',
          },
          {
            title: 'PEC do aborto ameaça direitos reprodutivos e agrava riscos para mulheres no Brasil',
            source: 'CUT Brasil',
            url: 'https://www.cut.org.br/noticias/pec-do-aborto-ameaca-direitos-reprodutivos-e-agrava-riscos-para-mulheres-no-bras-57f6',
          },
        ],
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
        referencias: [
          {
            title: 'Aprovação do PL da Devastação pelo Senado é inconstitucional e pode gerar retrocessos ambientais irreversíveis',
            source: 'WWF Brasil',
            url: 'https://www.wwf.org.br/?91541/Aprovacao-do-PL-da-Devastacao-pelo-Senado-e-inconstitucional-e-pode-gerar-retrocessos-ambientais-irreversiveis',
          },
          {
            title: 'Câmara aprova PL da Devastação. Veja quais são os riscos que o Brasil corre',
            source: 'CUT Brasil',
            url: 'https://www.cut.org.br/noticias/camara-aprova-pl-da-devastacao-veja-quais-sao-os-riscos-que-o-brasil-corre-ecd8',
          },
          {
            title: 'PL da Devastação avança com ameaças à Lei da Mata Atlântica',
            source: 'SOS Mata Atlântica',
            url: 'https://sosma.org.br/noticias/pl-da-devastacao-avanca-com-ameacas-a-lei-da-mata-atlantica',
          },
        ],
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
        referencias: [
          {
            title: 'Nota oficial contra a PEC 9/2023',
            source: 'Governo Federal',
            url: 'https://www.gov.br/igualdaderacial/pt-br/assuntos/noticias/nota-ofial-contra-a-pec-9-2023',
          },
          {
            title: 'CONTRA A PEC 9/2023',
            source: 'A Tenda das Candidatas',
            url: 'https://atendadascandidatas.org/incidencias/contra-a-pec-9-2023/',
          },
          {
            title: 'PEC 09/23 e o perdão ao imperdoável: o caminho antirrepublicano dos partidos',
            source: 'Consultor Jurídico',
            url: 'https://www.conjur.com.br/2023-mai-01/direito-eleitoral-pec-092023-candidaturas-femininas-perdao-imperdoavel/',
          },
        ],
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
        referencias: [
          {
            title: '“PL 490/07 e marco temporal colocam em risco os direitos dos povos indígenas”, alerta presidenta da Funai',
            source: 'Fundação Nacional dos Povos Indígenas - Governo Federal',
            url: 'https://www.gov.br/funai/pt-br/assuntos/noticias/2023/201cpl-490-07-e-marco-temporal-colocam-em-risco-os-direitos-dos-povos-indigenas201d-alerta-presidenta-da-funai',
          },
          {
            title: 'NOTA TÉCNICO-JURÍDICA SOBRE O SUBSTITUTIVO AO PL N.º 490/2007',
            source: 'Instituto Socioambiental',
            url: 'https://www.socioambiental.org/sites/default/files/noticias-e-posts/2023-05/Nota%20Tecnica%20ISA%20PL%20490%20integra.pdf',
          },
          {
            title: 'Com aprovação do PL 490, Câmara ataca povos indígenas e incita violência no campo',
            source: 'WWF Brasil',
            url: 'https://www.wwf.org.br/?85943/Com-aprovacao-do-PL-490-Camara-ataca-povos-indigenas-e-incita-violencia-no-campo',
          },
        ],
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
        referencias: [
          {
            title: 'Câmara dos Deputados aprova PL que pune pessoas que ocuparem terras',
            source: 'Brasil de Fato',
            url: 'https://www.brasildefato.com.br/2024/05/21/camara-dos-deputados-aprova-pl-que-pune-pessoas-que-ocuparem-terras/',
          },
          {
            title: 'NOTA DA DIRETORIA DO ANDES-SN EM REPÚDIO AO PL Nº 709/2023 QUE AMPLIA A CRIMINALIZAÇÃO DOS MOVIMENTOS SOCIAIS DO CAMPO.',
            source: 'Andes Sindicato Nacional',
            url: 'https://www.andes.org.br/conteudos/nota/nOTA-dA-dIRETORIA-dO-aNDES-sN-eM-rEPUDIO-aO-pL-no-709-2023-qUE-aMPLIA-a-cRIMINALIZACAO-dOS-mOVIMENTOS-sOCIAIS-dO-cAMPO1',
          },
        ]
        ,
    },
    {
        id: 2357053,
        nome: 'PL 182/2024 e mercado de carbono',
        descricao: 'O PL 182/2024, que cria regras para o mercado brasileiro de carbono, não é solução mágica para a crise climática — e tem limites importantes, inclusive brechas e setores relevantes parcialmente preservados. Ainda assim, ele estabelece um piso regulatório que hoje praticamente não existe: cria monitoramento, obrigações de reporte e incentivos econômicos para cortar emissões em vez de tratá-las como custo invisível. Rejeitar esse marco não significou “prudência técnica”; significou manter a desregulação que beneficia quem mais polui e mais lucra com a ausência de controle público. Em um país que já enfrenta eventos climáticos extremos, votar contra qualquer regra mínima de responsabilização ambiental é escolher o atraso: enfraquece a transição ecológica, reduz previsibilidade para investimentos limpos e aumenta a conta social paga por populações vulneráveis, especialmente nas periferias urbanas e nos territórios tradicionais.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/1548579-194/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=1548579',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PL_MERCADO_DE_CARBONO,
        tipo: 'positiva',
        temas: ['meio ambiente'],
        referencias: [
          {
            title: 'Mercado regulado de carbono é aprovado pelo Congresso, mas deixa agro de fora',
            source: 'Brasil de Fato',
            url: 'https://www.brasildefato.com.br/2024/12/18/mercado-regulado-de-carbono-e-aprovado-pelo-congresso-mas-deixa-agro-de-fora/',
          },
          {
            title: 'Mas, afinal, o que é o mercado de crédito de carbono?',
            source: 'O Globo',
            url: 'https://oglobo.globo.com/economia/especial/o-que-e-o-mercado-de-carbono-entenda-no-especial-que-explica-a-regulacao-aprovada-no-senado.ghtml',
          },
          {
            title: 'Especialistas veem com bons olhos texto que regulamenta o mercado de carbono no Brasil',
            source: 'Um Só Planeta - Globo',
            url: 'https://umsoplaneta.globo.com/opiniao/colunas-e-blogs/clima-desenvolvimento/noticia/2024/11/20/especialistas-veem-com-bons-olhos-texto-que-regulamenta-o-mercado-de-carbono-no-brasil.ghtml',
          },
        ],
    },
    {
        id: 2357053,
        nome: 'PLP do Arcabouço Fiscal',
        descricao: 'A PLP 93/2023 do Arcabouço Fiscal é um projeto que, sob o pretexto de "ajustar as contas públicas", na verdade amarra o país e o setor público a uma agenda de austeridade que sacrifica investimentos essenciais em saúde, educação, assistência social e infraestrutura para garantir o pagamento de juros e privilégios de uma minoria. Na prática, a proposta impõe um teto rígido para os gastos públicos, limitando a capacidade do Estado de responder a crises econômicas, sociais e ambientais, e aprofundando as desigualdades ao cortar recursos de programas que beneficiam os mais vulneráveis. Em um cenário de estagnação econômica e aumento da pobreza, votar a favor do Arcabouço é escolher o retrocesso: é priorizar o mercado financeiro em detrimento do povo brasileiro, perpetuando um ciclo vicioso de austeridade que só beneficia os mais ricos.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/2357053-47/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2357053',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PLP_ARCABOUCO_FISCAL,
        tipo: 'negativa',
        temas: ['sucateamento do setor público', 'meio ambiente', 'saúde', 'educação'],

        referencias: [
          {
            title: 'Senado altera projeto de arcabouço fiscal, mas não retira amarras e gatilhos',
            source: 'CUT Brasil',
            url: 'https://www.cut.org.br/noticias/senado-altera-projeto-de-arcabouco-fiscal-mas-nao-retira-amarras-e-gatilhos-6485',
          },
          {
            title: 'Senado aprova arcabouço fiscal com alterações e texto volta à Câmara dos Deputados',
            source: 'Andes Sindicato Nacional',
            url: 'https://www.andes.org.br/conteudos/noticia/senado-aprova-arcabouco-fiscal-com-alteracoes-e-texto-volta-a-camara-dos-deputados1',
          },
          {
            title: 'Governo entrega projeto de lei do novo marco fiscal do Brasil',
            source: 'Governo Federal - Ministério da Fazenda',
            url: 'https://www.gov.br/fazenda/pt-br/assuntos/noticias/2023/abril/governo-entrega-projeto-de-lei-do-novo-marco-fiscal-do-brasil',
          },
        ],
    },
];
