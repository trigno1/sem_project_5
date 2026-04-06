import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ErrorCode, errorResponse } from "@/lib/error-handler";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return errorResponse({
        code: ErrorCode.VALIDATION,
        message: "Missing NFT ID",
        status: 400,
      });
    }

    const nft = await prisma.nFT.findUnique({
      where: { id },
    });

    if (!nft) {
      return errorResponse({
        code: ErrorCode.NOT_FOUND,
        message: "NFT drop not found",
        status: 404,
      });
    }

    // Increment scansCount asynchronously
    prisma.nFT.update({
      where: { id },
      data: { scansCount: { increment: 1 } }
    }).catch(console.error);

    return NextResponse.json({ nft });
  } catch (error) {
    return errorResponse({
      code: ErrorCode.INTERNAL,
      message: "An encrypted server error occurred while fetching the NFT",
      status: 500,
      details: error,
    });
  }
}
