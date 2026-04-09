import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

// ── Config ──────────────────────────────────────────────────────────
const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("Missing FAL_KEY in environment. Add it to .env.local");
  process.exit(1);
}

const fal = createFalClient({ credentials: FAL_KEY });

const REFERENCE_IMAGE = resolve(__dirname, "../connect_product.png");
const OUTPUT_DIR = resolve(__dirname, "../public/generated");

// ── Asset definitions ───────────────────────────────────────────────
const assets: Record<string, { prompt: string; width: number; height: number }> = {
  // Product shots
  "hero-product": {
    prompt:
      "Professional editorial product photography of a sleek aluminum USB-C device for iPhone automation, shown on a clean white marble surface with soft natural lighting, subtle shadow, shallow depth of field. The device is small, premium, CNC machined aluminum with a modern minimalist design. Shot from a low three-quarter angle. White and light gray color palette, Apple-style product photography.",
    width: 1344,
    height: 768,
  },
  "product-angle-front": {
    prompt:
      "Studio product photography of a small premium aluminum USB-C device for iPhone, front three-quarter view on pure white background. Clean studio lighting with soft reflections. The device is compact, sleek, CNC machined. Minimal, editorial style like Apple product shots.",
    width: 1024,
    height: 1024,
  },
  "product-angle-top": {
    prompt:
      "Top-down flat lay photography of a small aluminum USB-C device next to an iPhone 16 Pro on a clean white desk. Minimal props — just the device and phone. The USB-C device is plugged into the iPhone. Soft overhead lighting, editorial style, very clean.",
    width: 1344,
    height: 1024,
  },
  "product-detail-usbc": {
    prompt:
      "Extreme macro close-up photography of a USB-C connector on a premium aluminum device, showing the precision machining and build quality. Shallow depth of field, soft studio lighting, white background. The metal has a brushed aluminum finish.",
    width: 1344,
    height: 1024,
  },
  "product-hand": {
    prompt:
      "Clean product photography showing a human hand holding a small premium aluminum USB-C device between thumb and index finger against a white background, demonstrating its compact size. The device is tiny and sleek. Soft studio lighting, editorial style.",
    width: 1344,
    height: 1024,
  },

  // Lifestyle shots
  "lifestyle-desk": {
    prompt:
      "Overhead lifestyle photography of a minimal modern desk setup. An iPhone with a small aluminum USB-C device attached sits on the desk next to an open MacBook and a cup of coffee. Clean, bright, airy atmosphere with natural window light. White desk, minimal styling. Aspirational tech lifestyle.",
    width: 1344,
    height: 768,
  },
  "lifestyle-couch": {
    prompt:
      "Lifestyle photography of a person relaxing on a modern light-colored sofa reading a book, while on the side table their iPhone with a small aluminum device attached is visible running tasks autonomously. Bright, warm, airy interior. Natural light. Calm, relaxed mood.",
    width: 1344,
    height: 1024,
  },
  "lifestyle-commute": {
    prompt:
      "Lifestyle photography in a bright modern cafe setting. An iPhone with a small aluminum USB-C device sits on a light wooden table. A person is visible in the background, relaxed. Bright daylight, clean modern interior, aspirational tech lifestyle photo.",
    width: 1344,
    height: 1024,
  },
  "lifestyle-nightstand": {
    prompt:
      "Lifestyle photography of an iPhone with a small aluminum device attached, sitting on a minimalist white nightstand next to a bedside lamp. Soft warm ambient lighting, evening mood. Clean, modern bedroom interior. The phone screen has a subtle glow suggesting it is running automated tasks overnight.",
    width: 1344,
    height: 1024,
  },

  // UI / Feature imagery
  "dashboard-mockup": {
    prompt:
      "Clean minimal web dashboard UI screenshot showing a device management interface. White background, modern sans-serif typography, a sidebar with navigation, main area showing a list of automated tasks with status indicators (green checkmarks, blue progress bars). A device status card shows 'iPhone 15 Pro — Connected'. Modern, clean SaaS design aesthetic.",
    width: 1344,
    height: 768,
  },
  "before-after": {
    prompt:
      "Split-screen comparison image. Left side: a person looking stressed while manually scrolling through their phone, cool desaturated tones. Right side: the same person relaxing with coffee while their phone with a small aluminum device attached works automatically on a table, warm bright tones. Clean, modern, bright photography style with a clear dividing line down the middle.",
    width: 1344,
    height: 768,
  },
  "multi-device": {
    prompt:
      "Clean product photography of three identical small premium aluminum USB-C devices arranged neatly in a row on a white surface with soft shadows. Each device is slightly different angle. Studio lighting, Apple-style product photography, white background.",
    width: 1344,
    height: 768,
  },

  // Video thumbnails
  "video-thumb-demo": {
    prompt:
      "Cinematic still frame of a small aluminum USB-C device being plugged into an iPhone 16 Pro. The phone screen is glowing with a blue interface. Dramatic but clean lighting on a white desk surface. Slightly shallow depth of field, cinematic color grade. Would work as a YouTube video thumbnail.",
    width: 1344,
    height: 768,
  },
  "video-thumb-unbox": {
    prompt:
      "Premium product unboxing moment. A small aluminum USB-C device sits on white tissue paper inside an elegant minimal white box. Clean studio lighting, overhead angle. Premium packaging design, Apple-level presentation. The device catches light beautifully.",
    width: 1344,
    height: 768,
  },

  // Social / OG
  "og-image": {
    prompt:
      "Clean marketing hero image for a tech product. A small premium aluminum USB-C device for iPhone centered on a clean white-to-light-gray gradient background. Plenty of space around the product for text overlay. Studio lighting with soft shadows. Simple, bold, minimal.",
    width: 1200,
    height: 630,
  },
};

// ── CLI parsing ─────────────────────────────────────────────────────
const args = process.argv.slice(2);
const nameFlag = args.indexOf("--name");
const modelFlag = args.indexOf("--model");
const listFlag = args.includes("--list");

if (listFlag) {
  console.log("\nAvailable assets:\n");
  for (const [name, def] of Object.entries(assets)) {
    const exists = existsSync(resolve(OUTPUT_DIR, `${name}.png`));
    console.log(`  ${exists ? "✓" : "○"} ${name} (${def.width}x${def.height})`);
  }
  console.log(`\nUsage: npx tsx scripts/generate-asset.ts --name <asset-name>`);
  console.log(`       npx tsx scripts/generate-asset.ts --name all`);
  process.exit(0);
}

if (nameFlag === -1) {
  console.error("Usage: npx tsx scripts/generate-asset.ts --name <asset-name> [--model nano|flux2pro]");
  console.error("       npx tsx scripts/generate-asset.ts --list");
  process.exit(1);
}

const assetName = args[nameFlag + 1];
const modelChoice = modelFlag !== -1 ? args[modelFlag + 1] : "nano";

const modelId =
  modelChoice === "flux2pro" ? "fal-ai/flux-2/pro" : "fal-ai/nano-banana-2";

// ── Generation ──────────────────────────────────────────────────────
async function uploadReference(): Promise<string> {
  console.log("Uploading reference image...");
  const file = new Blob([readFileSync(REFERENCE_IMAGE)], { type: "image/png" });
  const url = await fal.storage.upload(file);
  console.log(`  Uploaded: ${url}`);
  return url;
}

async function generate(name: string, referenceUrl: string) {
  const def = assets[name];
  if (!def) {
    console.error(`Unknown asset: "${name}". Use --list to see available assets.`);
    process.exit(1);
  }

  const outPath = resolve(OUTPUT_DIR, `${name}.png`);
  console.log(`\nGenerating "${name}" with ${modelId}...`);
  console.log(`  Prompt: ${def.prompt.slice(0, 100)}...`);
  console.log(`  Size: ${def.width}x${def.height}`);

  const result = await fal.subscribe(modelId, {
    input: {
      prompt: def.prompt,
      image_url: referenceUrl,
      image_size: { width: def.width, height: def.height },
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS" && update.logs) {
        for (const log of update.logs) {
          console.log(`  [log] ${log.message}`);
        }
      }
    },
  });

  // Download the generated image
  const imageUrl = (result.data as any)?.images?.[0]?.url;
  if (!imageUrl) {
    console.error("  No image in response. Full result:");
    console.error(JSON.stringify(result.data, null, 2));
    return;
  }

  console.log(`  Downloading from: ${imageUrl}`);
  const response = await fetch(imageUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(outPath, buffer);
  console.log(`  Saved to: ${outPath}`);
  console.log(`  Done! Open the file to inspect.`);
}

async function main() {
  const referenceUrl = await uploadReference();

  if (assetName === "all") {
    for (const name of Object.keys(assets)) {
      await generate(name, referenceUrl);
    }
  } else {
    await generate(assetName, referenceUrl);
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
