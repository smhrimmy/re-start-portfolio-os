import {
  ContentRevision,
  ProjectItem,
  ArticleItem,
  ExperienceItem,
  ResumeConfig,
  MediaAsset,
  TestimonialItem,
  CommentItem,
  AnalyticsData,
  SEOSettings,
  AIWorkspacePrompt,
  SocialPost,
  AuditLogEntry,
  ThemeOverrideConfig,
} from '../types/admin-types';

const STORAGE_KEY = 'portfolio_os_admin_store_v3';

interface AdminStoreState {
  projects: ProjectItem[];
  articles: ArticleItem[];
  experiences: ExperienceItem[];
  resumeConfig: ResumeConfig;
  mediaAssets: MediaAsset[];
  testimonials: TestimonialItem[];
  comments: CommentItem[];
  analytics: AnalyticsData;
  seoSettings: SEOSettings;
  aiPrompts: AIWorkspacePrompt[];
  revisions: ContentRevision[];
  socialQueue: SocialPost[];
  auditLogs: AuditLogEntry[];
  themeOverrides: ThemeOverrideConfig;
  passcodeHash: string;
}

const REAL_PROJECTS_5: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'SupportOS',
    slug: 'support-os',
    tagline: 'AI-assisted customer support orchestration platform with automated ticket routing.',
    description: '# SupportOS\nEnterprise support automation platform with real-time sentiment analysis and agent assist tools.',
    tags: ['React', 'TypeScript', 'Node.js', 'AI'],
    repoUrl: 'https://github.com/user/support-os',
    liveUrl: 'https://support-os.dev',
    starsCount: 210,
    viewsCount: 5420,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-2',
    title: 'OptiTalent HRMS',
    slug: 'optitalent-hrms',
    tagline: 'Human resource management system with automated payroll and talent analytics.',
    description: '# OptiTalent HRMS\nComprehensive HR management suite for candidate tracking, performance reviews, and payroll.',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    repoUrl: 'https://github.com/user/optitalent-hrms',
    liveUrl: 'https://optitalent-hrms.dev',
    starsCount: 185,
    viewsCount: 4210,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-3',
    title: 'Finverse Financial OS',
    slug: 'finverse-financial-os',
    tagline: 'Real-time financial analytics dashboard and portfolio tracking suite.',
    description: '# Finverse Financial OS\nHigh-throughput financial dashboard supporting multi-asset ledger sync and predictive market charts.',
    tags: ['React', 'TypeScript', 'D3.js', 'Express'],
    repoUrl: 'https://github.com/user/finverse-financial-os',
    liveUrl: 'https://finverse-financial-os.dev',
    starsCount: 340,
    viewsCount: 8900,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-4',
    title: 'Cashflow Wealth OS',
    slug: 'cashflow-wealth-os',
    tagline: 'Personal wealth management and automated cashflow budgeting engine.',
    description: '# Cashflow Wealth OS\nBudget tracking and automated recurring bill management with intelligent forecasting.',
    tags: ['React', 'Node.js', 'SQLite', 'Tailwind'],
    repoUrl: 'https://github.com/user/cashflow-wealth-os',
    liveUrl: 'https://cashflow-wealth-os.dev',
    starsCount: 160,
    viewsCount: 3100,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-5',
    title: 'FictionZone',
    slug: 'fictionzone',
    tagline: 'Interactive storytelling platform with AI-generated narrative branching.',
    description: '# FictionZone\nDigital publication platform allowing interactive choice-driven literature.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Canvas'],
    repoUrl: 'https://github.com/user/fictionzone',
    liveUrl: 'https://fictionzone.dev',
    starsCount: 290,
    viewsCount: 7100,
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Designing a 27-Theme Portfolio System',
    slug: 'designing-27-theme-portfolio-system',
    summary: 'How modular code-splitting and hardware capability tiering enable 60fps performance across 27 distinct visual identities.',
    content: '# Designing a 27-Theme Portfolio System\n\n## Abstract\nPerformance optimization in 3D-heavy portfolio applications requires strict hardware tiering...\n',
    status: 'Published',
    tags: ['Architecture', 'WebGL', 'React'],
    readingTimeMinutes: 5,
    wordCount: 850,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-2',
    title: 'Building Enterprise HRMS & Financial OS Platforms',
    slug: 'building-enterprise-hrms-financial-os',
    summary: 'Architectural lessons learned scaling multi-tenant HR management systems and financial ledger analytical engines.',
    content: '# Building Enterprise HRMS & Financial OS Platforms\n\n## High-Throughput Analytics\nData processing at scale demands resilient data pipelines...\n',
    status: 'Published',
    tags: ['Engineering', 'Architecture', 'TypeScript'],
    readingTimeMinutes: 7,
    wordCount: 1200,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'VP of Engineering',
    company: 'Finverse Labs',
    quote: 'Prajwal delivered an exceptional financial dashboard system with 60fps rendering performance.',
    rating: 5,
    isVisible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test-2',
    name: 'Marcus Chen',
    role: 'Lead Architect',
    company: 'SupportOS Inc',
    quote: 'The modular multi-theme architecture and device capability tiering were built with outstanding precision.',
    rating: 5,
    isVisible: true,
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'com-1',
    authorName: 'Alex Rivera',
    authorEmail: 'alex@example.com',
    articleSlug: 'designing-27-theme-portfolio-system',
    articleTitle: 'Designing a 27-Theme Portfolio System',
    content: 'Great write-up on WebGL fallback tiering! How did you handle Three.js context loss on low-memory Android devices?',
    status: 'Approved',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'com-2',
    authorName: 'CryptoBot Spammer',
    authorEmail: 'bot@spam.com',
    articleSlug: 'designing-27-theme-portfolio-system',
    articleTitle: 'Designing a 27-Theme Portfolio System',
    content: 'Free coins available now at badlink.com!',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_ANALYTICS: AnalyticsData = {
  totalVisitors: 14820,
  totalPageviews: 48910,
  uniqueSessions: 11450,
  avgDurationMinutes: 4.2,
  trafficSources: [
    { source: 'Direct / Organic Search', count: 6840, percentage: 46 },
    { source: 'GitHub Repositories', count: 4450, percentage: 30 },
    { source: 'LinkedIn & Social', count: 2230, percentage: 15 },
    { source: 'Referral / Tech Blogs', count: 1300, percentage: 9 },
  ],
  devices: [
    { device: 'Desktop (1024px+)', count: 8892, percentage: 60 },
    { device: 'Mobile Phone (360px-412px)', count: 4446, percentage: 30 },
    { device: 'Tablet (768px)', count: 1482, percentage: 10 },
  ],
  topCountries: [
    { country: 'United States', code: 'US', count: 5928 },
    { country: 'Germany', code: 'DE', count: 2223 },
    { country: 'India', code: 'IN', count: 2074 },
    { country: 'United Kingdom', code: 'GB', count: 1482 },
    { country: 'Canada', code: 'CA', count: 1185 },
  ],
  topPages: [
    { path: '/', views: 18450 },
    { path: '/projects', views: 12300 },
    { path: '/blog/designing-27-theme-portfolio-system', views: 6420 },
    { path: '/resume', views: 5100 },
    { path: '/admin', views: 2440 },
  ],
  topProjects: [
    { title: 'Finverse Financial OS', views: 8900 },
    { title: 'FictionZone', views: 7100 },
    { title: 'SupportOS', views: 5420 },
    { title: 'OptiTalent HRMS', views: 4210 },
    { title: 'Cashflow Wealth OS', views: 3100 },
  ],
};

const INITIAL_SEO: SEOSettings = {
  siteTitle: 'Portfolio OS — Autonomous Multi-Theme Portfolio System',
  titleTemplate: '%s | Portfolio OS',
  defaultMetaDescription: 'Senior Software Engineer portfolio featuring 27 dynamic themes, hardware device tiering, and real-time CMS automation.',
  canonicalBaseUrl: 'https://portfolio-os.dev',
  openGraphImageUrl: 'https://portfolio-os.dev/og-cover.png',
  twitterHandle: '@portfolio_os',
  robotsTxtContent: `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: https://portfolio-os.dev/sitemap.xml`,
  sitemapAutoGenerate: true,
  indexingEnabled: true,
};

const INITIAL_AI_PROMPTS: AIWorkspacePrompt[] = [
  {
    id: 'prompt-1',
    title: 'Polish Project Tagline',
    promptText: 'Rewrite this project tagline to be punchy, result-oriented, and highlight architecture strengths.',
    category: 'project',
  },
  {
    id: 'prompt-2',
    title: 'Generate Blog Outline',
    promptText: 'Create a 5-section technical blog outline explaining how hardware tiering optimizes WebGL 3D performance.',
    category: 'blog',
  },
];

const INITIAL_STATE: AdminStoreState = {
  projects: REAL_PROJECTS_5,
  articles: INITIAL_ARTICLES,
  experiences: [
    {
      id: 'exp-1',
      role: 'Senior Frontend Architect',
      company: 'TechCorp Solutions',
      period: '2023 - Present',
      location: 'San Francisco, CA',
      description: 'Led architecture for web operating systems and high-throughput dashboard engines.',
      technologies: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS'],
    },
  ],
  resumeConfig: {
    summary: 'Senior Software Engineer specializing in high-performance web applications, 3D interactive graphics, and resilient backend services.',
    skills: ['TypeScript', 'React', 'Three.js / WebGL', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    education: [{ degree: 'B.S. in Computer Science', institution: 'State University', year: '2017 - 2021' }],
    certifications: [{ title: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023' }],
    resumePdfUrl: '/assets/resume.pdf',
  },
  mediaAssets: [
    {
      id: 'media-1',
      name: 'hero-banner.webp',
      url: '/assets/hero-banner.webp',
      type: 'image/webp',
      sizeBytes: 124500,
      uploadedAt: new Date().toISOString(),
    },
  ],
  testimonials: INITIAL_TESTIMONIALS,
  comments: INITIAL_COMMENTS,
  analytics: INITIAL_ANALYTICS,
  seoSettings: INITIAL_SEO,
  aiPrompts: INITIAL_AI_PROMPTS,
  revisions: [
    {
      id: 'rev-init',
      entityType: 'project',
      entityId: 'proj-1',
      timestamp: new Date().toISOString(),
      author: 'Admin Core',
      commitMessage: 'Seeded 5 production projects (SupportOS, OptiTalent, Finverse, Cashflow, FictionZone)',
      beforeSnapshot: {},
      afterSnapshot: REAL_PROJECTS_5[0] as unknown as Record<string, unknown>,
    },
  ],
  socialQueue: [
    {
      id: 'post-1',
      platform: 'telegram',
      content: '🚀 SupportOS & Finverse Financial OS updated in Portfolio OS showcase.',
      scheduledAt: new Date().toISOString(),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    },
  ],
  auditLogs: [
    {
      id: 'log-1',
      timestamp: new Date().toISOString(),
      action: 'SYSTEM_INITIALIZED',
      entityType: 'system',
      entityId: 'root',
      author: 'Admin Core',
    },
  ],
  themeOverrides: {
    activeThemeId: 'theme-01',
    primaryColor: '#10b981',
    surfaceColor: '#ececeb',
    borderRadiusPx: 12,
    fontScale: 1.0,
  },
  passcodeHash: '1234',
};

export function loadAdminStore(): AdminStoreState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    return JSON.parse(raw);
  } catch {
    return INITIAL_STATE;
  }
}

export function saveAdminStore(state: AdminStoreState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('[AdminStore] Save error:', err);
  }
}

export function addRevisionCommit(
  store: AdminStoreState,
  entityType: 'project' | 'blog' | 'bio' | 'settings' | 'experience' | 'resume' | 'media' | 'testimonial' | 'comment' | 'seo',
  entityId: string,
  commitMessage: string,
  beforeSnapshot: Record<string, unknown>,
  afterSnapshot: Record<string, unknown>
): ContentRevision {
  const revision: ContentRevision = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    entityType,
    entityId,
    timestamp: new Date().toISOString(),
    author: 'Admin User',
    commitMessage,
    beforeSnapshot,
    afterSnapshot,
  };

  store.revisions.unshift(revision);
  store.auditLogs.unshift({
    id: `audit-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: `UPDATE_${entityType.toUpperCase()}`,
    entityType,
    entityId,
    author: 'Admin User',
    revisionId: revision.id,
  });

  saveAdminStore(store);
  return revision;
}
