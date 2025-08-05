"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-orange-600">
          La Petite Crêpière
        </Link>
        <div className="hidden md:flex space-x-6 text-brown">
          <Link href="/" className="hover:text-orange-600">Accueil</Link>
          <Link href="/menu" className="hover:text-orange-600">Menu</Link>
          <Link href="/about" className="hover:text-orange-600">À propos</Link>
          <Link href="/order" className="hover:text-orange-600">Commander</Link>
        </div>
        <button
          className="md:hidden text-brown"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white/95 px-4 pb-4 flex flex-col space-y-2 text-brown">
          <Link href="/" className="hover:text-orange-600" onClick={() => setOpen(false)}>
            Accueil
          </Link>
          <Link href="/menu" className="hover:text-orange-600" onClick={() => setOpen(false)}>
            Menu
          </Link>
          <Link href="/about" className="hover:text-orange-600" onClick={() => setOpen(false)}>
            À propos
          </Link>
          <Link href="/order" className="hover:text-orange-600" onClick={() => setOpen(false)}>
            Commander
          </Link>
        </div>
      )}
    </nav>
  );
}

