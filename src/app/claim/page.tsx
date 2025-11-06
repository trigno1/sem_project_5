"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { motion } from "framer-motion";

interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  minted: boolean;
  owner?: string;
}

export default function ClaimPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [nft, setNft] = useState<NFT | null>(null);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [message, setMessage] = useState("");
  const address = useAddress();

  useEffect(() => {
    if (!id) return;

    console.log("🔍 Fetching NFT for ID:", id);

    async function fetchNFT() {
      try {
        const res = await fetch(`/api/nft?id=${id}`);
        const data = await res.json();
        if (res.ok) {
          setNft(data.nft);
        } else {
          console.error("❌ Error fetching NFT:", data);
          setMessage("NFT not found.");
        }
      } catch (err) {
        console.error("Error fetching NFT:", err);
        setMessage("Failed to load NFT.");
      } finally {
        setLoading(false);
      }
    }

    fetchNFT();
  }, [id]);

  const handleClaim = async () => {
    if (!address || !nft) return;
    setMinting(true);
    setMessage("⏳ Claiming your NFT...");

    try {
      const res = await fetch("/api/claimNFT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: nft.id, address }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage("🎉 NFT successfully claimed!");
        setNft({ ...nft, minted: true, owner: address });
      } else {
        setMessage(`⚠️ ${data.error || "Claim failed"}`);
      }
    } catch (err) {
      console.error("Claim error:", err);
      setMessage("❌ Something went wrong while claiming.");
    } finally {
      setMinting(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p>Loading NFT details...</p>
      </div>
    );

  if (!nft)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p>{message || "NFT not found"}</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
      <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <h1 className="text-3xl font-semibold mb-2">🎉 Claim Your NFT</h1>
        <h2 className="text-lg mb-6">{nft.name}</h2>

        <img
          src={nft.image?.replace("ipfs://", "https://ipfs.io/ipfs/")}
          alt={nft.name}
          className="w-60 h-60 rounded-xl shadow-lg mb-4"
        />

        <p className="text-gray-300 max-w-md mb-4">{nft.description}</p>
        <p className="text-sm text-gray-400">ID: {nft.id}</p>

        <p className="mt-2">
          Status:{" "}
          {nft.minted ? (
            <span className="text-green-400">✅ Minted</span>
          ) : (
            <span className="text-yellow-400">🟡 Not Minted</span>
          )}
        </p>

        {!nft.minted && (
          <button
            onClick={handleClaim}
            disabled={minting || !address}
            className={`mt-6 px-6 py-3 text-black font-semibold rounded-xl transition ${
              minting || !address
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-300"
            }`}
          >
            {minting ? "Claiming..." : "Claim NFT"}
          </button>
        )}

        {message && <p className="mt-4 text-sm text-gray-300">{message}</p>}
      </motion.div>
    </div>
  );
}
