'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CustomMetricsComponent() {
  return (
    <Card className="h-full rounded-apple shadow-apple bg-white dark:bg-apple-gray-800">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-apple-gray-900 dark:text-white">Custom Metrics</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300">Metric 1</span>
            <span className="text-sm font-bold text-apple-gray-900 dark:text-white">85%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300">Metric 2</span>
            <span className="text-sm font-bold text-apple-gray-900 dark:text-white">$1,234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300">Metric 3</span>
            <span className="text-sm font-bold text-apple-gray-900 dark:text-white">42</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}