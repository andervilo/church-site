import React from "react";
import { Button } from "../../ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  ministry?: string;
}

const eventosExemplo: Event[] = [
  {
    id: "1",
    title: "Retiro de Jovens 2024",
    description: "Um final de semana especial de comunhão, adoração e crescimento espiritual para nossos jovens.",
    date: "15-17 Março, 2024",
    time: "Início: 18:00",
    location: "Acampamento Vida Nova",
    imageUrl: "https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&q=80",
    ministry: "Jovens"
  },
  {
    id: "2",
    title: "Conferência da Família",
    description: "Uma conferência especial focada em fortalecer os laços familiares através dos princípios bíblicos.",
    date: "20 Abril, 2024",
    time: "09:00 - 17:00",
    location: "Auditório Principal",
    imageUrl: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&q=80",
    ministry: "Casais"
  },
  {
    id: "3",
    title: "Noite de Louvor",
    description: "Uma noite especial de adoração e comunhão com apresentações do nosso ministério de música.",
    date: "5 Maio, 2024",
    time: "19:00",
    location: "Templo Principal",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80",
    ministry: "Música"
  }
];

const Events = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Próximos Eventos
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Confira nossa agenda de eventos e participe das próximas atividades da nossa igreja
        </p>
      </div>

      <div className="grid gap-8">
        {eventosExemplo.map((evento) => (
          <div
            key={evento.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-full">
              <div
                className="h-[200px] md:h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${evento.imageUrl})` }}
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                  <Calendar className="h-4 w-4" />
                  {evento.date}
                </div>
                
                <h2 className="text-2xl font-bold mb-3">{evento.title}</h2>
                <p className="text-gray-600 mb-4">{evento.description}</p>
                
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    {evento.time}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {evento.location}
                  </div>
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
    </div>
  );
};

export default Events; 