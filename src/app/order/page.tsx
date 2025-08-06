"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers";
import { useCart } from "@/lib/cart-context";
import type { CartItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";

export default function OrderPage() {
  const { supabase, user } = useSupabase();
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
    omNumber: "695265626",
    momoNumber: "651245847"
  });

  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/menu");
    }
  }, [cart, router]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (formData.paymentMethod === "om") {
      alert(`Paiement Orange Money au numéro: ${formData.omNumber}\nLe nom du récepteur sera: Obah Chanel`);
    } else if (formData.paymentMethod === "momo") {
      alert(`Paiement MoMo au numéro: ${formData.momoNumber}\nLe nom du récepteur sera: Obah Chanel`);
    } else if (formData.paymentMethod === "cash") {
      alert("Paiement en espèces à la livraison");
    }

    // Here you would typically create the order in your database
    alert("Commande enregistrée avec succès!");
    clearCart();
    router.push("/");
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brown mb-4">Votre panier est vide</h1>
          <Button onClick={() => router.push("/menu")} className="bg-orange-500 text-white">
            Explorer les produits
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-brown mb-8 text-center">Votre Panier</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-brown mb-4">Articles</h2>
              {cart.map((item) => (
                <div key={item.product_id} className="flex items-center gap-4 py-4 border-b">
                  {item.product.image_url && (
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-orange-600 font-bold">{item.product.price} FCFA</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.product_id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-brown mb-4">Résumé</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{getTotalPrice()} FCFA</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{getTotalPrice()} FCFA</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brown mb-2">Nom complet</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brown mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Votre numéro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brown mb-2">Adresse de livraison</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="Où souhaitez-vous être livré?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brown mb-2">Mode de paiement</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="cash">Espèces à la livraison</option>
                  <option value="om">Orange Money (695265626)</option>
                  <option value="momo">MoMo (651245847)</option>
                </select>
              </div>

              {formData.paymentMethod === "om" && (
                <div className="bg-orange-50 p-3 rounded">
                  <p className="text-sm">
                    <strong>Orange Money:</strong> 695265626<br />
                    <strong>Nom du récepteur:</strong> Obah Chanel
                  </p>
                </div>
              )}

              {formData.paymentMethod === "momo" && (
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm">
                    <strong>MoMo:</strong> 651245847<br />
                    <strong>Nom du récepteur:</strong> Obah Chanel
                  </p>
                </div>
              )}

              <Button
                onClick={handlePayment}
                className="w-full bg-orange-500 text-white"
                disabled={loading}
              >
                {loading ? "Traitement..." : "Commander"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
