import path from 'path';
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
  const userAgent = req.headers['user-agent']
    ? req.headers['user-agent']
        .replace(/ /g, '·')
        .replace(/([^\s]{32})/g, '\n───────────────────╢$1')
    : 'none';
  const acceptEncoding = req.headers['accept-encoding']
    ? req.headers['accept-encoding'].replace(/ /g, '·')
    : 'none';
  const accept = req.headers['accept']
    ? req.headers['accept'].replace(/([^\s]{32})/g, '\n───────────────────╢$1')
    : 'none';
  const text = [
    `• IP ············· ${req.headers['x-real-ip']}`,
    `• ASN ············ ${req.headers['x-vercel-ip-as-number']}`,
    `• Region ········· ${req.headers['x-vercel-ip-country-region']}`,
    `• City ··········· ${req.headers['x-vercel-ip-city']}`,
    `• Country ········ ${req.headers['x-vercel-ip-country']}`,
    `• Lat/Lng ········ ${req.headers['x-vercel-ip-latitude']}/${req.headers['x-vercel-ip-longitude']}`,
    `• Timezone ······· ${req.headers['x-vercel-ip-timezone']}`,
    `• Language ······· ${req.headers['accept-language']}`,
    `• Cache ·········· ${req.headers['cache-control']}`,
    `• Encoding ······· ${acceptEncoding}`,
    `• Accept ········· ${accept}`,
    `• User-Agent ····· ${userAgent}`,
  ].map(line => toMultiline(line)).join('\n');
  const pngStream = text2png(text, {
    localFontPath: path.join(__dirname, '..', 'UbuntuMono-R.ttf'),
    localFontName: 'UbuntuMono',
    color: 'green',
    backgroundColor: 'black',
    font: '28px UbuntuMono',
    textAlign: 'left',
    lineSpacing: 8,
    padding: 25,
    output: 'stream',
    borderLeftWidth: 100,
    borderRightWidth: 100
  });
  res.setHeader('content-type', 'image/png');
  pngStream.pipe(res)
}
