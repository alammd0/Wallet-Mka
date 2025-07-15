# Wallet Mka: My First Web3 Project

This project, "Wallet Mka," is my first venture into the world of Web3 development. It's a cryptocurrency wallet generator built to learn and experiment with blockchain technologies, specifically Solana and Ethereum.

The application allows for the generation of new wallets, including a secret mnemonic phrase and the corresponding public and private keys, all handled securely on the client-side.

## Key Learnings & Technologies Used

This project was an opportunity to learn and implement the following:

*   **React & TypeScript:** For building a modern, type-safe user interface.
*   **Vite:** As a fast and efficient build tool.
*   **@solana/web3.js & ethers:** For interacting with the Solana and Ethereum blockchains.
*   **bip39 & ed25519-hd-key:** Understanding and implementing mnemonic phrase generation and hierarchical deterministic wallets.
*   **Client-Side Security:** Ensuring that sensitive data like private keys and mnemonic phrases are never sent to a server and are handled only within the user's browser.

## Features

- **Multi-Chain Support:** Generate wallets for both Solana and Ethereum.
- **Secure Client-Side Generation:** All keys are generated and managed locally in your browser. Nothing is ever transmitted over the network.
- **User-Friendly Interface:** A clean and intuitive interface for generating wallets.
- **Dark Mode:** A sleek dark mode for comfortable viewing.

## Getting Started

To run the project locally:

1.  **Install the dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

3.  Open your browser and navigate to the local address provided by Vite (usually `http://localhost:5173`) to use the application.

## How to Use

1.  **Select a blockchain:** Choose between Solana and Ethereum on the main screen.
2.  **Generate a wallet:** Click the "Create Wallet" button.
3.  **Save your secret phrase:** Your 12-word secret phrase will be displayed. **It is crucial to save this phrase in a secure offline location.** This phrase is the only way to recover your wallet.
4.  **View your keys:** Your public and private keys will be displayed for the newly created wallet.