import { NextResponse } from "next/server";
import { chromium } from "playwright-core";

// Cache the last health check result
let lastHealthCheck: {
  status: string;
  browserless: string;
  timestamp: string;
} | null = null;
let lastCheckTime = 0;
const CACHE_DURATION = 30000; // 30 seconds

async function testBrowserlessConnection(): Promise<boolean> {
  const apiKey = process.env.BROWSERLESS_API_KEY;
  if (!apiKey) return false;

  try {
    const browser = await Promise.race([
      chromium.connectOverCDP(`wss://production-sfo.browserless.io?token=${apiKey}`),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Connection timeout")), 10000)
      ),
    ]);
    await browser.close();
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const now = Date.now();

  // Return cached result if recent
  if (lastHealthCheck && now - lastCheckTime < CACHE_DURATION) {
    return NextResponse.json(lastHealthCheck);
  }

  const browserlessOk = await testBrowserlessConnection();

  lastHealthCheck = {
    status: browserlessOk ? "healthy" : "degraded",
    browserless: browserlessOk ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  };
  lastCheckTime = now;

  const statusCode = browserlessOk ? 200 : 503;

  return NextResponse.json(lastHealthCheck, { status: statusCode });
}
