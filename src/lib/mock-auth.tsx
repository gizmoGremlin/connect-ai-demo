"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Device } from "@/data/devices";
import { mockDevices } from "@/data/devices";

interface User {
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  devices: Device[];
  subscribed: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string) => void;
  signup: (email: string) => void;
  logout: () => void;
  addDevice: (name: string, deviceId: string, iPhoneModel: string) => void;
  removeDevice: (id: string) => void;
  subscribe: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "connect-ai-auth";

const defaultState: AuthState = {
  isAuthenticated: false,
  user: null,
  devices: [],
  subscribed: false,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setState(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hydrated]);

  const login = (email: string) => {
    setState({
      isAuthenticated: true,
      user: { email },
      devices: mockDevices,
      subscribed: false,
    });
  };

  const signup = (email: string) => {
    setState({
      isAuthenticated: true,
      user: { email },
      devices: [],
      subscribed: false,
    });
  };

  const logout = () => {
    setState({
      isAuthenticated: false,
      user: null,
      devices: [],
      subscribed: false,
    });
  };

  const addDevice = (name: string, deviceId: string, iPhoneModel: string) => {
    setState((s) => ({
      ...s,
      devices: [
        ...s.devices,
        {
          id: String(Date.now()),
          name,
          deviceId,
          status: "connected" as const,
          lastSeen: "Just now",
          iPhoneModel,
        },
      ],
    }));
  };

  const removeDevice = (id: string) => {
    setState((s) => ({
      ...s,
      devices: s.devices.filter((d) => d.id !== id),
    }));
  };

  const subscribe = () => {
    setState((s) => ({ ...s, subscribed: true }));
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, signup, logout, addDevice, removeDevice, subscribe }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
