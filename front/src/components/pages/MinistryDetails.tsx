import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Clock, MapPin, Users } from "lucide-react";
import { useMinistry, useMinistries } from "../../hooks/useMinistries";

const MinistryDetails = () => {
  const { id } = useParams();
  const { ministry, loading, error } = useMinistry(id);
  const { ministries } = useMinistries();

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center text-gray-500">
        Carregando...
      </div>
    );
  }

  if (error || !ministry) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center text-red-500">
        Ministério não encontrado
      </div>
    );
  }

  const otherMinistries = ministries.filter((m) => m.slug !== id);

  const getShortTitle = (name: string) =>
    name.replace("Ministério de ", "").replace("Ministério ", "");

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      {/* Mini Cards Navigation */}
      <div className="mb-12 overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {ministries.map((min) => (
            <div
              key={min.slug}
              onClick={() => (window.location.href = `/ministerios/${min.slug}`)}
              className={`
                flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                min-w-[200px] hover:bg-gray-100
                ${min.slug === id ? "bg-blue-50 border-blue-200 border" : "bg-gray-50 border-gray-200 border"}
              `}
            >
              <div
                className="w-12 h-12 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${min.imageUrl})` }}
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm line-clamp-1">
                  {getShortTitle(min.name)}
                </h3>
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
          <h1 className="text-5xl font-bold text-white">{ministry.name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Sobre Este Ministério</h2>
          <p className="text-lg text-gray-700 mb-8">{ministry.description}</p>

          <Button size="lg" className="w-full md:w-auto">
            Participar deste Ministério
          </Button>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Detalhes do Ministério</h3>
            <div className="space-y-4">
              {ministry.meetingDay && ministry.meetingTime && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span>
                    {ministry.meetingDay} às {ministry.meetingTime}
                  </span>
                </div>
              )}
              {ministry.leaderName && (
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span>Líder: {ministry.leaderName}</span>
                </div>
              )}
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
