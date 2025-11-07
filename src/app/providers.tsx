import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider activeChain={Sepolia}>
      {children}
    </ThirdwebProvider>
  );
}
