import { SYSTEM_PROMPT } from "@/lib/assistant-context";

/**
 * POST /api/chat — the "ask.anuran" assistant backend.
 *
 * Proxies to Groq's OpenAI-compatible endpoint so the API key never reaches
 * the browser. Streams tokens back as plain UTF-8 text (the client just
 * appends them). Guards a public endpoint: per-IP rate limit, capped history
 * and message length, bounded output. On any failure it returns a small JSON
 * error the console renders as a graceful "offline" line.
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

// Input caps
const MAX_MESSAGES = 12; // trailing turns kept
const MAX_CHARS = 1000; // per message
const MAX_OUTPUT_TOKENS = 400;

// Per-IP rate limit (in-memory; resets on cold start — fine for a portfolio)
const RATE_LIMIT = 15;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

type ChatMessage = { role: "user" | "assistant"; content: string };

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function errorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return errorResponse("Easy — too many questions at once. Give it a moment.", 429);
  }

  if (!process.env.GROQ_API_KEY) {
    return errorResponse("The assistant is offline right now.", 503);
  }

  // Parse + validate the incoming turns
  let messages: ChatMessage[];
  try {
    const body = (await request.json()) as { messages?: unknown };
    if (!Array.isArray(body.messages)) throw new Error("bad body");
    messages = body.messages
      .filter(
        (m): m is ChatMessage =>
          !!m &&
          typeof (m as ChatMessage).content === "string" &&
          ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant"),
      )
      .slice(-MAX_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  } catch {
    return errorResponse("Couldn't read that request.", 400);
  }

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return errorResponse("Ask me something about Anuran.", 400);
  }

  let upstream: Response;
  try {
    upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.4,
        max_tokens: MAX_OUTPUT_TOKENS,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });
  } catch {
    return errorResponse("The assistant couldn't be reached. Try again shortly.", 502);
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "<no body>");
    console.error(`[chat] Groq upstream ${upstream.status}: ${detail.slice(0, 500)}`);
    return errorResponse("The assistant is having a moment. Try again shortly.", 502);
  }

  // Re-emit Groq's SSE deltas as a plain-text token stream.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstream.body.getReader();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? ""; // keep the trailing partial line

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") {
          controller.close();
          return;
        }
        try {
          const json = JSON.parse(data);
          const token: string | undefined = json.choices?.[0]?.delta?.content;
          if (token) controller.enqueue(encoder.encode(token));
        } catch {
          // ignore keep-alive / non-JSON lines
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
