interface Community {
    id: string
    name: string
    description: string
    members: number
    level: number
    hotStreak: boolean
    icon: string
}

export const communities: Community[] = [
    { id: "1", name: "BTC Maximalists", description: "Bitcoin or nothing", members: 1500, level: 8, hotStreak: false, icon: "₿" },
    { id: "2", name: "Eth2.0 Stakers", description: "Proof of Stake enthusiasts", members: 1200, level: 7, hotStreak: true, icon: "Ξ" },
    { id: "3", name: "DeFi Degens", description: "High risk, high reward", members: 1000, level: 6, hotStreak: true, icon: "🦄" },
    { id: "4", name: "NFT Collectors", description: "Digital art aficionados", members: 1800, level: 9, hotStreak: false, icon: "🖼️" },
    { id: "5", name: "Altcoin Hunters", description: "Seeking the next 100x", members: 1300, level: 7, hotStreak: true, icon: "💎" },
    { id: "6", name: "Crypto TA Masters", description: "Charts and indicators", members: 900, level: 5, hotStreak: false, icon: "📊" },
    { id: "7", name: "Whale Watchers", description: "Following big money moves", members: 1100, level: 6, hotStreak: false, icon: "🐳" },
    { id: "8", name: "Metaverse Pioneers", description: "Building virtual worlds", members: 1400, level: 8, hotStreak: true, icon: "🌐" },
]
