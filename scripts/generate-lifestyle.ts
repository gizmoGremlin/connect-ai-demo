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
const OUTPUT_DIR = resolve(__dirname, "../public/generated/lifestyle");

mkdirSync(OUTPUT_DIR, { recursive: true });

// Don't describe the logo — let the reference image provide it
const PRODUCT = `A small thin brushed silver aluminum rectangular plate attached to the back of an iPhone. The plate is smaller than the phone, covering only the lower two-thirds of the phone's back, leaving the iPhone's camera lenses exposed at the top. The aluminum plate has a small embossed geometric logo in the center, exactly as shown in the reference image. It connects through the iPhone's USB-C port at the bottom. The plate is very thin and flush against the phone.`;

const scenes: { name: string; prompt: string }[] = [
  {
    name: "01-morning-routine",
    prompt: `Lifestyle photography of a modern bedroom nightstand at sunrise. An iPhone lays face-down on the nightstand showing its back with ${PRODUCT}. A white coffee mug and a small plant beside it. Warm golden morning light streaming through sheer curtains. The phone's screen has a subtle glow from underneath suggesting it is active and working. Shallow depth of field, soft tones, editorial lifestyle photography. No text overlays.`,
  },
  {
    name: "02-at-the-desk",
    prompt: `Lifestyle photography of a professional at a clean modern desk. A MacBook Pro is open in the center. To the side, an iPhone lays face-down showing its back with ${PRODUCT}. The person's hands are on the laptop keyboard, focused on work. Bright natural daylight from a window, minimal Scandinavian office. The phone is clearly running autonomously while the person works. Aspirational workspace photography, warm bright tones.`,
  },
  {
    name: "03-content-creator",
    prompt: `Lifestyle photography of a content creator's home desk setup. A monitor displays a video editing timeline. An iPhone with ${PRODUCT} sits propped up on a small stand on the desk, screen facing away showing the aluminum back plate. Ring light visible in background. Creative clutter — camera, headphones, notebook. The creator is in soft focus reviewing something on the monitor. Bright, modern, creative space photography.`,
  },
  {
    name: "04-small-business",
    prompt: `Lifestyle photography of a small cafe or boutique counter. An iPhone lays face-down on the counter showing its back with ${PRODUCT}. The shop owner is in soft focus behind the counter helping a customer. Warm interior lighting, exposed brick or wood elements. The phone is working autonomously while the owner focuses on customers. Authentic small business lifestyle photography, warm tones.`,
  },
  {
    name: "05-on-the-go",
    prompt: `Lifestyle photography of a person walking in a modern city. Close-up of their hand holding an iPhone showing the back of the phone with ${PRODUCT}. Urban background with soft bokeh — buildings, trees, pedestrians. Bright natural daylight, slightly golden hour. The person is mid-stride, confident, moving fast. Editorial street style photography, vibrant but clean.`,
  },
  {
    name: "06-student",
    prompt: `Lifestyle photography of a student at a library or study space. Laptop open with a research paper, books spread out. An iPhone lays face-down beside the laptop showing its back with ${PRODUCT}. The student is writing in a notebook or reading. Warm ambient library lighting, wooden table. The phone is doing research work autonomously. Authentic academic lifestyle photography.`,
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
          image_size: { width: 1344, height: 768 },
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
    } catch (err) {
      console.error(`  Error generating ${scene.name}:`, err);
    }
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
