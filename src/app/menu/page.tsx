"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSupabase } from "@/components/providers";
import type { Product, Category } from "@/lib/types";
import { Categories } from "@/components/categories";

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
      <section className="bg-cream text-center py-12">
        <h1 className="text-4xl font-bold text-brown mb-2">Notre Menu</h1>
        <p className="text-brown/80">Découvrez toutes nos spécialités</p>
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Recherche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </section>
      <Categories />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brown mb-8 text-center">Tous les Produits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayed.map((product) => (
              <div key={product.id} className="bg-cream rounded-lg shadow-lg overflow-hidden">
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
                      className="text-orange-600 hover:text-orange-700"
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
