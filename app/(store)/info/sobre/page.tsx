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
          A Visceral nasceu do sonho de quem sempre amou o terror.
          Surgiu o desejo de criar algo original, releituras autênticas de ícones do gênero do terror que amamos.
        </p>

        <p className="leading-relaxed text-gray-300 text-justify">
          O projeto só saiu do papel graças a um incentivo essencial, que transformou vontade em ação.
        </p>

        <p className="leading-relaxed text-gray-300 text-justify">
          A essência da Visceral é simples: respeitar a originalidade.  Cada arte é feita para ser única.
        </p>
      </article>
    </section>
  );
}
