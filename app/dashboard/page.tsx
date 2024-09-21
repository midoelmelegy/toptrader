'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Wrapper from '../wrapper'
import { DashboardComponent } from '@/components/dashboard'
import { useAuth } from '@/lib/useAuth'

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <Wrapper>
      <DashboardComponent />
    </Wrapper>
  )
}
