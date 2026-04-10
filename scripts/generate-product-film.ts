import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "fs";
import { resolve } from "path";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("Missing FAL_KEY");
  process.exit(1);
}

const fal = createFalClient({ credentials: FAL_KEY });

const SEED_IMAGE = resolve(
  __dirname,
  "../public/generated/lifestyle/03-content-creator.png"
);
const OUTPUT_DIR = resolve(__dirname, "../public/generated/video/product-film");
const OUTPUT_FILE = resolve(OUTPUT_DIR, "placeholder.mp4");

mkdirSync(OUTPUT_DIR, { recursive: true });

const PROMPT =
  "The person at the desk glances over at the iPhone resting beside the laptop, watches it for a beat as the screen softly glows, then smiles faintly and returns to their work. Natural window light, subtle camera push-in, cinematic slow motion, editorial lifestyle film, shallow depth of field.";

async function run(duration: 5 | 10) {
  console.log(`Uploading seed image (${SEED_IMAGE})...`);
  const file = new Blob([readFileSync(SEED_IMAGE)], { type: "image/png" });
  const imageUrl = await fal.storage.upload(file);
  console.log(`  Uploaded: ${imageUrl}`);

  console.log(`Generating product film (~${duration}s)...`);
  const result = await fal.subscribe(
    "fal-ai/kling-video/v3/pro/image-to-video",
    {
      input: {
        prompt: PROMPT,
        image_url: imageUrl,
        duration,
        aspect_ratio: "16:9",
      },
      logs: true,
    }
  );

  const videoUrl = (result.data as { video?: { url?: string } })?.video?.url;
  if (!videoUrl) {
    throw new Error(
      `No video returned. Response: ${JSON.stringify(result.data, null, 2)}`
    );
  }

  const response = await fetch(videoUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(OUTPUT_FILE, buffer);
  console.log(
    `  Saved: ${OUTPUT_FILE} (${(buffer.length / 1024 / 1024).toFixed(2)}MB)`
  );
}

async function main() {
  if (existsSync(OUTPUT_FILE) && statSync(OUTPUT_FILE).size > 10_000) {
    console.log(`Skipping — ${OUTPUT_FILE} already exists`);
    return;
  }

  try {
    await run(10);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (/duration/i.test(msg)) {
      console.warn(
        `  10s rejected by model (${msg}), falling back to 5s...`
      );
      await run(5);
    } else {
      throw err;
    }
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
