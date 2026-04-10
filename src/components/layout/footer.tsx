import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/skills", label: "Skills" },
      { href: "/cookbook", label: "Cookbook" },
      { href: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "#", label: "Discord" },
      { href: "#", label: "GitHub" },
      { href: "#", label: "Twitter" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
  },
];

function ConnectLogo() {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="white">
        <rect x="4" y="1" width="4" height="4" rx="0.5" />
        <rect x="1" y="6" width="4" height="4" rx="0.5" />
        <rect x="4" y="11" width="4" height="4" rx="0.5" />
      </svg>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-semibold text-[15px] tracking-tight text-gray-900"
            >
              <ConnectLogo />
              Connect AI
            </Link>
            <p className="mt-4 text-[13px] text-gray-500 leading-relaxed max-w-xs">
              An AI assistant that operates your iPhone. No jailbreak required.
              Open source and community-driven.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-[13px] font-semibold text-gray-900">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-center text-[12px] text-gray-400">
            &copy; {new Date().getFullYear()} Connect AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
