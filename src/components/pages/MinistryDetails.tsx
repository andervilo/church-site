import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Calendar, Users, Clock, MapPin } from "lucide-react";
import MinistryCard from "../cards/MinistryCard";

const ministryData = {
  jovens: {
    title: "Ministério de Jovens",
    description:
      "Uma comunidade vibrante para jovens crescerem na fé e comunhão juntos.",
    imageUrl:
      "https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?auto=format&fit=crop&q=80",
    meetingTime: "Toda Sexta às 19:00",
    location: "Centro da Juventude",
    ageGroup: "13-18 anos",
    activities: [
      "Estudo Bíblico",
      "Noites de Louvor",
      "Eventos Sociais",
      "Projetos de Serviço",
    ],
  },
  criancas: {
    title: "Ministério Infantil",
    description:
      "Nutrindo corações e mentes jovens no amor de Cristo através de atividades divertidas e envolventes.",
    imageUrl:
      "https://images.unsplash.com/photo-1602008672365-1e4f1e12c3a6?auto=format&fit=crop&q=80",
    meetingTime: "Domingos às 9:30",
    location: "Ala Infantil",
    ageGroup: "3-12 anos",
    activities: [
      "Escola Dominical",
      "EBF",
      "Coral Infantil",
      "Eventos Familiares"
    ],
  },
  casais: {
    title: "Ministério de Casais",
    description:
      "Apoiando e fortalecendo casamentos através de comunhão e ensino bíblico.",
    imageUrl:
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&q=80",
    meetingTime: "Primeiro Sábado de cada mês às 18:00",
    location: "Salão de Comunhão",
    ageGroup: "Todos os casais",
    activities: [
      "Workshops de Casamento",
      "Encontro de Casais",
      "Retiros de Casais",
      "Pequenos Grupos",
    ],
  },
  mulheres: {
    title: "Ministério de Mulheres",
    description:
      "Capacitando mulheres através de oração, estudo e apoio comunitário.",
    imageUrl:
      "https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&q=80",
    meetingTime: "Quartas-feiras às 10:00",
    location: "Sala 201",
    ageGroup: "Mulheres adultas",
    activities: [
      "Estudo Bíblico",
      "Grupos de Oração",
      "Retiros Femininos",
      "Projetos de Serviço",
    ],
  },
  homens: {
    title: "Ministério de Homens",
    description:
      "Construindo homens cristãos fortes através de comunhão e discipulado.",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80",
    meetingTime: "Sábados às 8:00",
    location: "Salão de Comunhão",
    ageGroup: "Homens adultos",
    activities: [
      "Estudo Bíblico",
      "Café da Manhã",
      "Retiros Masculinos",
      "Projetos de Serviço",
    ],
  },
  louvor: {
    title: "Ministério de Música",
    description:
      "Louvando a Deus através da música e conduzindo a congregação em adoração.",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80",
    meetingTime: "Quinta-feira às 19:00",
    location: "Santuário",
    ageGroup: "Todas as idades",
    activities: [
      "Coral",
      "Banda de Louvor",
      "Orquestra",
      "Coral Infantil"
    ],
  },
};

const getShortTitle = (title: string) => {
  return title.replace('Ministério de ', '').replace('Ministério ', '');
};

const MinistryDetails = () => {
  const { id } = useParams();
  const ministry = ministryData[id as keyof typeof ministryData];

  if (!ministry) {
    return <div>Ministério não encontrado</div>;
  }

  const otherMinistries = Object.entries(ministryData)
    .filter(([key]) => key !== id)
    .map(([key, ministry]) => ({
      id: key,
      ...ministry,
    }));

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      {/* Mini Cards Navigation */}
      <div className="mb-12 overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {Object.entries(ministryData).map(([key, min]) => (
            <div
              key={key}
              onClick={() => window.location.href = `/ministerios/${key}`}
              className={`
                flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                min-w-[200px] hover:bg-gray-100
                ${key === id ? 'bg-blue-50 border-blue-200 border' : 'bg-gray-50 border-gray-200 border'}
              `}
            >
              <div 
                className="w-12 h-12 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${min.imageUrl})` }}
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm line-clamp-1">{getShortTitle(min.title)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ministry.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">{ministry.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Sobre Este Ministério</h2>
          <p className="text-lg text-gray-700 mb-8">{ministry.description}</p>

          <h3 className="text-2xl font-bold mb-4">Atividades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {ministry.activities.map((activity, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                {activity}
              </div>
            ))}
          </div>

          <Button size="lg" className="w-full md:w-auto">
            Participar deste Ministério
          </Button>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Detalhes do Ministério</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <span>{ministry.meetingTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span>{ministry.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-600" />
                <span>{ministry.ageGroup}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold mb-4">Participe</h3>
            <p className="text-gray-700 mb-4">
              Interessado em participar ou saber mais sobre este ministério?
            </p>
            <Button variant="outline" className="w-full">
              Contatar Líder do Ministério
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryDetails;
