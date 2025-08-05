import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
export const cleanAndValidateMnemonic = (mnemonic: string): string | null => {
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

export const deriveSolanaKeypair = (
  mnemonic: string,
  index = 0
): { publickey: string; privatekey: string } => {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/${index}'/0'`;
  const { key } = derivePath(path, seed.toString("hex"));
  const val = Keypair.fromSeed(key);

  return {
    publickey: val.publicKey.toString(),
    privatekey: bs58.encode(val.secretKey),
  };
};
