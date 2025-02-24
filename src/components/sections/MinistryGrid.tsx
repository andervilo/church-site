import React from "react";
import MinistryCard from "../cards/MinistryCard";

interface Ministry {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface MinistryGridProps {
  ministries?: Ministry[];
}

const MinistryGrid = ({
  ministries = [
    {
      id: "1",
      title: "Ministério de Jovens",
      description:
        "Uma comunidade vibrante para jovens crescerem na fé e comunhão juntos.",
      imageUrl:
        "https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      title: "Ministério Infantil",
      description:
        "Nutrindo corações e mentes jovens no amor de Cristo através de atividades divertidas e envolventes.",
      imageUrl:
        "https://images.unsplash.com/photo-1602008672365-1e4f1e12c3a6?auto=format&fit=crop&q=80",
    },
    {
      id: "3",
      title: "Ministério de Casais",
      description:
        "Apoiando e fortalecendo casamentos através de comunhão e ensino bíblico.",
      imageUrl:
        "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&q=80",
    },
    {
      id: "4",
      title: "Ministério de Mulheres",
      description:
        "Capacitando mulheres através de oração, estudo e apoio comunitário.",
      imageUrl:
        "https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&q=80",
    },
    {
      id: "5",
      title: "Ministério de Homens",
      description:
        "Construindo homens cristãos fortes através de comunhão e discipulado.",
      imageUrl:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80",
    },
    {
      id: "6",
      title: "Ministério de Música",
      description:
        "Louvando a Deus através da música e conduzindo a congregação em adoração.",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80",
    },
  ],
}: MinistryGridProps) => {
  return (
    <section className="w-full max-w-[1200px] mx-auto py-16 px-4 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Nossos Ministérios
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubra as várias maneiras de se envolver e crescer em sua jornada de fé
          através de nossos diversos programas ministeriais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {ministries.map((ministry) => (
          <MinistryCard
            key={ministry.id}
            title={ministry.title}
            description={ministry.description}
            imageUrl={ministry.imageUrl}
            onClick={() => {
              const slug = ministry.title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/\s+/g, "-");
              window.location.href = `/ministerios/${ministry.id}`;
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MinistryGrid;
