import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

interface ClaimEmailPayload {
  email: string;
  nftName: string;
  nftImage: string;
  txHash: string;
  dropId: string;
  walletAddress: string;
  claimedAt: string;
}

function buildEmailHtml(payload: ClaimEmailPayload): string {
  const { nftName, nftImage, txHash, dropId, walletAddress, claimedAt } = payload;

  const origin = process.env.NEXT_PUBLIC_APP_URL || "https://phygital.app";
  const baseScanUrl = `https://sepolia.basescan.org/tx/${txHash}`;
  const dashboardUrl = `${origin}/dashboard`;
  const claimUrl = `${origin}/claim?id=${dropId}`;

  const imageHtml = nftImage
    ? `<img src="${nftImage.replace("ipfs://", "https://ipfs.io/ipfs/")}" alt="${nftName}" width="200" height="200" style="border-radius:16px;object-fit:cover;display:block;margin:0 auto 24px;" />`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NFT Claimed — Phygital</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#a855f7 100%);padding:40px 40px 32px;text-align:center;">
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.6);">Phygital NFT Platform</p>
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Your NFT Has Been Claimed! 🎉</h1>
              <p style="margin:12px 0 0;font-size:15px;color:rgba(255,255,255,0.75);">Congratulations — you now own a real on-chain asset.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              ${imageHtml}

              <!-- NFT Name Badge -->
              <div style="background:linear-gradient(135deg,#eef2ff,#f5f3ff);border:1px solid #e0e7ff;border-radius:16px;padding:20px 24px;margin-bottom:28px;text-align:center;">
                <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#818cf8;">You Claimed</p>
                <p style="margin:0;font-size:22px;font-weight:800;color:#3730a3;letter-spacing:-0.3px;">${nftName}</p>
              </div>

              <!-- Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding-bottom:12px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;">Claimed By</p>
                    <p style="margin:0;font-size:13px;font-weight:600;color:#1f2937;font-family:'Courier New',monospace;word-break:break-all;">${walletAddress}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:12px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;">Date Claimed</p>
                    <p style="margin:0;font-size:13px;font-weight:600;color:#1f2937;">${new Date(claimedAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;">Transaction Hash</p>
                    <p style="margin:0;font-size:12px;font-weight:600;color:#4f46e5;font-family:'Courier New',monospace;word-break:break-all;">${txHash}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding-right:8px;" width="50%">
                    <a href="${baseScanUrl}" target="_blank" style="display:block;background:#4f46e5;color:#ffffff;text-decoration:none;text-align:center;padding:14px 16px;border-radius:12px;font-size:14px;font-weight:700;">Verify on BaseScan →</a>
                  </td>
                  <td style="padding-left:8px;" width="50%">
                    <a href="${dashboardUrl}" target="_blank" style="display:block;background:#f3f4f6;color:#374151;text-decoration:none;text-align:center;padding:14px 16px;border-radius:12px;font-size:14px;font-weight:700;border:1px solid #e5e7eb;">View Dashboard</a>
                  </td>
                </tr>
              </table>

              <!-- Claim Link -->
              <div style="background:#fafafa;border:1px solid #f0f0f0;border-radius:12px;padding:16px;margin-bottom:8px;">
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;">Original Drop Link</p>
                <a href="${claimUrl}" style="font-size:12px;color:#4f46e5;font-family:'Courier New',monospace;word-break:break-all;">${claimUrl}</a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #f0f0f0;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">Built on Base Sepolia · ERC-1155 Standard</p>
              <p style="margin:0;font-size:11px;color:#d1d5db;">© 2025 Phygital NFT Platform · All rights reserved</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(request: Request) {
  try {
    const body: ClaimEmailPayload = await request.json();
    const { email, nftName, nftImage, txHash, dropId, walletAddress, claimedAt } = body;

    if (!email || !nftName || !txHash) {
      return NextResponse.json(
        { error: "Missing required fields: email, nftName, txHash" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const html = buildEmailHtml({ email, nftName, nftImage, txHash, dropId, walletAddress, claimedAt });

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `🎉 You claimed "${nftName}" on Phygital!`,
      html,
    });

    if (error) {
      console.error("[send-claim-email] Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[send-claim-email] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
