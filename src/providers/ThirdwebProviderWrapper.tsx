"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ThirdwebProviderWrapper({ children }: Props) {
  return (
    <ThirdwebProvider
      activeChain={Sepolia} // ✅ use explicit chain object, not string
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!} // ✅ ensure defined
    >
      {children}
    </ThirdwebProvider>
  );
}
