import { createFalClient } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const FAL_KEY = process.env.FAL_KEY;
const SEGMIND_KEY = process.env.SEGMIND_KEY;
if (!FAL_KEY) { console.error("Missing FAL_KEY"); process.exit(1); }
if (!SEGMIND_KEY) { console.error("Missing SEGMIND_KEY"); process.exit(1); }

const fal = createFalClient({ credentials: FAL_KEY });
const PRODUCT_IMAGE = resolve(__dirname, "../connect_product.png");
const OUTPUT_DIR = resolve(__dirname, "../public/generated/video/seedance-r5");
mkdirSync(OUTPUT_DIR, { recursive: true });

const PRODUCT_PREFIX = `The product shown in the reference image is a thin matte cool-grey aluminum rectangular plate that attaches to the back of an iPhone. It is smaller than the phone, covering the lower two-thirds. It has the exact logo shown in the reference image engraved on its face. Subtle button on the side edge, USB-C port on the bottom.`;

type Scene = { name: string; prompt: string; duration: number };

const scenes: Scene[] = [
  // ── SINGLE DEVICE (1-10) ──────────────────────────────
  {
    name: "r5-slow-orbit",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} The iPhone with the grey plate attached floats at a dramatic angle against a pure clean white background. Camera does a very slow, smooth 360° orbit around the phone over 15 seconds, revealing every angle — back with logo, side profile showing thin design and button, bottom showing USB-C port, back again. Ultra slow and smooth. Bright clean studio lighting, soft subtle shadow below. Premium Apple product page cinematography. No text.`,
  },
  {
    name: "r5-fast-cuts",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Shot 1: iPhone with grey plate, dramatic back view floating against white, camera pushes in fast. Shot 2: Quick cut to side profile, plate is ultra thin, button visible. Shot 3: Quick cut to low angle, USB-C port prominent. Shot 4: Quick cut to overhead, logo visible. Shot 5: Pull back to hero angle. Fast dynamic pacing, each shot 2-3 seconds. White background, bright punchy studio lighting. Energetic product montage. No text.`,
  },
  {
    name: "r5-undock-full",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Against pure white background, the iPhone with grey plate sits at an angle. The plate slowly detaches and lifts off, USB-C disconnecting. The plate rises, does a slow 180° rotation showing the logo and edges, then descends and docks back onto the phone. Full undock-and-redock cycle. Bright clean studio lighting. Cinematic slow motion. No text.`,
  },
  {
    name: "r5-hero-rise",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} iPhone with grey plate lays flat on a white surface. It slowly tilts upward and rises into a dramatic floating hero angle over 8 seconds. Holds the hero pose for 4 seconds as camera slowly pushes in on the logo. Then gently settles back down. White background, bright lighting, soft shadow. Cinematic breathing rhythm. No text.`,
  },
  {
    name: "r5-spin-reveal",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} The grey plate floats alone against pure white, spinning slowly. Camera starts tight on the logo face, pulls back as the plate rotates to reveal the side button, then the USB-C port on the bottom edge, then the smooth back. Full 360° over 10 seconds. Then the iPhone rises from below and the plate descends to dock onto it. Bright studio lighting. No text.`,
  },
  {
    name: "r5-macro-sweep",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Extreme close-up macro shot. Camera slowly sweeps across the surface of the grey plate attached to the iPhone against white. Starts on the brushed texture, moves to the engraved logo, continues to the edge showing the side button, then moves down to the USB-C port. Ultra shallow depth of field. Bright clean lighting. Slow deliberate camera movement. Product detail cinematography. No text.`,
  },
  {
    name: "r5-dock-dramatic",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Pure white background. The grey plate and iPhone are separated, both floating. The plate slowly rotates and aligns. Dramatic pause. Then it descends with increasing speed and snaps onto the iPhone — USB-C connecting with precision. Camera holds on the assembled product in hero pose for 5 seconds. Bright studio lighting, cinematic timing. No text.`,
  },
  {
    name: "r5-overhead-to-hero",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Starts with an overhead top-down view of the iPhone with grey plate on a white surface, logo visible. Camera slowly tilts and orbits to a three-quarter angle over 10 seconds, revealing depth and dimension. Then slowly pushes in to a close-up hero shot of the product floating. White background throughout. Smooth continuous camera movement. No text.`,
  },
  {
    name: "r5-speed-ramp",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} iPhone with grey plate floats against white. Camera orbits at normal speed, then ramps to ultra slow-motion as it passes the logo face — every detail visible. Speed picks back up as it continues around to the side profile. Slows again at the USB-C port. Dynamic speed ramping throughout the orbit. Bright studio lighting. Cinematic. No text.`,
  },
  {
    name: "r5-assembly",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Shot 1: An iPhone sits alone on white, camera shows the bare back. Shot 2: The grey plate slides in from the side, gliding toward the phone. Shot 3: The plate aligns and docks with a precise snap — USB-C connects. Shot 4: Camera pulls back to reveal the assembled product in a hero floating pose. Satisfying product assembly sequence. White background, bright lighting. No text.`,
  },

  // ── MULTI-DEVICE / CREATIVE (11-20) ────────────────────
  {
    name: "r5-trio-orbit",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Three iPhones float in a triangle formation against pure white, each with a grey plate attached. Camera slowly orbits around all three, showing them from different angles simultaneously. The plates all have the same logo. Bright clean studio lighting. Apple product lineup cinematography. No text.`,
  },
  {
    name: "r5-trio-converge",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Three iPhones with grey plates slide in from different directions against white — one from left, one from right, one from above. They converge to the center and settle in a neat row, showing all three backs with logos. Camera pushes in. Bright studio lighting, smooth motion. No text.`,
  },
  {
    name: "r5-cascade-dock",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Three grey plates float in a vertical cascade against white. Below them, three iPhones wait. One by one, each plate descends and docks onto its phone — first the left, then center, then right. A satisfying sequential docking. Camera pulls back to show the completed trio. Bright lighting. No text.`,
  },
  {
    name: "r5-fan-spread",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} A single iPhone with grey plate in the center against white. Two more phones with plates slowly emerge from behind it, fanning out to the left and right like a card spread. All three settle at different angles, showing the product from back, side, and three-quarter views simultaneously. Bright studio lighting. No text.`,
  },
  {
    name: "r5-domino-spin",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Five iPhones with grey plates arranged in a line against white. The first one begins a slow spin, which triggers the next, and the next — a domino-like chain of spins rippling across the line. Dynamic and playful. Bright clean lighting, white background. No text.`,
  },
  {
    name: "r5-float-constellation",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Multiple iPhones with grey plates float at various heights and angles against pure white, like a constellation. Camera slowly drifts through them, passing close to some showing logo detail and far from others. Dreamy, spacious composition. Bright soft lighting. No text.`,
  },
  {
    name: "r5-mirror-pair",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Two iPhones with grey plates float facing each other like a mirror image against white. They slowly rotate in opposite directions, perfectly synchronized. Camera moves between them. Elegant symmetrical choreography. Bright studio lighting. No text.`,
  },
  {
    name: "r5-exploded-view",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} An assembled iPhone with grey plate against white. The plate slowly lifts off and floats above. The phone rotates to show its bare back. The plate rotates separately showing its USB-C connector underneath. Both parts slowly come together and reassemble. Technical exploded-view style animation. Bright clean lighting. No text.`,
  },
  {
    name: "r5-grid-wall",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Camera pulls back to reveal a 3x3 grid of nine iPhones with grey plates, all mounted vertically against white, like a product display wall. Camera slowly pushes in toward the center phone. All plates have the logo. Clean, bold, retail display aesthetic. Bright even lighting. No text.`,
  },
  {
    name: "r5-hero-finale",
    duration: 15,
    prompt: `${PRODUCT_PREFIX} Shot 1: Wide shot — three iPhones with grey plates orbiting each other against white. Shot 2: They converge and one rises to the foreground. Shot 3: Camera pushes into a dramatic close-up hero shot of the single product, logo prominently visible. Grand finale energy. Bright cinematic studio lighting. No text.`,
  },
];

async function generateWithSeedance(
  prompt: string,
  refImageUrl: string,
  duration: number,
  outputPath: string
) {
  const body = {
    prompt,
    reference_images: [refImageUrl],
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
    throw new Error(`Segmind ${response.status}: ${errText}`);
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("video") || contentType.includes("octet-stream")) {
    writeFileSync(outputPath, Buffer.from(await response.arrayBuffer()));
    return;
  }

  const data = await response.json();
  const videoUrl = data?.video_url || data?.output?.video_url || data?.url || data?.output;

  if (typeof videoUrl === "string" && videoUrl.startsWith("http")) {
    const vid = await fetch(videoUrl);
    writeFileSync(outputPath, Buffer.from(await vid.arrayBuffer()));
    return;
  }

  if (typeof videoUrl === "string" && videoUrl.length > 1000) {
    writeFileSync(outputPath, Buffer.from(videoUrl, "base64"));
    return;
  }

  console.error("  Unexpected response:", JSON.stringify(data).slice(0, 500));
  throw new Error("Could not extract video");
}

async function main() {
  console.log("Uploading product reference to FAL...");
  const file = new Blob([readFileSync(PRODUCT_IMAGE)], { type: "image/png" });
  const refUrl = await fal.storage.upload(file);
  console.log(`  Reference: ${refUrl}\n`);

  for (const scene of scenes) {
    const outPath = resolve(OUTPUT_DIR, `${scene.name}.mp4`);

    // Skip already-generated files
    if (existsSync(outPath)) {
      const stat = readFileSync(outPath);
      if (stat.length > 10000) {
        console.log(`[skip] ${scene.name} already exists (${(stat.length / 1024).toFixed(0)}KB)`);
        continue;
      }
    }

    console.log(`[Seedance] ${scene.name} (${scene.duration}s)...`);
    try {
      await generateWithSeedance(scene.prompt, refUrl, scene.duration, outPath);
      console.log(`  Saved: ${scene.name}.mp4`);
    } catch (err) {
      console.error(`  Error ${scene.name}:`, err);
    }
  }

  console.log("\nDone! Check /v2/picks/videos-r5");
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
