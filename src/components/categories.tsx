"use client";

import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Crêpes",
    description: "Délicieuses crêpes préparées avec amour",
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500",
    href: "/menu?category=crêpes"
  },
  {
    name: "Burgers & Snacks",
    description: "Burgers savoureux et snacks rapides",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    href: "/menu?category=burgers-snacks"
  },
  {
    name: "Boissons",
    description: "Boissons fraîches et rafraîchissantes",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
    href: "/menu?category=boissons"
  }
];

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brown mb-4">
            Nos Catégories
          </h2>
          <p className="text-lg text-brown max-w-2xl mx-auto">
            Découvrez nos différentes catégories de produits, chacune offrant une expérience gustative unique
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brown mb-2">{category.name}</h3>
                  <p className="text-brown mb-4">{category.description}</p>
                  <div className="flex items-center text-orange-600 group-hover:text-orange-700">
                    <span>Voir les produits</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
