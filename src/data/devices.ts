export interface Device {
  id: string;
  name: string;
  deviceId: string;
  status: "connected" | "offline" | "error";
  lastSeen: string;
  iPhoneModel: string;
}

export const mockDevices: Device[] = [
  {
    id: "1",
    name: "My iPhone",
    deviceId: "CNCT-A7B2-K9X1",
    status: "connected",
    lastSeen: "Just now",
    iPhoneModel: "iPhone 15 Pro",
  },
  {
    id: "2",
    name: "Office iPhone",
    deviceId: "CNCT-M3C8-P5R2",
    status: "offline",
    lastSeen: "2 hours ago",
    iPhoneModel: "iPhone 14",
  },
];
