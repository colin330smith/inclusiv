import { NextResponse } from "next/server";
import { Resend } from "resend";

// Uptime monitoring cron - runs every 5 minutes
// Set up in vercel.json: { "crons": [{ "path": "/api/monitor", "schedule": "*/5 * * * *" }] }

const ALERT_EMAIL = "colin@tryinclusiv.com";
const resend = new Resend(process.env.RESEND_API_KEY);

// Prevent alert spam - only alert once per hour for same issue
let lastAlertTime = 0;
const ALERT_COOLDOWN = 60 * 60 * 1000; // 1 hour

export async function GET(request: Request) {
  // Verify cron secret (Vercel adds this header)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Allow local testing
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    // Test the scanner endpoint
    const scanResponse = await fetch("https://tryinclusiv.com/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "example.com" }),
    });

    const scanData = await scanResponse.json();

    if (!scanResponse.ok || scanData.code === "CONNECTION_FAILED") {
      // Scanner is down - send alert
      const now = Date.now();
      if (now - lastAlertTime > ALERT_COOLDOWN) {
        await resend.emails.send({
          from: "Inclusiv Alerts <alerts@tryinclusiv.com>",
          to: ALERT_EMAIL,
          subject: "🚨 CRITICAL: Scanner Down",
          html: `
            <h1>Scanner Alert</h1>
            <p><strong>Status:</strong> ${scanData.code || "ERROR"}</p>
            <p><strong>Error:</strong> ${scanData.error || "Unknown"}</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            <p>Check Browserless dashboard and Vercel logs immediately.</p>
          `,
        });
        lastAlertTime = now;
      }

      return NextResponse.json({
        status: "alert_sent",
        scanner: "down",
        error: scanData.error,
        timestamp: new Date().toISOString(),
      });
    }

    // Scanner is healthy
    return NextResponse.json({
      status: "healthy",
      scanner: "operational",
      scanScore: scanData.score,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Monitor check failed:", errorMsg);

    return NextResponse.json({
      status: "error",
      error: errorMsg,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
