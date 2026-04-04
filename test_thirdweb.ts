import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { name } from "thirdweb/extensions/common";

async function main() {
  try {
    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_API_SECRET_KEY as string,
    });
    const contract = getContract({
      client,
      chain: baseSepolia,
      address: process.env.NFT_CONTRACT_ADDRESS as string,
    });

    const val = await readContract(name({ contract }));
    console.log("Name:", val);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
