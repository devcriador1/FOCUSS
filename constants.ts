
import { ServiceItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Sites e Landing Pages',
    description: 'Sites institucionais e Landing Pages de alta conversão. Ultra-rápidos, responsivos e otimizados para vendas.',
    details: 'Desenvolvemos páginas focadas em conversão e performance. Seja um site institucional completo ou uma Landing Page agressiva para vendas, nossa arquitetura garante carregamento instantâneo e pontuação máxima no Google (SEO), essencial para campanhas de tráfego pago.',
    features: [
      'Landing Pages de Alta Conversão',
      'Sites Institucionais Modernos',
      'SEO Otimizado e Semântica Avançada',
      'Integração com Pix e CRMs'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    icon: 'code'
  },
  {
    id: 'saas',
    title: 'Criação de SaaS',
    description: 'Plataformas de Software como Serviço. Sistemas de assinatura, multi-tenancy e alta escalabilidade.',
    details: 'Transformamos sua ideia de negócio em um produto digital recorrente (SaaS). Desenvolvemos a arquitetura completa para suportar milhares de usuários, com gestão de planos, pagamentos recorrentes, isolamento de dados (multi-tenant) e painéis administrativos robustos.',
    features: [
      'Integração de Pagamentos (Stripe/Pagar.me)',
      'Arquitetura Multi-tenant',
      'Automação de Onboarding',
      'Dashboards com Métricas em Tempo Real'
    ],
    techStack: ['Next.js', 'Supabase', 'PostgreSQL', 'Stripe', 'AWS'],
    icon: 'cloud'
  },
  {
    id: 'design',
    title: 'Web Design & UX/UI',
    description: 'Interfaces imersivas e intuitivas. Design focado na experiência do usuário com estética futurista.',
    details: 'O design não é apenas visual, é funcionalidade. Criamos protótipos de alta fidelidade e sistemas de design que garantem consistência visual em todas as plataformas. Nossa abordagem mistura usabilidade com estética Cyberpunk e moderna.',
    features: [
      'Prototipagem Interativa (Figma)',
      'Wireframing e User Flow',
      'Design Systems Completos',
      'Animações e Micro-interações'
    ],
    techStack: ['Figma', 'Adobe XD', 'CSS3 Animations', 'Framer Motion'],
    icon: 'paint'
  },
  {
    id: 'logos',
    title: 'Criação de Logos',
    description: 'Identidade visual marcante. Logos vetoriais que definem a presença da sua marca no mercado.',
    details: 'Desenvolvemos identidades visuais que resistem ao teste do tempo. Entregamos arquivos vetoriais escaláveis para qualquer formato, garantindo que sua marca seja reconhecível em um cartão de visita ou em um outdoor.',
    features: [
      'Logos Vetoriais (AI, EPS, SVG)',
      'Manual de Identidade Visual',
      'Variações de Cor e Monocromáticas',
      'Design de Papelaria Completa'
    ],
    techStack: ['Adobe Illustrator', 'CorelDraw', 'Photoshop', 'Vector Graphics'],
    icon: 'shield'
  },
  {
    id: 'investigation',
    title: 'Investigação Digital',
    description: 'Especialidade em localizar pessoas, identificar autores de golpes virtuais e amparar vítimas de fraudes.',
    details: 'Utilizamos técnicas avançadas de OSINT (Open Source Intelligence) e ferramentas forenses digitais para rastrear pegadas digitais. Nosso foco principal é auxiliar vítimas de estelionato digital a identificar os autores e reunir provas robustas.',
    features: [
      'Rastreamento de Perfis Fake',
      'Localização de Pessoas Desaparecidas',
      'Análise de Metadados de Imagens/Docs',
      'Cruzamento de Dados Públicos (OSINT)'
    ],
    techStack: ['OSINT Framework', 'Maltego', 'IP Tracing', 'Social Engineering', 'Forensic Tools'],
    icon: 'search'
  },
  {
    id: 'apps',
    title: 'Criação de Apps',
    description: 'Aplicativos nativos e híbridos para iOS e Android. Soluções mobile de alta performance.',
    details: 'Desenvolvimento de aplicativos multiplataforma que economizam tempo e custo sem sacrificar a qualidade. Seu app disponível na Apple App Store e Google Play Store com uma única base de código otimizada.',
    features: [
      'Apps para iOS e Android',
      'Integração com Hardware (Câmera, GPS)',
      'Notificações Push',
      'Armazenamento Offline e Sync'
    ],
    techStack: ['React Native', 'Flutter', 'Firebase', 'Expo', 'SQLite'],
    icon: 'smartphone'
  }
];

export const TERMINAL_WELCOME_MSG = `
INICIALIZANDO SISTEMA FOCUSSDEV...
> ACESSO CONCEDIDO
> CARREGANDO MÓDULOS... OK
> IA ASSISTENTE ONLINE

Olá. Eu sou o terminal da FocussDev.
Posso ajudar com informações sobre nossos serviços ou iniciar um protocolo de contato.
Pergunte sobre: "Sites", "SaaS", "Investigação de Golpes", "Apps" ou "Orçamento".
`;
