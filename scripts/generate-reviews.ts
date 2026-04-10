import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "fs";
import { resolve } from "path";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("Missing FAL_KEY");
  process.exit(1);
}

const fal = createFalClient({ credentials: FAL_KEY });
const REFERENCE_IMAGE = resolve(__dirname, "../connect_product.png");
const OUTPUT_DIR = resolve(__dirname, "../public/generated/reviews");

mkdirSync(OUTPUT_DIR, { recursive: true });

const PRODUCT = `A small thin brushed silver aluminum rectangular plate attached to the back of an iPhone. The plate has a small embossed geometric logo in the center, exactly as shown in the reference image. It connects through the iPhone's USB-C port at the bottom.`;

// Customer-style photos — meant to look like real user photos, not studio shots
const scenes = [
  {
    name: "01-sarah",
    prompt: `Casual selfie-style photo of a young woman smiling at camera, holding up an iPhone showing its back with ${PRODUCT}. She's at a bright cafe with natural light. Warm, authentic, candid feel — like a real customer photo shared on social media. Slightly imperfect framing adds authenticity.`,
  },
  {
    name: "02-marcus",
    prompt: `A man's hand holding an iPhone face-down on a shop counter, showing the back with ${PRODUCT}. Point-of-view shot from behind the counter. Small business environment, warm lighting. Authentic customer photo feel — real and unpolished.`,
  },
  {
    name: "03-priya",
    prompt: `Overhead shot of an iPhone face-down on a wooden study desk showing its back with ${PRODUCT}. Textbooks, highlighters, and a laptop visible around it. A student's messy but real workspace. Natural lighting, authentic and candid feel like a real social media post.`,
  },
  {
    name: "04-james",
    prompt: `A smiling man in business casual taking a photo of his iPhone showing the back with ${PRODUCT}. He's standing outside a modern building. Urban professional setting, natural daylight. Authentic customer testimonial photo feel.`,
  },
];

async function main() {
  console.log("Uploading reference image...");
  const file = new Blob([readFileSync(REFERENCE_IMAGE)], { type: "image/png" });
  const refUrl = await fal.storage.upload(file);
  console.log(`  Uploaded: ${refUrl}\n`);

  for (const scene of scenes) {
    const outPath = resolve(OUTPUT_DIR, `${scene.name}.png`);

    if (existsSync(outPath) && statSync(outPath).size > 10_000) {
      console.log(`Skipping ${scene.name} (already exists)`);
      continue;
    }

    console.log(`Generating ${scene.name}...`);

    try {
      const result = await fal.subscribe("fal-ai/nano-banana-2", {
        input: {
          prompt: scene.prompt,
          image_url: refUrl,
          image_size: { width: 768, height: 768 },
        },
        logs: true,
      });

      const imageUrl = (result.data as any)?.images?.[0]?.url;
      if (!imageUrl) {
        console.error(`  No image returned for ${scene.name}`);
        continue;
      }

      const response = await fetch(imageUrl);
      const buffer = Buffer.from(await response.arrayBuffer());
      writeFileSync(outPath, buffer);
      console.log(`  Saved: ${outPath} (${(buffer.length / 1024).toFixed(0)}KB)`);
    } catch (err: any) {
      console.error(`  Error generating ${scene.name}:`, err?.message || err);
    }
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
