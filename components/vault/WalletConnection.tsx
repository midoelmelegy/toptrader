'use client';

import React, { useState, useEffect } from 'react';
import { ThirdwebProvider, ConnectWallet, useDisconnect, useAddress } from "@thirdweb-dev/react";

// Define the active blockchain network
const activeChain = "sepolia";

const WalletConnection: React.FC = () => {
  const address = useAddress(); // Get the connected wallet address
  const disconnect = useDisconnect(); // Hook to disconnect the wallet
  const [isConnected, setIsConnected] = useState(false); // State to track connection status

  // Update the state based on the presence of the wallet address
  useEffect(() => {
    setIsConnected(!!address); // If there's an address, set to true, otherwise false
  }, [address]);

  return (
    <div>
      {isConnected ? (
        <button onClick={disconnect}>Disconnect Wallet</button>
      ) : (
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
