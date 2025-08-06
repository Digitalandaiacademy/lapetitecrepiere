"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";

interface CartItem {
  product_id: string;
  quantity: number;
  product: Product;
}

export default function OrderPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    const items = stored ? JSON.parse(stored) : [];
    if (items.length === 0) {
      router.replace("/menu");
    } else {
      setCart(items);
    }
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-brown mb-8 text-center">Passer une commande</h1>
      {cart.length > 0 && (
        <form className="max-w-xl mx-auto bg-cream p-6 rounded-lg shadow">
          {cart.map((item) => (
            <div key={item.product_id} className="flex justify-between mb-2">
              <span>{item.product.name}</span>
              <span>x{item.quantity}</span>
            </div>
          ))}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-brown mb-2">
              Nom
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-brown/20 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-brown mb-2">
              Téléphone
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full p-2 border border-brown/20 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="details" className="block text-sm font-medium text-brown mb-2">
              Détails de la commande
            </label>
            <textarea
              id="details"
              rows={4}
              className="w-full p-2 border border-brown/20 rounded"
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}
