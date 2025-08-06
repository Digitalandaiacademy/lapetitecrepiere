"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSupabase } from "@/components/providers";
import type { Category, Product } from "@/lib/types";

export default function CategoryPage({ params }: { params: { id: string } }) {
  const { supabase } = useSupabase();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: categoryData } = await supabase
        .from("categories")
        .select("*")
        .eq("id", params.id)
        .single();
      setCategory(categoryData);
      if (categoryData) {
        const { data: productData } = await supabase
          .from("products")
          .select("*")
          .eq("category", categoryData.name);
        setProducts(productData || []);
      }
    };
    fetchData();
  }, [supabase, params.id]);

  return (
    <div>
      <section className="bg-cream text-center py-12">
        <h1 className="text-4xl font-bold text-brown mb-2">{category?.name}</h1>
        <p className="text-brown/80">{category?.description}</p>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
      </section>
    </div>
  );
}
