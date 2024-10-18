'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Flame, Menu, Zap } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { communities } from './community/communities'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/lib/useAuth'
import { Button } from '@/components/ui/button'
import { Twitter, Instagram, Linkedin, Github, Calendar, Users, UserPlus, Award, BarChart2, Crown } from 'lucide-react'

export function ProfileComponent() {
  const { user } = useAuth()
  const userName = user?.displayName || 'User'
  const userBio = user?.bio || 'Crypto enthusiast, SocialFi pioneer, and community builder.'

  // Mock data (replace with real data in production)
  const level = 5
  const experience = 75
  const joinedDate = '2023-01-15'
  const followers = 1234
  const following = 567
  const reputationScore = 89
  const rank = 'Gold'

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center justify-center py-8 border-b rounded-3xl">
        <Avatar className="w-32 h-32 mb-4 rounded-full">
          <AvatarImage src="/placeholder-user.jpg" alt={`@${userName}`} className="rounded-full" />
          <AvatarFallback className="rounded-full">{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mb-2">{userName}</h1>
        <Button className="mb-4 rounded-full">Follow</Button>
        <div className="flex space-x-4 mb-4">
          {[Twitter, Instagram, Linkedin, Github].map((Icon, index) => (
            <div key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          {userBio}
        </p>
        <div className="w-full max-w-md">
          <div className="flex justify-between mb-2">
            <span>Level {level}</span>
            <span>{experience}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${experience}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {[
          { title: 'Joined', value: joinedDate, icon: Calendar },
          { title: 'Followers', value: followers, icon: Users },
          { title: 'Following', value: following, icon: UserPlus },
          { title: 'Reputation', value: reputationScore, icon: Award },
          { title: 'Level', value: level, icon: BarChart2 },
          { title: 'Rank', value: rank, icon: Crown },
        ].map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg transition-all hover:shadow-xl hover:scale-105 p-4 flex items-center border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-4">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">{item.title}</h3>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Activity Timeline</h2>
        <div className="space-y-4 relative before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
          {[
            { action: 'Edited trading widget', type: 'win', date: '2023-06-01', time: '14:30' },
            { action: 'Followed user @cryptoking', type: 'normal', date: '2023-05-28', time: '09:15' },
            { action: 'Made a trade', type: 'loss', date: '2023-05-25', time: '11:45' },
            { action: 'Updated dashboard layout', type: 'normal', date: '2023-05-20', time: '16:20' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start ml-6 relative">
              <div className={`absolute -left-[21px] w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 ${
                activity.type === 'win' ? 'bg-green-500' :
                activity.type === 'loss' ? 'bg-red-500' : 'bg-gray-500'
              }`}></div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-md p-4 w-full border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white">{activity.action}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.date} at {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mock data for profiles
const profiles = [
  { id: "1", name: "Mo", level: 5, experience: 75, followers: 1234, following: 567, reputationScore: 89, rank: 'Gold', joinedDate: '2023-01-15' },
  { id: "2", name: "Bob", level: 6, experience: 85, followers: 2345, following: 678, reputationScore: 78, rank: 'Silver', joinedDate: '2023-02-12' },
  { id: "3", name: "Charlie", level: 4, experience: 65, followers: 3456, following: 789, reputationScore: 92, rank: 'Platinum', joinedDate: '2023-03-10' },
  { id: "4", name: "David", level: 7, experience: 95, followers: 4567, following: 890, reputationScore: 85, rank: 'Gold', joinedDate: '2023-04-05' },
  // Add more profiles if necessary
]

export function ProfileSearchComponent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("followers") // Default sorting by followers
  const router = useRouter()

  // Filter and sort profiles based on the selected filter and search term
  const filteredProfiles = profiles
    .filter(profile => profile.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
    .sort((a, b) => {
      switch (activeTab) {
        case 'experience':
          return b.experience - a.experience
        case 'reputationScore':
          return b.reputationScore - a.reputationScore
        case 'followers':
        default:
          return b.followers - a.followers
      }
    })

  const handleProfileClick = (id: string) => {
    router.push(`/profile/${id}`)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="container mx-auto p-8">
        <div className="mb-6">
          {/* Search input */}
          <Input
            type="search"
            placeholder="Search profiles..."
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs for sorting */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            {/* Filter by Followers */}
            <TabsTrigger
              value="followers"
              className={activeTab === 'followers' ? 'text-black' : 'text-gray-500'}
            >
              Followers
            </TabsTrigger>

            {/* Filter by Experience */}
            <TabsTrigger
              value="experience"
              className={activeTab === 'experience' ? 'text-black' : 'text-gray-500'}
            >
              Experience
            </TabsTrigger>

            {/* Filter by Reputation Score */}
            <TabsTrigger
              value="reputationScore"
              className={activeTab === 'reputationScore' ? 'text-black' : 'text-gray-500'}
            >
              Reputation Score
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Display profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProfiles.map((profile) => (
            <div 
              key={profile.id} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer shadow-md"
              onClick={() => handleProfileClick(profile.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 text-2xl">
                    <AvatarFallback>{profile.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Rank: {profile.rank}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{profile.followers} followers</span>
                <Badge variant="secondary" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  Lvl {profile.level}
                </Badge>
              </div>
              <Progress value={profile.experience} className="mb-4" />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
