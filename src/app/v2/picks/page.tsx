"use client";

const images = [
  { name: "01-white-surface", label: "01 — White Surface (studio)" },
  { name: "02-angled-hero", label: "02 — Angled Hero Shot" },
  { name: "03-overhead-desk", label: "03 — Overhead Desk (lifestyle)" },
  { name: "04-in-hand-back", label: "04 — In Hand (showing back)" },
  { name: "05-close-up-logo", label: "05 — Close-Up Logo Detail" },
  { name: "06-side-profile", label: "06 — Side Profile (thin)" },
  { name: "07-nightstand", label: "07 — Nightstand (lifestyle)" },
  { name: "08-two-phones", label: "08 — Two Phones Comparison" },
  { name: "09-floating", label: "09 — Floating Hero" },
  { name: "10-cafe-table", label: "10 — Cafe Table (lifestyle)" },
];

export default function PicksPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Hero Image Options (Round 2)
        </h1>
        <p className="mt-2 text-gray-500">
          Small aluminum plate attached to back of iPhone. Pick your favorites.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {images.map((img) => (
            <div key={img.name} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="relative aspect-video bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/generated/options/${img.name}.png`}
                  alt={img.label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  {img.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
