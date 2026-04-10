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
const OUTPUT_DIR = resolve(__dirname, "../public/generated/bento");

mkdirSync(OUTPUT_DIR, { recursive: true });

const PRODUCT = `A small thin brushed silver aluminum rectangular plate attached to the back of an iPhone. The plate is smaller than the phone, covering only the lower two-thirds of the phone's back, leaving the iPhone's camera lenses exposed at the top. The aluminum plate has a small embossed geometric logo in the center, exactly as shown in the reference image. It connects through the iPhone's USB-C port at the bottom. The plate is very thin and flush against the phone.`;

type Scene = {
  name: string;
  prompt: string;
  model: "bria" | "nano-banana";
};

const scenes: Scene[] = [
  {
    name: "00-hero-flatlay",
    model: "bria",
    prompt: `Elegant overhead flat-lay product photography on a pure white surface. The iPhone with the aluminum device is the centerpiece, face-down showing the brushed aluminum back. Around it: a minimal notebook, a black pen, a white coffee cup, and a USB-C cable neatly coiled. Bright soft studio lighting, no harsh shadows. Apple-style editorial product flat-lay. Clean, spacious, aspirational.`,
  },
  {
    name: "01-hand-phone",
    model: "nano-banana",
    prompt: `A person's hand holding an iPhone face-up showing a dark UI app screen with a chat-like interface. The back of the phone has ${PRODUCT}. The hand is gripping naturally from the side, the aluminum plate visible along the back edge. Dark app screen creates contrast. Clean blurred background, shallow depth of field. Warm natural lighting. Editorial lifestyle photography showing the device in use.`,
  },
  {
    name: "02-beauty-shot",
    model: "bria",
    prompt: `Dramatic product beauty shot of the iPhone with aluminum device on a dark reflective surface. Moody studio lighting with rim light highlighting the brushed aluminum texture and edges. Dark gradient background fading to black. The device catches light beautifully showing its premium machining. High-end product photography like an Apple keynote slide.`,
  },
  // 03-connect-scripts: KEEP existing
  {
    name: "04-dashboard",
    model: "nano-banana",
    prompt: `An iPhone face-up on a clean white desk, screen showing a modern web dashboard with a dark sidebar, colorful status cards, and a live execution trace panel. ${PRODUCT} The device is visible from the side angle. The dashboard has a clean professional UI with blues and grays. Bright natural daylight, minimal desk styling. Tech product lifestyle photography.`,
  },
  // 05-community: KEEP existing
  {
    name: "06-cable-macro",
    model: "bria",
    prompt: `Extreme macro close-up of a USB-C cable plugging into the bottom of an iPhone. The aluminum device plate is visible on the back above the port. Focus on the physical connection point — the USB-C connector entering the port. Dramatic shallow depth of field, studio lighting. The image emphasizes: this is a direct, physical, local connection. No wireless, no cloud. Premium product detail photography.`,
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

    console.log(`Generating ${scene.name} [${scene.model}]...`);

    try {
      let imageUrl: string | undefined;

      if (scene.model === "bria") {
        const result = await fal.subscribe("fal-ai/bria/product-shot", {
          input: {
            image_url: refUrl,
            scene_description: scene.prompt,
            optimize_description: true,
          },
          logs: true,
        });
        imageUrl = (result.data as any)?.images?.[0]?.url;
      } else {
        const result = await fal.subscribe("fal-ai/nano-banana-2", {
          input: {
            prompt: scene.prompt,
            image_url: refUrl,
            image_size: { width: 1344, height: 768 },
          },
          logs: true,
        });
        imageUrl = (result.data as any)?.images?.[0]?.url;
      }

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
