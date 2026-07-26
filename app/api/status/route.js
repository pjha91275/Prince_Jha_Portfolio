import { NextResponse } from "next/server";

function getApiKey(request) {
  const headerKey = request.headers.get("x-api-key");
  if (headerKey && headerKey.trim() && !headerKey.startsWith("your_")) {
    return headerKey.trim();
  }
  const envKey = process.env.GEMINI_API_KEY;
  if (envKey && envKey.trim() && !envKey.startsWith("your_")) {
    return envKey.trim();
  }
  return null;
}

export async function GET(request) {
  const apiKey = getApiKey(request);
  return NextResponse.json({
    status: "online",
    api_key_configured: apiKey !== null,
    message: "Next.js API route is active.",
  });
}
