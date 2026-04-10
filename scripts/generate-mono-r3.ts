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
const OUTPUT_DIR = resolve(__dirname, "../public/generated/options/mono/r3");

mkdirSync(OUTPUT_DIR, { recursive: true });

// CRITICAL LOGO DESCRIPTION:
// Three small equal squares TOUCHING at their corners/vertices.
// Top and bottom squares are vertically aligned.
// Middle square is offset to the LEFT.
// The squares have ZERO gap — they lightly touch at the vertices.
// It forms one tight connected geometric shape, like a tiny zigzag of three squares.
// It is NOT a cross, NOT a plus sign, NOT three separated squares.

const LOGO = `The plate has a tiny geometric logo engraved in its center: three small equal squares touching at their corners forming one connected shape — the top and bottom squares are vertically aligned and the middle square is offset to the left, so the squares connect at their vertices with no gap between them, like a small tight zigzag of three touching squares. This is a single compact engraved mark, not three separate shapes. NOT a cross or plus sign.`;

function product(color: string) {
  const mat: Record<string, string> = {
    white: "matte white",
    black: "matte black",
    rosegold: "rose gold metallic",
    silver: "brushed silver aluminum",
  };
  return `A small thin ${mat[color]} rectangular plate attached to the back of an iPhone. The plate is smaller than the phone, covering only the lower two-thirds of the phone's back, leaving the iPhone's camera lenses exposed at the top. ${LOGO} It connects through the iPhone's USB-C port at the bottom. The plate is very thin and flush against the phone. Real product photo — a sleek accessory on the back of an iPhone.`;
}

type Option = { name: string; prompt: string };

const options: Option[] = [
  // ── PRODUCT SOLO (8) ───────────────────────────────────
  {
    name: "r3-01",
    prompt: `Product photography of an iPhone laying face-down on a white surface showing its back. ${product("white")} Clean white background, soft studio lighting, subtle shadow. Apple-style editorial. The tiny three-square connected logo is engraved on the plate.`,
  },
  {
    name: "r3-02",
    prompt: `Product photography of an iPhone laying face-down on a white surface showing its back. ${product("black")} Clean white background, soft studio lighting. The compact three-square touching logo is engraved on the black plate. Premium editorial.`,
  },
  {
    name: "r3-03",
    prompt: `Product photography of an iPhone laying face-down on a white surface showing its back. ${product("rosegold")} Clean white background, warm studio lighting. The three-square connected logo catches light on the rose gold surface.`,
  },
  {
    name: "r3-04",
    prompt: `Hero shot of an iPhone floating at a slight angle against pure white, showing its back. ${product("white")} Soft rim lighting, the engraved three-square logo visible on the white plate. Bold minimal Apple-style hero. Soft shadow below.`,
  },
  {
    name: "r3-05",
    prompt: `Hero shot of an iPhone floating at a slight angle against pure white, showing its back. ${product("black")} Dramatic studio lighting, beautiful contrast. The three-square touching logo engraved into the matte black surface. Apple-style hero shot.`,
  },
  {
    name: "r3-06",
    prompt: `Hero shot of an iPhone floating at a slight angle against pure white, showing its back. ${product("rosegold")} The rose gold plate gleams. The compact three-square connected logo is subtly engraved. Elegant premium hero shot.`,
  },
  {
    name: "r3-07",
    prompt: `Three iPhones face-down side by side on a white surface. Left: ${product("white")} Center: ${product("black")} Right: ${product("rosegold")} Each plate has the same tiny three-square connected logo. Clean studio lighting, product lineup.`,
  },
  {
    name: "r3-08",
    prompt: `Three iPhones face-down side by side on dark slate. Left: ${product("white")} Center: ${product("black")} Right: ${product("rosegold")} Each shows the three-square touching logo. Dramatic moody lighting, reflective surface. Premium lineup.`,
  },

  // ── LIFESTYLE (6) ──────────────────────────────────────
  {
    name: "r3-09",
    prompt: `Overhead flat-lay of a clean white desk. An iPhone face-down showing its back. ${product("white")} MacBook corner, white mug, small plant nearby. The three-square connected logo visible on the plate. Bright daylight, Scandinavian minimal.`,
  },
  {
    name: "r3-10",
    prompt: `Overhead flat-lay of a clean desk. An iPhone face-down showing its back. ${product("black")} Notebook, earbuds, coffee nearby. The three-square touching logo on the black plate. Bright natural light, minimal aesthetic.`,
  },
  {
    name: "r3-11",
    prompt: `An iPhone face-down on a marble cafe table showing its back. ${product("rosegold")} Latte nearby, window light, blurred cafe background. The three-square connected logo on the rose gold plate. Warm lifestyle photography.`,
  },
  {
    name: "r3-12",
    prompt: `An iPhone face-down on a white nightstand showing its back. ${product("white")} Warm ambient bedside lamp light. Modern minimalist bedroom. The engraved three-square logo visible. Lifestyle photography.`,
  },
  {
    name: "r3-13",
    prompt: `An iPhone face-down on a linen couch cushion showing its back. ${product("black")} Person relaxing in soft focus background. The three-square touching logo on the black plate. Bright airy living room, editorial.`,
  },
  {
    name: "r3-14",
    prompt: `An iPhone face-down on a white vanity table showing its back. ${product("rosegold")} Perfume bottles and mirror in background. The three-square connected logo gleams. Soft glamorous lighting.`,
  },

  // ── IN-HAND (4) ────────────────────────────────────────
  {
    name: "r3-15",
    prompt: `A hand holding an iPhone showing its back to camera. ${product("white")} The three-square connected logo visible on the white plate. Clean white studio background, soft lighting. Natural relaxed grip.`,
  },
  {
    name: "r3-16",
    prompt: `A hand holding an iPhone showing its back directly to camera. ${product("black")} The compact three-square touching logo engraved on the black plate. White background, studio lighting. Natural grip.`,
  },
  {
    name: "r3-17",
    prompt: `A woman's hand holding an iPhone showing its back. ${product("rosegold")} The three-square connected logo catches warm light on the rose gold plate. White background, warm studio lighting. Elegant.`,
  },
  {
    name: "r3-18",
    prompt: `Low dramatic angle of a hand holding an iPhone tilted toward camera showing the back. ${product("silver")} The three-square touching logo prominent on the brushed silver plate. Gradient background, cinematic lighting.`,
  },

  // ── MACRO / DETAIL (2) ─────────────────────────────────
  {
    name: "r3-19",
    prompt: `Extreme macro close-up of a tiny engraved logo on a matte white plate on the back of an iPhone. The logo is three small equal squares touching at their corners — top and bottom aligned, middle offset left — forming one tight connected geometric mark engraved into the white surface. Beautiful shallow depth of field, studio lighting reveals the engraving depth.`,
  },
  {
    name: "r3-20",
    prompt: `Extreme macro close-up of a tiny engraved logo on a matte black plate on the back of an iPhone. The logo is three small equal squares touching at their corners — top and bottom aligned, middle offset left — one compact connected shape engraved into the dark surface. Dramatic side lighting reveals the mark. Shallow depth of field.`,
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
