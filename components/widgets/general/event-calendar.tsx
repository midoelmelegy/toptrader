"use client"

import { useState, useMemo } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

export function EventCalendar() {
  const events = [
    {
      id: 1,
      title: "Crypto Meetup",
      date: "2024-09-15",
      time: "7:00 PM - 9:00 PM",
      location: "Downtown Community Center",
      category: "Meetup",
      type: "In-Person",
      description:
        "Join us for a lively discussion on the latest trends in the crypto space. Network with fellow enthusiasts and learn from industry experts.",
    },
    {
      id: 2,
      title: "DeFi Workshop",
      date: "2024-09-20",
      time: "6:30 PM - 8:30 PM",
      location: "Online",
      category: "Workshop",
      type: "Virtual",
      description:
        "Dive deep into the world of decentralized finance (DeFi) and learn how to navigate the complex ecosystem. Hands-on exercises and Q&A session included.",
    },
    {
      id: 3,
      title: "Blockchain Hackathon",
      date: "2024-10-01",
      time: "9:00 AM - 5:00 PM",
      location: "Tech Hub",
      category: "Hackathon",
      type: "In-Person",
      description:
        "Calling all developers! Join us for a 24-hour blockchain hackathon and build innovative solutions that push the boundaries of the technology.",
    },
    {
      id: 4,
      title: "NFT Art Gallery",
      date: "2024-10-10",
      time: "6:00 PM - 10:00 PM",
      location: "Gallery Space",
      category: "Art",
      type: "In-Person",
      description:
        "Explore the latest NFT art creations from renowned digital artists. Enjoy refreshments and network with the crypto art community.",
    },
    {
      id: 5,
      title: "Crypto Trading Webinar",
      date: "2024-10-15",
      time: "8:00 PM - 9:30 PM",
      location: "Online",
      category: "Webinar",
      type: "Virtual",
      description:
        "Learn the fundamentals of crypto trading from experienced traders. Gain insights into market analysis, risk management, and profitable strategies.",
    },
  ]
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (selectedCategory && event.category !== selectedCategory) {
        return false
      }
      if (selectedType && event.type !== selectedType) {
        return false
      }
      return true
    })
  }, [selectedCategory, selectedType])
  return (
    <Card className="w-full max-w-[800px] mx-auto">
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <div className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                <DropdownMenuRadioItem value="">All Categories</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Meetup">Meetups</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Workshop">Workshops</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Hackathon">Hackathons</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Art">Art Events</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Webinar">Webinars</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={selectedType} onValueChange={setSelectedType}>
                <DropdownMenuRadioItem value="">All Types</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="In-Person">In-Person</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Virtual">Virtual</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <div className="w-4 h-4" />
            <span>Calendar View</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 bg-muted/20 rounded-lg p-4">
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(event.date).toLocaleString("en-US", { month: "short" })}
              </div>
            </div>
            <div className="grid gap-1">
              <div className="font-medium">{event.title}</div>
              <div className="text-sm text-muted-foreground">{event.time}</div>
              <div className="text-sm text-muted-foreground">{event.location}</div>
              <div className="text-sm text-muted-foreground">{event.category}</div>
              <div className="text-sm text-muted-foreground">{event.type}</div>
              <div className="text-sm">{event.description}</div>
            </div>
            <div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <div className="w-4 h-4" />
                <span>Add to Calendar</span>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
