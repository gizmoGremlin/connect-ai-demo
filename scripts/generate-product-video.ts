import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("Missing FAL_KEY");
  process.exit(1);
}

const fal = createFalClient({ credentials: FAL_KEY });
const OUTPUT_DIR = resolve(__dirname, "../public/generated/video");

mkdirSync(OUTPUT_DIR, { recursive: true });

const videos = [
  {
    name: "product-silver",
    imagePath: resolve(__dirname, "../connect_product.png"),
    prompt:
      "The camera slowly orbits around the iPhone, revealing the brushed silver aluminum plate on its back from multiple angles. The phone gently rotates on the smooth surface. Soft studio lighting creates beautiful highlights on the brushed metal. The cross/plus logo catches the light. Shallow depth of field, clean minimal gray background. Smooth cinematic motion, premium product video.",
  },
  {
    name: "product-white",
    imagePath: resolve(
      __dirname,
      "../public/generated/options/mono/ps-01-white-hero.png"
    ),
    prompt:
      "The camera slowly orbits around the iPhone, revealing the matte white plate on its back from multiple angles. The phone gently rotates on the smooth surface. Soft studio lighting, clean and bright. The cross/plus logo is subtly visible. Shallow depth of field, pure white background. Smooth cinematic motion, premium product video.",
  },
];

async function main() {
  for (const vid of videos) {
    console.log(`\nUploading image for ${vid.name}...`);
    const file = new Blob([readFileSync(vid.imagePath)], {
      type: "image/png",
    });
    const imageUrl = await fal.storage.upload(file);
    console.log(`  Uploaded: ${imageUrl}`);

    console.log(`Generating video: ${vid.name} (~5s)...`);
    try {
      const result = await fal.subscribe(
        "fal-ai/kling-video/v3/pro/image-to-video",
        {
          input: {
            prompt: vid.prompt,
            image_url: imageUrl,
            duration: 5,
            aspect_ratio: "16:9",
          },
          logs: true,
        }
      );

      const videoUrl = (result.data as any)?.video?.url;
      if (!videoUrl) {
        console.error(`  No video returned for ${vid.name}`);
        console.error("  Response:", JSON.stringify(result.data, null, 2));
        continue;
      }

      const response = await fetch(videoUrl);
      const buffer = Buffer.from(await response.arrayBuffer());
      const outPath = resolve(OUTPUT_DIR, `${vid.name}.mp4`);
      writeFileSync(outPath, buffer);
      console.log(`  Saved: ${outPath}`);
    } catch (err) {
      console.error(`  Error generating ${vid.name}:`, err);
    }
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
