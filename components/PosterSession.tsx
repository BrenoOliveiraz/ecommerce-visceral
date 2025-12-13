import Image from "next/image";

export default function Poster() {
  return (
    <section
      className="min-h-[120vh] flex items-center justify-center px-4 py-8 bg-black"
      style={{
        backgroundImage: 'url("/kandar-bg.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 300px',
        backgroundPosition: 'top',
      }}
    >
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-40 sm:mt-0">

          {/* Poster 1 */}
          <div className="relative bg-amber-200 rounded-lg border-4 border-red-700/40 shadow-lg shadow-red-600/50 overflow-hidden transition-all duration-300 hover:scale-105">
            <div className="relative w-full h-[550px]">
              <Image
                src="/POSTER.jpg"
                alt="Poster Todo Mundo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Poster 2 */}
          <div className="relative bg-amber-200 rounded-lg border-4 border-red-700/40 shadow-lg shadow-red-600/50 overflow-hidden transition-all duration-300 hover:scale-105">
            <div className="relative w-full h-[550px]">
              <Image
                src="/poster-linda.jpeg"
                alt="Poster da Vagabunda"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Poster 3 */}
          <div className="relative bg-amber-200 rounded-lg border-4 border-red-700/40 shadow-lg shadow-red-600/50 overflow-hidden transition-all duration-300 hover:scale-105">
            <div className="relative w-full h-[550px]">
              <Image
                src="/POSTER2.jpg"
                alt="Poster Cara"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
