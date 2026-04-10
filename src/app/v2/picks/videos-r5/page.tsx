"use client";

const singleDevice = [
  { name: "r5-slow-orbit", label: "Slow 360° Orbit", desc: "Full orbit revealing every angle" },
  { name: "r5-fast-cuts", label: "Fast Cuts Montage", desc: "Quick cuts between 5 dramatic angles" },
  { name: "r5-undock-full", label: "Undock + Redock", desc: "Full detach, rotate, reattach cycle" },
  { name: "r5-hero-rise", label: "Hero Rise", desc: "Flat to floating hero with logo push-in" },
  { name: "r5-spin-reveal", label: "Spin Reveal", desc: "Plate spins solo then docks onto phone" },
  { name: "r5-macro-sweep", label: "Macro Sweep", desc: "Close-up sweep across texture, logo, edges" },
  { name: "r5-dock-dramatic", label: "Dramatic Dock", desc: "Separated parts align and snap together" },
  { name: "r5-overhead-to-hero", label: "Overhead to Hero", desc: "Top-down orbits to three-quarter hero" },
  { name: "r5-speed-ramp", label: "Speed Ramp", desc: "Dynamic speed changes during orbit" },
  { name: "r5-assembly", label: "Assembly", desc: "Plate slides in and docks, pull back to hero" },
];

const multiDevice = [
  { name: "r5-trio-orbit", label: "Trio Orbit", desc: "Three phones in triangle, camera orbits" },
  { name: "r5-trio-converge", label: "Trio Converge", desc: "Three phones slide in from all directions" },
  { name: "r5-cascade-dock", label: "Cascade Dock", desc: "Sequential docking — left, center, right" },
  { name: "r5-fan-spread", label: "Fan Spread", desc: "Cards fan out showing multiple angles" },
  { name: "r5-domino-spin", label: "Domino Spin", desc: "Chain reaction of spins across five phones" },
  { name: "r5-float-constellation", label: "Constellation", desc: "Camera drifts through floating phones" },
  { name: "r5-mirror-pair", label: "Mirror Pair", desc: "Two phones rotate in opposite sync" },
  { name: "r5-exploded-view", label: "Exploded View", desc: "Technical disassembly and reassembly" },
  { name: "r5-grid-wall", label: "Grid Wall", desc: "3x3 product display wall, push to center" },
  { name: "r5-hero-finale", label: "Hero Finale", desc: "Three orbit, converge, one rises to hero" },
];

function VideoCard({ name, label, desc }: { name: string; label: string; desc: string }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:border-gray-200 hover:shadow-lg">
      <div className="relative aspect-video bg-gray-50">
        <video
          src={`/generated/video/seedance-r5/${name}.mp4`}
          controls
          loop
          playsInline
          muted
          className="h-full w-full object-contain"
        />
      </div>
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{label}</h3>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
            15s
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}

export default function R5VideosPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
            Seedance 2.0 &middot; Reference Image Mode &middot; White Background
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Round 5 — Product Videos
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            20 clips at 15s each. Product reference image enforced for logo &amp; shape consistency.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-gray-400">
          Single Device (10)
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {singleDevice.map((v) => (
            <VideoCard key={v.name} {...v} />
          ))}
        </div>

        <h2 className="mt-16 text-sm font-medium uppercase tracking-[0.15em] text-gray-400">
          Multi-Device / Creative (10)
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {multiDevice.map((v) => (
            <VideoCard key={v.name} {...v} />
          ))}
        </div>
      </div>
    </div>
  );
}
