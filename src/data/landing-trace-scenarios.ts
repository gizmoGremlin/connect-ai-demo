export interface TraceScenario {
  entries: Array<{
    type: "thinking" | "plan" | "action" | "result";
    content: string;
    delay: number;
  }>;
}

export const scenarios: TraceScenario[] = [
  // 1. Instagram
  {
    entries: [
      { type: "thinking", content: "User wants to post their latest photo to Instagram with a caption.", delay: 0 },
      { type: "plan", content: "Open Photos and select latest", delay: 1000 },
      { type: "plan", content: "Share to Instagram", delay: 1300 },
      { type: "plan", content: "Generate caption with AI", delay: 1600 },
      { type: "action", content: "Opening Photos app...", delay: 2200 },
      { type: "action", content: "Sharing to Instagram...", delay: 3400 },
      { type: "action", content: "Generating caption...", delay: 4800 },
      { type: "result", content: "Posted with AI-generated caption.", delay: 6400 },
    ],
  },
  // 2. Text mom
  {
    entries: [
      { type: "thinking", content: "User wants to send a birthday message to their mom.", delay: 0 },
      { type: "plan", content: "Open Messages, find contact", delay: 900 },
      { type: "plan", content: "Compose and send message", delay: 1200 },
      { type: "action", content: "Opening Messages...", delay: 1800 },
      { type: "action", content: "Composing message...", delay: 3000 },
      { type: "result", content: "Message sent to Mom.", delay: 4600 },
    ],
  },
  // 3. Flight status
  {
    entries: [
      { type: "thinking", content: "User wants to check if their flight is on time.", delay: 0 },
      { type: "plan", content: "Open Safari and search flight status", delay: 1000 },
      { type: "plan", content: "Navigate to airline tracker", delay: 1300 },
      { type: "plan", content: "Screenshot and analyze results", delay: 1600 },
      { type: "action", content: "Searching flight status...", delay: 2200 },
      { type: "action", content: "Analyzing flight page...", delay: 3800 },
      { type: "action", content: "Extracting gate info...", delay: 5200 },
      { type: "result", content: "Flight UA 234 is on time. Gate B12.", delay: 6600 },
    ],
  },
  // 4. Coffee shop
  {
    entries: [
      { type: "thinking", content: "User wants to find the best coffee shop nearby.", delay: 0 },
      { type: "plan", content: "Open Maps and search", delay: 900 },
      { type: "plan", content: "Compare ratings and distance", delay: 1200 },
      { type: "action", content: "Searching nearby coffee...", delay: 1800 },
      { type: "action", content: "Comparing top results...", delay: 3200 },
      { type: "result", content: "Blue Bottle Coffee — 4.8★, 0.3mi away.", delay: 4800 },
    ],
  },
  // 5. Photo backup
  {
    entries: [
      { type: "thinking", content: "User wants to back up today's photos to Google Drive.", delay: 0 },
      { type: "plan", content: "Open Photos, filter today", delay: 900 },
      { type: "plan", content: "Upload to Google Drive", delay: 1200 },
      { type: "action", content: "Selecting today's photos...", delay: 1800 },
      { type: "action", content: "Uploading 12 photos...", delay: 3200 },
      { type: "result", content: "12 photos uploaded to Drive.", delay: 5200 },
    ],
  },
];
