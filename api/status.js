import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  try {
    // ✅ CORS (чтобы сайт мог обращаться к API)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const status = await redis.get('status');

    let parsed = null;

    if (status) {
      try {
        parsed = typeof status === 'string' ? JSON.parse(status) : status;
      } catch (e) {
        parsed = null;
      }
    }

    res.status(200).json(
      parsed || {
        mode: "unknown",
        text: "Status nicht gesetzt",
        updatedAt: 0
      }
    );

  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}
