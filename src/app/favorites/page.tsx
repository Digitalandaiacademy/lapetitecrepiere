"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";

export default function FavoritesPage() {
  const { supabase, user } = useSupabase();
  const { addToCart } = useCart();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        
        const { data: favorites } = await supabase
          .from("favorites")
          .select("product_id")
          .eq("user_id", user.id);

        if (favorites && favorites.length > 0) {
          const productIds = favorites.map(item => item.product_id);
          
          const { data: productsData } = await supabase
            .from("products")
            .select("*")
            .in("id", productIds);

          setProducts(productsData || []);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [supabase, user, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brown mb-4">Connectez-vous pour voir vos favoris</h1>
          <Button onClick={() => router.push("/login")} className="bg-orange-500 text-white">
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-brown mb-8 text-center">Favoris</h1>
      
      {products.length === 0 ? (
        <div className="text-center">
          <p className="text-brown mb-4">Aucun favori pour le moment.</p>
          <Button onClick={() => router.push("/menu")} className="bg-orange-500 text-white">
            Explorer les produits
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-brown">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-orange-600">{product.price} FCFA</span>
                  <Button
                    onClick={() => addToCart(product)}
                    className="bg-orange-500 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
