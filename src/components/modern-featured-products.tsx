"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ShoppingCart, Heart, Star } from "lucide-react";
import { useSupabase } from "@/components/providers";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ModernFeaturedProducts() {
  const { supabase } = useSupabase();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await supabase
          .from("products")
          .select("*")
          .eq("is_featured", true);
        setProducts(data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [supabase]);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brown mb-4">
            Produits en Vedette
          </h2>
          <p className="text-lg text-brown/70 max-w-2xl mx-auto">
            Découvrez nos produits les plus populaires et nos promotions spéciales
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                      <span className="text-4xl">🥞</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/90 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-brown mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-orange-600">
                      {product.price} FCFA
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <Link href={`/product/${product.id}`}>Détails</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

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
