"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  Brain,
  Smartphone,
  Layers,
  CreditCard,
  LogOut,
  Plus,
  ChevronDown,
  Check,
  Sparkles,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/mock-auth";
import { toast } from "sonner";

const tabs = [
  { id: "agent", label: "Agent", icon: Brain },
  { id: "devices", label: "Devices", icon: Smartphone },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "subscription", label: "Subscription", icon: CreditCard },
] as const;

export type DashboardTab = (typeof tabs)[number]["id"];

interface LLMConfig {
  id: string;
  name: string;
  provider: string;
  isDefault?: boolean;
}

const defaultLLMs: LLMConfig[] = [
  { id: "connect-default", name: "Connect AI", provider: "Default", isDefault: true },
];

function SidebarNav() {
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as DashboardTab) || "agent";

  return (
    <nav className="flex flex-col gap-1 px-4 pt-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Link
            key={tab.id}
            href={`/dashboard?tab=${tab.id}`}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-white text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-gray-200"
                : "text-gray-500 hover:bg-white/60 hover:text-gray-900"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const [llms, setLlms] = useState<LLMConfig[]>(defaultLLMs);
  const [activeLlm, setActiveLlm] = useState("connect-default");
  const [llmDropdownOpen, setLlmDropdownOpen] = useState(false);
  const [addLlmOpen, setAddLlmOpen] = useState(false);
  const [newLlmName, setNewLlmName] = useState("");
  const [newLlmProvider, setNewLlmProvider] = useState("Anthropic");
  const [newLlmKey, setNewLlmKey] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleAddLlm = (e: React.FormEvent) => {
    e.preventDefault();
    const newLlm: LLMConfig = {
      id: `custom-${Date.now()}`,
      name: newLlmName || `${newLlmProvider} Key`,
      provider: newLlmProvider,
    };
    setLlms((prev) => [...prev, newLlm]);
    setActiveLlm(newLlm.id);
    setAddLlmOpen(false);
    setNewLlmName("");
    setNewLlmProvider("Anthropic");
    setNewLlmKey("");
    toast.success(`Added ${newLlm.name}`);
  };

  const currentLlm = llms.find((l) => l.id === activeLlm) ?? llms[0];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-100 bg-gray-50/50 md:flex md:flex-col">
        <div className="p-6 pb-0">
          <div className="text-sm text-gray-500">{user?.email}</div>
        </div>

        {/* LLM Picker */}
        <div className="px-4 pt-5 pb-2">
          <div className="relative">
            <button
              onClick={() => setLlmDropdownOpen(!llmDropdownOpen)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-colors hover:border-gray-300"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span className="truncate text-gray-900">{currentLlm.name}</span>
              </div>
              <ChevronDown className={`h-3.5 w-3.5 text-gray-400 shrink-0 transition-transform ${llmDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {llmDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setLlmDropdownOpen(false)}
                />
                <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg">
                  {llms.map((llm) => (
                    <button
                      key={llm.id}
                      onClick={() => {
                        setActiveLlm(llm.id);
                        setLlmDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg transition-colors"
                    >
                      <Sparkles className="h-3 w-3 text-blue-500 shrink-0" />
                      <span className="truncate flex-1 text-left">{llm.name}</span>
                      {llm.isDefault && (
                        <span className="text-[10px] text-gray-400 shrink-0">default</span>
                      )}
                      {llm.id === activeLlm && (
                        <Check className="h-3 w-3 text-blue-500 shrink-0" />
                      )}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setLlmDropdownOpen(false);
                      setAddLlmOpen(true);
                    }}
                    className="flex w-full items-center gap-2 border-t border-gray-100 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 last:rounded-b-lg transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    Add LLM
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <Suspense>
          <SidebarNav />
        </Suspense>

        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-gray-500 hover:text-gray-900"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 sm:p-8 lg:p-10">{children}</div>

      {/* Add LLM Dialog */}
      <Dialog open={addLlmOpen} onOpenChange={setAddLlmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-4 w-4 text-blue-500" />
              Add LLM Provider
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddLlm} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Provider</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["Anthropic", "OpenAI", "Other"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setNewLlmProvider(p)}
                    className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                      newLlmProvider === p
                        ? "border-blue-500/60 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Display Name</label>
              <Input
                className="mt-1"
                placeholder={`My ${newLlmProvider} Key`}
                value={newLlmName}
                onChange={(e) => setNewLlmName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">API Key</label>
              <Input
                className="mt-1 font-mono text-xs"
                type="password"
                placeholder={newLlmProvider === "Anthropic" ? "sk-ant-..." : "sk-..."}
                value={newLlmKey}
                onChange={(e) => setNewLlmKey(e.target.value)}
                required
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Keys are stored locally and never leave your browser.
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setAddLlmOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!newLlmKey.trim()}>
                Add Provider
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
