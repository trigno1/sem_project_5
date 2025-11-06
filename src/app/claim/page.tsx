import { ClaimNft } from "@/components/claim-nft";
import prisma from "../../../scripts/prisma.mjs";

async function getData(id: string) {
    console.log("🔍 Searching for NFT ID:", id);

    const nft = await prisma.nFT.findUnique({
        where: {
            id: id
        }
    });

    if (!nft) {
        console.error("❌ No NFT found for ID:", id);
        throw new Error('NFT not found');
    }

    return { nft: JSON.stringify(nft) };
}

export default async function ClaimPage({
    searchParams,
} : {
    searchParams: { id: string }
}) {
    const nft = JSON.parse((await getData(searchParams.id)).nft)

    return (
        <ClaimNft nft={nft}/>
    )
}