"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/lib/mock-auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/skills", label: "Skills" },
  { href: "/cookbook", label: "Cookbook" },
  { href: "#", label: "GitHub" },
  { href: "#", label: "Discord" },
];

function CtrlCenterButton({ className }: { className?: string }) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "group relative inline-flex items-center gap-1.5 rounded-[5px] border border-zinc-500/60 bg-gradient-to-b from-zinc-600 to-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-200 shadow-[0_2px_0_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all hover:from-zinc-500 hover:to-zinc-600 hover:text-white active:translate-y-px active:shadow-[0_1px_0_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
        className
      )}
    >
      <span className="inline-flex items-center justify-center rounded-[3px] border border-zinc-400/30 bg-zinc-500/40 px-1 py-px font-mono text-[10px] leading-none text-zinc-300 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.2)]">
        ctrl
      </span>
      <span className="tracking-wide">Center</span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Zap className="h-5 w-5 text-blue-500" />
          Connect AI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <CtrlCenterButton />
          ) : (
            <>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/40 bg-background px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border/40">
              {isAuthenticated ? (
                <CtrlCenterButton />
              ) : (
                <>
                  <Link
                    href="/login"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className={cn(buttonVariants({ size: "sm" }))}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
