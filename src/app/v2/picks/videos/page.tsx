"use client";

const videos = [
  { name: "product-silver", label: "Silver — Cinematic Orbit" },
  { name: "product-white", label: "White — Cinematic Orbit" },
];

const v2Scenes = [
  { name: "scene1-reveal", label: "Scene 1 — Dark Reveal" },
  { name: "scene2-orbit", label: "Scene 2 — Orbit Detail" },
  { name: "scene3-hero", label: "Scene 3 — Hero Float" },
];

const v3Kling = [
  { name: "k-liftoff", label: "Kling — Device Lifts Off Phone" },
  { name: "k-spin360", label: "Kling — 360° Spin (all sides)" },
  { name: "k-orbit-detail", label: "Kling — Orbit Back to Side" },
  { name: "k-reattach", label: "Kling — Float Down & Reattach" },
];

const v3Veo = [
  { name: "v-epic-spin", label: "Veo 3.1 — Epic Floating Spin (8s)" },
  { name: "v-liftoff-spin", label: "Veo 3.1 — Liftoff + 360° (8s)" },
];

const seedance = [
  { name: "sd-undock", label: "Seedance — Undock (10s)" },
  { name: "sd-dock", label: "Seedance — Dock (10s)" },
  { name: "sd-undock-spin", label: "Seedance — Undock + Spin (12s)" },
  { name: "sd-dock-from-spin", label: "Seedance — Dock from Spin (10s)" },
];

export default function VideoPicksPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Product Videos</h1>
        <p className="mt-2 text-gray-500">
          5-second cinematic product reveals. Kling v3 Pro, image-to-video.
        </p>

        <div className="mt-10 grid gap-8">
          {videos.map((vid) => (
            <div
              key={vid.name}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <video
                src={`/generated/video/${vid.name}.mp4`}
                controls
                loop
                playsInline
                className="w-full"
              />
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  {vid.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-bold text-gray-900">
          V2 — Apple Style (3 Scenes)
        </h2>
        <p className="mt-2 text-gray-500">
          Elements-enforced, cfg 0.8, negative prompt for logo accuracy.
        </p>
        <div className="mt-6 grid gap-8">
          {v2Scenes.map((vid) => (
            <div
              key={vid.name}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <video
                src={`/generated/video/v2/${vid.name}.mp4`}
                controls
                loop
                playsInline
                className="w-full"
              />
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  {vid.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        <h2 className="mt-14 text-2xl font-bold text-gray-900">
          V3 — Liftoff &amp; Spin (Kling v3 Pro)
        </h2>
        <p className="mt-2 text-gray-500">
          Continues from Scene 3 hero frame. Elements-enforced, logo + side button + USB-C in prompt.
        </p>
        <div className="mt-6 grid gap-8">
          {v3Kling.map((vid) => (
            <div
              key={vid.name}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <video
                src={`/generated/video/v3/${vid.name}.mp4`}
                controls
                loop
                playsInline
                className="w-full"
              />
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  {vid.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-bold text-gray-900">
          V3 — Longer Clips (Veo 3.1, 8s)
        </h2>
        <p className="mt-2 text-gray-500">
          Google DeepMind Veo 3.1 — longer 8-second cinematic clips.
        </p>
        <div className="mt-6 grid gap-8">
          {v3Veo.map((vid) => (
            <div
              key={vid.name}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <video
                src={`/generated/video/v3/${vid.name}.mp4`}
                controls
                loop
                playsInline
                className="w-full"
              />
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  {vid.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        <h2 className="mt-14 text-2xl font-bold text-gray-900">
          Seedance 2.0 — Dock / Undock
        </h2>
        <p className="mt-2 text-gray-500">
          Continues from Epic Floating Spin. Device separates and reattaches. Reference video + first frame enforced.
        </p>
        <div className="mt-6 grid gap-8">
          {seedance.map((vid) => (
            <div
              key={vid.name}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <video
                src={`/generated/video/seedance/${vid.name}.mp4`}
                controls
                loop
                playsInline
                className="w-full"
              />
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  {vid.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
