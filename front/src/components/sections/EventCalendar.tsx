import React from "react";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon, Filter, ChevronRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: "weekly" | "special" | "ministry";
  description: string;
}

interface EventCalendarProps {
  events?: Event[];
  onEventClick?: (event: Event) => void;
  onDateSelect?: (date: Date | undefined) => void;
}

const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Sunday Service",
    date: new Date(),
    type: "weekly",
    description: "Regular Sunday morning worship service",
  },
  {
    id: "2",
    title: "Youth Night",
    date: new Date(Date.now() + 86400000), // tomorrow
    type: "ministry",
    description: "Weekly youth group meeting",
  },
  {
    id: "3",
    title: "Easter Celebration",
    date: new Date(Date.now() + 86400000 * 7), // next week
    type: "special",
    description: "Special Easter Sunday celebration",
  },
];

const EventCalendar = ({
  events = defaultEvents,
  onEventClick = (event) => console.log("Event clicked:", event),
  onDateSelect = (date) => console.log("Date selected:", date),
}: EventCalendarProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all");

  const filteredEvents = events.filter((event) => {
    if (selectedFilter === "all") return true;
    return event.type === selectedFilter;
  });

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "weekly":
        return "bg-blue-100 text-blue-800";
      case "special":
        return "bg-purple-100 text-purple-800";
      case "ministry":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Events</CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="weekly">Weekly Services</TabsTrigger>
                <TabsTrigger value="special">Special Events</TabsTrigger>
                <TabsTrigger value="ministry">Ministry Events</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <ScrollArea className="h-[400px] pr-4">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="mb-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => onEventClick(event)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-500">
                            {event.date.toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getEventBadgeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {event.description}
                      </p>
                      <Button variant="ghost" size="sm" className="mt-2">
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="weekly" className="mt-0">
                <ScrollArea className="h-[400px] pr-4">
                  {filteredEvents
                    .filter((event) => event.type === "weekly")
                    .map((event) => (
                      <div
                        key={event.id}
                        className="mb-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => onEventClick(event)}
                      >
                        {/* Same event card structure as above */}
                      </div>
                    ))}
                </ScrollArea>
              </TabsContent>

              {/* Similar TabsContent for 'special' and 'ministry' */}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventCalendar;
