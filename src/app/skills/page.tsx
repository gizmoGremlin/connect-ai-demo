import type { Metadata } from "next";
import { AiPromptBox } from "@/components/skills/ai-prompt-box";
import { SkillGrid } from "@/components/skills/skill-grid";

export const metadata: Metadata = {
  title: "Skills — Connect AI",
  description: "Browse and install community-built iPhone automation skills.",
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Skills
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Every skill is a{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-emerald-600">
            .connect
          </code>{" "}
          script. Browse community scripts, generate your own with AI, or write
          one from scratch and upload it.
        </p>
      </div>

      <div className="mt-10">
        <AiPromptBox />
      </div>

      <div className="mt-12">
        <SkillGrid />
      </div>
    </div>
  );
}
