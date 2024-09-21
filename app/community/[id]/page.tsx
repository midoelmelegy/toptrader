import { DashboardComponent } from '../../../components/dashboard'
import { communities } from '../../../components/community/communities'
import { ChatBox } from '../../../components/chat'
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
    <div>
      <DashboardComponent id={params.id} />
      <ChatBox chatId={params.id}/>
    </div>
  )
}
