import type { Metadata } from "next";
import {
  Wrench,
  Cpu,
  Cable,
  Box,
  Magnet,
  Terminal,
  Smartphone,
  AlertTriangle,
  Code2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cookbook — Connect AI",
  description:
    "Build your own Connect AI device with off-the-shelf components.",
};

const sections = [
  {
    id: "what-you-need",
    icon: Wrench,
    title: "What You Need",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Building your own Connect AI device requires a handful of affordable,
          off-the-shelf components. Total cost is approximately $25-35.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: Cpu,
              name: "ESP32-S3 DevKit",
              desc: "Microcontroller with USB-C and Bluetooth",
              price: "~$8",
            },
            {
              icon: Cable,
              name: "USB-C Audio Interface",
              desc: "I2S to USB-C audio bridge module",
              price: "~$12",
            },
            {
              icon: Box,
              name: "3D Printed Case",
              desc: "STL files provided or use aluminum",
              price: "~$5",
            },
            {
              icon: Magnet,
              name: "MagSafe Ring Magnet",
              desc: "N52 neodymium ring for iPhone mounting",
              price: "~$3",
            },
          ].map((part) => (
            <div
              key={part.name}
              className="rounded-xl border border-border/60 bg-card/50 p-4"
            >
              <div className="flex items-center gap-3">
                <part.icon className="h-5 w-5 text-blue-400 shrink-0" />
                <div>
                  <p className="font-medium text-sm">{part.name}</p>
                  <p className="text-xs text-muted-foreground">{part.desc}</p>
                </div>
                <span className="ml-auto text-sm font-mono text-muted-foreground">
                  {part.price}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          You&apos;ll also need basic soldering tools, a USB-C cable, and access to
          a computer for flashing firmware.
        </p>
      </div>
    ),
  },
  {
    id: "hardware-assembly",
    icon: Wrench,
    title: "Hardware Assembly",
    content: (
      <div className="space-y-4 text-muted-foreground">
        <ol className="list-decimal list-inside space-y-3">
          <li>
            <strong className="text-foreground">Prepare the ESP32-S3:</strong>{" "}
            Solder header pins if your devkit doesn&apos;t come with them pre-soldered.
            Ensure the USB-C port is clean and accessible.
          </li>
          <li>
            <strong className="text-foreground">Connect the audio module:</strong>{" "}
            Wire the I2S audio interface to the ESP32-S3. Connect BCLK to GPIO 26,
            LRCLK to GPIO 25, and DATA to GPIO 22.
          </li>
          <li>
            <strong className="text-foreground">Test the connection:</strong> Before
            assembling the case, verify audio output by running the test firmware
            (see next section).
          </li>
          <li>
            <strong className="text-foreground">Assemble the case:</strong> Place
            the ESP32-S3 and audio module into the 3D-printed case. Attach the
            MagSafe ring magnet to the back plate using adhesive.
          </li>
          <li>
            <strong className="text-foreground">Final check:</strong> Connect via
            USB-C to your computer and verify the device is recognized.
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: "flashing-firmware",
    icon: Terminal,
    title: "Flashing Firmware",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          The Connect AI firmware is open source and available on our GitHub.
          Flash it to your ESP32-S3 using these commands:
        </p>
        <pre className="rounded-xl border border-border/60 bg-card p-4 overflow-x-auto text-sm font-mono">
{`# Clone the firmware repository
git clone https://github.com/connectai/firmware.git
cd firmware

# Install dependencies
pip install esptool

# Flash the firmware (replace /dev/ttyUSB0 with your port)
esptool.py --chip esp32s3 --port /dev/ttyUSB0 \\
  write_flash 0x0 build/connect-ai-firmware.bin

# Verify the flash
esptool.py --chip esp32s3 --port /dev/ttyUSB0 \\
  verify_flash 0x0 build/connect-ai-firmware.bin`}
        </pre>
        <p className="text-sm text-muted-foreground">
          After flashing, the device LED should blink blue to indicate it&apos;s
          ready for pairing.
        </p>
      </div>
    ),
  },
  {
    id: "first-connection",
    icon: Smartphone,
    title: "First Connection",
    content: (
      <div className="space-y-4 text-muted-foreground">
        <ol className="list-decimal list-inside space-y-3">
          <li>
            <strong className="text-foreground">Enable Voice Control:</strong> On
            your iPhone, go to Settings &rarr; Accessibility &rarr; Voice Control
            and enable it.
          </li>
          <li>
            <strong className="text-foreground">Attach the device:</strong> Snap
            the Connect AI device to the back of your iPhone using the MagSafe
            mount. Connect the USB-C cable.
          </li>
          <li>
            <strong className="text-foreground">Register on the platform:</strong>{" "}
            Go to Connect AI, create an account, and enter your device ID (printed
            on the back or displayed via the test firmware).
          </li>
          <li>
            <strong className="text-foreground">Run the &quot;Hello World&quot; test:</strong>{" "}
            From the command center, select your device and run the built-in
            &quot;Hello World&quot; skill. This will open Safari and navigate to a test page
            to verify everything works.
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: "your-first-script",
    icon: Code2,
    title: "Your First .connect Script",
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Now that your device is connected, let&apos;s write a simple{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-cyan-400">
            .connect
          </code>{" "}
          script by hand. This is the same language the AI agent generates — learning
          the basics lets you customize scripts or write your own from scratch.
        </p>

        <div className="space-y-4">
          <h3 className="text-base font-semibold">Basic Structure</h3>
          <p className="text-sm text-muted-foreground">
            Every script starts with a{" "}
            <code className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-xs text-cyan-400">
              skill
            </code>{" "}
            block that names and wraps your automation:
          </p>
          <pre className="rounded-xl border border-border/60 bg-zinc-950 p-4 overflow-x-auto text-sm font-mono leading-relaxed text-zinc-300">
{`skill "My First Skill" {
  // Your commands go here
}`}
          </pre>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold">Core Commands</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { cmd: "open app \"AppName\"", desc: "Launch an app by name" },
              { cmd: "tap \"Element\"", desc: "Tap a UI element or button" },
              { cmd: "type \"text\"", desc: "Type text into the active field" },
              { cmd: "swipe up / down / left / right", desc: "Swipe gestures" },
              { cmd: "wait 2s", desc: "Pause execution" },
              { cmd: "screenshot -> analyze", desc: "Capture screen and run AI analysis" },
            ].map((item) => (
              <div
                key={item.cmd}
                className="rounded-lg border border-border/60 bg-card/50 px-3 py-2"
              >
                <code className="text-xs font-mono text-cyan-400">
                  {item.cmd}
                </code>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold">Control Flow</h3>
          <pre className="rounded-xl border border-border/60 bg-zinc-950 p-4 overflow-x-auto text-sm font-mono leading-relaxed text-zinc-300">
{`// Repeat a block
repeat 5 {
  swipe up
  wait 2s
}

// Conditionals using AI analysis
screenshot -> analyze
if analysis.has_button("Accept") {
  tap "Accept"
}

// Variables
set name = "Connect AI"
type name`}
          </pre>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold">Full Example: Screenshot &amp; Save</h3>
          <p className="text-sm text-muted-foreground">
            This script opens Safari, navigates to a page, captures it, and
            saves the extracted text to Notes:
          </p>
          <pre className="rounded-xl border border-cyan-500/20 bg-zinc-950 p-4 overflow-x-auto text-sm font-mono leading-relaxed text-zinc-300">
{`skill "Capture & Save" {
  open app "Safari"
  tap "Search"
  type "weather today"
  tap "Go"
  wait 3s

  // AI reads the screen
  screenshot -> analyze

  // Save what it found
  open app "Notes"
  tap "New Note"
  type "Weather: " + analysis.summary
}`}
          </pre>
          <p className="text-sm text-muted-foreground">
            Upload this to the command center and run it, or share it with the
            community on the{" "}
            <a href="/skills" className="text-blue-400 hover:underline">
              Skills page
            </a>
            .
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "troubleshooting",
    icon: AlertTriangle,
    title: "Troubleshooting",
    content: (
      <div className="space-y-4 text-muted-foreground">
        <div className="space-y-4">
          {[
            {
              q: "Device not recognized via USB-C",
              a: "Try a different cable. Some USB-C cables are charge-only and don't support data. Ensure you're using a data-capable cable.",
            },
            {
              q: "Voice commands not being recognized",
              a: "Make sure Voice Control is enabled in Accessibility settings. Also check that the audio is routing through the USB-C connection, not the built-in speakers.",
            },
            {
              q: "Bluetooth connection drops",
              a: "We recommend using the USB-C wired connection for reliability. Bluetooth can be affected by interference from other devices.",
            },
            {
              q: "Commands executing on the wrong app",
              a: "Always use the 'screenshot' command first to verify the device state before executing actions. Skills should include state verification steps.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-border/60 bg-card/50 p-4"
            >
              <p className="font-medium text-sm text-foreground">{item.q}</p>
              <p className="mt-1 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function CookbookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
        {/* Sidebar / Table of Contents */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-muted-foreground">
              On this page
            </h3>
            <nav className="mt-4 flex flex-col gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Cookbook
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Build your own Connect AI device from scratch using off-the-shelf
            components. This guide walks you through every step.
          </p>

          <div className="mt-12 space-y-16">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card">
                    <section.icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <div className="mt-6">{section.content}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
