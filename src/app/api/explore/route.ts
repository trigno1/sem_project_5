import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/explore
 * Public endpoint — returns active NFT drops that creators chose to display publicly.
 * Only drops with isPublic=true are shown. Also filters: not expired, not fully claimed, already live.
 */
export async function GET() {
  try {
    const now = new Date();

    const drops = await prisma.nFT.findMany({
      where: {
        isPublic: true,           // only creator-approved public drops
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: now } },
        ],
        AND: [
          {
            OR: [
              { issuedAt: null },
              { issuedAt: { lte: now } },
            ],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        category: true,
        claimsCount: true,
        maxClaims: true,
        scansCount: true,
        expiresAt: true,
        issuedAt: true,
        isSoulbound: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Filter out fully-claimed drops
    const available = drops.filter(
      (d) => d.maxClaims === null || d.claimsCount < d.maxClaims
    );

    return NextResponse.json({ drops: available });
  } catch (error) {
    console.error("[explore] fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch drops" },
      { status: 500 }
    );
  }
}
