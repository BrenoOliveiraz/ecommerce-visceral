"use client";

import Image from "next/image";

interface CollectionCardProps {
  title: string;

  image: string;
}

export default function CollectionCard({ title, image }: CollectionCardProps) {
  return (
    <div className="group relative flex flex-col items-center text-center p-4 rounded-2xl">

      <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border-4 overflow-hidden  bg-neutral-950  border-red-700/40 shadow-lg shadow-red-900/20 hover:shadow-red-600/50 hover:scale-105 transition-all duration-300 cursor-pointer">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

   
      <div className="mt-4">

        <h3 className="text-lg font-bold text-white mt-1">{title}</h3>
      </div>
    </div>
  );
}



