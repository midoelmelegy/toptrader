import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/useAuth"

interface AnnounceBannerProps {
  id: string
  data: any
  setData: (data: any) => void
}

export function AnnounceBanner({ id, data, setData }: AnnounceBannerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [headline, setHeadline] = useState(data?.headline || "Default Headline")
  const [message, setMessage] = useState(data?.message || "Default Message")
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadBannerData()
    }
  }, [user])

  const loadBannerData = async () => {
    if (!user) return
    try {
      const docRef = doc(db, "userWidgets", user.uid, "widgets", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const widgetData = docSnap.data()
        setHeadline(widgetData.headline || "Default Headline")
        setMessage(widgetData.message || "Default Message")
        setData(widgetData)
      }
    } catch (error) {
      console.error("Error loading banner data:", error)
    }
  }

  const saveBannerData = async () => {
    if (!user) return
    try {
      const widgetData = { headline, message }
      const docRef = doc(db, "userWidgets", user.uid, "widgets", id)
      await setDoc(docRef, widgetData)
      setData(widgetData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving banner data:", error)
    }
  }

  return (
    <div className="relative p-4 bg-background rounded-lg">
      <h2 className="text-xl font-bold">{headline}</h2>
      <p className="mt-2">{message}</p>
      <Button
        onClick={() => setIsEditing(true)}
        className="no-drag absolute bottom-2 right-2"
      >
        Edit
      </Button>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Announcement Banner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Headline"
            />
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
            />
          </div>
          <DialogFooter>
            <Button onClick={saveBannerData}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
