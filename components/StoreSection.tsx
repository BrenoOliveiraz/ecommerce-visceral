"use client";

import { FaCreditCard, FaShieldAlt, FaUserCog } from "react-icons/fa";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function InfoCard({ icon, title, subtitle }: InfoCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-neutral-950 border border-red-700/40 ">
      <div className="text-red-600 text-4xl mb-3 drop-shadow-[0_0_6px_rgba(255,0,0,0.7)]">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}

export default function StoreSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-black via-neutral-950 to-black relative overflow-hidden">
      {/* efeito sutil no fundo */}
      <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-10" />
      
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 text-white">
        <InfoCard
          icon={<FaCreditCard />}
          title="Até 12x no cartão"
          subtitle="Parcela mínima R$10"
        />
        <InfoCard
          icon={<FaShieldAlt />}
          title="Garantia"
          subtitle="Contra defeito de fabricação"
        />
        <InfoCard
          icon={<FaUserCog />}
          title="Cliente especial"
          subtitle="Entrega personalizada!"
        />
      </div>
    </section>
  );
}
