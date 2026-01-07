import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");

const srcPngPath = path.join(projectRoot, "public", "assets", "foundation", "trademark.png");
const outDir = path.join(projectRoot, "public", "assets", "foundation");

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await fileExists(srcPngPath))) {
    throw new Error(`Source not found: ${srcPngPath}`);
  }

  await fs.mkdir(outDir, { recursive: true });

  const input = sharp(srcPngPath, { failOn: "none" });
  const meta = await input.metadata();

  // Produce a trimmed, high-res PNG for general use.
  // Note: trim() relies on a uniform background; if the source is already transparent, this is safe.
  const logoPngPath = path.join(outDir, "logo.png");
  await sharp(srcPngPath, { failOn: "none" })
    .trim()
    .resize({ width: 1600, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(logoPngPath);

  // Produce square favicon PNGs by fitting the trimmed logo inside a transparent square canvas.
  const sizes = [32, 180, 192, 512];
  for (const size of sizes) {
    const outPath = path.join(outDir, `favicon-${size}.png`);

    // Re-open per iteration (sharp streams are one-time-use).
    const trimmed = sharp(srcPngPath, { failOn: "none" }).trim();
    const trimmedMeta = await trimmed.metadata();

    // Fallback to original metadata if trim cannot be inferred.
    const srcW = trimmedMeta.width ?? meta.width ?? size;
    const srcH = trimmedMeta.height ?? meta.height ?? size;

    // Compute contain fit scaling manually to avoid any unexpected background flattening.
    const scale = Math.min(size / srcW, size / srcH);
    const w = Math.max(1, Math.floor(srcW * scale));
    const h = Math.max(1, Math.floor(srcH * scale));

    const resized = await sharp(srcPngPath, { failOn: "none" })
      .trim()
      .resize(w, h, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toBuffer();

    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: resized, gravity: "center" }])
      .png({ compressionLevel: 9 })
      .toFile(outPath);
  }

  // Convenience default.
  await fs.copyFile(path.join(outDir, "favicon-512.png"), path.join(outDir, "favicon.png"));

  console.log("Tolani Foundation assets generated in", outDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
