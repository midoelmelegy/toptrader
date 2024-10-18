'use client'; // This enables Next.js to render this on the client side

import React from 'react';
import { ThirdwebProvider, ConnectWallet, useDisconnect, useAddress } from "@thirdweb-dev/react"; // Import necessary Thirdweb hooks

// Define the active blockchain network, Sepolia in this case
const activeChain = "sepolia";

const WalletConnection: React.FC = () => {
  const address = useAddress(); // Get the connected wallet address
  const disconnect = useDisconnect(); // Hook to disconnect the wallet

  return (
    <div>
      {/* If there's an address (wallet is connected), show the disconnect button */}
      {address ? (
        <button onClick={disconnect}>Disconnect Wallet</button>
      ) : (
        // Else show the Thirdweb-provided connect wallet button
        <ConnectWallet />
      )}
    </div>
  );
};

// Wrap the component with ThirdwebProvider to provide blockchain context
const WalletConnectionWrapper: React.FC = () => (
  <ThirdwebProvider activeChain={activeChain}>
    <WalletConnection />
  </ThirdwebProvider>
);

export default WalletConnectionWrapper;
