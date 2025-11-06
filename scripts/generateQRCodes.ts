const { PrismaClient } = require("@prisma/client");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  console.log("🎨 Generating QR codes for NFTs...");

  const nfts = await prisma.nFT.findMany();
  const outputDir = path.join(__dirname, "../qrcodes");

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // Base URL depending on environment
  const baseURL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    "http://localhost:3000";

  const normalizedBase = baseURL.startsWith("http")
    ? baseURL
    : `https://${baseURL}`;

  // Loop through all NFTs
  for (const nft of nfts) {
    try {
      // 🧹 Ensure the ID is clean — no nested URLs
      let nftId = nft.id;
      if (typeof nftId === "string" && nftId.includes("?id=")) {
        try {
          const parsed = new URL(nftId);
          const clean = parsed.searchParams.get("id");
          if (clean) nftId = clean;
        } catch {}
      }

      const fileName = `${nftId || nft.name.replace(/\s+/g, "_")}.png`;
      const filePath = path.join(outputDir, fileName);
      const url = `${normalizedBase.replace(/\/$/, "")}/claim?id=${encodeURIComponent(
        nftId
      )}`;

      // Generate the QR code file
      await QRCode.toFile(filePath, url, {
        width: 300,
        margin: 2,
      });

      console.log(`✅ QR created for: ${nft.name} → ${filePath}`);

      const webPath = `/qrcodes/${fileName}`;

      // Update DB with QR path
      await prisma.nFT.update({
        where: { id: nft.id },
        data: { qrPath: webPath },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.warn(`⚠️ Could not update DB for ${nft.id}:`, err.message);
      } else {
        console.warn(`⚠️ Could not update DB for ${nft.id}:`, err);
      }
    }
  }

  console.log("🎉 All QR codes generated successfully!");
  await prisma.$disconnect();
}

// Run the script
main().catch((err) => {
  console.error("❌ Error generating QR codes:", err);
  prisma.$disconnect();
  process.exit(1);
});
