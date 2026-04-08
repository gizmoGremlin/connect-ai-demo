"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/data/skills";
import { AnimatedSection } from "./animated-section";
import { cn } from "@/lib/utils";

const previewSkills = skills.slice(0, 6);

export function SkillsPreview() {
  return (
    <AnimatedSection className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Community-Powered Skills
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Pre-built tasks the AI can run instantly. Or skip the marketplace — just
            describe what you need and the agent handles it.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {previewSkills.map((skill) => (
            <div
              key={skill.id}
              className="rounded-xl border border-border/60 bg-card/50 p-5 transition-colors hover:border-blue-500/20"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{skill.name}</h3>
                <Badge variant="secondary" className="text-xs shrink-0 ml-2">
                  {skill.category}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {skill.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>by {skill.author}</span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {skill.installs.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/skills"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2"
            )}
          >
            View All Skills
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
