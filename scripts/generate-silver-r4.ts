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
const OUTPUT_DIR = resolve(__dirname, "../public/generated/options/silver");

mkdirSync(OUTPUT_DIR, { recursive: true });

const LOGO = `The plate has a tiny geometric logo engraved in its center: three small equal squares touching at their corners forming one connected shape — the top and bottom squares are vertically aligned and the middle square is offset to the left, so the squares connect at their vertices with no gap between them, like a small tight zigzag of three touching squares. This is a single compact engraved mark, not three separate shapes. NOT a cross or plus sign.`;

// Device color: light greyed rose / soft mauve — hex #ccc4cc — a muted pinkish-gray with a slight warm lavender tint
const PRODUCT = `A small thin matte light greyed-rose colored rectangular plate attached to the back of an iPhone. The plate color is a soft muted mauve-gray — a pale pinkish-gray with a subtle warm lavender tint (hex #ccc4cc). The plate is smaller than the phone, covering only the lower two-thirds of the phone's back, leaving the iPhone's camera lenses exposed at the top. ${LOGO} It connects through the iPhone's USB-C port at the bottom. The plate is very thin and flush against the phone. Real product photo — a sleek soft mauve-gray accessory on the back of an iPhone.`;

type Option = { name: string; prompt: string };

const options: Option[] = [
  // ── PRODUCT SOLO (8) ───────────────────────────────────
  {
    name: "s-01",
    prompt: `Product photography of an iPhone laying face-down on a white surface showing its back. ${PRODUCT} Clean white background, soft studio lighting, subtle shadow. Apple-style editorial product photography.`,
  },
  {
    name: "s-02",
    prompt: `Product photography of an iPhone laying face-down on a light gray surface showing its back. ${PRODUCT} Low dramatic angle showing the thin profile. Soft gradient background, studio lighting with reflections on the soft mauve-gray.`,
  },
  {
    name: "s-03",
    prompt: `Hero shot of an iPhone floating at a slight angle against pure white, showing its back. ${PRODUCT} Soft rim lighting, the soft mauve-gray catches beautiful highlights. Bold minimal Apple-style hero. Soft shadow below.`,
  },
  {
    name: "s-04",
    prompt: `Top-down overhead product shot of an iPhone face-down on clean white surface, showing its back. ${PRODUCT} Centered composition, soft even studio lighting, subtle shadow. Clean minimal product photography.`,
  },
  {
    name: "s-05",
    prompt: `Side profile view of an iPhone on a white surface showing how thin the device is. ${PRODUCT} The side view shows the mauve-gray plate is nearly flush. Clean studio lighting, emphasis on the slim profile.`,
  },
  {
    name: "s-06",
    prompt: `Dramatic low-angle product shot of an iPhone on a reflective surface, showing its back. ${PRODUCT} Single beam of studio light from the side, beautiful reflections on the soft mauve-gray. Cinematic product photography.`,
  },
  {
    name: "s-07",
    prompt: `Two iPhones on a white surface. One face-down showing the soft mauve-gray plate, one face-up showing the screen. ${PRODUCT} The comparison shows the device is a thin accessory. Clean studio product photography, bright and minimal.`,
  },
  {
    name: "s-08",
    prompt: `iPhone floating at a steep angle against a soft gray gradient background, showing its back. ${PRODUCT} The soft mauve-gray plate catches dramatic rim lighting from both sides. Premium bold hero shot, editorial product photography.`,
  },

  // ── LIFESTYLE (6) ──────────────────────────────────────
  {
    name: "s-09",
    prompt: `Overhead flat-lay of a clean white desk. An iPhone face-down showing its back. ${PRODUCT} MacBook corner, white mug, small plant nearby. Bright natural daylight, Scandinavian minimal aesthetic.`,
  },
  {
    name: "s-10",
    prompt: `An iPhone face-down on a dark walnut nightstand showing its back. ${PRODUCT} Warm ambient evening light from a bedside lamp. Modern minimalist bedroom. Lifestyle photography.`,
  },
  {
    name: "s-11",
    prompt: `An iPhone face-down on a marble cafe table showing its back. ${PRODUCT} Latte nearby, soft natural window light, blurred cafe background. Warm aspirational lifestyle photography.`,
  },
  {
    name: "s-12",
    prompt: `An iPhone face-down on a linen couch cushion showing its back. ${PRODUCT} Person relaxing in soft focus background. Bright airy living room, natural daylight. Lifestyle editorial.`,
  },
  {
    name: "s-13",
    prompt: `An iPhone face-down on a gym bench showing its back. ${PRODUCT} Water bottle and towel nearby. Clean modern gym, bright overhead lighting. Active lifestyle product photography.`,
  },
  {
    name: "s-14",
    prompt: `An iPhone face-down on a white kitchen counter showing its back. ${PRODUCT} Morning scene, coffee maker and fruit bowl in soft background. Bright clean natural light. Everyday lifestyle.`,
  },

  // ── IN-HAND (4) ────────────────────────────────────────
  {
    name: "s-15",
    prompt: `A hand casually holding an iPhone showing its back to camera. ${PRODUCT} The brushed silver plate is clearly visible. Clean white studio background, soft diffused lighting. Natural relaxed grip.`,
  },
  {
    name: "s-16",
    prompt: `A hand holding an iPhone showing its back directly to camera. ${PRODUCT} Clean white background, studio lighting. Natural grip showing the mauve-gray plate prominently.`,
  },
  {
    name: "s-17",
    prompt: `A hand holding an iPhone at a slight angle showing the back and thin side profile. ${PRODUCT} White studio background, soft lighting. Showing the thin profile and soft mauve-gray texture.`,
  },
  {
    name: "s-18",
    prompt: `Two hands holding an iPhone, one supporting from below, showing the back to camera. ${PRODUCT} The brushed silver plate is prominent. Light gray background, studio product photography. Showing scale.`,
  },

  // ── MACRO (2) ──────────────────────────────────────────
  {
    name: "s-19",
    prompt: `Extreme macro close-up of the engraved logo on a soft mauve-gray plate on the back of an iPhone. The logo is three small equal squares touching at their corners — top and bottom aligned, middle offset left — one compact connected shape engraved into the brushed metal. Studio lighting reveals the brushed texture and engraving depth. Shallow depth of field.`,
  },
  {
    name: "s-20",
    prompt: `Extreme macro close-up of the soft mauve-gray plate surface on the back of an iPhone, showing the metal texture and the tiny engraved three-square logo. Beautiful shallow depth of field, side lighting reveals the brushed grain pattern and the geometric mark. Detail product shot.`,
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

  console.log("\nDone! Refresh /v2/picks/silver");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
