import React from "react";
import MinistryCard from "../cards/MinistryCard";
import { useMinistries } from "../../hooks/useMinistries";

const MinistryGrid = () => {
  const { ministries, loading, error } = useMinistries();

  if (loading) {
    return (
      <section className="w-full max-w-[1200px] mx-auto py-16 px-4 bg-gray-50">
        <div className="text-center text-gray-500">Carregando ministérios...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full max-w-[1200px] mx-auto py-16 px-4 bg-gray-50">
        <div className="text-center text-red-500">Erro ao carregar ministérios</div>
      </section>
    );
  }

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
            title={ministry.name}
            description={ministry.shortDescription || ministry.description}
            imageUrl={ministry.imageUrl}
            onClick={() => {
              window.location.href = `/ministerios/${ministry.slug}`;
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MinistryGrid;
