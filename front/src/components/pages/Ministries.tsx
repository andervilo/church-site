import React from "react";
import MinistryGrid from "../sections/MinistryGrid";
import { useNavigate } from "react-router-dom";

const Ministries = () => {
  const navigate = useNavigate();

  const ministries = [
    {
      id: "jovens",
      title: "Ministério de Jovens",
      description:
        "Uma comunidade vibrante para jovens crescerem na fé e comunhão juntos.",
      imageUrl:
        "https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?auto=format&fit=crop&q=80",
    },
    {
      id: "criancas",
      title: "Ministério Infantil",
      description:
        "Nutrindo jovens corações e mentes no amor de Cristo através de atividades divertidas e envolventes.",
      imageUrl:
        "https://images.unsplash.com/photo-1602008672365-1e4f1e12c3a6?auto=format&fit=crop&q=80",
    },
    {
      id: "casais",
      title: "Ministério de Casais",
      description:
        "Apoiando e fortalecendo casamentos através da comunhão e ensino bíblico.",
      imageUrl:
        "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&q=80",
    },
    {
      id: "mulheres",
      title: "Ministério de Mulheres",
      description:
        "Capacitando mulheres através da oração, estudo e apoio comunitário.",
      imageUrl:
        "https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&q=80",
    },
    {
      id: "homens",
      title: "Ministério de Homens",
      description:
        "Construindo homens cristãos fortes através da comunhão e discipulado.",
      imageUrl:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80",
    },
    {
      id: "louvor",
      title: "Ministério de Louvor",
      description:
        "Louvando a Deus através da música e conduzindo a congregação em adoração.",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="pt-8">
      <div className="max-w-[1200px] mx-auto px-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Ministries
        </h1>
        <p className="text-xl text-gray-600">
          Discover how you can get involved and grow in your faith journey
        </p>
      </div>
      <MinistryGrid
        ministries={ministries.map((ministry) => ({
          ...ministry,
          onClick: () => navigate(`/ministries/${ministry.id.toLowerCase()}`),
        }))}
      />
    </div>
  );
};

export default Ministries;
