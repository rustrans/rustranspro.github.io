import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  const status = await redis.get('status');

  const parsed = status ? JSON.parse(status) : null;

  res.json(
    parsed || {
      mode: "unknown",
      text: "Статус не задан",
      updatedAt: 0
    }
  );
}
