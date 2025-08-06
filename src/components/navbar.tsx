"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers";
import type { Category } from "@/lib/types";

export function Navbar() {
  const { supabase, user } = useSupabase();
  const [open, setOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("*");
      setCategories(data || []);
    };
    fetchCategories();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-orange-600">
          La Petite Crêpière
        </Link>
        <div className="hidden md:flex space-x-6 text-brown items-center">
          <Link href="/" className="hover:text-orange-600">Accueil</Link>
          <div className="relative">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="hover:text-orange-600"
            >
              Catégories
            </button>
            {showCategories && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/categories/${c.id}`}
                    className="block px-4 py-2 hover:bg-orange-50"
                    onClick={() => setShowCategories(false)}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/menu" className="hover:text-orange-600">Menu</Link>
          <Link href="/about" className="hover:text-orange-600">À propos</Link>
          <Link href="/order" className="hover:text-orange-600">Commander</Link>
          {user ? (
            <button onClick={handleLogout} className="hover:text-orange-600">
              Déconnexion
            </button>
          ) : (
            <Link href="/login" className="hover:text-orange-600">
              Se connecter
            </Link>
          )}
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
          <details>
            <summary className="cursor-pointer py-2">Catégories</summary>
            <div className="pl-4 flex flex-col">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.id}`}
                  className="py-1 hover:text-orange-600"
                  onClick={() => setOpen(false)}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </details>
          <Link href="/menu" className="hover:text-orange-600" onClick={() => setOpen(false)}>
            Menu
          </Link>
          <Link href="/about" className="hover:text-orange-600" onClick={() => setOpen(false)}>
            À propos
          </Link>
          <Link href="/order" className="hover:text-orange-600" onClick={() => setOpen(false)}>
            Commander
          </Link>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="text-left hover:text-orange-600"
            >
              Déconnexion
            </button>
          ) : (
            <Link href="/login" className="hover:text-orange-600" onClick={() => setOpen(false)}>
              Se connecter
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

