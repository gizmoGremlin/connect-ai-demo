"use client";

import { useState } from "react";

const videos = [
  { name: "sw-undock", label: "Undock", desc: "Device lifts off the iPhone, rotates to show all sides", duration: "10s" },
  { name: "sw-dock", label: "Dock", desc: "Plate descends and snaps onto the iPhone", duration: "10s" },
  { name: "sw-orbit", label: "Orbit", desc: "Camera orbits from back to side profile", duration: "10s" },
  { name: "sw-spin-360", label: "Undock + 360° Spin", desc: "Detach then full rotation mid-air", duration: "12s" },
  { name: "sw-dock-settle", label: "Dock from Spin", desc: "Spinning plate slows and reattaches", duration: "10s" },
  { name: "sw-hero-reveal", label: "Hero Reveal", desc: "Low angle rises to dramatic hero shot", duration: "8s" },
];

export default function WhiteVideosPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
            Seedance 2.0 &middot; White Background
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Product Videos
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Clean, bright, Apple-style product cinematography. Pick your favorites.
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {videos.map((vid) => (
            <div
              key={vid.name}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50 transition-all hover:border-gray-200 hover:shadow-lg"
            >
              <div className="relative aspect-video bg-white">
                <video
                  src={`/generated/video/seedance-white/${vid.name}.mp4`}
                  controls
                  loop
                  playsInline
                  muted
                  className="h-full w-full object-contain"
                  onPlay={() => setActive(vid.name)}
                />
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{vid.label}</h3>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                    {vid.duration}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{vid.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reference Frames */}
        <div className="mt-16 border-t border-gray-100 pt-10">
          <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-gray-400">
            Starting Frames
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/generated/video/seedance-white/white-hero-float.png"
                alt="Hero float frame"
                className="w-full"
                loading="lazy"
              />
              <div className="bg-gray-50 px-4 py-2">
                <p className="text-xs text-gray-500">Hero Float — starting frame for most clips</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/generated/video/seedance-white/white-low-angle.png"
                alt="Low angle frame"
                className="w-full"
                loading="lazy"
              />
              <div className="bg-gray-50 px-4 py-2">
                <p className="text-xs text-gray-500">Low Angle — USB-C and profile visible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
