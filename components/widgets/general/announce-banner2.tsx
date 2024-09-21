'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, X, ChevronRight, Bitcoin } from 'lucide-react'

interface AnnouncementBannerProps {
  headline: string
  message: string
  ctaText?: string
  ctaLink?: string
  scheduledStart?: Date
  scheduledEnd?: Date
}

export function AnnounceBanner2({
  headline,
  message,
  ctaText,
  ctaLink,
  scheduledStart = new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  scheduledEnd = new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const now = new Date()
    if (now >= scheduledStart && now <= scheduledEnd) {
      setIsVisible(true)
    }
  }, [scheduledStart, scheduledEnd])

  if (!isVisible) return null

  return (
    <Card className="w-full bg-background border-border shadow-lg">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-grow">
            <h2 className="text-lg md:text-xl font-bold flex items-center space-x-2 mb-2 text-primary">
              <Bitcoin className="h-5 w-5" />
              <span>{headline}</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4">{message}</p>
            {ctaText && ctaLink && (
              <Button
                variant="default"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              >
                <a href={ctaLink} className="flex items-center">
                  {ctaText}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted p-2 text-xs text-muted-foreground flex justify-end">
        <span>Valid until: {scheduledEnd.toLocaleDateString()}</span>
      </CardFooter>
    </Card>
  )
}