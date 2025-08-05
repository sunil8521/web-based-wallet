import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { encryptMnemonic, decryptMnemonic } from "@/lib/encrypt";
import { saveEncryptedWallet } from "../lib/db";
export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const nav = useNavigate();
  const { state } = useLocation();

  const handleCreate = async () => {
    if (password !== confirm || password.length < 6) {
      alert("Passwords do not match or are too short");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/generate-wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mnemonic: state.phrase,
            index: 0,
          }),
        }
      );
      const data = await res.json();
      const encryptedMnemonic = encryptMnemonic(state.phrase, password);
      const encryptedWallet = encryptMnemonic(data.private, password);
      const indexDBdata = {
        id: "main",
        mnemonic: encryptedMnemonic,
        wallets: [
          { publicKey: data.public as string, privateKey: encryptedWallet },
        ],
      };
      await saveEncryptedWallet(indexDBdata);
      nav("/dashboard");
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-sm w-full p-6 flex flex-col gap-6">
        <button
          className="text-sm text-muted-foreground flex items-center gap-1  cursor-pointer"
          onClick={() => nav(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h2 className="text-2xl font-semibold text-center">
          Set Wallet Password
        </h2>
        <p className="text-muted-foreground text-center max-w-md">
          This password will be used to encrypt your wallet on this device.
        </p>

        <div className="w-full max-w-sm space-y-4">
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <Button onClick={handleCreate} className="mt-4 cursor-pointer">
          Create Wallet
        </Button>
      </div>
    </div>
  );
}
