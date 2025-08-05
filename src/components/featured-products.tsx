"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

const featuredProducts = [
  {
    id: "1",
    name: "12 Crêpes Nature",
    description: "12 délicieuses crêpes nature, parfaites pour le petit-déjeuner",
    price: 2000,
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500",
    href: "/product/1"
  },
  {
    id: "2",
    name: "12 Crêpes Nutella",
    description: "12 crêpes généreusement garnies de Nutella",
    price: 4000,
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500",
    href: "/product/2"
  },
  {
    id: "3",
    name: "Burger Classique",
    description: "Burger avec pain frais, steak juteux et légumes croquants",
    price: 1000,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    href: "/product/3"
  },
  {
    id: "4",
    name: "Jus de Baobab",
    description: "Jus naturel de baobab 250ml, riche en vitamines",
    price: 500,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
    href: "/product/4"
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brown mb-4">
            Produits en Vedette
          </h2>
          <p className="text-lg text-brown max-w-2xl mx-auto">
            Découvrez nos produits les plus populaires et nos promotions spéciales
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-brown mb-2">{product.name}</h3>
                <p className="text-sm text-brown mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">{product.price} FCFA</span>
                  <Link
                    href={product.href}
                    className="text-orange-600 hover:text-orange-700 flex items-center"
                  >
                    Voir
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/menu"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Voir tous les produits
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
