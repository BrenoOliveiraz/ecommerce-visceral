// components/Footer.tsx
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { whatsappLink } from '@/lib/whatsLink';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-gray-400 border-t border-red-800">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Logo + Redes */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <img
            src="/logo-footer.png"
            alt="Visceral Logo"
            className="w-28 mx-auto md:mx-0"
          />

          {/* Redes Sociais */}
          <div className="flex space-x-6">
            <Link
              href="https://www.facebook.com/profile.php?id=61580049101360"
              target="_blank"
              className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition transform hover:scale-110 shadow-lg"
            >
              <Facebook className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.instagram.com/visceralclothing_/"
              target="_blank"
              className="p-3 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:opacity-90 transition transform hover:scale-110 shadow-lg"
            >
              <Instagram className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Menu */}
        <div>
          <h4 className="text-white font-semibold mb-3">Menu</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/collections" className="hover:text-red-500 transition">
                Coleções
              </Link>
            </li>
            <li>
              <Link href={whatsappLink} className="hover:text-red-500 transition">
                Atendimento
              </Link>
            </li>
          </ul>
        </div>

        {/* Direitos */}
        <div className="flex flex-col justify-center md:items-end">
          <p className="text-sm leading-relaxed">
            Copyright © 2025 <br />
            Made by <span className="text-red-500">Breno Oliveira</span> | Visceral Clothing
          </p>
        </div>
      </div>
    </footer>
  );
}
