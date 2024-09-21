"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/useAuth"

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  id: string
  data: any
  setData: (data: any) => void
}

export function Countdown({ id, data, setData }: CountdownProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [eventName, setEventName] = useState(data?.eventName || "Countdown Event")
  const [eventDate, setEventDate] = useState(data?.eventDate || new Date().toISOString().split("T")[0])
  const { user } = useAuth()
  const [timeLeft, setTimeLeft] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (user) {
      loadCountdownData()
    }
  }, [user])

  const loadCountdownData = async () => {
    if (!user) return
    try {
      const docRef = doc(db, "userWidgets", user.uid, "widgets", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const widgetData = docSnap.data()
        setEventName(widgetData.eventName || "Countdown Event")
        setEventDate(widgetData.eventDate || new Date().toISOString().split("T")[0])
        setData(widgetData)
      }
    } catch (error) {
      console.error("Error loading countdown data:", error)
    }
  }

  const saveCountdownData = async () => {
    if (!user) return
    try {
      const widgetData = { eventName, eventDate }
      const docRef = doc(db, "userWidgets", user.uid, "widgets", id)
      await setDoc(docRef, widgetData)
      setData(widgetData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving countdown data:", error)
    }
  }

  useEffect(() => {
    const eventEndTime = new Date(`${eventDate}T23:59:59`).getTime()
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventEndTime - now
      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft(null as unknown as CountdownState);
        return
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)
    return () => clearInterval(interval)
  }, [eventDate])

  return (
    <div className="relative p-4 bg-background rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
            <ClockIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-bold text-center">{eventName}</h2>
        </div>
        <Button
          onClick={() => setIsEditing(true)}
          className="no-drag absolute bottom-2 right-2"
        >
          Edit
        </Button>
      </div>
      {timeLeft ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold">
            <span>{timeLeft.days}</span>d <span>{timeLeft.hours}</span>h <span>{timeLeft.minutes}</span>m{" "}
            <span>{timeLeft.seconds}</span>s
          </div>
          <Progress
            value={
              (timeLeft.days * 24 * 60 * 60 + timeLeft.hours * 60 * 60 + timeLeft.minutes * 60 + timeLeft.seconds) /
              (31 * 24 * 60 * 60)
            }
          />
          <Link href="#" className="text-primary hover:underline" prefetch={false}>
            View Event Details
          </Link>
        </div>
      ) : (
        <div className="text-center text-muted-foreground">Event has ended.</div>
      )}

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Countdown</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event Name"
            />
            <Input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              placeholder="Event Date"
            />
          </div>
          <DialogFooter>
            <Button onClick={saveCountdownData}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

function EditIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}
