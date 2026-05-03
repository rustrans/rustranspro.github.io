import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  try {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { mode, text } = req.body;

    const data = {
      mode,
      text,
      updatedAt: Date.now()
    };

    await redis.set('status', JSON.stringify(data));

    res.status(200).json({ success: true, data });

  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
}

