import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { name } from "thirdweb/extensions/common";

async function main() {
  try {
    console.log("Creating client...");
    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_API_SECRET_KEY,
    });
    console.log("Getting contract...");
    const contract = getContract({
      client,
      chain: baseSepolia,
      address: process.env.NFT_CONTRACT_ADDRESS,
    });

    console.log("Reading name...");
    const val = await name({ contract });
    console.log("Name:", val);
  } catch (error) {
    console.error("Caught error:", error.message);
  }
}

main();
