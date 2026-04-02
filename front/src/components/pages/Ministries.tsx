import React from "react";
import MinistryGrid from "../sections/MinistryGrid";

const Ministries = () => {
  return (
    <div className="pt-8">
      <div className="max-w-[1200px] mx-auto px-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Nossos Ministérios
        </h1>
        <p className="text-xl text-gray-600">
          Descubra como você pode se envolver e crescer em sua jornada de fé
        </p>
      </div>
      <MinistryGrid />
    </div>
  );
};

export default Ministries;
