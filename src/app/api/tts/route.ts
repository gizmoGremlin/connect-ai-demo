export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return Response.json({ error: "Missing 'text' field" }, { status: 400 });
    }

    const apiKey = process.env.VOICE_AI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "VOICE_AI_API_KEY not configured" },
        { status: 500 }
      );
    }

    const ttsResponse = await fetch(
      "https://dev.voice.ai/api/v1/tts/speech",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, audio_format: "mp3" }),
      }
    );

    if (!ttsResponse.ok) {
      const detail = await ttsResponse.text().catch(() => "Unknown error");
      return Response.json(
        { error: `Voice AI returned ${ttsResponse.status}: ${detail}` },
        { status: 500 }
      );
    }

    const audioBuffer = await ttsResponse.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
