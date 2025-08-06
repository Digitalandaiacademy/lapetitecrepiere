"use client";

import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers";
import type { Category } from "@/lib/types";

export function Categories() {
  const { supabase } = useSupabase();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("*");
      setCategories(data || []);
    };
    fetchCategories();
  }, [supabase]);

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
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  {category.image_url && (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
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
