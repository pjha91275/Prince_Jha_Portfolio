/**
 * API client utility — calls Next.js built-in API routes (same origin).
 */

/**
 * Check backend (Next.js API) status.
 */
export async function checkBackendStatus() {
  try {
    const res = await fetch("/api/status");
    if (!res.ok) throw new Error("Not OK");
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Send a chat message to the AI route.
 */
export async function sendChatMessage(message, history = [], localApiKey = null) {
  const headers = { "Content-Type": "application/json" };
  if (localApiKey) headers["x-api-key"] = localApiKey;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers,
    body: JSON.stringify({ message, history: history.slice(0, -1) }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Server error");
  }
  return await res.json();
}

/**
 * Submit contact form to MongoDB via Next.js API route.
 */
export async function submitContactForm(formData) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return await res.json();
}
