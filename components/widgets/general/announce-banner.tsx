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
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/useAuth"
import { Megaphone, Edit } from "lucide-react"

interface AnnounceBannerProps {
  id: string
}

export function AnnounceBanner({ id }: AnnounceBannerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [headline, setHeadline] = useState("")
  const [message, setMessage] = useState("")
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
        setHeadline(widgetData.headline || "")
        setMessage(widgetData.message || "")
      }
    } catch (error) {
      console.error("Error loading banner data:", error)
    }
  }

  const saveBannerData = () => {
    setIsEditing(false)
  }

  return (
    <div className="relative p-6 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Megaphone className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {headline || "Your Headline Here"}
        </h2>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-400 text-lg">
        {message || "Your message here."}
      </p>
      <Button
        onClick={() => setIsEditing(true)}
        className="no-drag absolute bottom-4 right-4 bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
        size="sm"
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </Button>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Announcement Banner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="headline" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Headline
              </label>
              <Input
                id="headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Enter headline"
                className="border-gray-300 dark:border-gray-700 focus:ring-gray-500 dark:focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
                className="border-gray-300 dark:border-gray-700 focus:ring-gray-500 dark:focus:ring-gray-400"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveBannerData} className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}