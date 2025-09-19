"use client";

import { FaCreditCard, FaShieldAlt, FaUserCog } from "react-icons/fa";
import InfoCard from "./InfoCard";
import CollectionCard from "./CollectionCard";


export default function StoreSection() {
  return (
    <section className="py-10 bg-white">
      {/* Linha de Informações */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
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
          title="Personalizado"
          subtitle="Feito sob medida para você"
        />
      </div>

      {/* Linha de Coleções */}
  <div className="flex justify-end gap-8 max-w-xs ">
        <CollectionCard
          image="/colection-icon.jpg"
          title="Evil Dead"
        />
      </div>
    </section>
  );
}
