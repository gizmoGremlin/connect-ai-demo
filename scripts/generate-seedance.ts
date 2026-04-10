import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const FAL_KEY = process.env.FAL_KEY;
const SEGMIND_KEY = process.env.SEGMIND_KEY;
if (!FAL_KEY) { console.error("Missing FAL_KEY"); process.exit(1); }
if (!SEGMIND_KEY) { console.error("Missing SEGMIND_KEY"); process.exit(1); }

const fal = createFalClient({ credentials: FAL_KEY });
const OUTPUT_DIR = resolve(__dirname, "../public/generated/video/seedance");
mkdirSync(OUTPUT_DIR, { recursive: true });

// Local assets to upload for public URLs
const LAST_FRAME = resolve(__dirname, "../public/generated/video/v3/v-epic-spin-lastframe.png");
const MID_FRAME = resolve(__dirname, "../public/generated/video/v3/v-epic-spin-midframe.png");
const EPIC_SPIN_VIDEO = resolve(__dirname, "../public/generated/video/v3/v-epic-spin.mp4");

const PRODUCT_DETAILS = `The device is a thin matte cool-grey rectangular plate. It has a tiny engraved geometric logo on its face — three small squares touching at their corners in a tight zigzag pattern (top and bottom aligned, middle offset left). NOT a cross or plus sign. There is a subtle small button on the side edge. The bottom edge has a USB-C port connector.`;

type Scene = {
  name: string;
  prompt: string;
  firstFrame: "last" | "mid";
  duration: number;
};

const scenes: Scene[] = [
  {
    name: "sd-undock",
    firstFrame: "last",
    duration: 10,
    prompt: `${PRODUCT_DETAILS} The thin grey plate slowly detaches and lifts off the back of the iPhone. The USB-C connector slides out of the port as the plate rises upward. The plate floats above the phone and begins a gentle rotation, showing the logo face, the thin side with the subtle button, the USB-C port on the bottom edge, and the smooth back. The iPhone remains below. Dark background, dramatic studio rim lighting, cinematic slow motion, Apple keynote product reveal style. No text.`,
  },
  {
    name: "sd-dock",
    firstFrame: "mid",
    duration: 10,
    prompt: `${PRODUCT_DETAILS} The thin grey plate descends slowly from above toward the back of an iPhone. The plate aligns precisely — the USB-C connector on its bottom edge slides smoothly into the iPhone's port. The plate settles flush against the phone's back with a satisfying magnetic snap. Camera slowly pulls back to reveal the assembled product at a dramatic hero angle. Dark background, studio rim lighting, cinematic slow motion, premium product demo. No text.`,
  },
  {
    name: "sd-undock-spin",
    firstFrame: "last",
    duration: 12,
    prompt: `Shot 1: ${PRODUCT_DETAILS} The plate detaches from the iPhone and rises upward, USB-C disconnecting smoothly. The iPhone falls away below. Shot 2: The floating plate does a slow dramatic 360-degree spin in mid-air. Studio light sweeps across the surface revealing the three-square logo, the side button, the USB-C port, and the smooth back. Dark background, cinematic rim lighting, Apple keynote reveal. No text.`,
  },
  {
    name: "sd-dock-from-spin",
    firstFrame: "last",
    duration: 10,
    prompt: `${PRODUCT_DETAILS} The grey plate is floating and slowly spinning in mid-air. It gradually slows its rotation, orients itself with the USB-C port pointing down, and descends toward the iPhone below. The plate aligns and docks onto the back of the phone — USB-C slides into the port, plate snaps flush. Camera settles on a hero angle of the assembled product. Dark background, dramatic studio lighting, cinematic slow motion. No text.`,
  },
];

async function uploadToFal(filePath: string, mime: string): Promise<string> {
  const file = new Blob([readFileSync(filePath)], { type: mime });
  return fal.storage.upload(file);
}

async function generateWithSeedance(
  prompt: string,
  firstFrameUrl: string,
  referenceVideoUrl: string,
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
    // Direct binary video response
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(outputPath, buffer);
    return;
  }

  // JSON response with URL
  const data = await response.json();
  const videoUrl = data?.video_url || data?.output?.video_url || data?.url || data?.output;

  if (typeof videoUrl === "string" && videoUrl.startsWith("http")) {
    const videoResponse = await fetch(videoUrl);
    const buffer = Buffer.from(await videoResponse.arrayBuffer());
    writeFileSync(outputPath, buffer);
    return;
  }

  // If it's base64
  if (typeof videoUrl === "string" && videoUrl.length > 1000) {
    writeFileSync(outputPath, Buffer.from(videoUrl, "base64"));
    return;
  }

  console.error("  Unexpected response format:", JSON.stringify(data).slice(0, 500));
  throw new Error("Could not extract video from response");
}

async function main() {
  console.log("Uploading reference assets to FAL storage...");
  const lastFrameUrl = await uploadToFal(LAST_FRAME, "image/png");
  console.log(`  Last frame: ${lastFrameUrl}`);
  const midFrameUrl = await uploadToFal(MID_FRAME, "image/png");
  console.log(`  Mid frame: ${midFrameUrl}`);
  const videoUrl = await uploadToFal(EPIC_SPIN_VIDEO, "video/mp4");
  console.log(`  Epic spin video: ${videoUrl}\n`);

  const frameUrls = { last: lastFrameUrl, mid: midFrameUrl };

  for (const scene of scenes) {
    const outPath = resolve(OUTPUT_DIR, `${scene.name}.mp4`);
    console.log(`[Seedance] Generating ${scene.name} (${scene.duration}s)...`);

    try {
      await generateWithSeedance(
        scene.prompt,
        frameUrls[scene.firstFrame],
        videoUrl,
        scene.duration,
        outPath
      );
      console.log(`  Saved: ${outPath}`);
    } catch (err) {
      console.error(`  Error generating ${scene.name}:`, err);
    }
  }

  console.log("\nDone! Check /v2/picks/videos");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
