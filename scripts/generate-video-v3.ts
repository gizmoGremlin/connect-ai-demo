import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("Missing FAL_KEY");
  process.exit(1);
}

const fal = createFalClient({ credentials: FAL_KEY });

// Starting frame: last frame of scene3-hero (floating product at dramatic angle)
const HERO_FRAME = resolve(__dirname, "../public/generated/video/v2/scene3-lastframe.png");
// Original product image for element reference
const PRODUCT_IMAGE = resolve(__dirname, "../connect_product.png");
const OUTPUT_DIR = resolve(__dirname, "../public/generated/video/v3");

mkdirSync(OUTPUT_DIR, { recursive: true });

// Detailed product description for prompts
// Logo: three squares touching at vertices (NOT a cross/plus)
// Side: subtle power button
// Bottom: USB-C port
// Color: cool matte grey (NOT silver, NOT rose)
const PRODUCT_DETAILS = `The device is a thin matte cool-grey rectangular plate attached to the back of an iPhone. It has a tiny engraved geometric logo — three small squares touching at their corners in a tight zigzag (top and bottom aligned, middle offset left). NOT a cross or plus sign. There is a subtle small button on the side edge. The bottom edge has a USB-C port connector. The plate is matte cool grey, smooth, premium.`;

const NEGATIVE = "cross logo, plus sign, wrong logo, spaced squares, separated squares, blur, distort, low quality, text, watermark";

// ── KLING V3 PRO scenes (5s each, with elements) ────────

type KlingScene = {
  name: string;
  prompt: string;
  startImage: string;
};

const klingScenes: KlingScene[] = [
  {
    name: "k-liftoff",
    startImage: HERO_FRAME,
    prompt: `@Element1 The thin matte grey plate slowly detaches and lifts off the back of the floating iPhone. ${PRODUCT_DETAILS} The plate rises upward smoothly, separating from the phone, revealing the USB-C connector underneath as it disconnects. Dramatic studio lighting on dark background. Cinematic slow motion. The plate hovers above the phone. No text.`,
  },
  {
    name: "k-spin360",
    startImage: HERO_FRAME,
    prompt: `@Element1 The thin matte grey plate floats in mid-air and begins a slow 360-degree rotation, showing all sides — the front face with the three-square logo, the thin side edge with a subtle button, the bottom edge with USB-C port, and the smooth back. ${PRODUCT_DETAILS} Dark background, dramatic rim lighting, cinematic product spin. No text.`,
  },
  {
    name: "k-orbit-detail",
    startImage: HERO_FRAME,
    prompt: `@Element1 Camera slowly orbits around the floating iPhone with the matte grey plate attached, moving from back to side view. ${PRODUCT_DETAILS} The side view reveals the thin profile, the subtle button on the edge, and USB-C at the bottom. Studio rim lighting, dark background, shallow depth of field. Premium Apple-style product cinematography. No text.`,
  },
  {
    name: "k-reattach",
    startImage: HERO_FRAME,
    prompt: `@Element1 The thin matte grey plate floats above the iPhone, then slowly descends and reattaches to the back of the phone with a satisfying magnetic snap. ${PRODUCT_DETAILS} The USB-C connector aligns and clicks into the port. Dramatic slow motion, studio lighting, dark background. Premium product demo. No text.`,
  },
];

// ── VEO 3.1 scenes (8s each, longer + cinematic) ────────

type VeoScene = {
  name: string;
  prompt: string;
};

const veoScenes: VeoScene[] = [
  {
    name: "v-epic-spin",
    prompt: `Cinematic product video. A thin matte cool-grey rectangular plate floats and slowly rotates in dramatic studio lighting against a dark background. ${PRODUCT_DETAILS} The camera orbits around the floating plate as it spins, revealing every detail — the engraved three-square logo on the front face, the subtle button on the side edge, the USB-C port on the bottom. Light sweeps across the brushed surface. Premium Apple keynote style cinematography, slow motion, shallow depth of field. No text or graphics.`,
  },
  {
    name: "v-liftoff-spin",
    prompt: `Cinematic product video. An iPhone floats at a dramatic angle showing its back. A thin matte cool-grey plate is attached to the lower back. ${PRODUCT_DETAILS} The plate slowly lifts off the phone, rises upward, and begins a gentle 360-degree rotation mid-air. The camera follows the plate as it spins, showing the logo face, the thin side with button, the USB-C bottom, and the smooth back. Dark background, dramatic studio rim lighting, slow motion. Apple keynote product reveal style. No text.`,
  },
];

async function main() {
  console.log("Uploading images...");
  const heroFile = new Blob([readFileSync(HERO_FRAME)], { type: "image/png" });
  const heroUrl = await fal.storage.upload(heroFile);

  const productFile = new Blob([readFileSync(PRODUCT_IMAGE)], { type: "image/png" });
  const productUrl = await fal.storage.upload(productFile);

  console.log(`  Hero frame: ${heroUrl}`);
  console.log(`  Product ref: ${productUrl}\n`);

  // ── Generate Kling scenes ──
  for (const scene of klingScenes) {
    const outPath = resolve(OUTPUT_DIR, `${scene.name}.mp4`);
    console.log(`[Kling] Generating ${scene.name} (5s)...`);

    const startUrl = scene.startImage === HERO_FRAME ? heroUrl : productUrl;

    try {
      const result = await fal.subscribe(
        "fal-ai/kling-video/v3/pro/image-to-video",
        {
          input: {
            prompt: scene.prompt,
            start_image_url: startUrl,
            elements: [
              {
                frontal_image_url: productUrl,
                reference_image_urls: [productUrl],
              },
            ],
            duration: "5",
            aspect_ratio: "16:9",
            cfg_scale: 0.8,
            negative_prompt: NEGATIVE,
            generate_audio: false,
          },
          logs: true,
        }
      );

      const videoUrl = (result.data as any)?.video?.url;
      if (!videoUrl) {
        console.error(`  No video returned for ${scene.name}`);
        console.error("  Response:", JSON.stringify(result.data, null, 2));
        continue;
      }

      const response = await fetch(videoUrl);
      const buffer = Buffer.from(await response.arrayBuffer());
      writeFileSync(outPath, buffer);
      console.log(`  Saved: ${outPath}`);
    } catch (err) {
      console.error(`  Error generating ${scene.name}:`, err);
    }
  }

  // ── Generate Veo 3.1 scenes ──
  for (const scene of veoScenes) {
    const outPath = resolve(OUTPUT_DIR, `${scene.name}.mp4`);
    console.log(`[Veo 3.1] Generating ${scene.name} (8s)...`);

    try {
      const result = await fal.subscribe("fal-ai/veo3.1/image-to-video", {
        input: {
          prompt: scene.prompt,
          image_url: heroUrl,
          duration: "8s",
          aspect_ratio: "16:9",
          resolution: "720p",
          negative_prompt: NEGATIVE,
          generate_audio: false,
          safety_tolerance: "6",
        },
        logs: true,
      });

      const videoUrl = (result.data as any)?.video?.url;
      if (!videoUrl) {
        console.error(`  No video returned for ${scene.name}`);
        console.error("  Response:", JSON.stringify(result.data, null, 2));
        continue;
      }

      const response = await fetch(videoUrl);
      const buffer = Buffer.from(await response.arrayBuffer());
      writeFileSync(outPath, buffer);
      console.log(`  Saved: ${outPath}`);
    } catch (err) {
      console.error(`  Error generating ${scene.name}:`, err);
    }
  }

  console.log("\nDone! Check /v2/picks/videos");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
