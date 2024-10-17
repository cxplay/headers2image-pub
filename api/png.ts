import type { VercelRequest, VercelResponse } from '@vercel/node'
import text2png from 'text2png';

function toMultiline(text: string, breakLength: number = 22): string {
  let result = '';
  let lineLength = 0;
  for (const word of text.split(' ')) {
    if (lineLength >= breakLength) {
      result += '\n';
      lineLength = 0;
    }
    result += ` ${word}`;
    lineLength += word.length + 1;
  }
  return result;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const text = [
    `Country: ${req.headers['x-vercel-ip-country']}`,
    `Region (ISO 3166-2): ${req.headers['x-vercel-ip-country-region']}`,
    `City: ${req.headers['x-vercel-ip-city']}`,
    `Timezone: ${req.headers['x-vercel-ip-timezone']}`,
    `Lat: ${req.headers['x-vercel-ip-latitude']} Lng: ${req.headers['x-vercel-ip-longitude']}`,
    `User-Agent: ${req.headers['user-agent']}`,
    `IP: ${req.headers['x-real-ip']}`,
  ].map(line => toMultiline(line)).join('\n');
  const pngStream = text2png(text, {
    color: 'purple',
    backgroundColor: 'linen',
    font: '20px Futura',
    lineSpacing: 4,
    padding: 25,
    output: 'stream',
  });
  res.setHeader('content-type', 'image/png');
  pngStream.pipe(res)
}
