// Generates the dry-brush stroke used behind the hero signature as a transparent WebP mask.
// Usage: node scripts/make_brush.mjs   (needs sharp, resolved from the pnpm store)
import { createRequire } from "node:module";

const sharp = createRequire(process.cwd() + "/node_modules/.pnpm/node_modules/")("sharp");
const W = 1600;
const H = 470;

// Seeded random so the stroke is identical on every run.
let seed = 20261103;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

const lattice = new Float32Array(512 * 512).map(() => rand());
const smooth = (t) => t * t * (3 - 2 * t);
function noise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = smooth(x - xi), yf = smooth(y - yi);
  const at = (a, b) => lattice[((b & 511) << 9) | (a & 511)];
  const top = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * xf;
  const bot = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * xf;
  return top + (bot - top) * yf;
}
const fbm1 = (v, s) => 0.6 * noise(v, s) + 0.3 * noise(v * 2.3, s + 9) + 0.1 * noise(v * 5.1, s + 31);

const alpha = new Float32Array(W * H);
const cy = H / 2;

for (let y = 0; y < H; y++) {
  const v = 1 - Math.abs(y - cy) / (H * 0.5);
  if (v <= 0) continue;
  const body = Math.pow(smooth(Math.min(1, v / 0.16)), 0.45); // rows near the stroke's top/bottom are shorter
  // bristle lengths: neighbouring rows are correlated, so they read as bands of hair
  const bl = fbm1(y / 6, 3);
  const br = fbm1(y / 6, 77);
  const spikeL = rand() < 0.07 ? 140 + rand() * 140 : 0;
  const spikeR = rand() < 0.07 ? 140 + rand() * 160 : 0;
  const left = 90 + (1 - body) * 200 + (1 - bl) * 210 - spikeL;
  const right = W - 90 - (1 - body) * 200 - (1 - br) * 240 + spikeR;
  for (let x = Math.max(0, Math.floor(left)); x < Math.min(W, right); x++) {
    const toEnd = Math.min(x - left, right - x);
    // ragged top and bottom edges: the slab is never a clean rectangle
    if (y < 10 + 38 * noise(x / 16, 5) + 26 * noise(x / 110, 6) || y > H - 10 - 38 * noise(x / 16, 9) - 26 * noise(x / 110, 12)) continue;
    const dry = Math.max(0.24, 1 - Math.min(1, toEnd / 380)); // the stroke gets drier toward its ends
    const n = 0.65 * noise(x / 38, y / 2.4) + 0.35 * noise(x / 120, y / 1.6);
    const gap = Math.pow(dry, 1.1) * 0.9;
    const a = Math.min(1, Math.max(0, (n - gap) / 0.08));
    // soft ends so the tip fades like loaded paint running out
    const edge = Math.min(1, toEnd / 6);
    alpha[y * W + x] = a * edge;
  }
}

// a few splatters just past each end
for (let i = 0; i < 70; i++) {
  const side = rand() < 0.5 ? -1 : 1;
  const px = side < 0 ? 40 + rand() * 120 : W - 40 - rand() * 120;
  const py = cy + (rand() - 0.5) * H * 0.7;
  const r = 1 + rand() * rand() * 6;
  for (let y = -r; y <= r; y++)
    for (let x = -r; x <= r; x++)
      if (x * x + y * y <= r * r) {
        const X = Math.round(px + x), Y = Math.round(py + y);
        if (X >= 0 && X < W && Y >= 0 && Y < H) alpha[Y * W + X] = 1;
      }
}

const rgba = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) {
  rgba[i * 4] = rgba[i * 4 + 1] = rgba[i * 4 + 2] = 255;
  rgba[i * 4 + 3] = Math.round(alpha[i] * 255);
}
const info = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .blur(0.7)
  .webp({ quality: 88, alphaQuality: 100 })
  .toFile("public/media/brush.webp");
console.log(`brush.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`);
