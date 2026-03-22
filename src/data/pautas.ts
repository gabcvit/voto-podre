import IDS_DEPUTADOS_PODRES_MP_AGORA_TEM_ESPECIALISTA from './single-pautas/mp-agora-tem-especialista';
import IDS_DEPUTADOS_PODRES_PEC_BANDIDAGEM from './single-pautas/pec-bandidagem';
import IDS_DEPUTADOS_PODRES_PEC_ABORTO from './single-pautas/pec-aborto';
import IDS_DEPUTADOS_PODRES_PEC_ANISTIA from './single-pautas/pec-anistia';
import IDS_DEPUTADOS_PODRES_PEC_169_PEJOTIZACAO_PROFESSORES from './single-pautas/pec-pejotizacao-deprofessores';
import IDS_DEPUTADOS_PODRES_PL_DEVASTACAO from './single-pautas/pl-devastacao';
import IDS_DEPUTADOS_PODRES_PL_MARCO_TEMPORAL from './single-pautas/pl-marco-temporal';
import IDS_DEPUTADOS_PODRES_PL_ANTI_MOVIMENTOS_RURAIS from './single-pautas/pl-anti-movimentos-trabalhadores-rurais-e-indigenas';
import IDS_DEPUTADOS_PODRES_PL_MERCADO_DE_CARBONO from './single-pautas/pl-mercado-de-carbono';
import IDS_DEPUTADOS_PODRES_PLP_ARCABOUCO_FISCAL from './single-pautas/plp-arcabouco-fiscal';
import type { Pauta } from '@/types';

export const PAUTAS: Pauta[] = [
    {
        id: 2270800,
        nome: 'PEC da Bandidagem',
        descricao: 'A PEC da Bandidagem é uma proposta de emenda constitucional que criaria um filtro político para o processamento criminal de parlamentares. Se aprovada, deputados e senadores investigados por crimes graves — incluindo corrupção, desvio de dinheiro público e crimes violentos — só poderiam ser processados mediante autorização da própria Câmara, em votação secreta. Na prática, parlamentares acusados de crimes decidiriam, entre si e sem transparência, se colegas responderiam à Justiça. A proposta contraria o princípio constitucional de isonomia — a premissa de que todos são iguais perante a lei — e estabelece um nível de imunidade penal sem precedentes na história democrática brasileira.',
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
        nome: 'PEC 164/2012 Contra o Aborto',
        descricao: 'A PEC 164/2012 propõe incluir na Constituição que a vida começa "desde a concepção", sem qualquer exceção prevista. O efeito prático seria revogar os três casos em que o aborto é atualmente permitido por lei: gravidez resultante de estupro, risco de morte para a gestante e feto anencéfalo. Vítimas de violência sexual ficariam obrigadas a levar a gestação adiante. Mulheres em risco de vida durante a gravidez perderiam esse direito. A proposta também inviabilizaria técnicas de fertilização in vitro e pesquisas com células-tronco embrionárias. O Brasil registra altas taxas de mortalidade materna associadas a abortos inseguros — a aprovação dessa PEC agravaria um problema de saúde pública com impacto desproporcional em mulheres jovens e de baixa renda.',
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
        descricao: 'O PL 2.159/2021, chamado de "PL da Devastação" por entidades ambientais e movimentos sociais, reformula as regras de licenciamento ambiental no Brasil. A principal crítica é a abertura para o chamado "autolicenciamento": em determinadas categorias de empreendimento, o próprio interessado poderia atestar a ausência de impactos significativos, sem necessidade de análise técnica independente. O texto também reduz as exigências de consulta prévia a povos indígenas, quilombolas e comunidades tradicionais antes da instalação de obras em suas proximidades. Organizações ambientais apontam que o projeto enfraquece salvaguardas que existiam para prevenir desastres como os de Mariana e Brumadinho, onde falhas no controle ambiental resultaram em vítimas fatais e danos irreversíveis ao meio ambiente e às comunidades locais.',
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
        descricao: 'A PEC 9/2023, chamada de "PEC da Anistia", aproveitou a pauta legítima de representatividade racial e de gênero para incluir um perdão amplo a partidos políticos por descumprimento das regras de financiamento de candidaturas negras e femininas. A proposta anula multas e penalidades de processos eleitorais — inclusive por irregularidades como caixa dois — e permite que o Fundo Partidário, dinheiro público, seja usado para cobrir essas dívidas. Partidos que descumpriram as cotas de gênero e raça, prejudicando candidaturas de mulheres e negros, seriam anistiados sem consequências. O mecanismo fragiliza a fiscalização eleitoral e cria um precedente de impunidade que pode estimular o descumprimento das mesmas regras nos ciclos eleitorais seguintes.',
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
        descricao: 'O PL 490/2007 estabelece a chamada "tese do marco temporal": povos indígenas só teriam reconhecido o direito às terras que estivessem fisicamente ocupando em 5 de outubro de 1988, data da promulgação da Constituição. O Supremo Tribunal Federal já julgou essa tese inconstitucional, mas o Congresso buscou positivá-la por via legislativa. O problema central é histórico: inúmeras comunidades foram forçadas a abandonar seus territórios por violência, ações do Estado ou missões compulsórias bem antes dessa data. Pelo critério do marco temporal, quem foi expulso da própria terra perderia esse direito permanentemente. Além do impacto direto sobre dezenas de povos indígenas, o texto abre caminho legal para a expansão de atividades agropecuárias e mineração em áreas que antes tinham proteção constitucional, acelerando o desmatamento em regiões sensíveis.',
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
        nome: 'PL 709/2023 contra Movimentos Trabalhistas Rurais e Indígenas',
        descricao: 'O PL 709/2023 endurece as penas para a ocupação de terras — medida que na prática afeta desproporcionalmente movimentos de trabalhadores rurais sem-terra e comunidades indígenas. A Constituição estabelece que a propriedade rural deve cumprir função social: terras que não geram trabalho produtivo podem ser desapropriadas para fins de reforma agrária. A ocupação de latifúndios improdutivos é uma forma histórica de pressão para que essa norma constitucional seja aplicada. O projeto aumenta as penalidades para quem exerce essa pressão, mas não impõe obrigações equivalentes aos proprietários que descumprem a função social. Organizações de direitos humanos apontam que o texto criminaliza uma forma de mobilização legítima sem endereçar a concentração fundiária que a motiva.',
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
        id: 1548579,
        nome: 'PL 182/2024 e Mercado de Carbono',
        descricao: 'O PL 182/2024 cria as regras para o mercado regulado de carbono no Brasil. Não representa uma solução definitiva para a crise climática — o texto tem limitações importantes, como a exclusão parcial do setor agropecuário — mas estabelece um piso regulatório hoje praticamente inexistente: monitoramento de emissões, obrigações de reporte e incentivos econômicos para a redução de gases de efeito estufa. Votar contra esse marco significou manter a desregulação vigente, que não cria obrigações de controle para os maiores emissores. Em um país já atingido por eventos climáticos extremos em frequência crescente, a ausência de regras aumenta os custos sociais que recaem desproporcionalmente sobre populações mais vulneráveis — nas periferias urbanas e em territórios tradicionais.',
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
        descricao: 'A PLP 93/2023 do Arcabouço Fiscal estabelece um novo conjunto de regras para o controle dos gastos públicos federais. A crítica central de economistas progressistas é que o mecanismo cria um teto de crescimento das despesas que não distingue entre gastos correntes e investimentos em serviços essenciais — limitando a capacidade do Estado de ampliar saúde, educação e proteção social mesmo em períodos de crise. Na visão dos movimentos de trabalhadores e sindicatos que se opuseram à proposta, a regra prioriza a geração de superávit primário — o que favorece credores da dívida pública — em detrimento da expansão de programas que atendem populações de baixa renda. O debate sobre o marco fiscal distribui consequências muito desiguais: os cortes, quando acionados, tendem a recair sobre políticas públicas que têm os mais vulneráveis como beneficiários diretos.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/2357053-47/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2357053',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PLP_ARCABOUCO_FISCAL,
        tipo: 'negativa',
        temas: ['meio ambiente', 'saúde', 'educação'],

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
    {
        id: 2225224,
        nome: 'PEC 169/2019 da Pejotização de Professores',
        descricao: 'A PEC 169/2019 propõe duas mudanças relevantes para a educação pública. A primeira permite que servidores públicos de outras carreiras acumulem cargos docentes, independentemente de formação pedagógica. A segunda — incluída em versão anterior do substitutivo e retirada após pressão da CNTE — chegou a propor a contratação de professores como microempreendedores individuais, retirando direitos como piso salarial, plano de carreira e aposentadoria especial. Organizações do magistério apontam que o problema central da escassez de professores não é falta de pessoas dispostas a ensinar, mas condições de trabalho e remuneração que afastam candidatos qualificados da profissão. A proposta não enfrenta esse diagnóstico — flexibiliza requisitos de formação sem criar incentivos para a valorização docente, em sentido contrário às recomendações da UNESCO sobre qualidade do ensino.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/2225224-125/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2225224',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_PEC_169_PEJOTIZACAO_PROFESSORES,
        tipo: 'negativa',
        temas: ['educação'],

        referencias: [
          {
            title: 'PEC 169 fomenta a desprofissionalização e a desvalorização docente no país',
            source: 'Sintep-MT',
            url: 'https://sintep.org.br/sintep/Utilidades/view_noticia/pec-169-fomenta-a-desprofissionalizacao-e-a-desvalorizacao-docente-no-pais/i:4323',
          },
          {
            title: 'Por que a CNTE é contra a PEC 169?',
            source: 'CNTE - Confederação Nacional dos Trabalhadores em Educação',
            url: 'https://cnte.org.br/noticias/por-que-a-cnte-e-contra-a-pec-169-a28f',
          },
          {
            title: 'Em nota, CNTE reforça que vitórias parciais nas PECs 66 e 169 exigem manter a mobilização',
            source: 'CPERS-Sindicato',
            url: 'https://cpers.com.br/em-nota-cnte-reforca-que-vitorias-parciais-nas-pecs-66-e-169-exigem-manter-a-mobilizacao/',
          },
        ],
    },
    {
        id: 2519886,
        nome: 'Programa Agora Tem Especialista',
        descricao: 'A MP 1301/2025 criou o Programa Agora Tem Especialistas, uma das maiores iniciativas do SUS para reduzir filas de consultas, exames e cirurgias especializadas. Foi aprovada com 403 votos a favor na Câmara e unanimidade no Senado — uma minoria votou contra. O programa mobiliza a estrutura de saúde do país em seis especialidades prioritárias — oncologia, cardiologia, ginecologia, ortopedia, oftalmologia e otorrinolaringologia — e inclui equipes itinerantes para comunidades indígenas, quilombolas e periferias com baixa infraestrutura de saúde. Também estabelece mecanismo pelo qual planos de saúde e hospitais privados com dívidas com a União convertem parte desses débitos em atendimentos para pacientes do SUS. Em um país onde atrasos no diagnóstico de câncer e doenças cardíacas têm consequências diretas sobre sobrevida, votar contra a expansão de especialistas no sistema público é uma escolha com impacto concreto sobre quem depende exclusivamente da saúde pública.',
        urlVotos: 'https://dadosabertos.camara.leg.br/api/v2/votacoes/2519886-34/votos',
        urlProposicao: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2519886',
        idsDeputadosPodres: IDS_DEPUTADOS_PODRES_MP_AGORA_TEM_ESPECIALISTA,
        tipo: 'positiva',
        temas: ['saúde'],

        referencias: [
          {
            title: 'Congresso Nacional aprova Medida Provisória que criou o Agora Tem Especialistas com ampla maioria',
            source: 'Governo Federal - Ministério da Saúde',
            url: 'https://www.gov.br/saude/pt-br/assuntos/noticias/2025/setembro/congresso-nacional-aprova-medida-provisoria-que-criou-o-agora-tem-especialistas-com-ampla-maioria',
          },
          {
            title: 'Programa Agora Tem Especialista busca reduzir demanda acumulada após ‘gestão irresponsável da pandemia’, diz representante da Saúde',
            source: 'Brasil de Fato',
            url: 'https://www.brasildefato.com.br/2026/01/16/programa-agora-tem-especialista-busca-reduzir-demanda-acumulada-apos-gestao-irresponsavel-da-pandemia-diz-representante-da-saude/',
          },
          {
            title: 'Câmara aprova MP que cria programa Agora Tem Especialistas',
            source: 'Agencia Brasil',
            url: 'https://agenciabrasil.ebc.com.br/saude/noticia/2025-09/camara-aprova-mp-que-cria-programa-agora-tem-especialistas',
          },
        ],
    },
];
