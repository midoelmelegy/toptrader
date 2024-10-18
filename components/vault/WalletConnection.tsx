'use client';

import React, { useEffect, useState } from 'react';
import { createThirdwebClient } from '@thirdweb-dev/sdk';
import { ConnectButton } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";

// Define QueryClient for React Query
const queryClient = new QueryClient(); 

// Create the Thirdweb client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID, // Use environment variable for client ID
});

// Define wallet options
const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "telegram",
        "farcaster",
        "email",
        "x",
        "passkey",
        "phone",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),
  createWallet("com.bitget.web3"),
  createWallet("com.binance"),
  createWallet("org.uniswap"),
  createWallet("com.bybit"),
  createWallet("com.ledger"),
  createWallet("global.safe"),
  createWallet("im.token"),
  createWallet("com.crypto"),
];

const WalletConnection: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  // You can use Thirdweb's ConnectButton directly
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectModal={{ size: "compact" }} // Use compact modal
    />
  );
};

// Wrap with QueryClientProvider and ThirdwebProvider
const WalletConnectionWrapper: React.FC = () => (
  <QueryClientProvider client={queryClient}> 
    <WalletConnection />
  </QueryClientProvider>
);

export default WalletConnectionWrapper;
