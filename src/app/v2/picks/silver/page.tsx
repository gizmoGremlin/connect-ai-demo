"use client";

const sections = [
  {
    title: "Product Solo",
    images: [
      { name: "s-01", label: "White Surface — Flat" },
      { name: "s-02", label: "Gray Surface — Low Angle" },
      { name: "s-03", label: "Floating Hero" },
      { name: "s-04", label: "Top-Down" },
      { name: "s-05", label: "Side Profile" },
      { name: "s-06", label: "Dramatic Low Angle" },
      { name: "s-07", label: "Two Phones Comparison" },
      { name: "s-08", label: "Steep Angle Hero" },
    ],
  },
  {
    title: "Lifestyle",
    images: [
      { name: "s-09", label: "Desk Flat-Lay" },
      { name: "s-10", label: "Nightstand" },
      { name: "s-11", label: "Cafe Table" },
      { name: "s-12", label: "Couch" },
      { name: "s-13", label: "Gym" },
      { name: "s-14", label: "Kitchen" },
    ],
  },
  {
    title: "In-Hand",
    images: [
      { name: "s-15", label: "Casual Hold" },
      { name: "s-16", label: "Direct Back View" },
      { name: "s-17", label: "Angled Profile" },
      { name: "s-18", label: "Two Hands" },
    ],
  },
  {
    title: "Macro Detail",
    images: [
      { name: "s-19", label: "Logo Close-Up" },
      { name: "s-20", label: "Brushed Texture" },
    ],
  },
];

export default function SilverPicksPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Greyed Rose — Soft Mauve-Gray
        </h1>
        <p className="mt-2 text-gray-500">
          20 images, light greyed-rose finish (#ccc4cc). Pick your favorites.
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
                      src={`/generated/options/silver/${img.name}.png`}
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
