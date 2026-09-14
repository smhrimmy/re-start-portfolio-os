import fs from 'fs';
import path from 'path';

export interface SocialQueueItem {
  id: string;
  platform: 'linkedin' | 'x' | 'telegram';
  content: string;
  mediaUrls?: string[];
  scheduledAt: string; // ISO string
  status: 'queued' | 'processing' | 'published' | 'failed';
  errorMessage?: string;
  createdAt: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  updatedAt: string;
}

interface DatabaseSchema {
  projects: ProjectItem[];
  socialQueue: SocialQueueItem[];
  credentials: Record<string, string>;
}

const DB_FILE = path.resolve(process.cwd(), 'data/db.json');

function initDb(): DatabaseSchema {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      projects: [],
      socialQueue: [],
      credentials: {},
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { projects: [], socialQueue: [], credentials: {} };
  }
}

export function readDb(): DatabaseSchema {
  return initDb();
}

export function writeDb(data: DatabaseSchema): void {
  initDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
