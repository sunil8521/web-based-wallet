import { useState, useEffect } from "react";
import { MoveLeft } from "lucide-react";
import ShowInfo from "./ShowInfo";
import { toast } from "sonner";

const Setup = ({ setWallet, walletType }) => {
  const [phrase, setPhrase] = useState("");
  const [walletData, setWalletData] = useState(null);

  const handleGenerate = async () => {
    fetch("/api/generate-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coinType: walletType?.type,
        phrase: phrase,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setWalletData(null);
          toast.error(data.error);
        } else {
          setWalletData({ phares: data.phares, key: [data.key] });
          toast.success("Wallet successfully generated/recovered!");
        }

      })
      .catch((error) => {
        toast.error("Failed to generate/recover wallet. Try again.");
      });
  };
  return (
    <>
      {walletData ? (
        // Render ShowInfo component if walletData exists
        <ShowInfo walletData={walletData} walletType={walletType} />
      ) : (
        <main className="mt-32 max-w-3xl mx-auto">
          <button onClick={setWallet}>
            <MoveLeft />
          </button>
          <h1 className="text-5xl font-bold mb-4">
            Import or create your wallet
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
            Enter your recovery phrase or generate a new wallet.
          </p>

          <div className="space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder="Enter your recovery phrase"
                className="w-full px-4 py-3 bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 transition-all"
              />
              <button
                onClick={handleGenerate}
                className="w-full px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                Recover Wallet
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800"></div>
              <span className="text-neutral-600 dark:text-neutral-400">or</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800"></div>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full px-8 py-3 bg-white dark:bg-neutral-900 text-black dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Generate New Wallet
            </button>
          </div>
        </main>
      )}
    </>
  );
};

export default Setup;
