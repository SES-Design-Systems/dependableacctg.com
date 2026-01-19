import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  if (!code) {
    // Step 1: Generate authorization URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar"],
      prompt: "consent", // Force to get refresh token
    });
    return NextResponse.redirect(authUrl);
  }

  // Step 2: Exchange code for tokens
  try {
    const { tokens } = await oauth2Client.getToken(code);
    return NextResponse.json({
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get tokens" },
      { status: 500 }
    );
  }
}
