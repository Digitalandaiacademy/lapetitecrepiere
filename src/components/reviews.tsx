"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers";
import type { Review } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function Reviews() {
  const { supabase } = useSupabase();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      setReviews(data || []);
    };
    fetchReviews();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("reviews")
      .insert({ user_name: name, message })
      .select()
      .single();
    if (!error && data) {
      setReviews([data, ...reviews]);
      setName("");
      setMessage("");
    }
  };

  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-brown mb-8 text-center">Avis</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-8">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            className="w-full mb-2 px-4 py-2 border rounded"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre avis"
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <Button type="submit" className="bg-orange-600 text-white">
            Envoyer
          </Button>
        </form>
        <div className="max-w-2xl mx-auto space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{r.user_name}</p>
              <p>{r.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
