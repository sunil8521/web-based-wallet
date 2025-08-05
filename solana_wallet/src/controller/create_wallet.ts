import { Request, Response, RequestHandler } from "express";
import { generateMnemonic } from "bip39";
import {
  cleanAndValidateMnemonic,
  deriveSolanaKeypair,
} from "../helper/all_helper";

export const generate_mnemonic = async (req: Request, res: Response) => {
  const mnemonics = generateMnemonic(128);
  res.status(201).json({ data: mnemonics, success: true });
};

export const validate_mnemonic = (req: Request, res: Response) => {
  const { mnemonic } = req.body;
  const data = cleanAndValidateMnemonic(mnemonic);
  if (!mnemonic || data == null) {
    res.status(400).json({
      message: "Invalid mnemonic. Provide a valid phrase.",
      success: false,
    });
  }
  res.status(200).json({ data: data, success: true });
};

export const generate_wallet = (req: Request, res: Response) => {
  const { mnemonic, index } = req.body;
  const key = deriveSolanaKeypair(mnemonic, index);
  res.status(200).json({ public: key.publickey,private:key.privatekey });
};
