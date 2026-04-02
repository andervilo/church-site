import React from "react";
import { Button } from "../../ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useEvents } from "../../../hooks/useEvents";

const Events = () => {
  const { events, loading, error } = useEvents();

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center text-gray-500">
        Carregando eventos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center text-red-500">
        Erro ao carregar eventos
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Próximos Eventos
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Confira nossa agenda de eventos e participe das próximas atividades da
          nossa igreja
        </p>
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Nenhum evento programado no momento
        </p>
      ) : (
        <div className="grid gap-8">
          {events.map((evento) => (
            <div
              key={evento.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-full">
                {evento.imageUrl && (
                  <div
                    className="h-[200px] md:h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${evento.imageUrl})` }}
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(evento.startDate)}
                    {evento.endDate && ` — ${formatDate(evento.endDate)}`}
                  </div>

                  <h2 className="text-2xl font-bold mb-3">{evento.title}</h2>
                  <p className="text-gray-600 mb-4">{evento.description}</p>

                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      {formatTime(evento.startDate)}
                    </div>
                    {evento.location && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {evento.location}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <Button>Inscrever-se</Button>
                    <Button variant="outline">Mais Informações</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
