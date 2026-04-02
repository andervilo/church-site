import React from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useTeam } from "../../../hooks/useTeam";

const PastoralTeam = () => {
  const { members, loading, error } = useTeam();

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center text-gray-500">
        Carregando equipe pastoral...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center text-red-500">
        Erro ao carregar equipe pastoral
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="relative h-[300px] rounded-xl overflow-hidden mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Equipe Pastoral</h1>
        </div>
      </div>

      <div className="space-y-12">
        {members.map((pastor) => (
          <div
            key={pastor.id}
            className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <img
                src={
                  pastor.photoUrl ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${pastor.name}`
                }
                alt={pastor.name}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              {pastor.email && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    (window.location.href = `mailto:${pastor.email}`)
                  }
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contato
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{pastor.name}</h2>
                <p className="text-blue-600 font-medium">{pastor.role}</p>
              </div>

              <p className="text-gray-700 text-lg">{pastor.bio}</p>

              {pastor.expertise && pastor.expertise.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Áreas de Atuação:</h3>
                  <div className="flex flex-wrap gap-2">
                    {pastor.expertise.map((area, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {pastor.officeHours && (
                <div className="pt-4">
                  <h3 className="font-semibold mb-2">
                    Horário de Atendimento:
                  </h3>
                  <p className="text-gray-600">
                    {pastor.officeHours}
                    {pastor.email && (
                      <>
                        <br />
                        Agendamento através do email: {pastor.email}
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastoralTeam;
