'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'You', content: newMessage }])
      setNewMessage('')
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getCardHeight = () => {
    const baseHeight = 120 // Height of input area and padding
    const messageHeight = 60 // Estimated height per message
    const totalHeight = baseHeight + messages.length * messageHeight
    return Math.min(Math.max(totalHeight, 200), 600) // Min 200px, Max 600px
  }

  return (
    <Card
      className={`flex flex-col rounded-lg shadow-md border border-gray-200 dark:border-gray-700`}
      style={{ height: `${getCardHeight()}px` }}
    >
      <CardContent className="flex-1 overflow-y-auto p-3 space-y-3 no-drag" onClick={(e) => e.stopPropagation()}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-end space-x-2 max-w-[70%] ${
                message.sender === 'You' ? 'flex-row-reverse space-x-reverse' : ''
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
                className={`rounded-lg p-2 ${
                  message.sender === 'You'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <Input
            placeholder="Message"
            value={newMessage}
            onChange={(e) => {
              e.stopPropagation();
              setNewMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.stopPropagation();
                handleSend();
              }
            }}
            className="rounded-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 no-drag"
            onClick={(e) => e.stopPropagation()}
          />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleSend();
            }}
            className="rounded-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 no-drag"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
