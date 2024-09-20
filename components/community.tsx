import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Community {
  id: string
  title: string
  description: string
  imageUrl: string
}

export const communities: Community[] = [
  {
    id: "1",
    title: "Tech Enthusiasts",
    description: "A community for discussing the latest in technology",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Tech"
  },
  {
    id: "2",
    title: "Data Visualizers",
    description: "Share and discuss innovative data visualization techniques",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Data"
  },
  {
    id: "3",
    title: "UI/UX Designers",
    description: "Collaborate on user interface and experience design",
    imageUrl: "/placeholder.svg?height=200&width=400&text=UI/UX"
  },
  {
    id: "4",
    title: "AI Researchers",
    description: "Explore the latest advancements in artificial intelligence",
    imageUrl: "/placeholder.svg?height=200&width=400&text=AI"
  },
  {
    id: "5",
    title: "Web Developers",
    description: "Share tips and tricks for modern web development",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Web+Dev"
  },
  {
    id: "6",
    title: "IoT Innovators",
    description: "Discuss Internet of Things projects and ideas",
    imageUrl: "/placeholder.svg?height=200&width=400&text=IoT"
  },
  {
    id: "7",
    title: "Cybersecurity Experts",
    description: "Stay updated on the latest in cybersecurity",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Security"
  },
  {
    id: "8",
    title: "Cloud Computing",
    description: "Explore cloud technologies and best practices",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Cloud"
  },
]

export function CommunityPageComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Community Dashboards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {communities.map((community) => (
          <Link href={`/community/${community.id}`} key={community.id}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={community.imageUrl}
                  alt={community.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">{community.title}</CardTitle>
                <p className="text-sm text-gray-600">{community.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
