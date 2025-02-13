import React from "react";
import { Button } from "@/components/ui/button";
import { Target, Heart, Users } from "lucide-react";

const Vision = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="relative h-[300px] rounded-xl overflow-hidden mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Visão & Missão</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Nossa Visão</h2>
            </div>
            <p className="text-lg text-gray-700">
              Ser uma igreja que reflete o amor de Cristo, transformando vidas e
              impactando nossa comunidade através do evangelho, formando
              discípulos comprometidos com Deus e com o próximo.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <Heart className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Nossa Missão</h2>
            </div>
            <p className="text-lg text-gray-700">
              Proclamar o evangelho de Jesus Cristo, fazer discípulos, edificar
              famílias e servir à comunidade através do amor cristão,
              proporcionando um ambiente de adoração, comunhão e crescimento
              espiritual.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <Users className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Nossos Valores</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-bold mb-2">Fé Bíblica</h3>
                <p>Compromisso com o ensino e prática da Palavra de Deus</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-bold mb-2">Amor ao Próximo</h3>
                <p>Demonstração prática do amor de Cristo em todas as ações</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-bold mb-2">Excelência</h3>
                <p>Busca pela excelência em tudo que fazemos para Deus</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-bold mb-2">Comunidade</h3>
                <p>Valorização dos relacionamentos e cuidado mútuo</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Nossos Objetivos</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <p>Alcançar pessoas com o evangelho de Jesus Cristo</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <p>Formar discípulos maduros na fé</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <p>Fortalecer famílias através do ensino bíblico</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <p>Servir à comunidade com amor e excelência</p>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold mb-4">
              Faça Parte da Nossa Visão
            </h3>
            <p className="text-gray-700 mb-4">
              Junte-se a nós nesta missão de impactar vidas e transformar nossa
              comunidade.
            </p>
            <Button className="w-full">Conheça Mais</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
