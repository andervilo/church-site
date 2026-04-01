import React from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const PastoralTeam = () => {
  const pastors = [
    {
      name: "Pr. João Silva",
      role: "Pastor Titular",
      description:
        "Líder principal da igreja há 15 anos, com formação em teologia e mestrado em aconselhamento pastoral.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      contact: "pastor.joao@igreja.com",
    },
    {
      name: "Pr. Pedro Santos",
      role: "Pastor de Jovens",
      description:
        "Responsável pelo ministério de jovens e adolescentes, com experiência em liderança juvenil.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Peter",
      contact: "pastor.pedro@igreja.com",
    },
    {
      name: "Pra. Maria Oliveira",
      role: "Pastora de Família",
      description:
        "Especialista em aconselhamento familiar e matrimonial, lidera o ministério de famílias.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      contact: "pastora.maria@igreja.com",
    },
  ];

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
        {pastors.map((pastor, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <img
                src={pastor.image}
                alt={pastor.name}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Contato
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{pastor.name}</h2>
                <p className="text-blue-600 font-medium">{pastor.role}</p>
              </div>

              <p className="text-gray-700 text-lg">{pastor.description}</p>

              <div className="space-y-2">
                <h3 className="font-semibold">Áreas de Atuação:</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Pregação",
                    "Aconselhamento",
                    "Visitação",
                    "Treinamento",
                  ].map((area, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold mb-2">Horário de Atendimento:</h3>
                <p className="text-gray-600">
                  Terça a Sexta: 9h às 17h
                  <br />
                  Agendamento através do email: {pastor.contact}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastoralTeam;
