import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/skills", label: "Skills" },
      { href: "/cookbook", label: "Cookbook" },
      { href: "#", label: "Pricing" },
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

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
              <Zap className="h-5 w-5 text-blue-500" />
              Connect AI
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              An AI assistant that operates your iPhone. No jailbreak required. Open source and community-driven.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Connect AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
