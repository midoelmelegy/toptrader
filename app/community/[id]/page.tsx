import { DashboardComponent } from '../../../components/dashboard'
import { communities } from '../../../components/community'
import Wrapper from '../../wrapper'
import { notFound } from 'next/navigation'

interface CommunityPageProps {
  params: {
    id: string
  }
}

export default function CommunityPage({ params }: CommunityPageProps) {
  const community = communities.find((comm) => comm.id === params.id);

  if (!community) {
    // If no community is found, return a 404 page
    notFound()
  }

  return (
    <Wrapper>
      <DashboardComponent />
    </Wrapper>
  )
}
