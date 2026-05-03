import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 👇 ВАЖНО: парсим вручную
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body;

    const { mode, text } = body;

    const data = {
      mode,
      text,
      updatedAt: Date.now()
    };

    await redis.set('status', JSON.stringify(data));

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}
