export interface MockAgentResponse {
  plan: string[];
  script: string;
  summary: string;
}

export const mockResponses: Record<string, MockAgentResponse> = {
  instagram: {
    plan: [
      "Open Photos and select your latest photo",
      "Tap Share and choose Instagram",
      "Generate a caption using AI",
      "Add the caption and post",
    ],
    script: `skill "Post to Instagram" {
  open app "Photos"
  tap "Recents"
  tap first_photo
  tap "Share"
  tap "Instagram"
  wait 2s
  screenshot -> analyze
  type analysis.caption
  tap "Share"
}`,
    summary: "Posted your latest photo to Instagram with an AI-generated caption.",
  },
  message: {
    plan: [
      "Open Messages app",
      "Find the contact",
      "Compose the message",
      "Send it",
    ],
    script: `skill "Send Message" {
  open app "Messages"
  tap "Search"
  type contact_name
  tap first_result
  wait 1s
  tap "Message"
  type message_body
  tap "Send"
}`,
    summary: "Message sent successfully.",
  },
  research: {
    plan: [
      "Open Safari browser",
      "Search for the topic",
      "Open the top 3 results",
      "Screenshot each article",
      "Summarize findings",
    ],
    script: `skill "Research Topic" {
  open app "Safari"
  tap "Search"
  type query
  tap "Go"
  wait 2s
  repeat 3 {
    tap result[i]
    wait 2s
    screenshot -> analyze
    save analysis.summary
    tap "Back"
  }
}`,
    summary: "Researched the topic and saved summaries from 3 articles.",
  },
  default: {
    plan: [
      "Interpret your request",
      "Open the target app",
      "Navigate to the right screen",
      "Perform the action",
      "Verify success",
    ],
    script: `skill "Custom Task" {
  open app target_app
  wait 2s
  screenshot -> analyze
  navigate analysis.target
  perform action
  screenshot -> verify
}`,
    summary: "Task completed successfully.",
  },
};

export function getAgentResponse(prompt: string): MockAgentResponse {
  const lower = prompt.toLowerCase();
  if (lower.includes("instagram") || lower.includes("post") || lower.includes("photo"))
    return mockResponses.instagram;
  if (lower.includes("message") || lower.includes("text") || lower.includes("send"))
    return mockResponses.message;
  if (lower.includes("research") || lower.includes("search") || lower.includes("find"))
    return mockResponses.research;
  return mockResponses.default;
}
