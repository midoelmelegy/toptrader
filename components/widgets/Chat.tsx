'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send } from 'lucide-react'

export function ChatComponent() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice', content: 'Hey, what do you think about the recent market trends?' },
    { id: 2, sender: 'You', content: 'I think we might see some volatility in the coming weeks.' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'You', content: newMessage }])
      setNewMessage('')
    }
  }

  return (
    <Card className="h-full flex flex-col rounded-apple shadow-apple">
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-end space-x-2 ${
                  message.sender === 'You' ? 'flex-row-reverse' : ''
                }`}
              >
                {message.sender !== 'You' && (
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={`/placeholder.svg?height=24&width=24&text=${message.sender[0]}`}
                    />
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-2xl p-3 max-w-[70%] ${
                    message.sender === 'You'
                      ? 'bg-apple-blue-light text-white'
                      : 'bg-apple-gray-200 text-apple-gray-900 dark:bg-apple-gray-700 dark:text-white'
                  }`}
                >
                  <p className="text-base">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <div className="p-4 border-t border-apple-gray-200 dark:border-apple-gray-700">
        <div className="flex space-x-2">
          <Input
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="rounded-full"
          />
          <Button
            onClick={handleSend}
            className="rounded-full bg-apple-blue-light hover:bg-apple-blue-dark text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}