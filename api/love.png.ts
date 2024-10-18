import path from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node'
import text2png from 'text2png';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const city = decodeURIComponent(`${req.headers['x-vercel-ip-city']}`);
  const country = decodeURIComponent(`${req.headers['x-vercel-ip-country']}`);
  const text = [
    `I love ${city}, ${country}!`,
    'I wish I could visit it one day.',
    `If you also love ${city}, repost this note.`,
    `If you live nearby, write a comment and`,
    `let's be friends!`,
  ].join('\n');
  const pngStream = text2png(text, {
    localFontPath: path.join(__dirname, '..', 'Arial.ttf'),
    localFontName: 'Arial',
    color: 'purple',
    backgroundColor: 'linen',
    font: '20px Arial',
    lineSpacing: 8,
    padding: 25,
    output: 'stream',
  });
  res.setHeader('content-type', 'image/png');
  pngStream.pipe(res)
}
