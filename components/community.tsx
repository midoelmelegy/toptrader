'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Flame, Menu, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const communities = [
  { id: "1", name: "BTC Maximalists", description: "Bitcoin or nothing", members: 1500, level: 8, hotStreak: false, icon: "₿" },
  { id: "2", name: "Eth2.0 Stakers", description: "Proof of Stake enthusiasts", members: 1200, level: 7, hotStreak: true, icon: "Ξ" },
  { id: "3", name: "DeFi Degens", description: "High risk, high reward", members: 1000, level: 6, hotStreak: true, icon: "🦄" },
  { id: "4", name: "NFT Collectors", description: "Digital art aficionados", members: 1800, level: 9, hotStreak: false, icon: "🖼️" },
  { id: "5", name: "Altcoin Hunters", description: "Seeking the next 100x", members: 1300, level: 7, hotStreak: true, icon: "💎" },
  { id: "6", name: "Crypto TA Masters", description: "Charts and indicators", members: 900, level: 5, hotStreak: false, icon: "📊" },
  { id: "7", name: "Whale Watchers", description: "Following big money moves", members: 1100, level: 6, hotStreak: false, icon: "🐳" },
  { id: "8", name: "Metaverse Pioneers", description: "Building virtual worlds", members: 1400, level: 8, hotStreak: true, icon: "🌐" },
]

export function CommunityPageComponent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("communities")
  const router = useRouter()

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTab === "communities" || (activeTab === "hotstreak" && community.hotStreak))
  )

  const handleCommunityClick = (id: string) => {
    router.push(`/community/${id}`)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="container mx-auto p-8">
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search communities..."
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            {/* Use specific Tailwind utility classes to control the color */}
            <TabsTrigger
              value="communities"
              className={activeTab === 'communities' ? 'text-black' : 'text-gray-500'}
            >
              Communities
            </TabsTrigger>
            
            <TabsTrigger
              value="hotstreak"
              className={activeTab === 'hotstreak' ? 'text-black' : 'text-gray-500'}
            >
              Hot Streak <Flame className="ml-2 h-4 w-4 text-orange-500" />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCommunities.map((community) => (
            <div 
              key={community.id} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer shadow-md"
              onClick={() => handleCommunityClick(community.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 text-2xl">
                    <AvatarFallback>{community.icon}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{community.name}</h3>
                </div>
                {community.hotStreak && <Flame className="h-5 w-5 text-orange-500" />}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{community.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{community.members} members</span>
                <Badge variant="secondary" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  Lvl {community.level}
                </Badge>
              </div>
              <Progress value={community.level * 10} className="mb-4" />
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add join community logic here
                }}
              >
                Join Community
              </Button>
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-8 right-8">
        <Button size="lg" className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90">
          <Zap className="mr-2 h-5 w-5" /> Boost Your XP
        </Button>
      </div>
    </div>
  )
}
