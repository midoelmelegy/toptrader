/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/oVXvI3zCIso
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function media-display() {
  const [items, setItems] = useState([
    {
      id: 1,
      type: "image",
      src: "/placeholder.svg",
      caption: "Stunning Sunset",
    },
    {
      id: 2,
      type: "video",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      caption: "Majestic Waterfall",
    },
    {
      id: 3,
      type: "image",
      src: "/placeholder.svg",
      caption: "Serene Landscape",
    },
    {
      id: 4,
      type: "video",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      caption: "Adventurous Hike",
    },
    {
      id: 5,
      type: "image",
      src: "/placeholder.svg",
      caption: "Vibrant Cityscape",
    },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }
  useEffect(() => {
    let interval
    if (autoPlay) {
      interval = setInterval(() => {
        handleNext()
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [autoPlay, handleNext])
  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="relative overflow-hidden rounded-lg">
        <div className="aspect-video">
          {items[currentIndex].type === "image" ? (
            <img
              src="/placeholder.svg"
              alt={items[currentIndex].caption}
              width={800}
              height={450}
              className="object-cover w-full h-full"
              style={{ aspectRatio: "800/450", objectFit: "cover" }}
            />
          ) : (
            <video src={items[currentIndex].src} controls className="w-full h-full" />
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <p className="text-lg font-medium text-white line-clamp-2">{items[currentIndex].caption}</p>
        </div>
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {items.map((_, index) => (
            <Button
              key={index}
              size="sm"
              variant={index === currentIndex ? "solid" : "ghost"}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-muted hover:bg-muted-foreground"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <div className="absolute inset-y-0 left-4 flex items-center">
          <Button size="icon" variant="ghost" className="text-white hover:bg-black/20" onClick={handlePrevious}>
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-4 flex items-center">
          <Button size="icon" variant="ghost" className="text-white hover:bg-black/20" onClick={handleNext}>
            <ChevronRightIcon className="w-6 h-6" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Auto-play {autoPlay ? "on" : "off"}</span>
        </div>
        <Switch
          checked={autoPlay}
          onCheckedChange={setAutoPlay}
          className="[&>span]:bg-primary [&>span]:border-primary"
        />
      </CardFooter>
    </Card>
  )
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
