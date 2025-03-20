## LiveUrl  https://web-based-wallet-zfj3.onrender.com


# Multi-Chain Web Wallet

## Overview
A minimal web-based cryptocurrency wallet supporting Ethereum and Solana. It leverages `ethers` for Ethereum transactions and `@solana/web3.js` for Solana transactions. Key management is handled using `bip39` for mnemonic generation, `ed25519-hd-key` for Solana key derivation, and `tweetnacl` for cryptographic signing. `bs58` is used for Base58 encoding of Solana keys. The backend is powered by `express`, with `cors` ensuring secure API access and `dotenv` managing environment variables. This lightweight stack provides a secure and user-friendly experience for generating and restoring wallets, sending transactions, and interacting seamlessly with both blockchain networks.
