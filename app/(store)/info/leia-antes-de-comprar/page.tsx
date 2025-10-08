export default function LeiaAntesDeComprarPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-gray-300">
      <h1 className="text-4xl font-extrabold text-red-500 mb-12 text-center md:text-left tracking-wide">
        Leia Antes de Comprar
      </h1>

      <div className="border-t border-red-800 pt-8 space-y-8">
        <div>
          <h2 className="text-2xl text-red-400 mb-4">Prazos de Envio</h2>
          <p className="leading-relaxed mb-4">
            Produtos em pré-venda têm prazos longos e variados. Compras comuns são postadas em até <strong>15 dias</strong> após confirmação do pagamento (boleto: até 3 dias; cartão: até 2 dias). Após postagem, começam a contar os prazos dos Correios: <strong>SEDEX</strong> (2–5 dias úteis) ou <strong>PAC</strong> (7–20 dias úteis). Os prazos podem variar conforme a distância.
          </p>
          <p className="leading-relaxed mb-4">
            O código de rastreio será enviado por e-mail. <strong>Não nos responsabilizamos por atrasos dos Correios.</strong> Verifique se o endereço de entrega está correto; em caso de erro, a nova postagem será cobrada.
          </p>
        </div>

        <div>
          <h2 className="text-2xl text-red-400 mb-4">Tamanhos</h2>
          <p className="leading-relaxed">
            Todas as peças têm medidas na descrição. Pequenas variações podem ocorrer por serem costuradas à mão.
          </p>
        </div>
      </div>
    </section>
  );
}
