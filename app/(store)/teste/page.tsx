import RadialGauge from "@/components/RadialGauge"

export default function Dashboard() {
  return (
    <div className="flex gap-4 flex-wrap">
      
      <RadialGauge
        label="Pedidos"
        value={128}
        total={278}
      />

      <RadialGauge
        label="Fornecedores"
        value={890}
        total={1000}
      />

      <RadialGauge
        label="SKU’s"
        value={200}
        total={951}
      />

      <RadialGauge
        label="Itens"
        value={1101}
        total={1457}
      />

      <RadialGauge
        label="Cortes/Avaria"
        value={19}
        total={278}
      />

    </div>
  )
}
