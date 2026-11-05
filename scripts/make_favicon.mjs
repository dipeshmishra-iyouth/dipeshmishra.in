// Builds the site icons from the iYouth logo: the emblem (figure and wheel) on white, without the wordmark.
// Usage: node scripts/make_favicon.mjs "<path to logo image>"   (needs sharp, resolved from the pnpm store)
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const sharp = createRequire(process.cwd() + "/node_modules/.pnpm/node_modules/")("sharp");
const source = process.argv[2] ?? (() => { throw new Error("Pass the logo image path."); })();

// Emblem box in the logo; it is fitted into a square with a margin so rounded or circular icon masks keep it whole.
const EMBLEM = { left: 60, top: 180, width: 520, height: 740 };
// The first letter of the wordmark and its rule poke into the crop; paint them out.
const WIPE = { left: 440, top: 250, width: 80, height: 220 };
const FILL = 0.84;
const SHADOW_CUTOFF = 222;
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

async function icon(size) {
  const inner = Math.round(size * FILL);
  const white = await sharp({ create: { width: WIPE.width, height: WIPE.height, channels: 3, background: WHITE } }).png().toBuffer();
  const { data, info } = await sharp(source).extract(EMBLEM).composite([{ input: white, left: WIPE.left, top: WIPE.top }]).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  // The logo carries a soft grey drop shadow; snap near-white pixels to white so the icon sits clean on any background.
  for (let i = 0; i < data.length; i += 3) if (Math.min(data[i], data[i + 1], data[i + 2]) > SHADOW_CUTOFF) data[i] = data[i + 1] = data[i + 2] = 255;
  const mark = await sharp(data, { raw: info }).resize({ width: inner, height: inner, fit: "inside" }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: mark, gravity: "centre" }])
    .png();
}

await (await icon(512)).toFile("app/icon.png");
await (await icon(180)).toFile("app/apple-icon.png");

// favicon.ico with one 48 px PNG entry (browsers read PNG-in-ICO directly).
const png = await (await icon(48)).toBuffer();
const dir = Buffer.alloc(22);
dir.writeUInt16LE(1, 2); // type: icon
dir.writeUInt16LE(1, 4); // image count
dir[6] = 48; // width
dir[7] = 48; // height
dir.writeUInt16LE(1, 10); // colour planes
dir.writeUInt16LE(32, 12); // bits per pixel
dir.writeUInt32LE(png.length, 14); // image size
dir.writeUInt32LE(22, 18); // image offset
writeFileSync("app/favicon.ico", Buffer.concat([dir, png]));
console.log("app/icon.png, app/apple-icon.png, app/favicon.ico written");
