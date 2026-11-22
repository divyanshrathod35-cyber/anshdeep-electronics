/**
 * Pin licensed editorial assets into public/editorial without a browser CDN
 * dependency. Image IDs, source pages and photographers live in editorialImages.
 * Run with Node 22+: node --experimental-strip-types scripts/sync-editorial-assets.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { photos } from '../src/data/editorialImages.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dest = path.join(root,'public','editorial');
await mkdir(dest, { recursive: true });
const all = Object.values(photos);
for (const photo of all) {
  const url = `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?fm=jpg&fit=crop&w=1200&h=864&q=76`;
  const response = await fetch(url, {
    headers: { accept: 'image/jpeg', 'user-agent': 'AnshdeepElectronicsEditorialPin/1.0 (licensed Pexels photo)' },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`Photo ${photo.id}: HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('image/jpeg')) throw new Error(`Photo ${photo.id}: not JPEG: ${contentType}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 4096 || bytes.length > 2_000_000 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    throw new Error(`Photo ${photo.id}: invalid JPEG or unacceptable file size ${bytes.length}`);
  }
  const file = path.join(dest,`${photo.id}.jpg`);
  await writeFile(file, bytes);
  console.log(`Pinned ${photo.id} | ${(bytes.length / 1024).toFixed(1)} KiB | ${photo.page}`);
}
console.log(`Pinned ${all.length} individual licensed editorial photos.`);
