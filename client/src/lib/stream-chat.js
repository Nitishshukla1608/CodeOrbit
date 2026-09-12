
import { getApiBaseUrl, ApiError } from "@/lib/api";

export async function streamChatMessage(
  sessionId,
  content,
  handlers = {}
) {
  const res = await fetch(
    `${getApiBaseUrl()}/api/chat/sessions/${sessionId}/messages`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
      signal: handlers.signal,
    }
  );

  // Handle HTTP errors
  if (!res.ok) {
    let message = res.statusText;

    try {
      const data = await res.json();
      message = data.message ?? data.error ?? message;
    } catch {
      // Ignore JSON parsing error
    }

    throw new ApiError(res.status, message);
  }

  // Make sure response has a body
  if (!res.body) {
    throw new Error("No response body for SSE stream");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, {
      stream: true,
    });

    // SSE messages are separated by blank lines
    const parts = buffer.split("\n\n");

    buffer = parts.pop() ?? "";

    for (const part of parts) {
      if (!part.trim()) {
        continue;
      }

      const lines = part.split("\n");

      let event = "message";
      const dataLines = [];

      for (const line of lines) {
        if (line.startsWith("event:")) {
          event = line.slice(6).trim();
        } else if (line.startsWith("data:")) {
          dataLines.push(
            line.slice(5).trimStart()
          );
        }
      }

      const data = dataLines.join("\n");

      if (!data) {
        continue;
      }

      try {
        if (event === "token") {
          const token = JSON.parse(data);
          handlers.onToken?.(token);
        } else if (event === "user_message") {
          const message = JSON.parse(data);
          handlers.onUserMessage?.(message);
        } else if (event === "assistant_message") {
          const message = JSON.parse(data);
          handlers.onAssistantMessage?.(message);
        } else if (event === "done") {
          handlers.onDone?.();
        }
      } catch (err) {
        handlers.onError?.(
          err instanceof Error
            ? err
            : new Error("Failed to parse SSE event")
        );
      }
    }
  }

  // Stream finished
  handlers.onDone?.();
}
