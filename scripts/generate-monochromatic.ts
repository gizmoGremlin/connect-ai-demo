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
const OUTPUT_DIR = resolve(__dirname, "../public/generated/options/mono");

mkdirSync(OUTPUT_DIR, { recursive: true });

const PRODUCT_BASE = `A small thin rectangular plate attached to the back of an iPhone. The plate is smaller than the phone, covering only the lower two-thirds of the phone's back, leaving the iPhone's camera lenses exposed at the top. The plate has a minimal abstract logo engraved in the center — three equal square cutouts, top and bottom squares vertically aligned, middle square offset to the left, with small consistent spacing between them. Subtle inset engraving, monochrome. It connects through the iPhone's USB-C port at the bottom. The plate is very thin and flush against the phone. This is a real product photo — the device is a sleek accessory attached to the back of an iPhone, not a standalone device.`;

function product(color: string) {
  const mat: Record<string, string> = {
    white: "matte white",
    black: "matte black",
    rosegold: "rose gold metallic",
  };
  return PRODUCT_BASE.replace(
    "A small thin rectangular plate",
    `A small thin ${mat[color]} rectangular plate`
  );
}

type Option = { name: string; prompt: string };

const options: Option[] = [
  // ── IN-HAND (7) ────────────────────────────────────────
  {
    name: "ih-01-white-casual",
    prompt: `A person's hand casually holding an iPhone showing its back to the camera. ${product("white")} The white plate is clearly visible on the lower back. Clean white studio background, soft diffused lighting. Natural relaxed grip.`,
  },
  {
    name: "ih-02-white-palm",
    prompt: `Close-up of a hand holding an iPhone face-down in their palm, showing the back. ${product("white")} The white device contrasts subtly against the phone. Bright studio lighting, shallow depth of field on the hand.`,
  },
  {
    name: "ih-03-black-street",
    prompt: `A person holding an iPhone showing its back, standing on a city sidewalk. ${product("black")} The matte black plate blends elegantly with the iPhone. Natural daylight, urban background in soft bokeh. Street style photography.`,
  },
  {
    name: "ih-04-black-grip",
    prompt: `Close-up of a hand gripping an iPhone from behind, thumb resting near the camera. ${product("black")} The matte black plate is sleek and nearly seamless against the phone body. Dark minimal studio background, dramatic side lighting.`,
  },
  {
    name: "ih-05-rosegold-feminine",
    prompt: `A woman's hand holding an iPhone showing its back. ${product("rosegold")} The rose gold plate catches warm light beautifully. Clean white background, soft warm studio lighting. Elegant and premium feeling.`,
  },
  {
    name: "ih-06-rosegold-reach",
    prompt: `A hand reaching for an iPhone on a white marble surface, about to pick it up, showing the back of the phone. ${product("rosegold")} The rose gold plate gleams. Overhead angle, bright natural light, lifestyle product photography.`,
  },
  {
    name: "ih-07-black-twohands",
    prompt: `Two hands holding an iPhone, one supporting from below, showing the back of the phone to camera. ${product("black")} The matte black plate is prominent. Clean light gray background, studio product photography. Showing the thin profile.`,
  },

  // ── LIFESTYLE (7) ──────────────────────────────────────
  {
    name: "ls-01-white-desk",
    prompt: `Overhead flat-lay of a clean white desk. An iPhone lays face-down showing its back. ${product("white")} Next to the phone: a MacBook, a white ceramic mug, and a small plant. Bright natural daylight, minimal Scandinavian aesthetic.`,
  },
  {
    name: "ls-02-black-nightstand",
    prompt: `An iPhone laying face-down on a dark walnut nightstand showing its back. ${product("black")} Soft warm ambient evening light from a bedside lamp. Modern minimalist bedroom. Moody lifestyle photography.`,
  },
  {
    name: "ls-03-rosegold-cafe",
    prompt: `An iPhone laying face-down on a light marble cafe table showing its back. ${product("rosegold")} A latte in a ceramic cup nearby, soft natural window light, blurred cafe background. Warm aspirational lifestyle photography.`,
  },
  {
    name: "ls-04-white-couch",
    prompt: `An iPhone laying face-down on a light linen couch cushion showing its back. ${product("white")} A person relaxing in soft focus in the background. Bright airy living room, natural daylight. Lifestyle editorial.`,
  },
  {
    name: "ls-05-black-gym",
    prompt: `An iPhone laying face-down on a gym bench showing its back. ${product("black")} A water bottle and towel nearby. Clean modern gym environment, bright overhead lighting. Active lifestyle product photography.`,
  },
  {
    name: "ls-06-rosegold-vanity",
    prompt: `An iPhone laying face-down on a white vanity table showing its back. ${product("rosegold")} Next to small perfume bottles and a mirror. Soft glamorous lighting, feminine aesthetic. Premium lifestyle photography.`,
  },
  {
    name: "ls-07-white-kitchen",
    prompt: `An iPhone laying face-down on a white kitchen counter showing its back. ${product("white")} Morning scene with a coffee maker and fruit bowl in soft background. Bright clean natural light. Everyday lifestyle photography.`,
  },

  // ── PRODUCT SOLO (7) ───────────────────────────────────
  {
    name: "ps-01-white-hero",
    prompt: `Product photography of an iPhone floating at a slight angle against a pure white background, showing its back. ${product("white")} The white plate catches soft rim lighting. Bold hero shot, minimal, Apple-style editorial. Soft shadow below.`,
  },
  {
    name: "ps-02-black-hero",
    prompt: `Product photography of an iPhone floating at a slight angle against a pure white background, showing its back. ${product("black")} The matte black plate has beautiful contrast against the white background. Dramatic studio lighting with subtle reflections. Apple-style editorial hero shot.`,
  },
  {
    name: "ps-03-rosegold-hero",
    prompt: `Product photography of an iPhone floating at a slight angle against a pure white background, showing its back. ${product("rosegold")} The rose gold plate gleams under studio lighting. Premium, elegant hero product shot. Soft shadow below.`,
  },
  {
    name: "ps-04-trio-lineup",
    prompt: `Three iPhones standing upright in a row showing their backs, each with a different colored plate attached. Left phone has a matte white plate, center has matte black, right has rose gold. Each plate is small, covering the lower two-thirds, camera lenses exposed. Cross/plus symbol on each. Clean white background, even studio lighting. Product lineup comparison shot.`,
  },
  {
    name: "ps-05-black-dramatic",
    prompt: `Dramatic low-angle product shot of an iPhone laying on a reflective dark surface, showing its back. ${product("black")} The matte black plate is lit by a single beam of light from the side. Dark moody studio photography, beautiful reflections.`,
  },
  {
    name: "ps-06-rosegold-macro",
    prompt: `Extreme macro close-up of the three-square logo embossed on the plate attached to the back of an iPhone. ${product("rosegold")} The rose gold brushed metal texture catches studio light. Beautiful shallow depth of field, detail shot.`,
  },
  {
    name: "ps-07-white-topdown",
    prompt: `Top-down overhead product shot of an iPhone laying face-down on a clean white surface, showing its back. ${product("white")} The white plate is minimal and clean. Centered composition, soft even studio lighting, subtle shadow. Clean product photography.`,
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

  console.log("\nDone! Refresh /v2/picks/monochromatic");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
