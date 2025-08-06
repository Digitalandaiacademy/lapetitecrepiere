"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSupabase } from "@/components/providers";
import type { Product } from "@/lib/types";

export function FeaturedProducts() {
  const { supabase } = useSupabase();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true);
      setProducts(data || []);
    };
    fetchProducts();
  }, [supabase]);

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
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-brown mb-2">{product.name}</h3>
                <p className="text-sm text-brown mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">{product.price} FCFA</span>
                  <Link
                    href={`/product/${product.id}`}
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