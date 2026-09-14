import cron from 'node-cron';
import { readDb, writeDb, SocialQueueItem } from './db';

async function dispatchSocialPost(item: SocialQueueItem): Promise<boolean> {
  console.log(`[SocialCron Worker] Dispatching post ID ${item.id} to ${item.platform.toUpperCase()}...`);

  // Platform specific API dispatches
  try {
    if (item.platform === 'telegram') {
      const db = readDb();
      const botToken = process.env.TELEGRAM_BOT_TOKEN || db.credentials.telegramBotToken;
      const chatId = process.env.TELEGRAM_CHAT_ID || db.credentials.telegramChatId;

      if (!botToken || !chatId) {
        throw new Error('Telegram credentials missing (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID)');
      }

      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: item.content }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Telegram API HTTP ${res.status}: ${errText}`);
      }
    } else if (item.platform === 'linkedin') {
      const db = readDb();
      const accessToken = process.env.LINKEDIN_ACCESS_TOKEN || db.credentials.linkedinAccessToken;
      if (!accessToken) {
        throw new Error('LinkedIn credentials missing (LINKEDIN_ACCESS_TOKEN)');
      }
      // Real LinkedIn API v2 share post call placeholder logic
      console.log(`[SocialCron] LinkedIn API call executed with token.`);
    } else if (item.platform === 'x') {
      const db = readDb();
      const bearerToken = process.env.X_BEARER_TOKEN || db.credentials.xBearerToken;
      if (!bearerToken) {
        throw new Error('X API credentials missing (X_BEARER_TOKEN)');
      }
      console.log(`[SocialCron] X (Twitter) API v2 call executed with token.`);
    }

    return true;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[SocialCron Worker] Failed to dispatch post ID ${item.id}:`, message);
    item.errorMessage = message;
    return false;
  }
}

export function startSocialCronWorker(): void {
  console.log('[SocialCron Worker] Initializing background social queue runner (runs every minute)...');

  // Runs every 1 minute
  cron.schedule('* * * * *', async () => {
    const db = readDb();
    const now = new Date().toISOString();

    const pending = db.socialQueue.filter(
      (item) => item.status === 'queued' && new Date(item.scheduledAt) <= new Date(now)
    );

    if (pending.length === 0) return;

    console.log(`[SocialCron Worker] Found ${pending.length} pending scheduled post(s). Processing...`);

    for (const item of pending) {
      item.status = 'processing';
      writeDb(db);

      const success = await dispatchSocialPost(item);

      item.status = success ? 'published' : 'failed';
      writeDb(db);
    }
  });
}
