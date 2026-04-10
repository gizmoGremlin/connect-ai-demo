/**
 * Upscale the three large bento images via fal.ai so they aren't fuzzy on
 * retina displays. Preserves the existing look — just sharper.
 *
 * Run with: npx tsx --env-file=.env.local scripts/upscale-bento.ts
 */
import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("Missing FAL_KEY");
  process.exit(1);
}

const fal = createFalClient({ credentials: FAL_KEY });
const BENTO_DIR = resolve(__dirname, "../public/generated/bento");

const TARGETS = ["03-connect-scripts", "05-community"];

async function upscale(name: string) {
  const inPath = resolve(BENTO_DIR, `${name}.png`);
  const outPath = inPath; // overwrite
  console.log(`Upscaling ${name}...`);

  // Upload local file to fal storage
  const file = new Blob([readFileSync(inPath)], { type: "image/png" });
  const imageUrl = await fal.storage.upload(file);

  // ESRGAN: simple, reliable, supports scale 2 or 4. Pure super-resolution
  // (no creative repainting), so the original look is preserved exactly.
  const result = await fal.subscribe("fal-ai/esrgan", {
    input: {
      image_url: imageUrl,
      scale: 2,
    },
    logs: true,
  });

  const upscaledUrl = (result.data as { image?: { url?: string } })?.image?.url;
  if (!upscaledUrl) {
    console.error(`  No image returned for ${name}`);
    return;
  }

  const response = await fetch(upscaledUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(outPath, buffer);
  console.log(`  Saved: ${outPath} (${(buffer.length / 1024).toFixed(0)}KB)`);
}

async function main() {
  for (const name of TARGETS) {
    try {
      await upscale(name);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  Error upscaling ${name}:`, message);
    }
  }
  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
