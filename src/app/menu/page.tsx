"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSupabase } from "@/components/providers";
import { useCart } from "@/lib/cart-context";
import type { Product, Category } from "@/lib/types";
import { Categories } from "@/components/categories";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Heart, ShoppingCart } from "lucide-react";

export default function MenuPage() {
  const { supabase } = useSupabase();
  const [products, setProducts] = useState<Product[]>([]);
  const [displayed, setDisplayed] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: prodData } = await supabase.from("products").select("*");
      setProducts(prodData || []);
      setDisplayed(prodData || []);
      const { data: catData } = await supabase.from("categories").select("*");
      setCategories(catData || []);
    };
    fetchData();
  }, [supabase]);

  useEffect(() => {
    let filtered = [...products];
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }
    setDisplayed(filtered);
  }, [search, category, products]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-cream py-16 text-center shadow-inner">
        <h1 className="text-4xl md:text-5xl font-bold text-brown mb-4">
          Notre Menu
        </h1>
        <p className="text-brown/80 text-lg">
          Découvrez toutes nos spécialités, préparées avec passion
        </p>

        {/* Search & Filter */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center max-w-3xl mx-auto">
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
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm w-full md:w-auto">
            <Filter className="w-5 h-5 text-gray-400 mr-2" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 outline-none text-gray-700 bg-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <Categories />

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brown mb-8 text-center">
            Tous les Produits
          </h2>

          {displayed.length === 0 ? (
            <p className="text-center text-brown/60">Aucun produit trouvé.</p>
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
