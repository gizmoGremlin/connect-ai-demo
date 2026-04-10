"use client";

const sections = [
  {
    title: "In-Hand",
    images: [
      { name: "ih-01-white-casual", label: "White — Casual Hold" },
      { name: "ih-02-white-palm", label: "White — Palm Close-Up" },
      { name: "ih-03-black-street", label: "Black — Street Style" },
      { name: "ih-04-black-grip", label: "Black — Grip Detail" },
      { name: "ih-05-rosegold-feminine", label: "Rose Gold — Elegant Hold" },
      { name: "ih-06-rosegold-reach", label: "Rose Gold — Reaching" },
      { name: "ih-07-black-twohands", label: "Black — Two Hands" },
    ],
  },
  {
    title: "Lifestyle",
    images: [
      { name: "ls-01-white-desk", label: "White — Desk Flat-Lay" },
      { name: "ls-02-black-nightstand", label: "Black — Nightstand" },
      { name: "ls-03-rosegold-cafe", label: "Rose Gold — Cafe" },
      { name: "ls-04-white-couch", label: "White — Couch" },
      { name: "ls-05-black-gym", label: "Black — Gym" },
      { name: "ls-06-rosegold-vanity", label: "Rose Gold — Vanity" },
      { name: "ls-07-white-kitchen", label: "White — Kitchen" },
    ],
  },
  {
    title: "Product Solo",
    images: [
      { name: "ps-01-white-hero", label: "White — Hero Shot" },
      { name: "ps-02-black-hero", label: "Black — Hero Shot" },
      { name: "ps-03-rosegold-hero", label: "Rose Gold — Hero Shot" },
      { name: "ps-04-trio-lineup", label: "All Three — Lineup" },
      { name: "ps-05-black-dramatic", label: "Black — Dramatic" },
      { name: "ps-06-rosegold-macro", label: "Rose Gold — Macro Detail" },
      { name: "ps-07-white-topdown", label: "White — Top-Down" },
    ],
  },
];

export default function MonochromaticPicksPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Color Variants (White / Black / Rose Gold)
        </h1>
        <p className="mt-2 text-gray-500">
          Same product, three finishes. Pick your favorites from each category.
        </p>

        {sections.map((section) => (
          <div key={section.title} className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {section.title}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.images.map((img) => (
                <div
                  key={img.name}
                  className="overflow-hidden rounded-xl border border-gray-200"
                >
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
                    <p className="text-sm font-semibold text-gray-900">
                      {img.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
