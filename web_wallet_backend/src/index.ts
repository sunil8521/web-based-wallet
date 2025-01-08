import express, { Response, Request, json } from "express";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { ethers, Wallet, HDNodeWallet } from "ethers";
import path from "path";
import "dotenv/config"
import cors from "cors"

import bs58 from "bs58";
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
let account: number = 0;
let seed: Buffer;
interface Obj {
  public: string;
  private: string;
}
app.use(cors())
const buildPath = path.join(__dirname, "../../web_wallet/dist"); // Adjust the path as necessary
app.use(express.static(buildPath));
function Generate_wallet(seed: Buffer, account: number, coinType: number): Obj {
  let pub = "",
    pri = "";
  try {
    if (coinType == 501) {
      const path = `m/44'/${coinType}'/${account}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const uint8Array = new Uint8Array(derivedSeed);
      const secretKey = nacl.sign.keyPair.fromSeed(uint8Array).secretKey;
      const publicKey = Keypair.fromSecretKey(secretKey).publicKey;
      pub = publicKey.toString();
      pri = bs58.encode(secretKey);
    } else if (coinType == 60) {
      const path = `m/44'/${coinType}'/${account}'/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(path);
      pri = child.privateKey;
      pub = child.address;
    }
    return { public: pub, private: pri };
  } catch (error) {
    console.error("Error generating seed and keys:", error);
    throw new Error("Failed to generate wallet keys.");
  }
}

app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "service is running." });
});
app.post(
  "/api/generate-key",
  async (req: Request, res: Response): Promise<any> => {
    try {
      let { phrase, coinType } = req.body;

      const cleanAndValidateMnemonic = (mnemonic: string): string | null => {
        const cleanedPhrase = mnemonic.trim().replace(/\s+/g, " ");
        const wordCount = cleanedPhrase.split(" ").length;

        if (
          (wordCount === 12 || wordCount === 24) &&
          validateMnemonic(cleanedPhrase)
        ) {
          return cleanedPhrase;
        }
        return null;
      };
      if (phrase) {
        phrase = cleanAndValidateMnemonic(phrase);
        if (!phrase) {
          return res.status(400).json({
            error: "Invalid mnemonic. Provide a valid 12 or 24-word phrase.",
          });
        }
      } else {
        phrase = generateMnemonic(128);
      }

      seed = mnemonicToSeedSync(phrase);
      const keys = Generate_wallet(seed, (account = 0), coinType);
      res.json({ phares: phrase, key: keys });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.post("/api/create-new", (req: Request, res: Response) => {
  const { coinType } = req.body;
  account++;
  const keys = Generate_wallet(seed, account, coinType);
  res.json({ key: keys });
});
app.post(
  "/api/fetch-balance",
  async (req: Request, res: Response): Promise<void> => {
    const { adsress, coinType, stage } = req.body;
    try {
      const response = await fetch(
        `${stage=="devnet"?process.env.DEVNET:process.env.TESTNET}`,
        {
          method: "POST",
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [adsress],
          }),
        }
      );
      if (!response.ok) {
        res.status(response.status).json({
          error: `Error from external API: ${response.statusText}`,
        });
        return;
      }
      const data = await response.json();
      res.status(200).json({
        success: true,
        data,
      });
    } catch (er) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get("*", (req: Request, res: Response) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log("server is running");
});
