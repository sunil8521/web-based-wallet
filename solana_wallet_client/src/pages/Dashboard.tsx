import React, { useEffect, useState } from "react";
import { getAllWallets } from "../lib/db";
import {
  ChevronDown,
  Menu,
  Copy,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Building2,
  Plus,
  Settings,
  Lock,
  X,
  MoreHorizontal,
  Droplet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import useZustand from "@/state/storage";
import useFetchdata from "@/hook/useFetchdata";
import axios from "axios";

const Dashboard = () => {
  const setNetwork = useZustand((state) => state.setNetwork);
  const network = useZustand((state) => state.network);
  const [balance, setBalance] = useState<number>(0);
  const { solWalltets } = useFetchdata("main");
  const [selectedWallet, setSelectedWallet] = useState<string>("");

  // Set first wallet as default when wallets are loaded
  useEffect(() => {
    if (solWalltets && solWalltets.length > 0 && !selectedWallet) {
      setSelectedWallet(solWalltets[0].publicKey);
    }
  }, [solWalltets, selectedWallet]);

  console.log(solWalltets);

  useEffect(() => {
    if (selectedWallet) {
      const getBalance = async () => {
        try {
          const res = await axios.post(network, {
            jsonrpc: "2.0",
            id: 1,
            method: "getAccountInfo",
            params: [selectedWallet],
          });

          if (res.data.result && res.data.result.value) {
            const lamports = res.data.result.value.lamports;
            const solBalance = lamports / 1000000000; // Convert lamports to SOL
            setBalance(solBalance);
          } else {
            setBalance(0);
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(0);
        }
      };

      getBalance();
    }
  }, [selectedWallet, network]);


 const handleAddnewWallet=()=>{

  
 }

  return (
    <div className="min-h-[100dvh] bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white overflow-hidden">
        {/* Header */}

        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Drawer>
              <DrawerTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <span className="text-sm font-medium">{selectedWallet.slice(0,4)}. . .</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="max-w-sm mx-auto">
                <DrawerHeader>
                  <DrawerTitle>Select Wallet</DrawerTitle>
                  <DrawerDescription>
                    Choose which wallet to use
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-3">
                  {solWalltets?.map((wallet, key) => (
                    <DrawerClose asChild key={key}>
                      <button
                        onClick={() => setSelectedWallet(wallet.publicKey)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                          wallet.publicKey === selectedWallet
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-purple-500 rounded"></div>
                            <div>
                              <div className="font-medium">{`wallet ${
                                key + 1
                              }`}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                {wallet.publicKey.slice(0, 4)}...
                                {wallet.publicKey.slice(-4)}
                                <Copy className="w-3 h-3" />
                              </div>
                            </div>
                          </div>
                          <div className="font-medium">{balance} SOL</div>
                        </div>
                      </button>
                    </DrawerClose>
                  ))}
                  <button onClick={handleAddnewWallet} className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 hover:border-blue-400 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add new wallet
                  </button>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <button className="w-full py-2 px-4 bg-gray-100 rounded-lg">
                      Cancel
                    </button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <span className="text-sm font-medium">
                    {network === "https://api.mainnet-beta.solana.com"
                      ? "Mainnet"
                      : "Devnet"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Network</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={network === "https://api.mainnet-beta.solana.com"}
                  onClick={() =>
                    setNetwork("https://api.mainnet-beta.solana.com")
                  }
                >
                  Mainnet
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={network === "https://api.devnet.solana.com"}
                  onClick={() => setNetwork("https://api.devnet.solana.com")}
                >
                  Devnet
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Balance Section */}
        <div className="px-6 py-8 text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {balance} SOL
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-500">$0.00</span>
            {/* <span className="text-green-500 text-sm font-medium">+2.07%</span> */}
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4">
          <div className="flex justify-evenly">
            <button
              onClick={() =>
                window.open("https://faucet.solana.com/", "_blank")
              }
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplet className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-700">Airdrop</span>
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ArrowDown className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    Receive
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-sm mx-auto">
                <DialogHeader>
                  <DialogTitle>Receive SOL</DialogTitle>
                  <DialogDescription>
                    Your wallet address to receive SOL tokens
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4 text-center">
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-900 mb-2">
                      {"wallets[selectedWallet].name"}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex flex-col">
                        <span className="text-sm font-mono text-gray-700 break-all">
                          {selectedWallet}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedWallet);
                      }}
                      className="w-full py-2 px-4 bg-gray-100 rounded-lg"
                    >
                      Copy
                    </button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ArrowUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    Send
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-sm mx-auto">
                <DialogHeader>
                  <DialogTitle>Send SOL</DialogTitle>
                  <DialogDescription>
                    Send SOL tokens to another wallet
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter wallet address"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (SOL)
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      step="0.001"
                      min="0"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Available: 0 SOL
                    </div>
                  </div>
                </div>
                <DialogFooter className="flex gap-2">
                  <DialogClose asChild>
                    <button className="flex-1 py-2 px-4 bg-gray-100 rounded-lg">
                      Cancel
                    </button>
                  </DialogClose>
                  <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Send
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Token List */}
        <div className="px-6 py-4 space-y-4 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Transactions
          </h3>
          {/* Mock transaction data for selected wallet */}


          <div className="overflow-auto max-h-[21dvh]">
          {[
            {
              type: "Received",
              amount: "+ 0.4539 SOL",
              value: "+ $0.07",
              from: "7xKX...mN8p",
              signature: "4Zk2...9Xm1",
              timestamp: "2 hours ago",
              status: "Confirmed",
              icon: <ArrowDown className="w-5 h-5 text-green-600" />,
            },
            {
              type: "Sent",
              amount: "- 0.1 SOL",
              value: "- $0.02",
              to: "9Pm3...kL7q",
              signature: "8Np1...4Rt6",
              timestamp: "1 day ago",
              status: "Confirmed",
              icon: <ArrowUp className="w-5 h-5 text-red-600" />,
            },
            {
              type: "Sent",
              amount: "- 0.1 SOL",
              value: "- $0.02",
              to: "9Pm3...kL7q",
              signature: "8Np1...4Rt6",
              timestamp: "1 day ago",
              status: "Confirmed",
              icon: <ArrowUp className="w-5 h-5 text-red-600" />,
            },
            {
              type: "Sent",
              amount: "- 0.1 SOL",
              value: "- $0.02",
              to: "9Pm3...kL7q",
              signature: "8Np1...4Rt6",
              timestamp: "1 day ago",
              status: "Confirmed",
              icon: <ArrowUp className="w-5 h-5 text-red-600" />,
            },
            {
              type: "Sent",
              amount: "- 0.1 SOL",
              value: "- $0.02",
              to: "9Pm3...kL7q",
              signature: "8Np1...4Rt6",
              timestamp: "1 day ago",
              status: "Confirmed",
              icon: <ArrowUp className="w-5 h-5 text-red-600" />,
            },
            {
              type: "Sent",
              amount: "- 0.1 SOL",
              value: "- $0.02",
              to: "9Pm3...kL7q",
              signature: "8Np1...4Rt6",
              timestamp: "1 day ago",
              status: "Confirmed",
              icon: <ArrowUp className="w-5 h-5 text-red-600" />,
            },
            {
              type: "Sent",
              amount: "- 0.1 SOL",
              value: "- $0.02",
              to: "9Pm3...kL7q",
              signature: "8Np1...4Rt6",
              timestamp: "1 day ago",
              status: "Confirmed",
              icon: <ArrowUp className="w-5 h-5 text-red-600" />,
            },
          ].map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition-colors"
              onClick={() =>
                window.open(
                  `https://explorer.solana.com/tx/${transaction.signature}`,
                  "_blank"
                )
              }
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {transaction.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {transaction.type}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.type === "Received"
                      ? `From: ${transaction.from}`
                      : `To: ${transaction.to}`}
                  </div>
                  <div className="text-xs text-gray-400">
                    {transaction.timestamp}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-medium ${
                    transaction.type === "Received"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.amount}
                </div>
                <div className="text-sm text-gray-500">{transaction.value}</div>
                <div className="text-xs text-green-600">
                  {transaction.status}
                </div>
              </div>
            </div>


          ))}</div>

          {/* Show message if no transactions */}
          {/* {wallets[selectedWallet].balance === "$0.00" && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-sm">No transactions yet</div>
              <div className="text-xs mt-1">
                Your transactions will appear here
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
