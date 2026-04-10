import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("Missing FAL_KEY");
  process.exit(1);
}

const fal = createFalClient({ credentials: FAL_KEY });
const PRODUCT_IMAGE = resolve(__dirname, "../connect_product.png");
const OUTPUT_DIR = resolve(__dirname, "../public/generated/video/v2");

mkdirSync(OUTPUT_DIR, { recursive: true });

const NEGATIVE = "cross logo, plus sign, spaced apart squares, separated squares, wrong logo, blur, distort, low quality";

const scenes = [
  {
    name: "scene1-reveal",
    prompt:
      "@Element1 Cinematic product reveal. The iPhone sits on a dark surface showing its back. A thin matte cool-grey plate is attached to the lower back. A beam of studio light slowly sweeps across the surface, revealing the product details and its tiny engraved geometric logo. Dark black background, dramatic shadows, the product emerges from darkness. Premium Apple keynote style. Shallow depth of field. No text.",
  },
  {
    name: "scene2-orbit",
    prompt:
      "@Element1 Smooth cinematic orbit around an iPhone on a dark surface showing its back. A thin matte cool-grey plate covers the lower two-thirds of the phone's back. The camera orbits from back to side profile revealing the thin flush design. Studio rim lighting highlights the surface texture and the tiny engraved logo. Dark minimal background, shallow depth of field. Premium product cinematography. No text.",
  },
  {
    name: "scene3-hero",
    prompt:
      "@Element1 The iPhone with the matte cool-grey plate slowly rises and floats at a dramatic angle. Background transitions from dark to a clean light gradient. Studio lighting creates highlights on the plate surface. The phone settles into a bold hero pose — floating, angled, premium. Cinematic slow motion, Apple product page hero shot. Shallow depth of field, soft shadow below. No text.",
  },
];

async function main() {
  console.log("Uploading product reference image...");
  const file = new Blob([readFileSync(PRODUCT_IMAGE)], { type: "image/png" });
  const refUrl = await fal.storage.upload(file);
  console.log(`  Uploaded: ${refUrl}\n`);

  for (const scene of scenes) {
    const outPath = resolve(OUTPUT_DIR, `${scene.name}.mp4`);
    console.log(`Generating ${scene.name} (5s)...`);

    try {
      const result = await fal.subscribe(
        "fal-ai/kling-video/v3/pro/image-to-video",
        {
          input: {
            prompt: scene.prompt,
            start_image_url: refUrl,
            elements: [
              {
                frontal_image_url: refUrl,
                reference_image_urls: [refUrl],
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

  console.log("\nDone! Check /v2/picks/videos");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
