// MediaCarousel.tsx

import React, { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";

interface MediaItem {
  id: string;
  type: string;
  url: string;
  title: string;
  description: string;
}

interface MediaCarouselProps {
  id: string;
  data: any;
  setData: (data: any) => void;
}

export function MediaCarousel({ id, data, setData }: MediaCarouselProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load items from localStorage on component mount
  useEffect(() => {
    const storedItems = localStorage.getItem(`mediaItems-${id}`);
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else if (user) {
      // Load from Firestore if not in localStorage
      loadCarouselData();
    }
  }, [user]);

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(`mediaItems-${id}`, JSON.stringify(items));
  }, [items]);

  const loadCarouselData = async () => {
    if (!user) return;
    try {
      const docRef = doc(db, "userWidgets", user.uid, "widgets", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const widgetData = docSnap.data();
        setItems(widgetData.items || []);
        setData(widgetData);
      }
    } catch (error) {
      console.error("Error loading carousel data:", error);
    }
  };

  const saveCarouselData = async () => {
    if (!user) return;
    try {
      const widgetData = { items };
      const docRef = doc(db, "userWidgets", user.uid, "widgets", id);
      await setDoc(docRef, widgetData);
      setData(widgetData);
    } catch (error) {
      console.error("Error saving carousel data:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newItem: MediaItem = {
            id: Date.now().toString(),
            type: file.type.startsWith("image/") ? "image" : "video",
            url: e.target?.result as string,
            title: "",
            description: "",
          };
          setItems((prevItems) => [...prevItems, newItem]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <Card className="w-full max-w-4xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            Media Carousel
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            View and manage your media content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {items.map((item: MediaItem, index: number) => (
                <CarouselItem key={item.id}>
                  {item.type === "image" && (
                    <img
                      src={item.url}
                      alt={`Carousel Image ${index + 1}`}
                      className="object-cover w-full h-[200px] rounded-md"
                      style={{ aspectRatio: "1", objectFit: "cover" }}
                    />
                  )}
                  {item.type === "video" && (
                    <video
                      className="object-cover w-full h-[200px] rounded-md"
                      controls
                    >
                      <source src={item.url} type={item.type} />
                    </video>
                  )}
                  <div className="p-2 text-center">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {item.title || "Untitled"}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {item.description || "No description"}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {items.length >= 2 && (
              <>
                <CarouselPrevious className="no-drag text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700" />
                <CarouselNext className="no-drag text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700" />
              </>
            )}
          </Carousel>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 mt-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,video/*"
            multiple
            className="hidden"
          />
          <Button
            size="sm"
            onClick={() => {
              fileInputRef.current?.click();
            }}
            className="no-drag bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
          >
            Upload
          </Button>
          <Button
            size="sm"
            onClick={() => setIsEditing(true)}
            className="no-drag bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
          >
            Edit
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>Edit Media Carousel</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {items.map((item, index) => (
              <div key={item.id} className="flex flex-col space-y-2">
                <Input
                  value={item.title}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].title = e.target.value;
                    setItems(newItems);
                  }}
                  placeholder="Enter title"
                  className="no-drag bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
                <Textarea
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].description = e.target.value;
                    setItems(newItems);
                  }}
                  placeholder="Enter description"
                  className="no-drag bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                  className="no-drag bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              onClick={saveCarouselData}
              className="no-drag bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
