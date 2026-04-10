"use client";

import { useState } from "react";
import { Search, Download, Plus, Code2, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { skills, categories } from "@/data/skills";
import { toast } from "sonner";
import { UploadSkillModal } from "./upload-skill-modal";

export function SkillGrid() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [expandedScript, setExpandedScript] = useState<string | null>(null);

  const filtered = skills.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || s.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button className="gap-2" onClick={() => setUploadOpen(true)}>
          <Plus className="h-4 w-4" />
          Upload Skill
        </Button>
      </div>

      {/* Category filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              category === cat
                ? "bg-blue-500 text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((skill) => (
          <div
            key={skill.id}
            className="group flex flex-col rounded-xl border border-border/60 bg-card/50 transition-colors hover:border-blue-500/20"
          >
            <div className="p-5 flex-1">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{skill.name}</h3>
                <Badge variant="secondary" className="text-xs shrink-0 ml-2">
                  {skill.category}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {skill.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>by {skill.author}</span>
                  <span className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {skill.installs.toLocaleString()}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() =>
                    toast.success(`"${skill.name}" added to your skills`)
                  }
                >
                  Install
                </Button>
              </div>
            </div>

            {/* Script preview toggle */}
            {skill.script && (
              <div className="border-t border-border/40">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedScript(
                      expandedScript === skill.id ? null : skill.id
                    )
                  }
                  className="flex w-full items-center gap-1.5 px-5 py-2 text-[11px] font-mono text-emerald-600 hover:bg-gray-50 transition-colors"
                >
                  <Code2 className="h-3 w-3" />
                  <span>View Script</span>
                  {expandedScript === skill.id ? (
                    <ChevronUp className="h-3 w-3 ml-auto" />
                  ) : (
                    <ChevronDown className="h-3 w-3 ml-auto" />
                  )}
                </button>
                {expandedScript === skill.id && (
                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                    <pre className="text-[11px] font-mono leading-relaxed text-gray-700 overflow-x-auto">
                      {skill.script}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center text-muted-foreground">
          <p>No skills found matching your search.</p>
        </div>
      )}

      <UploadSkillModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
}
