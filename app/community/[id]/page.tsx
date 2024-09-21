'use client'

import React, { useEffect, useState } from 'react'
import { DashboardComponent } from '../../../components/dashboard'
import { ChatBox } from '../../../components/chat'
import { notFound, useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/lib/useAuth'
import { Button } from '@/components/ui/button'
import { Pencil, MessageSquare, X } from 'lucide-react'
import { Wrapper } from '../../wrapper'

interface CommunityPageProps {
  params: {
    id: string
  }
}

export default function CommunityPage({ params }: CommunityPageProps) {
  const [community, setCommunity] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useAuth()
  const router = useRouter()
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const communityRef = doc(db, 'communities', params.id)
        const communityDoc = await getDoc(communityRef)
        if (communityDoc.exists()) {
          setCommunity(communityDoc.data())
        } else {
          notFound()
        }
      } catch (error) {
        console.error('Error fetching community:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    fetchCommunity()
  }, [params.id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!community) {
    notFound()
  }

  const isOwner = user ? community.createdBy === user.uid : false

  return (
    <Wrapper>
      {isOwner && (
        <div className="flex justify-end m-4">
          <Button onClick={() => router.push(`/community/${params.id}/dashboard`)} className="flex items-center">
            <Pencil className="h-4 w-4 mr-2" /> Edit Dashboard
          </Button>
        </div>
      )}
      <div className="relative">
        {/* Community Info */}
        <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="h-20 w-20 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full text-4xl mr-6">
              {community.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">{community.description}</p>
            </div>
          </div>
        </div>
        <DashboardComponent id={params.id} isOwner={false} />
        {/* Collapsible Chat Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`flex items-center justify-center rounded-full h-14 w-14 text-white shadow-lg focus:outline-none transition-colors duration-300 ${
              isChatOpen ? 'bg-gray-600 hover:bg-gray-500' : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            {isChatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </Button>
        </div>
        {/* Collapsible Chat Box */}
        <div
          className={`fixed bottom-24 right-6 z-40 h-[calc(80vh-5rem)] w-full sm:w-[400px] bg-white dark:bg-gray-800 shadow-lg rounded-2xl transform transition-all duration-300 ease-in-out ${
            isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
          }`}
          style={{ overflow: 'hidden' }}
        >
          <div className="flex flex-col h-full rounded-2xl overflow-hidden">
            <ChatBox chatId={params.id} />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
