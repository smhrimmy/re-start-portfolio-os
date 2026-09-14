export interface ContentRevision {
  id: string;
  entityType: 'project' | 'blog' | 'bio' | 'settings' | 'experience' | 'resume' | 'media' | 'testimonial' | 'comment' | 'seo';
  entityId: string;
  timestamp: string;
  author: string;
  commitMessage: string;
  beforeSnapshot: Record<string, unknown>;
  afterSnapshot: Record<string, unknown>;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  tags: string[];
  coverImage?: string;
  repoUrl?: string;
  liveUrl?: string;
  starsCount?: number;
  viewsCount?: number;
  updatedAt: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  status: 'Draft' | 'Scheduled' | 'Published' | 'Archived';
  tags: string[];
  readingTimeMinutes: number;
  wordCount: number;
  publishedAt?: string;
  updatedAt: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  technologies: string[];
}

export interface ResumeConfig {
  summary: string;
  skills: string[];
  education: Array<{ degree: string; institution: string; year: string }>;
  certifications: Array<{ title: string; issuer: string; date: string }>;
  resumePdfUrl?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: string;
  sizeBytes: number;
  uploadedAt: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  quote: string;
  rating: number;
  isVisible: boolean;
  createdAt: string;
}

export interface CommentItem {
  id: string;
  authorName: string;
  authorEmail: string;
  articleSlug: string;
  articleTitle: string;
  content: string;
  status: 'Pending' | 'Approved' | 'Spam' | 'Trash';
  createdAt: string;
}

export interface AnalyticsData {
  totalVisitors: number;
  totalPageviews: number;
  uniqueSessions: number;
  avgDurationMinutes: number;
  trafficSources: Array<{ source: string; count: number; percentage: number }>;
  devices: Array<{ device: string; count: number; percentage: number }>;
  topCountries: Array<{ country: string; code: string; count: number }>;
  topPages: Array<{ path: string; views: number }>;
  topProjects: Array<{ title: string; views: number }>;
}

export interface SEOSettings {
  siteTitle: string;
  titleTemplate: string;
  defaultMetaDescription: string;
  canonicalBaseUrl: string;
  openGraphImageUrl: string;
  twitterHandle: string;
  robotsTxtContent: string;
  sitemapAutoGenerate: boolean;
  indexingEnabled: boolean;
}

export interface AIWorkspacePrompt {
  id: string;
  title: string;
  promptText: string;
  category: 'bio' | 'project' | 'blog' | 'social';
}

export interface SocialPost {
  id: string;
  platform: 'linkedin' | 'x' | 'telegram';
  content: string;
  scheduledAt: string;
  status: 'Pending' | 'Approved' | 'Dispatched' | 'Failed' | 'Simulated';
  errorMessage?: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  entityType: string;
  entityId: string;
  author: string;
  revisionId?: string;
}

export interface ThemeOverrideConfig {
  activeThemeId: string;
  primaryColor: string;
  surfaceColor: string;
  borderRadiusPx: number;
  fontScale: number;
}
