// Turns the selected event photos into the WebP sizes and crops the site uses.
// Usage: node scripts/make_gallery.mjs "<folder with the Portfolio Gallery 1 and 2 subfolders>"   (needs sharp, resolved from the pnpm store)
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const sharp = createRequire(process.cwd() + "/node_modules/.pnpm/node_modules/")("sharp");
const root = process.argv[2];
if (!root) throw new Error("Pass the Portfolio Gallery folder as the first argument.");

const out = join(process.cwd(), "public", "media", "gallery");
mkdirSync(out, { recursive: true });

const f = (dir, time) => join(root, dir, `WhatsApp Image 2026-11-02 at ${time}.jpeg`);

// Full frames for the Media page (long edge 1400 px).
const full = {
  "ribbon-cutting": f("1", "1.14.33 PM"),
  "speaking-close": f("1", "1.13.53 PM"),
  "speaking-gesture": f("1", "1.14.10 PM"),
  handshake: f("1", "1.14.01 PM"),
  roundtable: f("1", "1.15.30 PM"),
  "field-walk": f("2", "1.19.35 PM"),
};

// Crops for fixed slots: [source key, left, top, width, height, output width].
const crops = {
  "ribbon-4x5": ["ribbon-cutting", 560, 0, 720, 900, 800],
  "speaking-close-4x5": ["speaking-close", 600, 0, 720, 900, 800],
  "speaking-gesture-4x5": ["speaking-gesture", 450, 0, 720, 900, 800],
};

const sizes = {};
for (const [name, src] of Object.entries(full)) {
  const info = await sharp(src).rotate().resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 78 }).toFile(join(out, `${name}.webp`));
  sizes[name] = [info.width, info.height];
}
for (const [name, [key, left, top, width, height, outW]] of Object.entries(crops)) {
  const info = await sharp(full[key]).rotate().extract({ left, top, width, height }).resize({ width: outW }).webp({ quality: 80 }).toFile(join(out, `${name}.webp`));
  sizes[name] = [info.width, info.height];
}

// Social preview (Open Graph / Twitter), 1200 x 630.
await sharp(full["speaking-close"]).rotate().resize({ width: 1200, height: 630, fit: "cover", position: "attention" }).jpeg({ quality: 82, mozjpeg: true }).toFile(join(process.cwd(), "public", "media", "og.jpg"));

// Sea-side portrait: the 1024 px square, cropped to the 4:5 the site already uses.
const sea = await sharp(f("2", "1.19.34 PM")).rotate().extract({ left: 102, top: 0, width: 819, height: 1024 }).webp({ quality: 82 }).toFile(join(process.cwd(), "public", "media", "dipesh-sea.webp"));
sizes["dipesh-sea"] = [sea.width, sea.height];

console.log(JSON.stringify(sizes, null, 1));
