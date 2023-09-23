import dotenv from "dotenv";
import { TipLink } from "@tiplink/api";
import fs from "fs";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";


dotenv.config();
const generateTipLink = async () => {
  const {
      url,
      keypair,
  } = await TipLink.create();

  return {
      url: url.toString(),
      keypair,
  }
}

export default async function  mint(req: NextApiRequest, res: NextApiResponse) {
  const first = req.body
  
 
  try {
    const {
      url: tipLinkUrl,
      keypair: tipLinkKeypair,
  } = await generateTipLink();
    const name = `${ first.first.name}`;
    const symbol = "PD";
    const image = `${ first.first.image}`;
    
 const createRes = await axios.post(
  "https://mainnet.underdogprotocol.com/v2/projects/1/nfts",
  {
    name,
    symbol,
    
    image,
    receiverAddress: tipLinkKeypair.publicKey,
    delegated: true,
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.UNDERDOG_API_KEY}`,
    },
  },
);

console.log(tipLinkUrl);

res.status(202).send(createRes.data);
  } catch (error) {
    console.log(error);
    
  }
 
  
}





// // Create Collection on UnderDog to mint To
// async function Createcollection(custom: { value: boolean; projectId: number }) {
//   const options = {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//       authorization: "Bearer " + process.env.UNDERDOG_API_KEY,
//     },
//     body: JSON.stringify({
//       name: collectionName,
//       description: collectionDescription,
//       image: process.env.NFT_URL,
//     }),
//   };
//   try {
//     if (custom.value) {
//       console.log("project id", custom.projectId);

//       return custom.projectId;
//     } else {
//       const res = await fetch(`${process.env.UNDERDOG_API}`, options);
//       if (!res.ok)
//         throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
//       const data = await res.json();
//       if (data.mintAddress) {
//         console.log(
//           `Project ID: ${data.projectId} and Mint Address: ${data.mintAddress}`
//         );
//         return data.projectId;
//       } else {
//         throw new Error("Couldnt Mint Collection");
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// // MintNFTs to Collection on UnderDo
// const Mintnfts = async (wallet: string, projectId: number) => {
//   try {
//     if (!process.env.NFT_URL) {
//       throw new Error("No URL");
//     }
//     const options = {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//         authorization: "Bearer " + process.env.UNDERDOG_API_KEY,
//       },
//       body: JSON.stringify({
//         receiverAddress: wallet,
//         name: collectionName,
//         description: collectionDescription,
//         image: process.env.NFT_URL,
//       }),
//     };
//     const res = await fetch(
//       `${process.env.UNDERDOG_API}/${projectId}/nfts`,
//       options
//     );
//     if (!res.ok) {
//       throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
//     }
//     const data = await res.json();
//     if (data.transactionId) {
//       return true; // Minting was successful
//     } else {
//       throw new Error("Minting NFTs failed"); // Handle unexpected response
//     }
//   } catch (err) {
//     console.error(`Mintnfts error`);
//     return false; // Return false to indicate failur
//   }
// };

// // Mint nfts to Collection and push out tiplinks to claim into a new file!
// async function Mintall() {
//   // Create ProjectId,
//   //  if you have Project Id change value to true and Input Project ID
//   const projectId = await Createcollection({ value: true, projectId: 19 });
//   //Create Wallets or Generate tiplink Wallets
//   const wallets: Wallet[] = await Createwallet();
//   const links: string[] = [];
//   for (const wallet of wallets) {
//     const mintSuccessful = await Mintnfts(wallet.address, projectId);
//     if (mintSuccessful) {
//       links.push(wallet.link);
//       console.log(links);
//     } else {
//       console.error(`Minting NFT for wallet ${wallet.address} failed.`);
//     }
//   }
//   const mintLinksFilePath = "mint_links.txt"; // Define the file path
//   fs.writeFileSync(mintLinksFilePath, links.join("\n"));
//   console.log("Mint links saved to:", mintLinksFilePath);
// }
// Mintall().catch((err) => {
//   console.error("An erro occurr:", err);
// });