'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function TradingVaultComponent() {
  const performance = 75
  const pnl = 1250.50
  const rank = "Gold"

  return (
    <Card className="h-full rounded-apple shadow-apple bg-white dark:bg-apple-gray-800">
      <CardContent className="h-full flex flex-col justify-center space-y-6 p-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300">Performance</span>
            <span className="text-sm font-medium text-apple-gray-900 dark:text-white">{performance}%</span>
          </div>
          <Progress value={performance} className="h-2 bg-apple-gray-200 dark:bg-apple-gray-600 rounded-full">
            <div className="h-full bg-apple-blue-light rounded-full" style={{ width: `${performance}%` }} />
          </Progress>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300">PnL</span>
          <span className={`text-lg font-bold ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {pnl >= 0 ? (
              <TrendingUp className="inline w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="inline w-4 h-4 mr-1" />
            )}
            ${Math.abs(pnl).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300">Rank</span>
          <Badge variant="outline" className="bg-apple-gray-100 text-apple-gray-800 dark:bg-apple-gray-700 dark:text-apple-gray-200 border-apple-gray-300 dark:border-apple-gray-600">{rank}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}