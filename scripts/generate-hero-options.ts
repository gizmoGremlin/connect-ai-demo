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
const OUTPUT_DIR = resolve(__dirname, "../public/generated/options");

mkdirSync(OUTPUT_DIR, { recursive: true });

// ACCURATE product description based on the actual reference photo:
// - A small thin brushed aluminum rectangular plate/slab
// - It attaches to the BACK of an iPhone, covering only the lower ~60% of the phone back
// - The iPhone camera lenses at the top are fully exposed (NOT part of the device)
// - The device has a cross/plus symbol embossed on its aluminum surface
// - It connects via the iPhone's USB-C port at the bottom
// - It is flush/thin, barely adding thickness to the phone
const PRODUCT = `A small thin brushed silver aluminum rectangular plate attached to the back of an iPhone. The plate is smaller than the phone, covering only the lower two-thirds of the phone's back, leaving the iPhone's camera lenses exposed at the top. The aluminum plate has a cross/plus symbol embossed in the center. It connects through the iPhone's USB-C port at the bottom. The plate is very thin and flush against the phone. This is a real product photo style — the device is an accessory attached to the back of an iPhone, not a standalone device.`;

const options: { name: string; prompt: string }[] = [
  {
    name: "01-white-surface",
    prompt: `Product photography of an iPhone laying face-down on a white surface showing its back. ${PRODUCT} Clean white background, soft studio lighting, subtle shadow. Apple-style editorial product photography.`,
  },
  {
    name: "02-angled-hero",
    prompt: `Hero product shot of an iPhone at a low dramatic angle on a light gray surface, showing the back of the phone. ${PRODUCT} The angle shows both the thin profile and the aluminum plate on the back. Soft gradient background, studio lighting with beautiful reflections on the brushed aluminum.`,
  },
  {
    name: "03-overhead-desk",
    prompt: `Overhead flat-lay product photography. An iPhone laying face-down on a clean white marble desk, showing its back. ${PRODUCT} Next to the phone is a MacBook corner and a white coffee cup. Bright natural daylight, minimal styling, lifestyle editorial photography.`,
  },
  {
    name: "04-in-hand-back",
    prompt: `A person's hand holding an iPhone showing the back of the phone to the camera. ${PRODUCT} The hand naturally grips the phone, the aluminum plate visible on the lower back. Clean white background, soft studio lighting. Showing scale — the plate is small and sleek.`,
  },
  {
    name: "05-close-up-logo",
    prompt: `Extreme macro close-up of the back of an iPhone showing the brushed aluminum plate attached to the lower back. ${PRODUCT} Focus on the cross/plus logo embossed in the aluminum. Beautiful shallow depth of field, the brushed metal texture catching studio light. Detail shot.`,
  },
  {
    name: "06-side-profile",
    prompt: `Side profile view of an iPhone laying on a white surface showing how thin the device is. ${PRODUCT} The side view shows the aluminum plate on the back is nearly flush — barely adds any thickness. Clean studio lighting, white background, emphasis on the slim profile.`,
  },
  {
    name: "07-nightstand",
    prompt: `Lifestyle photo of an iPhone laying face-down on a modern white nightstand showing its back. ${PRODUCT} Soft warm ambient evening lighting, modern minimalist bedroom setting. The phone screen has a faint glow from underneath. Aspirational lifestyle photography.`,
  },
  {
    name: "08-two-phones",
    prompt: `Two iPhones on a white surface. One face-down showing the aluminum plate attached to its back, one face-up showing the screen. ${PRODUCT} The comparison shows the device is a thin accessory on the back. Clean studio product photography, bright and minimal.`,
  },
  {
    name: "09-floating",
    prompt: `Product hero shot of an iPhone floating at a slight angle against a pure white background, showing the back of the phone. ${PRODUCT} The aluminum plate catches dramatic rim lighting. Clean, bold, minimal — like an Apple product page hero image. Soft shadow below.`,
  },
  {
    name: "10-cafe-table",
    prompt: `Lifestyle photography of an iPhone laying face-down on a light wooden cafe table, showing its back. ${PRODUCT} A person is visible in soft focus in the background with a latte. Bright natural daylight, warm tones, aspirational tech lifestyle.`,
  },
];

async function main() {
  console.log("Uploading reference image...");
  const file = new Blob([readFileSync(REFERENCE_IMAGE)], { type: "image/png" });
  const refUrl = await fal.storage.upload(file);
  console.log(`  Uploaded: ${refUrl}\n`);

  for (const opt of options) {
    const outPath = resolve(OUTPUT_DIR, `${opt.name}.png`);
    console.log(`Generating ${opt.name}...`);

    try {
      const result = await fal.subscribe("fal-ai/nano-banana-2", {
        input: {
          prompt: opt.prompt,
          image_url: refUrl,
          image_size: { width: 1344, height: 768 },
        },
        logs: true,
      });

      const imageUrl = (result.data as any)?.images?.[0]?.url;
      if (!imageUrl) {
        console.error(`  No image returned for ${opt.name}`);
        continue;
      }

      const response = await fetch(imageUrl);
      const buffer = Buffer.from(await response.arrayBuffer());
      writeFileSync(outPath, buffer);
      console.log(`  Saved: ${outPath}`);
    } catch (err) {
      console.error(`  Error generating ${opt.name}:`, err);
    }
  }

  console.log("\nDone! Refresh /v2/picks");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
