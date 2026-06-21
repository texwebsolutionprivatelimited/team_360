import crypto from 'crypto';

export default function handler(req, res) {
  const token = req.query.token || crypto.randomUUID();
  const expire = req.query.expire || Math.floor(Date.now() / 1000) + 2400; // 40 minutes expiry
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "private_cZ7hmg5t88eS1C4/P0EQfhnvGmw=";

  if (!privateKey) {
    return res.status(500).json({ error: "Private key not set" });
  }

  const signature = crypto
    .createHmac('sha1', privateKey)
    .update(token + expire)
    .digest('hex');

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    token,
    expire,
    signature
  });
}
