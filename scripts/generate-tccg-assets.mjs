import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");

const srcSvgPath = path.join(projectRoot, "public", "assets", "tccg", "logo.svg");
const outDir = path.join(projectRoot, "public", "assets", "tccg");

function stripWhiteBackground(svg) {
  // Removes a common "full white background" group if present.
  return svg.replace(/<g\s+fill=\"#ffffff\">[\s\S]*?<\/g>\s*\n?<\/g>/i, "");
}

function extractInnerSvg(svg) {
  const match = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  if (!match) return svg;
  return match[1];
}

function buildFaviconSvg(innerSvg, { width, height }) {
  const canvas = 512;
  const padding = 64;
  const scale = (canvas - padding * 2) / Math.max(width, height);
  const translateX = (canvas - width * scale) / 2;
  const translateY = (canvas - height * scale) / 2;

  return `<?xml version="1.0" encoding="utf-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas}" height="${canvas}" viewBox="0 0 ${canvas} ${canvas}">\n` +
    `  <g transform="translate(${translateX.toFixed(3)} ${translateY.toFixed(3)}) scale(${scale.toFixed(6)})">\n` +
    innerSvg +
    `\n  </g>\n</svg>\n`;
}

async function renderPng(svg, outPath, fitTo) {
  const resvg = new Resvg(svg, {
    fitTo,
  });
  const png = resvg.render().asPng();
  await fs.writeFile(outPath, png);
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const raw = await fs.readFile(srcSvgPath, "utf8");

  // Determine intrinsic size from the SVG attributes (defaults are the file's). 
  const widthMatch = raw.match(/\bwidth=\"(\d+(?:\.\d+)?)px\"/i);
  const heightMatch = raw.match(/\bheight=\"(\d+(?:\.\d+)?)px\"/i);
  const width = widthMatch ? Number(widthMatch[1]) : 889;
  const height = heightMatch ? Number(heightMatch[1]) : 500;

  const transparentSvg = stripWhiteBackground(raw);
  const transparentSvgPath = path.join(outDir, "logo-transparent.svg");
  await fs.writeFile(transparentSvgPath, transparentSvg, "utf8");

  // High-res PNG logo export (good for docs/social/email signatures).
  await renderPng(transparentSvg, path.join(outDir, "logo.png"), {
    mode: "width",
    value: 1600,
  });

  // Build a square favicon SVG wrapper so PNGs are square.
  const inner = extractInnerSvg(transparentSvg);
  const faviconSvg = buildFaviconSvg(inner, { width, height });
  const faviconSvgPath = path.join(outDir, "favicon.svg");
  await fs.writeFile(faviconSvgPath, faviconSvg, "utf8");

  const sizes = [32, 180, 192, 512];
  for (const size of sizes) {
    await renderPng(faviconSvg, path.join(outDir, `favicon-${size}.png`), {
      mode: "width",
      value: size,
    });
  }

  // Convenience default.
  await fs.copyFile(path.join(outDir, "favicon-512.png"), path.join(outDir, "favicon.png"));

  // Optional: generate favicon.ico if you want (not required here).
  // Many deploy platforms are fine with PNG favicons.

  console.log("TCCG assets generated in", outDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
