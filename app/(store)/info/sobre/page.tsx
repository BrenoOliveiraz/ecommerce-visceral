export default function Sobre() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-gray-300">
      <div className="text-center md:text-left mb-12">
        <h1 className="text-5xl font-extrabold text-red-600 tracking-wide">
          Visceral
        </h1>
        <div className="h-1 w-24 bg-red-700 mt-4 mx-auto md:mx-0 rounded-full"></div>
      </div>

      <article className="bg-zinc-950/50 backdrop-blur-sm border border-red-900/40 rounded-2xl p-8 md:p-10 shadow-lg shadow-red-900/20 space-y-8">
        <header>
          <h2 className="text-2xl font-semibold text-red-400 mb-4">
            Sobre a gente
          </h2>
        </header>

        <p className="leading-relaxed text-gray-300 text-justify">
          A Visceral nasceu do sonho de uma única pessoa — alguém que, desde
          criança, sempre foi fascinado pelo universo dos filmes de terror. Ver
          sempre as mesmas imagens genéricas em camisas, repetidas por todas as
          marcas, começou a incomodar. Foi aí que surgiu o desejo de criar algo
          novo, original e autêntico — algo que desse uma nova roupagem aos
          personagens icônicos do terror, sem cair na mesmice ou na cópia.
        </p>

        <p className="leading-relaxed text-gray-300 text-justify">
          Mesmo sendo um projeto individual, a loja só ganhou vida graças a um
          incentivo importante. Sem esse empurrão, talvez a Visceral ainda
          estivesse guardada no papel ou esperando “o momento certo” para
          acontecer. Esse apoio antecipou o que levaria muito mais tempo para se
          concretizar.
        </p>

        <p className="leading-relaxed text-gray-300 text-justify">
          A essência da Visceral é clara: criar artes que não existem, fugir do
          óbvio e nunca roubar o trabalho de outras pessoas para chamar de
          exclusivo. A proposta é entregar originalidade de verdade,
          respeitando quem cria e valorizando o novo. Aqui, cada desenho é
          pensado para surpreender, provocar e honrar o terror de forma única —
          do jeito que sempre deveria ter sido.
        </p>
      </article>
    </section>
  );
}
