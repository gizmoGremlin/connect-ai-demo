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
const OUTPUT_DIR = resolve(__dirname, "../public/generated/options/mono/r2");

mkdirSync(OUTPUT_DIR, { recursive: true });

// CRITICAL: The logo is NOT a cross or plus sign.
// It is three separate square cutouts arranged in an offset column:
//   [■]        ← top square
// [■]          ← middle square, offset LEFT
//   [■]        ← bottom square, aligned with top
// All three squares are equal size with small consistent gaps.
// It is a subtle engraved/inset mark on the aluminum surface.

const LOGO = `The plate has a very specific logo engraved in its center: exactly three small equal squares arranged vertically — the top and bottom squares are aligned, and the middle square is offset to the left, creating a staggered column pattern. This is NOT a cross or plus sign. It is three separate square shapes in an offset arrangement, subtly engraved into the metal surface.`;

function product(color: string) {
  const mat: Record<string, string> = {
    white: "matte white",
    black: "matte black",
    rosegold: "rose gold metallic",
    silver: "brushed silver aluminum",
  };
  return `A small thin ${mat[color]} rectangular plate attached to the back of an iPhone. The plate is smaller than the phone, covering only the lower two-thirds of the phone's back, leaving the iPhone's camera lenses exposed at the top. ${LOGO} It connects through the iPhone's USB-C port at the bottom. The plate is very thin and flush against the phone. This is a real product photo — the device is a sleek accessory attached to the back of an iPhone, not a standalone device.`;
}

type Option = { name: string; prompt: string };

const options: Option[] = [
  // ── PRODUCT SOLO (8) ───────────────────────────────────
  {
    name: "r2-01",
    prompt: `Product photography of an iPhone laying face-down on a white surface showing its back. ${product("white")} Clean white background, soft studio lighting, subtle shadow. Apple-style editorial product photography. The three-square logo is clearly visible as an engraved mark on the white plate.`,
  },
  {
    name: "r2-02",
    prompt: `Product photography of an iPhone laying face-down on a white surface showing its back. ${product("black")} Clean white background, soft studio lighting, subtle shadow. The three-square staggered logo is clearly visible engraved on the matte black plate. Apple-style editorial.`,
  },
  {
    name: "r2-03",
    prompt: `Product photography of an iPhone laying face-down on a white surface showing its back. ${product("rosegold")} Clean white background, soft studio lighting. The three-square staggered logo catches the light on the rose gold surface. Premium product photography.`,
  },
  {
    name: "r2-07",
    prompt: `Hero product shot of an iPhone floating at a slight angle against a pure white background, showing its back. ${product("white")} The white plate catches soft rim lighting. The engraved three-square logo is visible. Bold minimal hero shot, soft shadow below.`,
  },
  {
    name: "r2-08",
    prompt: `Hero product shot of an iPhone floating at a slight angle against a pure white background, showing its back. ${product("black")} The matte black plate has beautiful contrast. The three-square staggered logo is engraved into the surface. Dramatic studio lighting, Apple-style hero shot.`,
  },
  {
    name: "r2-09",
    prompt: `Hero product shot of an iPhone floating at a slight angle against a pure white background, showing its back. ${product("rosegold")} The rose gold plate gleams under studio lighting. The three-square offset logo is subtly engraved. Premium elegant hero shot. Soft shadow below.`,
  },
  {
    name: "r2-16",
    prompt: `Three iPhones laying face-down side by side on a white surface showing their backs. Left has ${product("white")} Center has ${product("black")} Right has ${product("rosegold")} Each plate shows the same three-square staggered logo engraved on its surface. Clean studio lighting, product lineup comparison shot. Even spacing between phones.`,
  },
  {
    name: "r2-17",
    prompt: `Three iPhones laying face-down side by side on a dark slate surface showing their backs. Left has ${product("white")} Center has ${product("black")} Right has ${product("rosegold")} Each plate has the three-square offset logo engraved. Dramatic moody studio lighting, reflective dark surface. Premium product lineup.`,
  },

  // ── LIFESTYLE (6) ──────────────────────────────────────
  {
    name: "r2-04",
    prompt: `Overhead flat-lay of a clean white desk. An iPhone lays face-down showing its back. ${product("white")} Next to the phone: a MacBook corner, a white ceramic mug, a small plant. The three-square logo is visible on the plate. Bright natural daylight, minimal Scandinavian aesthetic.`,
  },
  {
    name: "r2-05",
    prompt: `Overhead flat-lay of a clean white desk. An iPhone lays face-down showing its back. ${product("black")} Next to the phone: a notebook, wireless earbuds, a coffee cup. The three-square staggered logo is engraved on the black plate. Bright natural daylight, minimal aesthetic.`,
  },
  {
    name: "r2-06",
    prompt: `An iPhone laying face-down on a light marble cafe table showing its back. ${product("rosegold")} A latte in a ceramic cup nearby, soft natural window light, blurred cafe background. The three-square logo is visible on the rose gold surface. Warm aspirational lifestyle photography.`,
  },
  {
    name: "r2-13",
    prompt: `An iPhone laying face-down on a white nightstand showing its back. ${product("white")} Soft warm ambient evening light from a bedside lamp. Modern minimalist bedroom. The engraved three-square logo is subtly visible. Aspirational lifestyle photography.`,
  },
  {
    name: "r2-14",
    prompt: `An iPhone laying face-down on a light linen couch cushion showing its back. ${product("black")} A person relaxing in soft focus background. The three-square staggered logo on the black plate. Bright airy living room, natural daylight. Lifestyle editorial.`,
  },
  {
    name: "r2-15",
    prompt: `Close-up of an iPhone laying face-down on a white vanity table showing its back. ${product("rosegold")} Small perfume bottle and mirror in soft background. The three-square offset logo gleams on the rose gold surface. Soft glamorous lighting.`,
  },

  // ── IN-HAND (4) ────────────────────────────────────────
  {
    name: "r2-10",
    prompt: `A person's hand holding an iPhone at a slight angle showing the back and side profile. ${product("white")} The three-square logo is visible engraved on the white plate. Clean white studio background, soft diffused lighting. Showing the thin profile of the device.`,
  },
  {
    name: "r2-11",
    prompt: `A person's hand holding an iPhone showing the back directly to camera. ${product("black")} The three-square staggered logo is clearly engraved on the matte black plate. Clean white background, studio lighting. Natural grip.`,
  },
  {
    name: "r2-12",
    prompt: `A woman's hand holding an iPhone showing its back. ${product("rosegold")} The three-square offset logo catches warm light on the rose gold plate. Clean white background, soft warm studio lighting. Elegant and premium.`,
  },
  {
    name: "r2-20",
    prompt: `Low dramatic angle of a hand holding an iPhone tilted toward camera showing the back. ${product("rosegold")} The rose gold plate and three-square logo are prominent. Soft gradient background, cinematic studio lighting. Bold product shot.`,
  },

  // ── MACRO / DETAIL (2) ─────────────────────────────────
  {
    name: "r2-18",
    prompt: `Extreme macro close-up of the engraved logo on a matte white plate attached to the back of an iPhone. The logo is three small equal squares — top and bottom aligned, middle offset to the left — subtly engraved into the white surface. Beautiful shallow depth of field, studio lighting reveals the texture. Detail product shot.`,
  },
  {
    name: "r2-19",
    prompt: `Extreme macro close-up of the engraved logo on a matte black plate attached to the back of an iPhone. The logo is three small equal squares — top and bottom aligned, middle offset to the left — subtly engraved into the dark surface. Dramatic side lighting reveals the depth of the engraving. Shallow depth of field, detail shot.`,
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

  console.log("\nDone! Refresh /v2/picks/best");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
