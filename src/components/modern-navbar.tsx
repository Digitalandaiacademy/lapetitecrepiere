"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, Heart, Star } from "lucide-react";
import { useSupabase } from "@/components/providers";
import { useCart } from "@/lib/cart-context";

export function ModernNavbar() {
  const { user } = useSupabase();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-orange-600">
            La Petite Crêpière
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-brown hover:text-orange-600 transition-colors">
              Accueil
            </Link>
            <Link href="/menu" className="text-brown hover:text-orange-600 transition-colors">
              Menu
            </Link>
            <Link href="/categories" className="text-brown hover:text-orange-600 transition-colors">
              Catégories
            </Link>
            <Link href="/about" className="text-brown hover:text-orange-600 transition-colors">
              À propos
            </Link>
            
            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Link href="/liked" className="relative text-brown hover:text-orange-600">
                <Heart className="w-5 h-5" />
              </Link>
              <Link href="/favorites" className="relative text-brown hover:text-orange-600">
                <Star className="w-5 h-5" />
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
              <Link
                href="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Mon Compte
              </Link>
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
              <Link href="/menu" className="text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                Menu
              </Link>
              <Link href="/categories" className="text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                Catégories
              </Link>
              <Link href="/about" className="text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                À propos
              </Link>
              <Link href="/liked" className="text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                Produits likés
              </Link>
              <Link href="/favorites" className="text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                Favoris
              </Link>
              <Link href="/order" className="text-brown hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                Panier ({getTotalItems()})
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
