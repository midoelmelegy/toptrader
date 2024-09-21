'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardComponent } from '../../../../components/dashboard'
import { useAuth } from '@/lib/useAuth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Wrapper } from '../../../wrapper'

interface DashboardPageProps {
  params: {
    id: string
  }
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkOwnership = async () => {
      if (loading) return
      if (!user) {
        router.push('/login')
        return
      }

      const communityRef = doc(db, 'communities', params.id)
      const communityDoc = await getDoc(communityRef)
      if (communityDoc.exists()) {
        const communityData = communityDoc.data()
        if (communityData.createdBy !== user.uid) {
          router.push(`/community/${params.id}`)
        }
      } else {
        router.push('/community')
      }
    }

    checkOwnership()
  }, [user, loading, params.id, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Wrapper>
      <DashboardComponent id={params.id} isOwner={true} />
    </Wrapper>
  )
}