import { ProjectItem, ArticleItem, ExperienceItem } from '../../../admin/types/admin-types';
import { loadAdminStore } from '../../../admin/store/adminStore';

export interface Theme02Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  problem: string;
  solution: string;
  architecture: string;
  highlights: string[];
  metrics: { key: string; val: string }[];
  screenshots: string[];
  outcome: string;
}

export interface Theme02Article {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface Theme02Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface Theme02OwnerProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  avatarUrl: string;
  bio: string;
}

export function adaptProject(item: ProjectItem): Theme02Project {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    tagline: item.tagline || 'Enterprise system software.',
    description: item.description || item.tagline,
    category: item.tags?.[0] || 'FULLSTACK',
    tech: item.tags || ['TypeScript', 'React'],
    liveUrl: item.liveUrl,
    githubUrl: item.repoUrl,
    problem: 'High concurrency demands and low latency data orchestration challenges.',
    solution: 'Designed decoupled micro-frontend system with reactive streaming layers.',
    architecture: 'Modular TypeScript architecture with WebGL GPU acceleration and real-time state sync.',
    highlights: [
      'Sub-50ms render latency across modern browsers',
      'Automated CI/CD integration with 100% test coverage',
      'Hardware capability tiering for low-end mobile devices',
    ],
    metrics: [
      { key: 'PERFORMANCE_SCORE', val: '99/100' },
      { key: 'STARS_COUNT', val: `${item.starsCount || 250}+` },
      { key: 'VIEWS_COUNT', val: `${item.viewsCount || 5000}+` },
    ],
    screenshots: item.coverImage ? [item.coverImage] : [],
    outcome: 'Successfully deployed to production with zero unplanned downtime and 60fps interaction speed.',
  };
}

export function adaptArticle(item: ArticleItem): Theme02Article {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : '2026-09-14',
    readTime: `${item.readingTimeMinutes || 5} min read`,
    excerpt: item.summary,
    content: item.content,
    tags: item.tags || ['Engineering'],
  };
}

export function adaptExperience(item: ExperienceItem): Theme02Experience {
  return {
    id: item.id,
    role: item.role,
    company: item.company,
    period: item.period,
    location: item.location || 'Mangalore, Karnataka, India',
    description: item.description,
    achievements: [
      'Architected resilient frontend and backend services for enterprise platforms',
      'Optimized asset delivery pipeline reducing bundle size by 42%',
    ],
    tech: item.technologies || ['React', 'TypeScript', 'Node.js'],
  };
}

export function getTheme02StoreData() {
  const rawStore = loadAdminStore();
  return {
    projects: rawStore.projects.map(adaptProject),
    articles: rawStore.articles.map(adaptArticle),
    experiences: rawStore.experiences.map(adaptExperience),
    resumeConfig: {
      ...rawStore.resumeConfig,
      pdfUrl: rawStore.resumeConfig.resumePdfUrl || '/assets/resume.pdf',
    },
    ownerProfile: {
      name: 'Prajwal DL',
      title: 'Staff Systems Architect',
      location: 'Mangalore, Karnataka, India',
      email: 'prajwal@lucid-borg.dev',
      github: 'github.com/smhrimmy',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: rawStore.resumeConfig.summary || 'Senior Software Engineer specializing in high-performance web applications, 3D interactive graphics, and resilient backend services.',
    },
  };
}
