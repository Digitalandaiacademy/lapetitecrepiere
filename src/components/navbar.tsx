"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, Heart, Star } from "lucide-react";
import { useSupabase } from "@/components/providers";
import { useCart } from "@/lib/cart-context";
import type { Category } from "@/lib/types";
import Image from "next/image";

export function Navbar() {
  const { supabase, user } = useSupabase();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [likedCount, setLikedCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: cats } = await supabase.from("categories").select("*");
      setCategories(cats || []);

      if (user) {
        const { count: likes } = await supabase
          .from("product_likes")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);
        setLikedCount(likes || 0);

        const { count: favs } = await supabase
          .from("favorites")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);
        setFavoritesCount(favs || 0);
      }
    };
    fetchData();
  }, [supabase, user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/img/lapetitecrepiere.png"
              alt="La Petite Crêpière"
              width={80}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-orange-600 hidden sm:inline whitespace-nowrap">
              La Petite Crêpière
            </span>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-brown hover:text-orange-600 transition-colors">
              Accueil
            </Link>

            {/* Catégories Dropdown */}
            <div className="relative group">
              <button className="text-brown hover:text-orange-600 transition-colors">
                Catégories
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/categories/${c.id}`}
                    className="block px-4 py-2 hover:bg-orange-50"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/menu" className="text-brown hover:text-orange-600 transition-colors">
              Menu
            </Link>
            <Link href="/about" className="text-brown hover:text-orange-600 transition-colors">
              À propos
            </Link>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Link href="/liked" className="relative text-brown hover:text-orange-600">
                <Heart className="w-5 h-5" />
                {likedCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {likedCount}
                  </span>
                )}
              </Link>

              <Link href="/favorites" className="relative text-brown hover:text-orange-600">
                <Star className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              <Link href="/order" className="relative text-brown hover:text-orange-600">
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Déconnexion
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Se connecter
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-brown"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>

              {/* Catégories */}
              <details>
                <summary className="cursor-pointer py-2">Catégories</summary>
                <div className="pl-4 flex flex-col">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/categories/${c.id}`}
                      className="py-1 hover:text-orange-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </details>

              <Link href="/menu" className="text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                Menu
              </Link>
              <Link href="/about" className="text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                À propos
              </Link>
              <Link href="/liked" className="flex items-center gap-2 text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                <Heart className="w-5 h-5" /> ({likedCount})
              </Link>
              <Link href="/favorites" className="flex items-center gap-2 text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                <Star className="w-5 h-5" /> ({favoritesCount})
              </Link>
              <Link href="/order" className="flex items-center gap-2 text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                <ShoppingCart className="w-5 h-5" /> ({getTotalItems()})
              </Link>

              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-brown hover:text-orange-600"
                >
                  Déconnexion
                </button>
              ) : (
                <Link href="/login" className="text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
