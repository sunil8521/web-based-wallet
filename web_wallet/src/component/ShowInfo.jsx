import { Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ShowInfo = ({ walletData, walletType }) => {
  // console.log(walletData)
  const handleCopy = () => {
    navigator.clipboard
      .writeText(words)
      .then(() => {
        toast.success("Phrase copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy text: ", err);
      });
  };
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [words, setWords] = useState(walletData.phares);
  const [wallets, setWallets] = useState(walletData.key);
  //   const clearWallets = () => {};

  const addWallet = () => {
    fetch("/api/create-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coinType: walletType?.type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedWallets = [...wallets, data.key];
        setWallets(updatedWallets);

      
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className=" p-4 rounded-lg flex justify-between items-center">
          <p className="font-mono text-sm break-words">
            {words?.split(" ").map((w, i) => {
              return (
                <span
                  className="mr-1 inline-block p-2 text-black bg-neutral-300 dark:text-white dark:bg-neutral-900 rounded-xl"
                  key={i}
                >
                  {w}
                </span>
              );
            })}
          </p>
          <button onClick={handleCopy}>
            <Copy />
          </button>
        </div>

        {/* Wallet Section Header */}
        <div className="flex items-center justify-between mt-8">
          <h1 className="text-4xl font-bold">{walletType.name} Wallet</h1>
          <div className="flex gap-4">
            <button
              onClick={addWallet}
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg transition-colors"
            >
              Add Wallet
            </button>
          </div>
        </div>

        {/* Wallet Cards */}
        <div className="space-y-4">
          {wallets.map((wallet, i) => (
            <div key={i} className="bg-neutral-200 dark:bg-neutral-900 rounded-lg p-6 space-y-6">
           

              <div className="space-y-4 ">
                <div>
                  <h3 className="text-neutral-900 dark:text-neutral-400 mb-1">Public Key</h3>
                  <p className="font-mono text-sm break-all text-black dark:text-white">
                    {wallet?.public}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-neutral-900 dark:text-neutral-400">Private Key</h3>
                    <button
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                      className="text-neutral-900 dark:text-neutral-400 "
                    >
                      {showPrivateKey ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="font-mono text-sm break-all text-black dark:text-white">
                    {showPrivateKey ? wallet?.private : "•".repeat(64)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default ShowInfo;
