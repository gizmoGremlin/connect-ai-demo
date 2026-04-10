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
    name: "03-connect-scripts",
    width: 1600,
    height: 1200,
    prompt: `A laptop screen displaying a clean code editor with .connect script syntax — colored keywords like "tap", "swipe", "wait", "screenshot" visible. The editor uses a LIGHT theme: white background, dark text, subtle syntax highlighting in pastel colors. The laptop sits on a clean white desk against a pure white seamless background. Bright soft studio lighting, no shadows. The entire frame is dominated by white. Apple keynote aesthetic, editorial product photography, light and airy, minimal. NOT dark mode, NOT moody, NOT black — pure white background everywhere.`,
  },
  {
    name: "05-community",
    width: 1600,
    height: 1200,
    prompt: `An overhead flat-lay of multiple iPhones arranged in a clean grid on a pure white seamless surface. Each iPhone is face-up displaying a different LIGHT-mode app screen (light theme — photo gallery, shopping list, social feed, maps) — all screens are bright and white-themed, NOT dark. ${PRODUCT} Bright soft studio lighting from above, no harsh shadows. Pure white background, white surface, primarily white frame. Apple-style editorial product flat-lay photography. Lots of negative space. Light, airy, minimal. NOT dark, NOT moody.`,
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
