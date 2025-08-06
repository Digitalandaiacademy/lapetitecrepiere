"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSupabase } from "@/components/providers";
import { useCart } from "@/lib/cart-context";
import type { Category, Product } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Heart, ShoppingCart } from "lucide-react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { supabase } = useSupabase();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [displayed, setDisplayed] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  // Filtres
  const [search, setSearch] = useState("");
  const [priceOrder, setPriceOrder] = useState("");

  useEffect(() => {
    params.then(({ id }) => setCategoryId(id));
  }, [params]);

  useEffect(() => {
    if (!categoryId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: categoryData } = await supabase
          .from("categories")
          .select("*")
          .eq("id", categoryId)
          .single();
        setCategory(categoryData);

        if (categoryData) {
          const { data: productData } = await supabase
            .from("products")
            .select("*")
            .eq("category", categoryData.name);
          setProducts(productData || []);
          setDisplayed(productData || []);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [supabase, categoryId]);

  // Filtrage dynamique
  useEffect(() => {
    let filtered = [...products];
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (priceOrder) {
      filtered.sort((a, b) =>
        priceOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    }
    setDisplayed(filtered);
  }, [search, priceOrder, products]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-orange-50 to-cream text-center py-12 shadow-inner">
        <h1 className="text-4xl md:text-5xl font-bold text-brown mb-3">
          {category?.name}
        </h1>
        <p className="text-brown/80 max-w-2xl mx-auto">
          {category?.description}
        </p>

        {/* Barre de recherche & tri */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center max-w-3xl mx-auto">
          {/* Recherche */}
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm w-full md:w-auto">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Recherche..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-gray-700"
            />
          </div>

          {/* Tri par prix */}
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm w-full md:w-auto">
            <Filter className="w-5 h-5 text-gray-400 mr-2" />
            <select
              value={priceOrder}
              onChange={(e) => setPriceOrder(e.target.value)}
              className="flex-1 outline-none text-gray-700 bg-transparent"
            >
              <option value="">Trier par</option>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>
        </div>
      </section>

      {/* Produits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse overflow-hidden">
                  <div className="w-full h-48 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </Card>
              ))}
            </div>
          ) : displayed.length === 0 ? (
            <p className="text-center text-brown/60">
              Aucun produit trouvé dans cette catégorie.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayed.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
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
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-brown mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-orange-600">
                        {product.price} FCFA
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-orange-500 text-orange-600 hover:bg-orange-50"
                      >
                        <Link href={`/product/${product.id}`}>Détails</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
