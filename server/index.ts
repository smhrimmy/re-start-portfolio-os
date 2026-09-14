import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { readDb, writeDb, SocialQueueItem } from './db';
import { startSocialCronWorker } from './social-cron';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), server: 'Portfolio OS Backend' });
});

// Social Queue Endpoints
app.get('/api/social/queue', (_req, res) => {
  const db = readDb();
  res.json(db.socialQueue);
});

app.post('/api/social/queue', (req, res) => {
  const { platform, content, scheduledAt, mediaUrls } = req.body;

  if (!platform || !content) {
    res.status(400).json({ error: 'Missing required fields: platform and content' });
    return;
  }

  const db = readDb();
  const newItem: SocialQueueItem = {
    id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    platform,
    content,
    mediaUrls: mediaUrls || [],
    scheduledAt: scheduledAt || new Date().toISOString(),
    status: 'queued',
    createdAt: new Date().toISOString(),
  };

  db.socialQueue.push(newItem);
  writeDb(db);

  res.status(201).json(newItem);
});

// Projects Endpoints
app.get('/api/projects', (_req, res) => {
  const db = readDb();
  res.json(db.projects);
});

app.post('/api/projects', (req, res) => {
  const { title, description, tags, repoUrl, liveUrl } = req.body;

  if (!title || !description) {
    res.status(400).json({ error: 'Missing required fields: title and description' });
    return;
  }

  const db = readDb();
  const newProject = {
    id: `proj-${Date.now()}`,
    title,
    description,
    tags: tags || [],
    repoUrl,
    liveUrl,
    updatedAt: new Date().toISOString(),
  };

  db.projects.push(newProject);
  writeDb(db);

  res.status(201).json(newProject);
});

// Start Server and Background Worker
app.listen(PORT, () => {
  console.log(`[Portfolio OS Backend] API server listening on http://localhost:${PORT}`);
  startSocialCronWorker();
});
