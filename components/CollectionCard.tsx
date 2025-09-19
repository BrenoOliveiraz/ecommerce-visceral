"use client";

import Image from "next/image";
import Link from "next/link";

interface CollectionCardProps {
    image: string;
    title: string;
    onClick?: () => void; // opcional: permite clique personalizado
}

export default function CollectionCard({ image, title, onClick }: CollectionCardProps) {
    return (
        <div className="flex flex-col items-center ">
            <button
                onClick={onClick}
                className="w-36 h-36 rounded-full border-4 border-red-600 overflow-hidden flex items-center justify-center transition-transform hover:scale-105 focus:outline-none"
            >
                <div className="relative w-full h-full">

                    <Link href="./">

                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover cursor-pointer"
                        />

                    </Link>

                </div>
            </button>
            <p className="mt-2 font-semibold">{title}</p>
        </div>
    );
}
