// Prints the gzip size of the scripts each route loads on first paint (legacy noModule polyfills excluded).
// Usage: node scripts/measure_js.mjs [baseUrl] [path ...]   (run against `next start`)
import { gzipSync } from "node:zlib";

const base = process.argv[2] ?? "http://localhost:3010";
const paths = process.argv.slice(3);
const routes = paths.length ? paths : ["/en", "/hi", "/en/about", "/en/iyouth-store", "/en/contact", "/en/media"];

const sizeCache = new Map();
async function gz(url) {
  if (!sizeCache.has(url)) {
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    sizeCache.set(url, gzipSync(buf).length);
  }
  return sizeCache.get(url);
}

for (const route of routes) {
  const html = await (await fetch(base + route)).text();
  const srcs = [...new Set([...html.matchAll(/<script(?![^>]*noModule)[^>]+src="([^"]+)"/g)].map((m) => m[1]))];
  const sizes = await Promise.all(srcs.map((s) => gz(new URL(s, base).href)));
  const total = sizes.reduce((a, b) => a + b, 0);
  console.log(`${route.padEnd(20)} ${(total / 1024).toFixed(1)} KB gzip across ${srcs.length} scripts`);
  if (route === routes[0]) {
    srcs
      .map((s, i) => [s.split("/").pop(), sizes[i]])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .forEach(([n, s]) => console.log(`   ${(s / 1024).toFixed(1).padStart(6)} KB  ${n}`));
  }
}
