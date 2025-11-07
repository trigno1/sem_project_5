"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient, defineChain } from "thirdweb";
import { ReactNode } from "react";

// ✅ Create the Thirdweb client using your public client ID
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

// ✅ Define the chain properly (must be an object, not a string)
const chain = defineChain({
  id: 11155111, // Sepolia testnet ID
  rpc: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY", // optional custom RPC
  name: "Sepolia",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  blockExplorers: [{ name: "Etherscan", url: "https://sepolia.etherscan.io" }],
});

export default function ThirdwebProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThirdwebProvider client={client} chain={chain}>
      {children}
    </ThirdwebProvider>
  );
}
