import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useAddress } from "@thirdweb-dev/react";

// Replace with your contract address and ABI
const contractAddress = "0xBd3B91D9bBf0231b317a9b21C963d4d43eEfb4e2"; // Your deployed contract address
const contractABI = [
    "function createUser(string calldata userId) external",
    "function updateFollowers(string calldata userId, uint256 newFollowers) external",
    "function updateFollowing(string calldata userId, uint256 newFollowing) external",
    "function updateReputationScore(string calldata userId, uint256 newScore) external",
    "function follow(string calldata followerId, string calldata followeeId) external",
    "function unfollow(string calldata followerId, string calldata followeeId) external",
    "function isFollowing(string calldata followerId, string calldata followeeId) external view returns (bool)",
    "function getRank(string calldata userId) external view returns (uint8)", // Adjust return type if using enum
    "function getUser(string calldata userId) external view returns (tuple(string id, uint256 creationDate, uint256 followers, uint256 following, uint256 reputationScore))"
];

// Initialize the SDK
const sdk = new ThirdwebSDK("ethereum"); // e.g., "ethereum", "polygon"

// Function to create a new user
export const createUser = async (userId: string) => {
    const address = useAddress();
    if (!address) {
        alert("Please connect your wallet");
        return;
    }

    const contract = sdk.getContract(contractAddress, contractABI);
    const tx = await contract.call("createUser", userId);
    await tx.wait();
    return tx;
};

// Function to update the number of followers
export const updateFollowers = async (userId: string, newFollowers: number) => {
    const contract = sdk.getContract(contractAddress, contractABI);
    const tx = await contract.call("updateFollowers", userId, newFollowers);
    await tx.wait();
    return tx;
};

// Function to update the number of following
export const updateFollowing = async (userId: string, newFollowing: number) => {
    const contract = sdk.getContract(contractAddress, contractABI);
    const tx = await contract.call("updateFollowing", userId, newFollowing);
    await tx.wait();
    return tx;
};

// Function to update reputation score
export const updateReputationScore = async (userId: string, newScore: number) => {
    const contract = sdk.getContract(contractAddress, contractABI);
    const tx = await contract.call("updateReputationScore", userId, newScore);
    await tx.wait();
    return tx;
};

// Function to follow another user
export const followUser = async (followerId: string, followeeId: string) => {
    const contract = sdk.getContract(contractAddress, contractABI);
    const tx = await contract.call("follow", followerId, followeeId);
    await tx.wait();
    return tx;
};

// Function to unfollow another user
export const unfollowUser = async (followerId: string, followeeId: string) => {
    const contract = sdk.getContract(contractAddress, contractABI);
    const tx = await contract.call("unfollow", followerId, followeeId);
    await tx.wait();
    return tx;
};

// Function to check if a user is following another user
export const isFollowing = async (followerId: string, followeeId: string) => {
    const contract = sdk.getContract(contractAddress, contractABI);
    const result = await contract.call("isFollowing", followerId, followeeId);
    return result;
};

// Function to get user details
export const getUserDetails = async (userId: string) => {
    const contract = sdk.getContract(contractAddress, contractABI);
    const user = await contract.call("getUser", userId);
    return user; // user is a tuple, unpack it as needed
};

// Function to get user's rank
export const getUserRank = async (userId: string) => {
    const contract = sdk.getContract(contractAddress, contractABI);
    const rank = await contract.call("getRank", userId);
    return rank; // Adjust based on your rank representation (e.g., enum value)
};
