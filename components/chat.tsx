'use client'

import React, { useState, useEffect, useRef } from 'react'
import { getDatabase, ref, push, onChildAdded, off } from 'firebase/database'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { app } from '../lib/firebase' // Adjust this import path as necessary
import CustomScrollArea from './ui/scroll-area' // Adjust this import path as necessary

// Accept chatId as a prop
interface ChatBoxProps {
  chatId: string;
}

export function ChatBox({ chatId }: ChatBoxProps) {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string; timestamp: number }>>([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    const db = getDatabase(app)
    // Use chatId in the database reference
    const messagesRef = ref(db, `chats/${chatId}/messages`)

    const handleNewMessage = (snapshot: any) => {
      const message = snapshot.val()
      setMessages((prevMessages) => [...prevMessages, message])
    }

    // Listen for new messages
    onChildAdded(messagesRef, handleNewMessage)

    // Clean up the listener on unmount
    return () => {
      unsubscribe()
      off(messagesRef, 'child_added', handleNewMessage)
    }
  }, [chatId]) // Make sure the effect runs when chatId changes

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && user) {
      const db = getDatabase(app)
      // Reference the correct chat room using chatId
      const messagesRef = ref(db, `chats/${chatId}/messages`)
      push(messagesRef, {
        text: newMessage,
        sender: user.displayName || user.email || 'Anonymous',
        timestamp: Date.now(),
      })
      setNewMessage('') // Clear the input field after sending the message
    }
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <div className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-center">Chat Room - {chatId}</h1>
      </div>
      <CustomScrollArea height="calc(100vh - 180px)" className="flex-grow">
        <div className="space-y-4 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === (user?.displayName || user?.email)
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                  message.sender === (user?.displayName || user?.email)
                    ? 'bg-blue-500 text-white'
                    : 'bg-white'
                }`}
              >
                <p className="font-semibold text-sm mb-1">
                  {message.sender === (user?.displayName || user?.email) ? 'You' : message.sender}
                </p>
                <p>{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CustomScrollArea>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
