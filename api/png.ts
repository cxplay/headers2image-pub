import type { VercelRequest, VercelResponse } from '@vercel/node'
import text2png from 'text2png';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const text = [
    `Country: ${req.headers['x-vercel-ip-country']}`,
    `Region (ISO 3166-2): ${req.headers['x-vercel-ip-country-region']}`,
    `City: ${req.headers['x-vercel-ip-city']}`,
    `Timezone: ${req.headers['x-vercel-ip-timezone']}`,
    `Lat: ${req.headers['x-vercel-ip-latitude']} Lng: ${req.headers['x-vercel-ip-longitude']}`,
    `User-Agent: ${req.headers['user-agent']}`,
    `IP: ${req.headers['x-real-ip']}`,
  ].join('\n');
  const pngStream = text2png(text, { color: 'purple' });
  res.setHeader('content-type', 'image/png');
  pngStream.pipe(res);
}
