import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outDir = path.join(projectRoot, "public", "assets", "foundation");

async function generateLogoLockup() {
  // Generate wide lockup SVG with "TOLANI FOUNDATION™" text
  const logoSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="300" viewBox="0 0 1400 300">
  <rect width="1400" height="300" fill="none"/>
  <text x="50" y="150" font-family="Arial, sans-serif" font-weight="bold" font-size="140" fill="#1a1a1a" text-anchor="start" dominant-baseline="middle">
    TOLANI FOUNDATION<tspan font-size="100" baseline-shift="super">&#8482;</tspan>
  </text>
</svg>`;

  const resvg = new Resvg(logoSvg, {
    fitTo: { mode: "width", value: 1400 },
  });
  const png = resvg.render().asPng();
  await fs.writeFile(path.join(outDir, "logo-lockup.png"), png);
  console.log("Generated logo-lockup.png");
}

async function generateFaviconLockups() {
  // Generate favicon SVGs with "TF" initials in various sizes
  const sizes = [32, 180, 192, 512];
  
  for (const size of sizes) {
    const faviconSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="none"/>
  <text x="${size / 2}" y="${size / 2}" font-family="Arial, sans-serif" font-weight="bold" font-size="${Math.floor(size * 0.5)}" fill="#1a1a1a" text-anchor="middle" dominant-baseline="middle">
    TF
  </text>
</svg>`;

    const resvg = new Resvg(faviconSvg, {
      fitTo: { mode: "width", value: size },
    });
    const png = resvg.render().asPng();
    await fs.writeFile(path.join(outDir, `favicon-lockup-${size}.png`), png);
    console.log(`Generated favicon-lockup-${size}.png`);
  }

  // Copy 512 as default
  await fs.copyFile(
    path.join(outDir, "favicon-lockup-512.png"),
    path.join(outDir, "favicon-lockup.png")
  );
  console.log("Generated favicon-lockup.png (alias)");
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  await generateLogoLockup();
  await generateFaviconLockups();
  console.log("\nTolani Foundation™ lockup and favicons generated successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
