import { ethers } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useAddress } from "@thirdweb-dev/react";

// Replace with your contract address and ABI
const contractAddress = "0x131C06c4DB271aEDc58463DD8c1eDE234397DdB6"; // Your deployed contract address
const contractABI = [
    "function subscribe(uint256 _months) external payable",
    "function isSubscribed(address _account) external view returns (bool)",
    "function getSubscriptionEndTime(address _account) external view returns (uint256)",
    "function withdraw() external",
];

// Initialize the SDK
const sdk = new ThirdwebSDK("ethereum"); // e.g., "ethereum", "polygon"

// Function to subscribe
export const subscribe = async (months: number, value: string) => {
    const address = useAddress(); // Get the connected wallet address
    if (!address) {
        alert("Please connect your wallet");
        return;
    }

    const contract = await sdk.getContract(contractAddress, contractABI);

    const tx = await contract.call("subscribe", [months], {
        value: ethers.utils.parseEther(value), // Convert value to wei
    });
    await tx.wait();
    return tx;
};

// Function to check subscription status
export const checkSubscription = async (account: string) => {
    const contract = await sdk.getContract(contractAddress, contractABI);
    const isSubscribed = await contract.call("isSubscribed", [account]);
    return isSubscribed;
};

// Function to get subscription end time
export const getSubscriptionEndTime = async (account: string) => {
    const contract = await sdk.getContract(contractAddress, contractABI);
    const endTime = await contract.call("getSubscriptionEndTime", [account]);
    return endTime;
};

// Function to withdraw funds (owner only)
export const withdrawFunds = async () => {
    const contract = await sdk.getContract(contractAddress, contractABI);

    const tx = await contract.call("withdraw");
    await tx.wait();
    return tx;
};
