import type { AppProps } from "next/app";
import {
    rainbowWallet,
    metamaskWallet,
    useConnect,
    useDisconnect,
    useAddress,
    useConnectionStatus,
} from "@thirdweb-dev/react";

const activeChain = "ethereum";

export function ConnectWalletButton() {
    const metamaskConfig = metamaskWallet();
    const connect = useConnect();
    const disconnect = useDisconnect();
    const address = useAddress();
    const connectionStatus = useConnectionStatus();

    if (connectionStatus === "connected") {
        return (
        <>
            <p> You are connected to {address}</p>
            <button onClick={disconnect}> Disconnect </button>
        </>
        );
    }
    if (connectionStatus === "disconnected") {
        return (
        <button
            onClick={async () => {
            const wallet = await connect(metamaskConfig);
            console.log("connected to ", wallet);
            }}
        >
            Connect to MetaMask
        </button>
        );
    }
}
