// lib/storage.ts
import { openDB } from "idb";

type dataT = {
  id:string
  mnemonic: string;
  wallets:{publicKey:string,privateKey:string}[]
};

export async function saveEncryptedWallet(data: dataT) {
  try {
    const db = await openDB("solana-wallet", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("wallet")) {
          db.createObjectStore("wallet", { keyPath: "id"});
        }
      },
    });

    await db.add("wallet", data);
  } catch (err) {
    console.error("Failed to save wallet:", err);
    // optionally notify user
  }
}




export async function getEncryptedWallet(id: string): Promise<dataT[]> {
  try {
    const db = await openDB("solana-wallet", 1);
    return await db.get("wallet", id);
  } catch (err) {
    console.error("Failed to get wallet:", err);
    // return undefined;
  }
}

export async function getAllWallets(): Promise<dataT[]> {
  try {
    const db = await openDB("solana-wallet", 1);
    return await db.getAll("wallet");
  } catch (err) {
    console.error("Failed to get all wallets:", err);
    return [];
  }
}
