import { DashboardComponent } from '../../../components/dashboard'
import { communities } from '../../../components/community/communities'
import { ChatBox } from '../../../components/chat'
import { notFound } from 'next/navigation'
import { ProfileComponent } from '@/components/profile'
import { Wrapper } from '../../wrapper'

interface ProfilePagePropes {
  params: {
    id: string
  }
}

export default function ProfilePage({ params }: ProfilePagePropes) {
  // const community = communities.find((comm) => comm.id === params.id);

  // if (!community) {
  //   // If no community is found, return a 404 page
  //   notFound()
  // }

  return (
    <Wrapper>
      <ProfileComponent />
    </Wrapper>
  )
}
