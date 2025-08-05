// lib/crypto.ts
import CryptoJS from "crypto-js";

export function encryptMnemonic(mnemonic: string, password: string): string {
  return CryptoJS.AES.encrypt(mnemonic, password).toString();
}

export function decryptMnemonic(cipher: string, password: string): string {
  const bytes = CryptoJS.AES.decrypt(cipher, password);
  return bytes.toString(CryptoJS.enc.Utf8);
}
