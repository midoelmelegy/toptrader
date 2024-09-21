'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, push, onChildAdded, off, set, onValue, get } from 'firebase/database';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../lib/firebase';
import ScrollArea from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface ChatBoxProps {
  chatId: string;
}

export function ChatBox({ chatId }: ChatBoxProps) {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string; timestamp: number }>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const createChatRoom = async (chatId: string) => {
    const db = getDatabase(app);
    const chatRef = ref(db, `chats/${chatId}`);

    const snapshot = await get(chatRef);
    if (!snapshot.exists()) {
      await set(chatRef, {
        messages: {}
      });
    }
  };

  useEffect(() => {
    const db = getDatabase(app);
    const chatRef = ref(db, `chats/${chatId}`);

    createChatRoom(chatId).catch((error) => {
      console.error('Error creating chat room:', error);
    });

    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const messagesRef = ref(db, `chats/${chatId}/messages`);

    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const loadedMessages: Array<{ text: string; sender: string; timestamp: number }> = Object.values(messagesData);
        setMessages(loadedMessages);
      }
    });

    const handleNewMessage = (snapshot: any) => {
      const message = snapshot.val();
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    onChildAdded(messagesRef, handleNewMessage);

    return () => {
      unsubscribe();
      off(messagesRef, 'child_added', handleNewMessage);
    };
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      const db = getDatabase(app);
      const messagesRef = ref(db, `chats/${chatId}/messages`);
      push(messagesRef, {
        text: newMessage,
        sender: user.displayName || user.email || 'Anonymous',
        timestamp: Date.now(),
      });
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700">
        <h2 className="text-lg font-semibold">Community Chat</h2>
      </div>
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === (user?.displayName || user?.email) ? 'justify-end' : 'justify-start'
            } mb-2`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl p-4 ${
                message.sender === (user?.displayName || user?.email)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
              }`}
            >
              <p className="font-semibold text-sm mb-1">
                {message.sender === (user?.displayName || user?.email) ? 'You' : message.sender}
              </p>
              <p className="break-words">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-gray-100 dark:bg-gray-700">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow rounded-full bg-white dark:bg-gray-800"
          />
          <Button type="submit" className="rounded-full">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}