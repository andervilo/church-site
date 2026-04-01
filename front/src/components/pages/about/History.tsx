import React from "react";
import { Button } from "@/components/ui/button";

const History = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="relative h-[300px] rounded-xl overflow-hidden mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Nossa História</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">Nossos Primeiros Passos</h2>
            <p className="text-lg text-gray-700">
              Nossa jornada começou em 1990, quando um pequeno grupo de famílias
              se reuniu com o sonho de estabelecer uma igreja que refletisse os
              valores do evangelho e servisse à comunidade local. Começamos nos
              reunindo em uma casa simples, mas nossa fé e visão eram grandes.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">
              Crescimento e Desenvolvimento
            </h2>
            <p className="text-lg text-gray-700">
              Com o passar dos anos, nossa congregação cresceu constantemente.
              Em 1995, adquirimos nosso primeiro templo próprio. Este foi um
              marco significativo que nos permitiu expandir nossos ministérios e
              alcançar mais pessoas.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Nossa Igreja Hoje</h2>
            <p className="text-lg text-gray-700">
              Hoje, somos uma comunidade vibrante e diversificada, comprometida
              com o ensino da Palavra de Deus e o serviço ao próximo. Nossos
              vários ministérios atendem a todas as faixas etárias e
              necessidades espirituais.
            </p>
          </section>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Marcos Históricos</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">1990</p>
                <p className="text-gray-600">Fundação da Igreja</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">1995</p>
                <p className="text-gray-600">Primeiro Templo Próprio</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">2000</p>
                <p className="text-gray-600">Início dos Ministérios</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">2010</p>
                <p className="text-gray-600">Expansão do Templo</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">2020</p>
                <p className="text-gray-600">30 Anos de História</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold mb-4">
              Faça Parte da Nossa História
            </h3>
            <p className="text-gray-700 mb-4">
              Queremos continuar crescendo e impactando vidas. Venha fazer parte
              da nossa história!
            </p>
            <Button className="w-full">Entre em Contato</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
