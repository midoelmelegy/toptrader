'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { X, Sun, Moon, Bell, Settings, LogOut, Menu, Zap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/useAuth';
import { logoutUser } from '@/lib/firebaseAuth';
import { useRouter } from 'next/navigation';
import { BoostXPButton } from '../components/subscriptionModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createThirdwebClient } from "@thirdweb-dev/sdk"; // Updated import
import { ConnectButton } from "@thirdweb-dev/react"; // Use ConnectButton
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets"; // Added wallet options

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

// Define the available pages
const pages: Record<string, string> = {
  "community": "Community",
  "settings": "Settings",
  "profile": "Profile",
};

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { user, loading } = useAuth();
  const router = useRouter();

  // Toggle between light and dark theme
  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.toggle('dark');
    const newTheme = root.classList.contains('dark') ? 'dark' : 'light';
    setTheme(newTheme);
  }, []);

  // Render the page dropdown menu items
  const dropdownOptions = Object.keys(pages).map((pageKey) => {
    const pageName = pages[pageKey];
    const isActive = pathname?.startsWith(`/${pageKey}`);
    const variant = isActive ? 'default' : 'ghost';

    return (
      <DropdownMenuItem key={pageKey} asChild>
        <Link href={`/${pageKey}`}>
          <Button variant={variant} className="w-full justify-start">
            {pageName}
          </Button>
        </Link>
      </DropdownMenuItem>
    );
  });

  const userName = user?.displayName || user?.email || 'User';
  const userEmail = user?.email || '';
  const userProfilePicture = user?.photoURL || '';

  // Handle logout logic
  const handleLogout = async () => {
    const { error } = await logoutUser();
    if (!error) {
      router.push('/login');
    } else {
      console.error('Logout failed:', error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}
      <div className="flex flex-col h-screen">
        <header className="w-full p-4 bg-white dark:bg-apple-gray-800 shadow-apple">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 apple-card bg-white bg-opacity-90" align="start">
                  {dropdownOptions}
                </DropdownMenuContent>
              </DropdownMenu>
              <h1 className="text-2xl font-semibold text-apple-gray-900 dark:text-white">
                {pages[String(Object.keys(pages).find((pageKey) => pathname?.includes(pageKey)))]}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ConnectButton client={client} wallets={wallets} connectModal={{ size: "compact" }} /> {/* Updated ConnectButton */}
              <Button onClick={toggleTheme} className="apple-button rounded-full">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Bell className="h-6 w-6 text-apple-gray-500 cursor-pointer hover:text-apple-gray-700 apple-transition" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage alt="Profile picture" src={userProfilePicture || "/placeholder-avatar.jpg"} />
                      <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 apple-card bg-white bg-opacity-90" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <BoostXPButton />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </QueryClientProvider>
  );
}
