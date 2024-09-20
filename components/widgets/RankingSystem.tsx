'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RankingSystemComponent() {
  const leaderboard = [
    { id: 1, name: 'Alice', avatar: 'A', score: 1000 },
    { id: 2, name: 'Bob', avatar: 'B', score: 950 },
    { id: 3, name: 'Charlie', avatar: 'C', score: 900 },
    { id: 4, name: 'David', avatar: 'D', score: 850 },
    { id: 5, name: 'Eve', avatar: 'E', score: 800 },
  ]

  return (
    <Card className="h-full rounded-apple shadow-apple bg-white dark:bg-apple-gray-800">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-apple-gray-900 dark:text-white">Ranking System</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {leaderboard.map((user, index) => (
            <div key={user.id} className="flex items-center space-x-4">
              <span className="text-lg font-bold text-apple-gray-900 dark:text-white">{index + 1}</span>
              <Avatar className="border-2 border-apple-gray-300 dark:border-apple-gray-600">
                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${user.avatar}`} />
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-apple-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-apple-gray-500 dark:text-apple-gray-400">Score: {user.score}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}