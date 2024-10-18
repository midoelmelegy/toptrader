'use client';

import React, { useEffect, useState } from 'react';
import { ThirdwebProvider, ConnectWallet, useDisconnect, useAddress } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const activeChain = "sepolia"; 
const queryClient = new QueryClient(); // Initialize QueryClient for React Query

const WalletConnection: React.FC = () => {
  const address = useAddress(); // Get the connected wallet address
  const disconnect = useDisconnect(); // Hook to disconnect the wallet
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(!!address); // Update connection status based on wallet address
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

// Wrap with QueryClientProvider and ThirdwebProvider
const WalletConnectionWrapper: React.FC = () => (
  <QueryClientProvider client={queryClient}> {/* Add QueryClientProvider */}
    <ThirdwebProvider activeChain={activeChain} clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}>
      <WalletConnection />
    </ThirdwebProvider>
  </QueryClientProvider>
);

export default WalletConnectionWrapper;
