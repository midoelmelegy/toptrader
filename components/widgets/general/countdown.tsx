import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Edit } from "lucide-react";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  id: string;
  data: {
    eventName?: string;
    eventDate?: string;
  };
  setData: (data: { eventName: string; eventDate: string }) => void;
}

export function Countdown({ id, data, setData }: CountdownProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [eventName, setEventName] = useState(data?.eventName || "Countdown Event");
  const [eventDate, setEventDate] = useState(data?.eventDate || new Date().toISOString().split("T")[0]);
  const [timeLeft, setTimeLeft] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventEndTime = new Date(`${eventDate}T23:59:59`).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventEndTime - now;
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  const saveCountdownData = () => {
    const updatedData = { eventName, eventDate };
    setData(updatedData);
    setIsEditing(false);
  };

  const totalSeconds = 31 * 24 * 60 * 60; // Assuming max 31 days
  const remainingSeconds =
    timeLeft.days * 24 * 60 * 60 + timeLeft.hours * 60 * 60 + timeLeft.minutes * 60 + timeLeft.seconds;
  const progressPercentage = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">Countdown to Event</CardTitle>
        <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{eventName}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {new Date(eventDate).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
        <div className="grid grid-cols-4 gap-4 text-center mb-6">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
              <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">{value}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{unit}</span>
            </div>
          ))}
        </div>
        <Progress value={progressPercentage} className="h-2 bg-gray-200 dark:bg-gray-700" />
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
          onClick={() => setIsEditing(true)} // Single click to open
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Countdown
        </Button>
      </CardFooter>

      {isEditing && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="bg-white dark:bg-gray-900">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">Edit Countdown</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eventName" className="text-gray-700 dark:text-gray-300">
                  Event Name
                </Label>
                <Input
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Enter event name"
                  className="border-gray-300 dark:border-gray-700 focus:ring-gray-500 dark:focus:ring-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate" className="text-gray-700 dark:text-gray-300">
                  Event Date
                </Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="border-gray-300 dark:border-gray-700 focus:ring-gray-500 dark:focus:ring-gray-400"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={saveCountdownData}
                className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
