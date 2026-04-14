export type WorkflowDefinition = {
  slug: string;
  href: string;
  category: string;
  badge: string;
  title: string;
  description: string;
  status: string;
  estimatedTime: string;
  primaryAction: string;
  secondaryAction: string;
  heroNote: string;
  briefingFields: string[];
  checklist: string[];
  deliverables: string[];
  recentItems: {
    title: string;
    detail: string;
    updatedAt: string;
  }[];
};

export const workflows: WorkflowDefinition[] = [
  {
    slug: "roteiro-video",
    href: "/roteiro-video",
    category: "Producao textual",
    badge: "Alta demanda",
    title: "Roteiro de video",
    description:
      "Estruture ganchos, argumento central e CTA final para reels juridicos sem cair em promessa indevida.",
    status: "Pronto para operacao",
    estimatedTime: "12 min",
    primaryAction: "Novo roteiro",
    secondaryAction: "Duplicar briefing",
    heroNote:
      "Fluxo ideal para transformar tese, duvida recorrente ou decisao recente em video curto com narrativa clara.",
    briefingFields: [
      "Area de atuacao e publico-alvo",
      "Tema central ou pergunta recorrente",
      "Tom desejado: professoral, direto ou institucional",
      "Objetivo do video: autoridade, educacao ou captacao indireta",
      "Oferta de apoio: consulta, material rico ou convite para conversa",
    ],
    checklist: [
      "Evitar promessas de resultado ou linguagem sensacionalista",
      "Explicitar contexto juridico em linguagem acessivel",
      "Fechar com CTA informativo e nao mercantilizado",
      "Preparar 3 variacoes de gancho para testes de retencao",
    ],
    deliverables: [
      "Gancho de 5 segundos",
      "Roteiro principal com divisao por cenas",
      "Versao resumida para stories",
      "CTA final alinhado com OAB",
    ],
    recentItems: [
      {
        title: "Reels sobre inventario extrajudicial",
        detail: "Gancho em formato de pergunta com foco em familias patrimoniais.",
        updatedAt: "Atualizado ha 18 min",
      },
      {
        title: "Video curto sobre demissao sem justa causa",
        detail: "Roteiro de 45 segundos com CTA para diagnostico de documentos.",
        updatedAt: "Atualizado ha 2 h",
      },
    ],
  },
  {
    slug: "roteiro-legenda",
    href: "/roteiro-legenda",
    category: "Producao textual",
    badge: "Conversao",
    title: "Legendas para posts",
    description:
      "Gere legendas com abertura forte, educacao pratica e fechamento que estimula conversa qualificada.",
    status: "Pronto para operacao",
    estimatedTime: "8 min",
    primaryAction: "Nova legenda",
    secondaryAction: "Importar tema do video",
    heroNote:
      "Use este modulo para reaproveitar conteudo do escritorio em carrosseis, posts de autoridade e posts de alerta.",
    briefingFields: [
      "Tipo de post: institucional, educativo ou oportunidade",
      "Ponto juridico principal em uma frase",
      "Objeccao ou mito que precisa ser quebrado",
      "CTA desejado: comentario, direct ou clique em bio",
      "Palavras proibidas ou sensiveis para o nicho",
    ],
    checklist: [
      "Abrir com frase de impacto ou pergunta util",
      "Incluir informacao pratica sem configurar consulta individual",
      "Encerrar com convite para interacao, nao com oferta agressiva",
      "Gerar versao curta para feed e versao expandida para LinkedIn",
    ],
    deliverables: [
      "Legenda principal",
      "Variacao curta para teste A/B",
      "Sugestao de hashtags discretas",
      "Observacao de compliance textual",
    ],
    recentItems: [
      {
        title: "Legenda para post sobre BPC/LOAS",
        detail: "Tom acolhedor com estrutura em 4 paragrafos curtos.",
        updatedAt: "Atualizado ha 34 min",
      },
      {
        title: "Copy para carrossel sobre holdings",
        detail: "Versao feed e versao LinkedIn produzidas no mesmo briefing.",
        updatedAt: "Atualizado ontem",
      },
    ],
  },
  {
    slug: "criacao-imagem",
    href: "/criacao-imagem",
    category: "Direcao de arte",
    badge: "Duplo motor",
    title: "Criacao 1:1",
    description:
      "Organize referencia visual, prompt mestre e saidas 1:1 para Gemini e ChatGPT com criterio de marca.",
    status: "Em refinamento visual",
    estimatedTime: "18 min",
    primaryAction: "Nova sessao 1:1",
    secondaryAction: "Analisar referencia",
    heroNote:
      "Pensado para transformar foto original ou briefing conceitual em imagem quadrada pronta para redes sociais.",
    briefingFields: [
      "Objetivo visual: retrato, institucional ou editorial",
      "Referencia de postura, enquadramento e fundo",
      "Direcao de cor e acabamento desejado",
      "Canal de destino: Instagram feed, carrossel ou anuncio",
      "Restricoes de marca e elementos proibidos",
    ],
    checklist: [
      "Definir enquadramento quadrado desde o briefing",
      "Separar prompt base e prompt de refinamento",
      "Avaliar naturalidade de pele, maos e texto em cena",
      "Registrar qual motor gerou a melhor saida final",
    ],
    deliverables: [
      "Prompt diretor",
      "Prompt de refinamento",
      "Checklist de aprovacao visual",
      "Comparativo Gemini x ChatGPT",
    ],
    recentItems: [
      {
        title: "Ensaio corporativo para tributario",
        detail: "Direcao com tons vinho, chumbo e luz lateral suave.",
        updatedAt: "Atualizado ha 1 h",
      },
      {
        title: "Mockup editorial para direito medico",
        detail: "Saida com fundo texturizado e postura confiante.",
        updatedAt: "Atualizado ontem",
      },
    ],
  },
  {
    slug: "instrucoes-kling",
    href: "/instrucoes-kling",
    category: "Direcao de arte",
    badge: "Motion",
    title: "Instrucoes para Kling",
    description:
      "Prepare direcao de camera, movimento e atmosfera para transformar uma imagem aprovada em video curto.",
    status: "Base operacional criada",
    estimatedTime: "10 min",
    primaryAction: "Nova instrucao",
    secondaryAction: "Converter imagem aprovada",
    heroNote:
      "Modulo focado em descrever movimento, ritmo e atmosfera sem perder a sobriedade exigida pela comunicacao juridica.",
    briefingFields: [
      "Imagem base ou cena de referencia",
      "Movimento de camera desejado",
      "Expressao corporal e ritmo da cena",
      "Clima visual: editorial, premium ou documental",
      "Duracao total e plataforma de destino",
    ],
    checklist: [
      "Descrever movimento com verbos concretos",
      "Manter gestualidade contida e institucional",
      "Evitar transicoes excessivamente publicitarias",
      "Preparar versao curta e versao detalhada do prompt",
    ],
    deliverables: [
      "Prompt principal para Kling",
      "Versao resumida para iteracao rapida",
      "Lista de ajustes por tentativa",
      "Notas de consistencia visual",
    ],
    recentItems: [
      {
        title: "Motion para retrato institucional",
        detail: "Push-in suave com fundo desfocado e respiracao natural.",
        updatedAt: "Atualizado ha 42 min",
      },
      {
        title: "Cena editorial para divorcio consensual",
        detail: "Travelling curto com foco em seriedade e acolhimento.",
        updatedAt: "Atualizado anteontem",
      },
    ],
  },
];

export const dashboardMetrics = [
  {
    label: "Fluxos ativos",
    value: "4",
    detail: "Todos os modulos centrais ja estao acessiveis no menu.",
  },
  {
    label: "Briefings modelo",
    value: "17",
    detail: "Base inicial para reaproveitar temas recorrentes do escritorio.",
  },
  {
    label: "Entregas da semana",
    value: "28",
    detail: "Entre roteiros, legendas, prompts visuais e instrucoes de motion.",
  },
];

export const compliancePillars = [
  "Autoridade sem promessa de resultado",
  "Tom informativo antes de promocional",
  "CTA consultivo e discreto",
  "Padrao visual sobrio e consistente",
];
