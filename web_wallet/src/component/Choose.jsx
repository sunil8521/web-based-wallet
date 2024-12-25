import React from 'react'

const Choose = ({setWallet,setCoin}) => {
  return (
    <main className="mt-32 max-w-3xl mx-auto">
    <h1 className="text-5xl font-bold mb-4">Web3 Wallet generator</h1>
    <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
      Choose a blockchain to get started.
    </p>
    <div className="flex gap-4">
      <button onClick={()=>{
        setWallet()
        setCoin(501,"solana")
        
      }} className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:bg-neutral-100 transition-colors">
        Solana
      </button>
      <button onClick={()=>{
        setWallet()
        setCoin(60,"ethereum")
        
      }}  className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:bg-neutral-100 transition-colors">
        Ethereum
      </button>
    </div>
  </main>
  )
}

export default Choose
