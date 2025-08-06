"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers";
import type { Review } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export function ModernReviews() {
  const { supabase } = useSupabase();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      setReviews(data || []);
      setLoading(false);
    };
    fetchReviews();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !message.trim()) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert({ 
          user_name: name.trim(), 
          message: message.trim(), 
          rating 
        })
        .select()
        .single();
      
      if (error) {
        console.error("Erreur lors de l'envoi de l'avis:", error);
        alert("Erreur lors de l'envoi de l'avis. Veuillez réessayer.");
      } else if (data) {
        setReviews([data, ...reviews]);
        setName("");
        setMessage("");
        setRating(5);
        alert("Merci pour votre avis !");
      }
    } catch (error) {
      console.error("Erreur inattendue:", error);
      alert("Une erreur inattendue s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-4">
        {/* Titre */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brown mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-lg text-brown/70 max-w-2xl mx-auto">
            Découvrez les expériences de nos clients satisfaits
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mb-12 bg-white p-6 rounded-lg shadow-lg space-y-4"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre avis"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows={4}
            required
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Note :</span>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>
          <Button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white w-full"
          >
            Envoyer mon avis
          </Button>
        </form>

        {/* Liste des avis */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4" />
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gray-300" />
                  ))}
                </div>
                <div className="h-20 bg-gray-200 rounded" />
              </Card>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center">
            <Quote className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <p className="text-brown text-lg">
              Aucun avis pour le moment. Soyez le premier à partager votre
              expérience !
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="p-6 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-600 font-bold mr-4">
                    {review.user_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-brown">
                      {review.user_name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-orange-400 mb-2" />
                <p className="text-brown/80 text-sm leading-relaxed">
                  {review.message}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
