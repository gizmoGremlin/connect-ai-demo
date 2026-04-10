/**
 * Regenerate specific bento images. Currently targets the three cards that
 * came out with dark backgrounds (hand-phone, beauty-shot, cable-macro)
 * and swaps them for bright white-background versions.
 *
 * After running this, run scripts/upscale-bento.ts to bring them up to
 * retina resolution.
 *
 * Run with: npx tsx --env-file=.env.local scripts/regen-bento-hires.ts
 */
import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("Missing FAL_KEY");
  process.exit(1);
}

const fal = createFalClient({ credentials: FAL_KEY });
const REFERENCE_IMAGE = resolve(__dirname, "../connect_product.png");
const OUTPUT_DIR = resolve(__dirname, "../public/generated/bento");

mkdirSync(OUTPUT_DIR, { recursive: true });

const PRODUCT = `A small thin brushed silver aluminum rectangular plate attached to the back of an iPhone. The plate is smaller than the phone, covering only the lower two-thirds of the phone's back, leaving the iPhone's camera lenses exposed at the top. The aluminum plate has a small embossed geometric logo in the center, exactly as shown in the reference image. It connects through the iPhone's USB-C port at the bottom. The plate is very thin and flush against the phone.`;

type Scene = {
  name: string;
  prompt: string;
  width: number;
  height: number;
};

// nano-banana-2 caps output at ~1408×768 — width/height are best-effort
// hints. We upscale afterwards for retina sharpness. Every prompt forces
// a bright white background since the previous versions came out moody.
const scenes: Scene[] = [
  {
    name: "01-hand-phone",
    width: 1600,
    height: 1200,
    prompt: `A person's hand holding an iPhone face-up against a pure white seamless studio background. The phone screen shows a clean LIGHT-mode chat interface (white background, soft gray bubbles) — NOT a dark theme. The back of the phone has ${PRODUCT} The hand grips naturally from the side, the brushed aluminum plate clearly visible along the back edge. Bright soft natural lighting, no harsh shadows. The entire scene is light and airy, primarily white. Editorial Apple-style product lifestyle photography. White background dominates the frame.`,
  },
  {
    name: "02-beauty-shot",
    width: 1600,
    height: 1200,
    prompt: `Premium product beauty shot of the iPhone with the aluminum device, photographed on a clean pure white seamless studio surface. ${PRODUCT} Bright soft studio lighting with subtle shadows. The brushed aluminum texture catches the light beautifully. Pure white background, white surface, light and airy. Apple keynote aesthetic — primarily white, minimal, premium. NOT moody, NOT dark, NOT black. Editorial product photography with lots of negative space.`,
  },
  {
    name: "06-cable-macro",
    width: 1600,
    height: 1200,
    prompt: `Extreme macro close-up of a USB-C cable plugging into the bottom of an iPhone, photographed against a pure white seamless background. ${PRODUCT} The aluminum device plate is visible on the back of the phone above the port. Focus on the physical USB-C connection point. Bright soft studio lighting, crisp details, shallow depth of field. The image emphasizes a direct physical local connection — no wireless, no cloud. Pure white background dominates the frame. Premium clean product detail photography. NOT dark, NOT moody — light and airy.`,
  },
];

async function main() {
  console.log("Uploading reference image...");
  const file = new Blob([readFileSync(REFERENCE_IMAGE)], { type: "image/png" });
  const refUrl = await fal.storage.upload(file);
  console.log(`  Uploaded: ${refUrl}\n`);

  for (const scene of scenes) {
    const outPath = resolve(OUTPUT_DIR, `${scene.name}.png`);
    console.log(`Generating ${scene.name} [${scene.width}x${scene.height}]...`);

    try {
      const result = await fal.subscribe("fal-ai/nano-banana-2", {
        input: {
          prompt: scene.prompt,
          image_url: refUrl,
          image_size: { width: scene.width, height: scene.height },
        },
        logs: true,
      });

      const imageUrl = (result.data as { images?: { url?: string }[] })
        ?.images?.[0]?.url;

      if (!imageUrl) {
        console.error(`  No image returned for ${scene.name}`);
        continue;
      }

      const response = await fetch(imageUrl);
      const buffer = Buffer.from(await response.arrayBuffer());
      writeFileSync(outPath, buffer);
      console.log(
        `  Saved: ${outPath} (${(buffer.length / 1024).toFixed(0)}KB)`
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  Error generating ${scene.name}:`, message);
    }
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
