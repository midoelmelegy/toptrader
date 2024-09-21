"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Calendar, Clock, MapPin } from "lucide-react";

interface EventCalendarProps {
  id: string;
  data: any;
  setData: (data: any) => void;
}

interface Event {
  name: string;
  date: string;
  time: string;
  description: string;
  location: string;
}

export function EventCalendar({ id, data, setData }: EventCalendarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [events, setEvents] = useState<Event[]>(data?.events || []);

  const handleSaveEvent = () => {
    const updatedEvent = {
      name: eventName,
      date: eventDate,
      time: eventTime,
      description: eventDescription,
      location: eventLocation,
    };

    let updatedEvents = [...events];

    if (editIndex !== null) {
      updatedEvents[editIndex] = updatedEvent;
    } else {
      updatedEvents = [...events, updatedEvent];
    }

    setEvents(updatedEvents);
    setData({ ...data, events: updatedEvents });
    setIsEditing(false);
    resetForm();
  };

  const handleEditEvent = (index: number) => {
    const eventToEdit = events[index];
    setEventName(eventToEdit.name);
    setEventDate(eventToEdit.date);
    setEventTime(eventToEdit.time);
    setEventDescription(eventToEdit.description);
    setEventLocation(eventToEdit.location);
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleRemoveEvent = (index: number) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    setData({ ...data, events: updatedEvents });
  };

  const resetForm = () => {
    setEventName("");
    setEventDate("");
    setEventTime("");
    setEventDescription("");
    setEventLocation("");
    setEditIndex(null);
  };

  return (
    <Card className="w-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Event Calendar</h2>
        <Button
          onClick={() => setIsEditing(true)}
          className="no-drag bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
        >
          Add Event
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="mt-4 space-y-4">
          {events.length > 0 ? (
            events.map((event, index) => (
              <li key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-xl text-gray-800 dark:text-gray-200">{event.name}</strong>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date}
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      {event.time}
                    </div>
                    <div className="text-sm mt-2 text-gray-700 dark:text-gray-300">{event.description}</div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleEditEvent(index)}
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      onClick={() => handleRemoveEvent(index)}
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No events scheduled.</p>
          )}
        </ul>
      </CardContent>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {editIndex !== null ? "Edit Event" : "Add Event"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="eventName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Name
              </label>
              <Input
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter event name"
                className="border-gray-300 dark:border-gray-700 focus:ring-gray-500 dark:focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="eventDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Date
              </label>
              <Input
                id="eventDate"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="border-gray-300 dark:border-gray-700 focus:ring-gray-500 dark:focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="eventTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Time
              </label>
              <Input
                id="eventTime"
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="border-gray-300 dark:border-gray-700 focus:ring-gray-500 dark:focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="eventDescription" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Description
              </label>
              <Textarea
                id="eventDescription"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Enter event description"
                className="border-gray-300 dark:border-gray-700 focus:ring-gray-500 dark:focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="eventLocation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Location
              </label>
              <Input
                id="eventLocation"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="border-gray-300 dark:border-gray-700 focus:ring-gray-500 dark:focus:ring-gray-400"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEvent} className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
