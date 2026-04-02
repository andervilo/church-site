import React from "react";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon, Filter, ChevronRight } from "lucide-react";
import { useEvents } from "../../hooks/useEvents";
import { ChurchEvent } from "../../lib/api";

const EventCalendar = () => {
  const { events, loading } = useEvents();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all");

  const filteredEvents = events.filter((event) => {
    if (selectedFilter === "all") return true;
    return event.type === selectedFilter.toUpperCase();
  });

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "WEEKLY":
        return "bg-blue-100 text-blue-800";
      case "SPECIAL":
        return "bg-purple-100 text-purple-800";
      case "MINISTRY":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "WEEKLY": return "Semanal";
      case "SPECIAL": return "Especial";
      case "MINISTRY": return "Ministério";
      default: return type;
    }
  };

  const renderEventCard = (event: ChurchEvent) => (
    <div
      key={event.id}
      className="mb-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(event.startDate).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <Badge className={getEventBadgeColor(event.type)}>
          {getTypeLabel(event.type)}
        </Badge>
      </div>
      <p className="mt-2 text-sm text-gray-600">{event.description}</p>
      <Button variant="ghost" size="sm" className="mt-2">
        Saiba Mais
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full max-w-[1200px] mx-auto p-6 text-center text-gray-500">
        Carregando eventos...
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Calendário
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
              <CardTitle>Eventos</CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedFilter}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="weekly">Cultos Semanais</TabsTrigger>
                <TabsTrigger value="special">Eventos Especiais</TabsTrigger>
                <TabsTrigger value="ministry">Ministérios</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedFilter} className="mt-0">
                <ScrollArea className="h-[400px] pr-4">
                  {filteredEvents.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      Nenhum evento encontrado
                    </p>
                  ) : (
                    filteredEvents.map(renderEventCard)
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventCalendar;
