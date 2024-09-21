import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/useAuth"

interface PollProps {
  id: string
  data: any
  setData: (data: any) => void
}

type Option = string

export function Poll({ id, data, setData }: PollProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [question, setQuestion] = useState(data?.question || "")
  const [options, setOptions] = useState(data?.options || [])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadPollData()
    }
  }, [user])

  const loadPollData = async () => {
    if (!user) return
    try {
      const docRef = doc(db, "userWidgets", user.uid, "widgets", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const widgetData = docSnap.data()
        setQuestion(widgetData.question || "")
        setOptions(widgetData.options || [])
        setData(widgetData)
      }
    } catch (error) {
      console.error("Error loading poll data:", error)
    }
  }

  const savePollData = async () => {
    if (!user) return
    try {
      const widgetData = { question, options }
      const docRef = doc(db, "userWidgets", user.uid, "widgets", id)
      await setDoc(docRef, widgetData)
      setData(widgetData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving poll data:", error)
    }
  }

  return (
    <div className="relative p-4 bg-background rounded-lg">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">{question}</h2>
            <p className="text-muted-foreground">Gather feedback from your community.</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoveHorizontalIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <CalendarIcon className="w-4 h-4 mr-2" />
                Schedule Poll
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LockIcon className="w-4 h-4 mr-2" />
                Privacy Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete Poll
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <Input placeholder="Poll Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Question Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="open-ended">Open-Ended</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Multiple Choice Options</Label>
              <div className="flex flex-col gap-2">
                {options.map((option: Option, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox id={`option${index}`} />
                    <Input id={`option${index}`} placeholder={`Option ${index + 1}`} value={option} onChange={(e) => {
                      const newOptions = [...options]
                      newOptions[index] = e.target.value
                      setOptions(newOptions)
                    }} />
                  </div>
                ))}
                <Button variant="ghost" size="icon" className="ml-auto">
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add Option</span>
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Open-Ended Prompt</Label>
              <Textarea placeholder="Enter your open-ended question" />
            </div>
            <div className="grid gap-2">
              <Label>Rating Scale</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">1</span>
                <Slider min={1} max={5} step={1} defaultValue={[3]} />
                <span className="text-sm">5</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Create Poll</Button>
        </CardFooter>
      </Card>
      <Button
        onClick={() => setIsEditing(true)}
        className="no-drag absolute bottom-2 right-2"
      >
        Edit
      </Button>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Poll</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Question"
            />
            {options.map((option: Option, index: number) => (
              <Input
                key={index}
                value={option}
                onChange={(e) => {
                  const newOptions = [...options]
                  newOptions[index] = e.target.value
                  setOptions(newOptions)
                }}
                placeholder={`Option ${index + 1}`}
              />
            ))}
          </div>
          <DialogFooter>
            <Button onClick={savePollData}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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


function LockIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}


function MoveHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
