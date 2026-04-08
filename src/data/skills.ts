export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  author: string;
  installs: number;
  script?: string;
}

export const categories = [
  "All",
  "Social Media",
  "Messaging",
  "Productivity",
  "Utilities",
  "Accessibility",
  "Privacy",
  "Entertainment",
  "Finance",
] as const;

export const skills: Skill[] = [
  {
    id: "blast-off",
    name: "Blast Off",
    description: "Take a screenshot on your iPhone via voice command. Generates TTS audio and plays it through your speaker — the first step in the Connect AI pipeline.",
    category: "Utilities",
    author: "connectai",
    installs: 1,
    script: `skill "Blast Off" {
  connect voice_ai
  generate_tts "Take screenshot"
  play_audio output
  wait_for_response 5s
  capture_result
}`,
  },
  {
    id: "1",
    name: "TikTok Auto-Engage",
    description: "Automatically scroll, like, and comment on TikTok videos based on hashtags and interests you define.",
    category: "Social Media",
    author: "connectai",
    installs: 2841,
    script: `skill "TikTok Auto-Engage" {
  open app "TikTok"
  wait 2s

  repeat 10 {
    swipe up
    wait 3s
    screenshot -> analyze
    if analysis.sentiment == "positive" {
      double_tap
      tap "comment"
      type analysis.response
      tap "send"
    }
  }
}`,
  },
  {
    id: "2",
    name: "Instagram Story Viewer",
    description: "View all stories from your following list automatically to boost your visibility and engagement.",
    category: "Social Media",
    author: "socialbot",
    installs: 1923,
    script: `skill "Story Viewer" {
  open app "Instagram"
  tap first_story
  repeat 50 {
    wait 3s
    tap "Next"
  }
}`,
  },
  {
    id: "3",
    name: "Twitter Auto-Reply",
    description: "Monitor specific accounts or keywords and automatically reply with AI-generated contextual responses.",
    category: "Social Media",
    author: "tweetmaster",
    installs: 1456,
    script: `skill "Auto Reply" {
  open app "Twitter"
  tap "Search"
  type keyword
  repeat 5 {
    tap first_result
    screenshot -> analyze
    tap "Reply"
    type analysis.response
    tap "Post"
    tap "Back"
  }
}`,
  },
  {
    id: "4",
    name: "iMessage Auto-Responder",
    description: "Set up intelligent auto-replies for iMessage based on sender, keywords, or time of day.",
    category: "Messaging",
    author: "connectai",
    installs: 3102,
    script: `skill "Auto-Respond" {
  on notification "Messages" {
    screenshot -> analyze
    if analysis.sender in contacts.vip {
      tap notification
      type analysis.smart_reply
      tap "Send"
    }
  }
}`,
  },
  {
    id: "5",
    name: "WhatsApp Bulk Sender",
    description: "Send personalized messages to multiple WhatsApp contacts with customizable templates.",
    category: "Messaging",
    author: "msgpro",
    installs: 987,
    script: `skill "Bulk Send" {
  set contacts = ["Mom", "Dad", "Sis"]
  set template = "Happy holidays! 🎄"

  open app "WhatsApp"
  for contact in contacts {
    tap "Search"
    type contact
    tap first_result
    type template
    tap "Send"
  }
}`,
  },
  {
    id: "6",
    name: "Email Digest Creator",
    description: "Scan your inbox, summarize important emails, and send yourself a daily digest.",
    category: "Productivity",
    author: "prodflow",
    installs: 2234,
    script: `skill "Email Digest" {
  open app "Mail"
  set summaries = []

  repeat 10 {
    tap next_unread
    screenshot -> analyze
    if analysis.importance == "high" {
      append analysis.summary to summaries
    }
    tap "Back"
  }

  open app "Notes"
  tap "New Note"
  type join(summaries, "\\n---\\n")
}`,
  },
  {
    id: "7",
    name: "Calendar Auto-Accept",
    description: "Automatically accept or decline calendar invites based on rules you set for time, sender, and keywords.",
    category: "Productivity",
    author: "connectai",
    installs: 1876,
    script: `skill "Calendar Rules" {
  open app "Calendar"
  tap "Inbox"

  for invite in pending_invites {
    screenshot -> analyze
    if analysis.sender in contacts.work
       and analysis.time.hour >= 9
       and analysis.time.hour <= 17 {
      tap "Accept"
    } else {
      tap "Decline"
    }
  }
}`,
  },
  {
    id: "8",
    name: "Screenshot & OCR",
    description: "Take screenshots of any app and extract text using on-screen OCR for data collection.",
    category: "Utilities",
    author: "databot",
    installs: 4521,
    script: `skill "Screenshot OCR" {
  screenshot -> analyze
  set text = analysis.ocr_text
  open app "Notes"
  tap "New Note"
  type text
}`,
  },
  { id: "9", name: "Clear Safari History", description: "Automatically clear your Safari browsing history and website data on a scheduled interval.", category: "Privacy", author: "privguard", installs: 1345 },
  { id: "10", name: "App Usage Monitor", description: "Track and log how much time you spend in each app throughout the day.", category: "Utilities", author: "trackr", installs: 876 },
  { id: "11", name: "YouTube Auto-Subscribe", description: "Subscribe to channels that match your interests based on video content and engagement metrics.", category: "Entertainment", author: "tubefarm", installs: 1654 },
  {
    id: "12",
    name: "Price Tracker",
    description: "Monitor product prices on Safari and get notified when prices drop below your target.",
    category: "Finance",
    author: "dealfinder",
    installs: 2987,
    script: `skill "Price Watch" {
  set target = 49.99
  open app "Safari"
  navigate url
  wait 3s
  screenshot -> analyze
  if analysis.price <= target {
    open app "Messages"
    type "Price dropped to $" + analysis.price
    tap "Send"
  }
}`,
  },
  { id: "13", name: "TikTok Content Farmer", description: "Browse TikTok for hours, engage with content in your niche, and grow your account organically.", category: "Social Media", author: "growthlab", installs: 5234 },
  { id: "14", name: "Read Notifications Aloud", description: "Use VoiceOver to read incoming notifications and respond hands-free.", category: "Accessibility", author: "a11ytools", installs: 743 },
  { id: "15", name: "Send Location to Contact", description: "Automatically share your live location with a specified contact at set intervals.", category: "Messaging", author: "locshare", installs: 654 },
  {
    id: "16",
    name: "Instagram Post Scheduler",
    description: "Queue up posts and automatically publish them to Instagram at optimal times.",
    category: "Social Media",
    author: "socialbot",
    installs: 3876,
    script: `skill "IG Schedule" {
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
  },
  { id: "17", name: "Expense Tracker", description: "Screenshot receipts and bank notifications to automatically log expenses into a spreadsheet.", category: "Finance", author: "moneywise", installs: 1567 },
  { id: "18", name: "Google Search Automator", description: "Perform automated Google searches and tap on specific results for research or SEO purposes.", category: "Utilities", author: "connectai", installs: 2109 },
  { id: "19", name: "Spotify Playlist Builder", description: "Discover and save new songs by automatically browsing Spotify's recommendation feeds.", category: "Entertainment", author: "musicbot", installs: 1234 },
  { id: "20", name: "LinkedIn Auto-Connect", description: "Send personalized connection requests to targeted professionals based on industry and role.", category: "Social Media", author: "netpro", installs: 2876 },
  { id: "21", name: "Notes Backup", description: "Automatically copy all your Apple Notes content to a cloud storage service.", category: "Utilities", author: "backupbot", installs: 945 },
  { id: "22", name: "Twitter Engagement Bot", description: "Like, retweet, and follow accounts in your niche to grow your Twitter presence organically.", category: "Social Media", author: "tweetmaster", installs: 3456 },
  { id: "23", name: "Focus Mode Scheduler", description: "Automatically enable Do Not Disturb and Focus modes based on your calendar events.", category: "Productivity", author: "focusflow", installs: 1678 },
  { id: "24", name: "Photo Organizer", description: "Sort your camera roll into albums automatically based on date, location, and detected content.", category: "Utilities", author: "photoai", installs: 2345 },
  { id: "25", name: "Reddit Browser", description: "Automatically browse, upvote, and save posts from your favorite subreddits.", category: "Social Media", author: "redditfarm", installs: 1890 },
  { id: "26", name: "Bank Balance Checker", description: "Open your banking app, screenshot the balance, and log it for daily tracking.", category: "Finance", author: "moneywise", installs: 876 },
  { id: "27", name: "YouTube Watch Later", description: "Browse YouTube trending and automatically add interesting videos to your Watch Later playlist.", category: "Entertainment", author: "tubefarm", installs: 1432 },
  { id: "28", name: "Contact Backup", description: "Export all your iPhone contacts to a CSV file and save it to iCloud Drive.", category: "Utilities", author: "backupbot", installs: 567 },
  {
    id: "29",
    name: "Morning Routine",
    description: "Check weather, read top news, open your email, and prep your day — all automated.",
    category: "Productivity",
    author: "connectai",
    installs: 4123,
    script: `skill "Morning Routine" {
  open app "Weather"
  screenshot -> analyze
  save analysis.forecast

  open app "News"
  screenshot -> analyze
  save analysis.headlines

  open app "Mail"
  screenshot -> analyze
  save analysis.unread_count

  open app "Notes"
  tap "New Note"
  type summary(forecast, headlines)
}`,
  },
  { id: "30", name: "VoiceOver Navigator", description: "Enhanced voice navigation for visually impaired users with custom gesture shortcuts.", category: "Accessibility", author: "a11ytools", installs: 432 },
  {
    id: "31",
    name: "Tinder Auto-Swipe",
    description: "Automatically swipe on Tinder based on bio keywords and photo analysis via LLM.",
    category: "Entertainment",
    author: "datematch",
    installs: 6789,
    script: `skill "Smart Swipe" {
  open app "Tinder"
  wait 2s

  repeat 50 {
    screenshot -> analyze
    if analysis.bio contains_any ["hiking", "dogs", "travel"]
       and analysis.attractiveness > 7 {
      swipe right
    } else {
      swipe left
    }
    wait 1s
  }
}`,
  },
  { id: "32", name: "Facebook Marketplace Scanner", description: "Monitor Facebook Marketplace for deals matching your saved searches and price alerts.", category: "Finance", author: "dealfinder", installs: 3456 },
];
