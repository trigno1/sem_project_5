import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing NFT ID" }, { status: 400 });
    }

    // 🧹 Handle nested or encoded ID
    if (id.includes("id=")) {
      id = id.split("id=")[1];
    }

    console.log("🔍 Looking up NFT ID:", id);

    const nft = await prisma.nFT.findUnique({
      where: { id },
    });

    if (!nft) {
      return NextResponse.json({ error: "NFT not found" }, { status: 404 });
    }

    return NextResponse.json({ nft });
  } catch (error) {
    console.error("[NFT API ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
