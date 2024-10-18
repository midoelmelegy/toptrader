import { ethers } from "ethers";
import { createThirdwebClient, getContract, defineChain } from "@thirdweb-dev/sdk";
import { useAddress } from "@thirdweb-dev/react";

// Replace with your actual Sepolia contract address and ABI
const contractAddress = "0x4De63ee0E056b48A976B6c1bc295C376d549163A";
const contractABI = [
    "function subscribe(uint256 _months) external payable",
    "function isSubscribed(address _account) external view returns (bool)",
    "function getSubscriptionEndTime(address _account) external view returns (uint256)",
    "function withdraw() external",
];

// Define Sepolia chain ID
const sepoliaChain = defineChain(11155111);

// Initialize the Thirdweb client
const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID, // Use the client ID from environment variables
});

// Function to subscribe
export const subscribe = async (months: number, value: string) => {
    const address = useAddress(); // Get the connected wallet address
    if (!address) {
        alert("Please connect your wallet");
        return;
    }

    // Connect to the contract
    const contract = await getContract({
        client,
        chain: sepoliaChain,
        address: contractAddress,
        abi: contractABI, // Pass the contract ABI
    });

    // Call the subscribe function on the contract
    const tx = await contract.call("subscribe", [months], {
        value: ethers.utils.parseEther(value), // Convert value to wei
    });
    await tx.wait(); // Wait for the transaction to be confirmed
    return tx;
};

// Function to check subscription status
export const checkSubscription = async (account: string) => {
    const contract = await getContract({
        client,
        chain: sepoliaChain,
        address: contractAddress,
        abi: contractABI,
    });
    const isSubscribed = await contract.call("isSubscribed", [account]);
    return isSubscribed;
};

// Function to get subscription end time
export const getSubscriptionEndTime = async (account: string) => {
    const contract = await getContract({
        client,
        chain: sepoliaChain,
        address: contractAddress,
        abi: contractABI,
    });
    const endTime = await contract.call("getSubscriptionEndTime", [account]);
    return endTime;
};

// Function to withdraw funds (owner only)
export const withdrawFunds = async () => {
    const contract = await getContract({
        client,
        chain: sepoliaChain,
        address: contractAddress,
        abi: contractABI,
    });

    const tx = await contract.call("withdraw");
    await tx.wait(); // Wait for transaction confirmation
    return tx;
};
