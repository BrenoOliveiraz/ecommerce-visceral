export default function AtendimentoPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-gray-300">
      <h1 className="text-4xl font-extrabold text-red-500 mb-12 text-center md:text-left tracking-wide">
        Atendimento
      </h1>

      <div className="border-t border-red-800 pt-8 space-y-8">
        <div>
          <h2 className="text-2xl text-red-400 mb-4">Política de Privacidade – Visceral Clothing</h2>
          <p className="leading-relaxed mb-6">
            A Visceral Clothing valoriza a transparência e o respeito aos seus clientes. Por isso, esta Política de Privacidade explica como coletamos, utilizamos, armazenamos e protegemos seus dados pessoais ao utilizar nosso site.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-red-400 mb-3">1. Coleta de Informações</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Realiza um cadastro em nosso site;</li>
            <li>Efetua uma compra;</li>
            <li>Assina nossa newsletter;</li>
            <li>Entra em contato pelos canais de atendimento.</li>
          </ul>
          <p className="mt-4">
            As informações podem incluir: nome, e-mail, endereço, CPF, dados de pagamento e informações de navegação.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-red-400 mb-3">2. Uso das Informações</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Processar e entregar seus pedidos;</li>
            <li>Manter contato sobre sua compra ou solicitações;</li>
            <li>Enviar promoções e novidades (quando autorizado);</li>
            <li>Melhorar a experiência no site.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-red-400 mb-3">3. Compartilhamento de Dados</h3>
          <p className="leading-relaxed mb-4">
            Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Processamento de pagamentos;</li>
            <li>Entregas por transportadoras;</li>
            <li>Cumprimento de obrigações legais.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-red-400 mb-3">4. Segurança</h3>
          <p className="leading-relaxed">
            Adotamos medidas de segurança para proteger seus dados contra acessos não autorizados, perdas ou alterações indevidas. Nenhum sistema é 100% seguro, mas seguimos boas práticas de proteção.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-red-400 mb-3">5. Direitos do Usuário</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Solicitar a atualização ou correção dos seus dados;</li>
            <li>Solicitar a exclusão das suas informações;</li>
            <li>Cancelar o recebimento de comunicações promocionais.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-red-400 mb-3">6. Cookies</h3>
          <p className="leading-relaxed">
            Utilizamos cookies para melhorar sua navegação, analisar desempenho e personalizar conteúdo. Você pode desativar cookies no navegador, mas isso pode limitar funcionalidades.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-red-400 mb-3">7. Alterações na Política</h3>
          <p className="leading-relaxed">
            Podemos atualizar esta Política periodicamente. Recomendamos a leitura regular para estar ciente de mudanças.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-red-400 mb-3">8. Contato</h3>
          <p className="leading-relaxed">
            Em caso de dúvidas, entre em contato pelo e-mail{" "}
            <a href="mailto:visceralclothing@outlook.com" className="text-red-500 hover:underline">
              visceralclothing@outlook.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
