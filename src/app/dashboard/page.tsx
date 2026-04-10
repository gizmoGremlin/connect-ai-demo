"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Smartphone,
  Plus,
  Wifi,
  WifiOff,
  Trash2,
  CreditCard,
  Check,
  Download,
  ArrowRight,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/mock-auth";
import { AgentChat } from "@/components/dashboard/agent-chat";
import {
  ExecutionTrace,
  type TraceEntry,
} from "@/components/dashboard/execution-trace";
import { skills } from "@/data/skills";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { DashboardTab } from "./layout";

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const { devices, subscribed, subscribe, addDevice, removeDevice } = useAuth();
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as DashboardTab) || "agent";

  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newId, setNewId] = useState("");
  const [traceEntries, setTraceEntries] = useState<TraceEntry[]>([]);

  const connectedDevice = devices.find((d) => d.status === "connected");

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    addDevice(newName, newId, "iPhone");
    toast.success(`Device "${newName}" registered`);
    setNewName("");
    setNewId("");
    setAddOpen(false);
  };

  // Find the blast off skill
  const blastOffSkill = skills.find((s) => s.id === "blast-off");

  // Subscription gate
  if (!subscribed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-card">
          <CreditCard className="h-8 w-8 text-blue-500" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Subscribe to Access</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Unlock the command center, device management, and skill execution with
          a Connect AI Cloud subscription.
        </p>
        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/50 p-8 w-full max-w-sm">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold">$5</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-left">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              AI agent in the ctrl center
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Natural language task delegation
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Multi-device management
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Community skills marketplace
            </li>
          </ul>
          <Button className="mt-8 w-full" onClick={subscribe}>
            Subscribe Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Agent Tab */}
      {tab === "agent" && (
        <>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="inline-flex items-center justify-center rounded-[4px] border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-sm leading-none text-gray-500 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                ctrl
              </span>
              Center
            </h1>
            <p className="mt-1 text-muted-foreground">
              Your AI agent. Describe a task, watch it happen.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex-1 min-w-0">
              <AgentChat
                deviceName={connectedDevice?.name}
                onTraceUpdate={setTraceEntries}
              />
            </div>
            <div className="hidden lg:block w-[380px] shrink-0">
              <div className="sticky top-6 h-[600px]">
                <ExecutionTrace entries={traceEntries} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Devices Tab */}
      {tab === "devices" && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Devices</h1>
              <p className="mt-1 text-muted-foreground">
                Manage your connected Connect AI hardware.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setAddOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Device
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => (
              <Card key={device.id} className="bg-card/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      {device.name}
                    </CardTitle>
                    <Badge
                      variant={
                        device.status === "connected" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {device.status === "connected" ? (
                        <Wifi className="h-3 w-3 mr-1" />
                      ) : (
                        <WifiOff className="h-3 w-3 mr-1" />
                      )}
                      {device.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>ID: {device.deviceId}</p>
                    <p>{device.iPhoneModel}</p>
                    <p>Last seen: {device.lastSeen}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-xs text-muted-foreground"
                    onClick={() => {
                      removeDevice(device.id);
                      toast("Device removed");
                    }}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
            {devices.length === 0 && (
              <Card className="border-dashed bg-transparent">
                <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <Smartphone className="h-8 w-8" />
                  <p className="mt-3 text-sm">No devices registered</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => setAddOpen(true)}
                  >
                    Add your first device
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}

      {/* Skills Tab */}
      {tab === "skills" && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Installed Skills</h1>
              <p className="mt-1 text-muted-foreground">
                Skills available to your agent.
              </p>
            </div>
            <Link
              href="/skills"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-2"
              )}
            >
              Browse More
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Blast Off — featured skill */}
          {blastOffSkill && (
            <div className="rounded-xl border border-blue-200 bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Rocket className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {blastOffSkill.name}
                      <Badge className="text-[10px]">Installed</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {blastOffSkill.description}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0 ml-4">
                  {blastOffSkill.category}
                </Badge>
              </div>

              {/* Script preview */}
              <pre className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs font-mono leading-relaxed text-gray-700 overflow-x-auto">
                {`skill "Blast Off" {\n  connect voice_ai\n  generate_tts "Take screenshot"\n  play_audio output\n  wait_for_response 5s\n  capture_result\n}`}
              </pre>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  by {blastOffSkill.author}
                </span>
                <Link
                  href="/dashboard?tab=agent"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "gap-2 text-xs"
                  )}
                >
                  Test in Ctrl Center
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      {/* Subscription Tab */}
      {tab === "subscription" && (
        <>
          <div>
            <h1 className="text-2xl font-bold">Subscription</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your Connect AI Cloud plan.
            </p>
          </div>
          <Card className="bg-card/50 max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                Cloud Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">$5</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-3 py-2">
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <Check className="h-4 w-4" />
                  Active
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  AI agent in the ctrl center
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  Natural language task delegation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  Multi-device management
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  Community skills marketplace
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  Bring your own LLM
                </li>
              </ul>
              <Button variant="outline" size="sm" className="mt-2">
                Manage Billing
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* Add Device Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register a Device</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddDevice} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Device Name</label>
              <Input
                className="mt-1"
                placeholder="My iPhone"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Device ID</label>
              <Input
                className="mt-1"
                placeholder="CNCT-XXXX-XXXX"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setAddOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!newName || !newId}>
                Register
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
