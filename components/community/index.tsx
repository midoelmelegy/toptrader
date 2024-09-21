'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from "@/components/ui/button"
import { Flame, Zap, PlusCircle } from 'lucide-react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from '@/lib/useAuth'
import { db } from '@/lib/firebase'
import { collection, addDoc, onSnapshot } from 'firebase/firestore'

interface Community {
  id: string
  name: string
  description: string
  members: number
  level: number
  hotStreak: boolean
  icon: string
  createdBy: string
}

export function CommunityPageComponent() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("communities")
  const [communityList, setCommunityList] = useState<Community[]>([])
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [newCommunityName, setNewCommunityName] = useState<string>('')
  const [newCommunityDescription, setNewCommunityDescription] = useState<string>('')
  const [newCommunityIcon, setNewCommunityIcon] = useState<string>('')
  const [creatingCommunity, setCreatingCommunity] = useState<boolean>(false)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    // Fetch communities from Firestore in real-time
    const communitiesRef = collection(db, 'communities')
    const unsubscribe = onSnapshot(communitiesRef, (snapshot) => {
      const communitiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Community, 'id'>),
      }))
      setCommunityList(communitiesData)
    })

    return () => unsubscribe() // Clean up listener on unmount
  }, [])

  const filteredCommunities = communityList.filter((community: Community) => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase())
    if (activeTab === "communities") {
      return matchesSearch
    } else if (activeTab === "hotstreak") {
      return matchesSearch && community.hotStreak
    } else if (activeTab === "myCommunities") {
      return matchesSearch && community.createdBy === user?.uid
    }
    return false
  })

  const handleCommunityClick = (id: string) => {
    router.push(`/community/${id}`)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleCreateCommunity = async () => {
    if (!user) {
      alert('You need to log in first')
      return
    }
    setCreatingCommunity(true)
    try {
      const communitiesRef = collection(db, 'communities')
      const newCommunity = {
        name: newCommunityName,
        description: newCommunityDescription,
        icon: newCommunityIcon || '🏷️',
        members: 1,
        level: 1,
        hotStreak: false,
        createdBy: user.uid,
        createdAt: new Date(),
      }
      const docRef = await addDoc(communitiesRef, newCommunity)
      setDialogOpen(false)
      // Navigate to the new community's dashboard
      router.push(`/community/${docRef.id}`)
    } catch (error) {
      console.error('Error creating community:', error)
      alert('Failed to create community. Please try again.')
    } finally {
      setCreatingCommunity(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="container mx-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <Input
            type="search"
            placeholder="Search communities..."
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center">
                <PlusCircle className="mr-2 h-5 w-5" />Create Community
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Community</DialogTitle>
                <DialogDescription>
                  Enter the details for your new community.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="community-name">Community Name</Label>
                  <Input
                    id="community-name"
                    value={newCommunityName}
                    onChange={(e) => setNewCommunityName(e.target.value)}
                    placeholder="Enter community name"
                  />
                </div>
                <div>
                  <Label htmlFor="community-description">Description</Label>
                  <Textarea
                    id="community-description"
                    value={newCommunityDescription}
                    onChange={(e) => setNewCommunityDescription(e.target.value)}
                    placeholder="Enter community description"
                  />
                </div>
                <div>
                  <Label htmlFor="community-icon">Icon</Label>
                  <Input
                    id="community-icon"
                    value={newCommunityIcon}
                    onChange={(e) => setNewCommunityIcon(e.target.value)}
                    placeholder="Enter an emoji or icon"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateCommunity} disabled={creatingCommunity}>
                  {creatingCommunity ? 'Creating...' : 'Create Community'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="communities"
              className={activeTab === 'communities' ? 'text-black' : 'text-gray-500'}
            >
              Discover
            </TabsTrigger>
            <TabsTrigger
              value="hotstreak"
              className={activeTab === 'hotstreak' ? 'text-black' : 'text-gray-500'}
            >
              Trending
            </TabsTrigger>
            <TabsTrigger
              value="myCommunities"
              className={activeTab === 'myCommunities' ? 'text-black' : 'text-gray-500'}
            >
              My Communities
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCommunities.map((community: Community) => (
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
    </div>
  )
}
