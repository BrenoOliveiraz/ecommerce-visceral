export default function PreVendaPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-gray-300">
      <h1 className="text-4xl font-extrabold text-red-500 mb-12 text-center md:text-left tracking-wide">
        Pré-Venda
      </h1>

      <div className="border-t border-red-800 pt-8 space-y-8">
        <div>
          <h2 className="text-2xl text-red-400 mb-4">Trocas e Devoluções</h2>
          <p className="leading-relaxed mb-4">
            Você pode solicitar a troca em até <strong>7 dias corridos</strong> após receber seu pedido (data do rastreio dos Correios). As trocas são apenas por tamanho e não conseguimos garantir a disponibilidade.
          </p>
          <p className="leading-relaxed mb-4">
            A peça precisa estar em perfeito estado, sem sinais de uso, odores e etc., contendo a tag.
          </p>
          <p className="leading-relaxed mb-4">
            Como trabalhamos com <strong>edições limitadas</strong>, pode acontecer de não termos o mesmo produto em estoque. Nesse caso, será feito o reembolso da mesma maneira que foi pago pelo produto.
          </p>
          <p className="leading-relaxed mb-4">
            Os custos de envio e reenvio ficam por conta do cliente.
          </p>
          <p className="leading-relaxed">
            Para solicitar, é só entrar em contato pelo link <strong>CONTATO</strong> ou pelo e-mail{" "}
            <a href="mailto:visceralclothing@outlook.com" className="text-red-500 hover:underline">
              visceralclothing@outlook.com
            </a>
            , informando o código da compra e o produto que deseja trocar. O novo envio acontece em até 15 dias úteis após recebermos a peça devolvida.
          </p>
        </div>

        <div>
          <h2 className="text-2xl text-red-400 mb-4">Sobre a Pré-Venda</h2>
          <p className="leading-relaxed mb-4">
            No caso de <strong>PRÉ-VENDA</strong>, a disponibilidade é somente após a finalização da produção, e não conseguimos garantir troca pelo mesmo produto.
          </p>
        </div>

        <div>
          <h2 className="text-2xl text-red-400 mb-4">Cancelamentos</h2>
          <p className="leading-relaxed mb-4">
            As devoluções só são aceitas em casos de <strong>erro da empresa</strong>, o que inclui itens danificados, rasgos/furos, itens errados ou com manchas.
          </p>
          <p className="leading-relaxed">
            Com exceção de erros de envio, todas as vendas são finais. Fique atento ao escolher o tamanho.
          </p>
        </div>
      </div>
    </section>
  );
}
