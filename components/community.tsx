'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2 } from 'lucide-react'

interface Post {
  id: number
  title: string
  author: string
  content: string
  upvotes: number
  comments: number
}

const initialPosts: Post[] = [
  {
    id: 1,
    title: "Just found this amazing new web development tool!",
    author: "webdev_enthusiast",
    content: "Has anyone else tried out this new tool? It's revolutionizing the way I build websites!",
    upvotes: 152,
    comments: 23,
  },
  {
    id: 2,
    title: "Seeking advice on learning React",
    author: "react_newbie",
    content: "I'm new to React and feeling overwhelmed. Any tips on where to start or good resources?",
    upvotes: 78,
    comments: 45,
  },
  {
    id: 3,
    title: "Discussion: TypeScript vs JavaScript",
    author: "type_enthusiast",
    content: "Let's discuss the pros and cons of TypeScript compared to vanilla JavaScript. What are your thoughts?",
    upvotes: 203,
    comments: 87,
  },
]

export function CommunityComponent() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const handleVote = (id: number, increment: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, upvotes: post.upvotes + increment } : post
    ))
  }

  return (
      <div className="flex gap-6">
        <div className="flex-grow space-y-6">
          {posts.map(post => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <div className="text-sm text-gray-500">Posted by u/{post.author}</div>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleVote(post.id, 1)}>
                    <ArrowBigUp className="h-5 w-5" />
                  </Button>
                  <span>{post.upvotes}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleVote(post.id, -1)}>
                    <ArrowBigDown className="h-5 w-5" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  {post.comments} Comments
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="w-80">
          <Card>
            <CardHeader>
              <CardTitle>About Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Welcome to our web development community! Share your experiences, ask questions, and learn from others.</p>
              <div className="flex items-center space-x-2 mb-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=50&width=50" />
                  <AvatarFallback>WD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Created Jan 1, 2023</div>
                  <div className="text-sm text-gray-500">by u/webdev_mod</div>
                </div>
              </div>
              <div className="text-sm">
                <div>Members: 52,384</div>
                <div>Online: 1,245</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Join Community</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
  )
}