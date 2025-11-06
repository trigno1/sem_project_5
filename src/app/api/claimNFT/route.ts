import prisma from "@/lib/prisma";
import { contractAddress } from "@/app/contract";
import { NextResponse } from "next/server";

const { BACKEND_WALLET_ADDRESS, ENGINE_URL, THIRDWEB_ACCESS_TOKEN } = process.env;

async function checkTransactionStatus(queueId: string): Promise<boolean> {
  const statusResponse = await fetch(`${ENGINE_URL}/transaction/status/${queueId}`, {
    headers: { Authorization: `Bearer ${THIRDWEB_ACCESS_TOKEN}` },
  });

  if (!statusResponse.ok) return false;
  const statusData = await statusResponse.json();
  return statusData.result.status === "mined";
}

async function pollTransactionStatus(queueId: string, maxAttempts = 20, interval = 4000): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    const mined = await checkTransactionStatus(queueId);
    if (mined) return true;
    console.log(`⏳ Waiting for transaction to be mined... Attempt ${i + 1}`);
    await new Promise((r) => setTimeout(r, interval));
  }
  return false;
}

export async function POST(request: Request) {
  const { id, address } = await request.json();

  if (!BACKEND_WALLET_ADDRESS || !ENGINE_URL || !THIRDWEB_ACCESS_TOKEN) {
    throw new Error('Server misconfigured — missing environment variables.');
  }

  try {
    const nft = await prisma.nFT.findUnique({ where: { id } });
    if (!nft) return NextResponse.json({ error: "NFT not found" }, { status: 404 });
    if (nft.minted) return NextResponse.json({ error: "NFT already minted" }, { status: 400 });

    const mintURL = `${ENGINE_URL.replace(/\/$/, "")}/contract/84532/${contractAddress}/erc1155/mint-to`;

    const resp = await fetch(mintURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${THIRDWEB_ACCESS_TOKEN}`,
        "x-backend-wallet-address": BACKEND_WALLET_ADDRESS,
      },
      body: JSON.stringify({
        receiver: address,
        metadataWithSupply: {
          metadata: {
            name: nft.name,
            description: nft.description,
            image: nft.image,
            attributes: nft.attributes || {},
          },
          supply: "1",
        },
      }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("[ENGINE ERROR]", errorText);
      return NextResponse.json({ message: "Engine mint request failed", error: errorText }, { status: 500 });
    }

    const { result } = await resp.json();
    const queueId = result.queueId;
    const isMined = await pollTransactionStatus(queueId);

    if (isMined) {
      await prisma.nFT.update({
        where: { id },
        data: { owner: address, minted: true },
      });
      return NextResponse.json({ message: "✅ Transaction mined successfully!", queueId, success: true });
    } else {
      return NextResponse.json({ message: "Transaction timed out", queueId }, { status: 408 });
    }
  } catch (err) {
    console.error("[UNHANDLED ERROR]", err);
    return NextResponse.json({ message: "Internal error", error: `${err}` }, { status: 500 });
  }
}
