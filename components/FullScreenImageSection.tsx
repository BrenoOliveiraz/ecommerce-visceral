'use client'

interface FullScreenImageSectionProps {
    src: string;
    alt?: string;
}

export default function FullScreenImageSection({ src, alt }: FullScreenImageSectionProps) {
    return (
        <section
            className="
        relative w-full
      
        sm:h-[350px]
        md:h-[500px]
        lg:h-[650px]
        bg-fixed  bg-cover
        
      "
            style={{ backgroundImage: `url(${src})`, height: '100vh' }} // Usando '80vh' para altura proporcional à tela
            aria-label={alt}
        >

            <div className="absolute inset-0 bg-black/30" />
        </section>
    );
}
