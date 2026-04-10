import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) { console.error("Missing FAL_KEY"); process.exit(1); }

const fal = createFalClient({ credentials: FAL_KEY });
const REFERENCE_IMAGE = resolve(__dirname, "../connect_product.png");
const OUTPUT_DIR = resolve(__dirname, "../public/generated/video/seedance-white");
mkdirSync(OUTPUT_DIR, { recursive: true });

const LOGO = `a tiny engraved geometric logo — three small squares touching at their corners in a tight zigzag (top and bottom aligned, middle offset left). NOT a cross or plus sign.`;

const frames = [
  {
    name: "white-hero-float",
    prompt: `Product photography of an iPhone floating at a dramatic angle against a pure clean white background, showing its back. A thin matte cool-grey rectangular plate is attached to the lower two-thirds of the phone's back, leaving iPhone camera lenses exposed at top. The plate has ${LOGO} There is a subtle small button on the side edge. USB-C port on the bottom edge. Bright clean studio lighting, soft subtle shadow below. Pure white background, no dark elements. Premium Apple-style product hero shot.`,
  },
  {
    name: "white-low-angle",
    prompt: `Low dramatic angle product shot of an iPhone on a pure white surface, showing its back and bottom edge. A thin matte cool-grey rectangular plate attached to the lower back. The plate has ${LOGO} USB-C port visible on the bottom edge. Subtle button on the side. Bright clean white background, soft even studio lighting, minimal shadow. Clean bright product photography.`,
  },
];

async function main() {
  console.log("Uploading reference...");
  const file = new Blob([readFileSync(REFERENCE_IMAGE)], { type: "image/png" });
  const refUrl = await fal.storage.upload(file);

  for (const f of frames) {
    console.log(`Generating ${f.name}...`);
    const result = await fal.subscribe("fal-ai/nano-banana-2", {
      input: { prompt: f.prompt, image_url: refUrl, image_size: { width: 1344, height: 768 } },
      logs: true,
    });
    const imageUrl = (result.data as any)?.images?.[0]?.url;
    if (!imageUrl) { console.error("No image"); continue; }
    const response = await fetch(imageUrl);
    writeFileSync(resolve(OUTPUT_DIR, `${f.name}.png`), Buffer.from(await response.arrayBuffer()));
    console.log(`  Saved: ${f.name}.png`);
  }
  console.log("Done!");
}
main().catch(console.error);
