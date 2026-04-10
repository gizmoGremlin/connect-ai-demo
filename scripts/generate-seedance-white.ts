import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const FAL_KEY = process.env.FAL_KEY;
const SEGMIND_KEY = process.env.SEGMIND_KEY;
if (!FAL_KEY) { console.error("Missing FAL_KEY"); process.exit(1); }
if (!SEGMIND_KEY) { console.error("Missing SEGMIND_KEY"); process.exit(1); }

const fal = createFalClient({ credentials: FAL_KEY });
const OUTPUT_DIR = resolve(__dirname, "../public/generated/video/seedance-white");
mkdirSync(OUTPUT_DIR, { recursive: true });

const HERO_FRAME = resolve(__dirname, "../public/generated/video/seedance-white/white-hero-float.png");
const LOW_FRAME = resolve(__dirname, "../public/generated/video/seedance-white/white-low-angle.png");

const PRODUCT_DETAILS = `The device is a thin matte cool-grey rectangular plate attached to the back of an iPhone. It has a tiny engraved geometric logo on its face — three small squares touching at their corners in a tight zigzag pattern (top and bottom aligned, middle offset left). NOT a cross or plus sign. There is a subtle small button on the side edge. The bottom edge has a USB-C port connector.`;

type Scene = {
  name: string;
  prompt: string;
  firstFrame: "hero" | "low";
  duration: number;
};

const scenes: Scene[] = [
  {
    name: "sw-undock",
    firstFrame: "hero",
    duration: 10,
    prompt: `${PRODUCT_DETAILS} The thin grey plate slowly detaches and lifts off the back of the iPhone. The USB-C connector slides out of the port as the plate rises upward. The plate floats above the phone and begins a gentle rotation, showing the logo face, the thin side with the subtle button, the USB-C port on the bottom edge, and the smooth back. The iPhone remains below. Pure white background, bright clean studio lighting, soft shadows. Cinematic slow motion, premium Apple product page style. No text.`,
  },
  {
    name: "sw-dock",
    firstFrame: "low",
    duration: 10,
    prompt: `${PRODUCT_DETAILS} The thin grey plate descends slowly from above toward the back of an iPhone. The plate aligns precisely — the USB-C connector on its bottom edge slides smoothly into the iPhone's port. The plate settles flush against the phone's back with a satisfying snap. Camera slowly pulls back to reveal the assembled product. Pure white background, bright clean studio lighting, soft shadows. Cinematic slow motion, premium product demo. No text.`,
  },
  {
    name: "sw-orbit",
    firstFrame: "hero",
    duration: 10,
    prompt: `${PRODUCT_DETAILS} Smooth cinematic orbit around the iPhone floating at an angle, showing its back with the grey plate attached. Camera moves from back view to side profile, revealing the thin flush design, the side button, and the USB-C port. Pure white background, bright even studio lighting, soft subtle shadow below. Premium Apple-style product cinematography, slow smooth motion. No text.`,
  },
  {
    name: "sw-spin-360",
    firstFrame: "hero",
    duration: 12,
    prompt: `Shot 1: ${PRODUCT_DETAILS} The plate detaches from the iPhone and rises upward, USB-C disconnecting smoothly. Pure white background, bright lighting. Shot 2: The floating plate does a slow dramatic 360-degree spin in mid-air against the white background. Clean studio light reveals the three-square logo, the side button, the USB-C port, and the smooth back from every angle. Bright, clean, minimal. Cinematic slow motion. No text.`,
  },
  {
    name: "sw-dock-settle",
    firstFrame: "hero",
    duration: 10,
    prompt: `${PRODUCT_DETAILS} The grey plate is floating and slowly spinning against a pure white background. It gradually slows, orients itself with the USB-C port pointing down, and descends toward the iPhone below. The plate aligns and docks onto the back of the phone — USB-C slides into port, plate snaps flush. Camera settles on a hero angle. White background, bright clean lighting, soft shadow. Premium product reveal. No text.`,
  },
  {
    name: "sw-hero-reveal",
    firstFrame: "low",
    duration: 8,
    prompt: `${PRODUCT_DETAILS} Camera slowly rises from a low angle showing the iPhone with the grey plate attached on its back, USB-C port and thin profile visible. The camera lifts and orbits to a dramatic hero angle, revealing the full product from above. Pure white background, bright studio lighting, the grey plate contrasts beautifully against the white. Cinematic slow motion, Apple product page reveal. No text.`,
  },
];

async function uploadToFal(filePath: string, mime: string): Promise<string> {
  const file = new Blob([readFileSync(filePath)], { type: mime });
  return fal.storage.upload(file);
}

async function generateWithSeedance(
  prompt: string,
  firstFrameUrl: string,
  duration: number,
  outputPath: string
) {
  const body = {
    prompt,
    first_frame_url: firstFrameUrl,
    duration,
    resolution: "720p",
    aspect_ratio: "16:9",
    generate_audio: false,
    seed: 42,
  };

  const response = await fetch("https://api.segmind.com/v1/seedance-2.0", {
    method: "POST",
    headers: {
      "x-api-key": SEGMIND_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Segmind API error ${response.status}: ${errText}`);
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("video") || contentType.includes("octet-stream")) {
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(outputPath, buffer);
    return;
  }

  const data = await response.json();
  const videoUrl = data?.video_url || data?.output?.video_url || data?.url || data?.output;

  if (typeof videoUrl === "string" && videoUrl.startsWith("http")) {
    const videoResponse = await fetch(videoUrl);
    const buffer = Buffer.from(await videoResponse.arrayBuffer());
    writeFileSync(outputPath, buffer);
    return;
  }

  if (typeof videoUrl === "string" && videoUrl.length > 1000) {
    writeFileSync(outputPath, Buffer.from(videoUrl, "base64"));
    return;
  }

  console.error("  Unexpected response:", JSON.stringify(data).slice(0, 500));
  throw new Error("Could not extract video from response");
}

async function main() {
  console.log("Uploading frames to FAL storage...");
  const heroUrl = await uploadToFal(HERO_FRAME, "image/png");
  console.log(`  Hero frame: ${heroUrl}`);
  const lowUrl = await uploadToFal(LOW_FRAME, "image/png");
  console.log(`  Low frame: ${lowUrl}\n`);

  const frameUrls = { hero: heroUrl, low: lowUrl };

  for (const scene of scenes) {
    const outPath = resolve(OUTPUT_DIR, `${scene.name}.mp4`);
    console.log(`[Seedance] Generating ${scene.name} (${scene.duration}s)...`);

    try {
      await generateWithSeedance(
        scene.prompt,
        frameUrls[scene.firstFrame],
        scene.duration,
        outPath
      );
      console.log(`  Saved: ${outPath}`);
    } catch (err) {
      console.error(`  Error generating ${scene.name}:`, err);
    }
  }

  console.log("\nDone! Check /v2/picks/videos-white");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
