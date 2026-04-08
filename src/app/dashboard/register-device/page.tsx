"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/mock-auth";
import { toast } from "sonner";

export default function RegisterDevicePage() {
  const [name, setName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const { addDevice } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDevice(name, deviceId, "iPhone");
    toast.success("Device registered successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-card">
            <Smartphone className="h-6 w-6 text-blue-500" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Register Your Device</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your Connect AI device ID to get started. You can find it on
            the back of your device.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium">Device Name</label>
            <Input
              className="mt-1"
              placeholder="My iPhone"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Device ID</label>
            <Input
              className="mt-1"
              placeholder="CNCT-XXXX-XXXX"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={!name || !deviceId}>
            Register Device
          </Button>
        </form>

        <button
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => router.push("/dashboard")}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
