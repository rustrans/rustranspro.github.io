const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

module.exports = async (req, res) => {

  // GET = получить сообщения
  if (req.method === "GET") {

    const messages = await redis.get("chat_messages");

    return res.status(200).json(messages || []);
  }

  // POST = добавить сообщение
  if (req.method === "POST") {

    const { author, text } = req.body;

    if (!text || text.length > 1000) {
      return res.status(400).json({
        error: "Invalid message"
      });
    }

    const messages = await redis.get("chat_messages") || [];

    messages.push({
      author,
      text,
      time: Date.now()
    });

    // храним только последние 50 сообщений
    const lastMessages = messages.slice(-50);

    await redis.set("chat_messages", lastMessages);

    return res.status(200).json({
      success: true
    });
  }

  return res.status(405).json({
    error: "Method not allowed"
  });
};
