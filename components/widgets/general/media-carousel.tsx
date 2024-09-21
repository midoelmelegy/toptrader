import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react"
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

interface MediaItem {
  id: number
  type: string
  url: string
  title: string
  description: string
}

interface MediaCarouselProps {
  id: string
  data: any
  setData: (data: any) => void
}

export function MediaCarousel({ id, data, setData }: MediaCarouselProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [items, setItems] = useState<MediaItem[]>(data?.items || [])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadCarouselData()
    }
  }, [user])

  const loadCarouselData = async () => {
    if (!user) return
    try {
      const docRef = doc(db, "userWidgets", user.uid, "widgets", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const widgetData = docSnap.data()
        setItems(widgetData.items || [])
        setData(widgetData)
      }
    } catch (error) {
      console.error("Error loading carousel data:", error)
    }
  }

  const saveCarouselData = async () => {
    if (!user) return
    try {
      const widgetData = { items }
      const docRef = doc(db, "userWidgets", user.uid, "widgets", id)
      await setDoc(docRef, widgetData)
      setData(widgetData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving carousel data:", error)
    }
  }

  return (
    <div className="relative p-4 bg-background rounded-lg">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Media Carousel</CardTitle>
          <CardDescription>Upload and manage your media content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4 flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Upload Media</h3>
              <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-muted-foreground rounded-lg p-8">
                <UploadIcon className="w-8 h-8 text-muted-foreground" />
                <p className="text-muted-foreground">Drag and drop files or click to upload</p>
                <Button size="sm">Upload</Button>
              </div>
            </div>
            <div>
              <Carousel className="rounded-lg overflow-hidden">
                <CarouselContent>
                  {items.map((item: MediaItem, index: number) => (
                    <CarouselItem key={index}>
                      {item.type === "image" && (
                        <img
                          src={item.url}
                          alt={`Carousel Image ${index + 1}`}
                          width={800}
                          height={450}
                          className="object-cover w-full h-[300px] md:h-[400px]"
                          style={{ aspectRatio: "800/450", objectFit: "cover" }}
                        />
                      )}
                      {item.type === "video" && (
                        <video className="object-cover w-full h-[300px] md:h-[400px]" controls>
                          <source
                            src={item.url}
                            type="video/mp4"
                          />
                        </video>
                      )}
                      <div className="p-4 bg-background">
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious>
                  <Button size="icon" variant="ghost">
                    <ChevronLeftIcon className="w-6 h-6" />
                    <span className="sr-only">Previous</span>
                  </Button>
                </CarouselPrevious>
                <CarouselNext>
                  <Button size="icon" variant="ghost">
                    <ChevronRightIcon className="w-6 h-6" />
                    <span className="sr-only">Next</span>
                  </Button>
                </CarouselNext>
                <div className="mt-4 flex justify-center gap-2">
                  <div />
                  <div />
                  <div />
                </div>
              </Carousel>
            </div>
          </div>
        </CardContent>
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
            <DialogTitle>Edit Media Carousel</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={item.title}
                  onChange={(e) => {
                    const newItems = [...items]
                    newItems[index].title = e.target.value
                    setItems(newItems)
                  }}
                  placeholder="Title"
                />
                <Input
                  value={item.url}
                  onChange={(e) => {
                    const newItems = [...items]
                    newItems[index].url = e.target.value
                    setItems(newItems)
                  }}
                  placeholder="URL"
                />
                <Textarea
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...items]
                    newItems[index].description = e.target.value
                    setItems(newItems)
                  }}
                  placeholder="Description"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={saveCarouselData}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
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

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  // ... existing code ...
}
