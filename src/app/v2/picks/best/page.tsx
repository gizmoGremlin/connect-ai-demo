"use client";

const approved = [
  { name: "ih-01-white-casual", label: "White — Casual Hold" },
  { name: "ih-07-black-twohands", label: "Black — Two Hands" },
  { name: "ls-05-black-gym", label: "Black — Gym" },
  { name: "ls-07-white-kitchen", label: "White — Kitchen" },
  { name: "ps-01-white-hero", label: "White — Hero Shot" },
  { name: "ps-06-rosegold-macro", label: "Rose Gold — Macro Detail" },
  { name: "ps-07-white-topdown", label: "White — Top-Down" },
];

const round2 = [
  { name: "r2-01", label: "White — Studio Flat" },
  { name: "r2-02", label: "Black — Studio Flat" },
  { name: "r2-03", label: "Rose Gold — Studio Flat" },
  { name: "r2-04", label: "White — Overhead Desk" },
  { name: "r2-05", label: "Black — Overhead Desk" },
  { name: "r2-06", label: "Rose Gold — Cafe Table" },
  { name: "r2-07", label: "White — Floating Hero" },
  { name: "r2-08", label: "Black — Floating Hero" },
  { name: "r2-09", label: "Rose Gold — Floating Hero" },
  { name: "r2-10", label: "White — Hand Hold Side" },
  { name: "r2-11", label: "Black — Hand Hold Back" },
  { name: "r2-12", label: "Rose Gold — Hand Hold" },
  { name: "r2-13", label: "White — Nightstand" },
  { name: "r2-14", label: "Black — Couch Lifestyle" },
  { name: "r2-15", label: "Rose Gold — Vanity Close" },
  { name: "r2-16", label: "Trio — White Surface" },
  { name: "r2-17", label: "Trio — Dark Surface" },
  { name: "r2-18", label: "White — Macro Logo" },
  { name: "r2-19", label: "Black — Macro Logo" },
  { name: "r2-20", label: "Rose Gold — Low Angle" },
];

const round3 = [
  { name: "r3-01", label: "White — Studio Flat" },
  { name: "r3-02", label: "Black — Studio Flat" },
  { name: "r3-03", label: "Rose Gold — Studio Flat" },
  { name: "r3-04", label: "White — Floating Hero" },
  { name: "r3-05", label: "Black — Floating Hero" },
  { name: "r3-06", label: "Rose Gold — Floating Hero" },
  { name: "r3-07", label: "Trio — White Surface" },
  { name: "r3-08", label: "Trio — Dark Surface" },
  { name: "r3-09", label: "White — Desk Flat-Lay" },
  { name: "r3-10", label: "Black — Desk Flat-Lay" },
  { name: "r3-11", label: "Rose Gold — Cafe" },
  { name: "r3-12", label: "White — Nightstand" },
  { name: "r3-13", label: "Black — Couch" },
  { name: "r3-14", label: "Rose Gold — Vanity" },
  { name: "r3-15", label: "White — Hand Hold" },
  { name: "r3-16", label: "Black — Hand Hold" },
  { name: "r3-17", label: "Rose Gold — Hand Hold" },
  { name: "r3-18", label: "Silver — Dramatic Angle" },
  { name: "r3-19", label: "White — Macro Logo" },
  { name: "r3-20", label: "Black — Macro Logo" },
];

export default function BestPicksPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">Best Picks</h1>
        <p className="mt-2 text-gray-500">Approved images from round 1, plus rounds 2 &amp; 3.</p>

        <h2 className="mt-10 text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Approved (Round 1)
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {approved.map((img) => (
            <div key={img.name} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="relative aspect-video bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/generated/options/mono/${img.name}.png`}
                  alt={img.label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">{img.label}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Round 2 (Logo-Corrected)
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {round2.map((img) => (
            <div key={img.name} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="relative aspect-video bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/generated/options/mono/r2/${img.name}.png`}
                  alt={img.label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">{img.label}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Round 3 (Tight Logo — Squares Touching)
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {round3.map((img) => (
            <div key={img.name} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="relative aspect-video bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/generated/options/mono/r3/${img.name}.png`}
                  alt={img.label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
