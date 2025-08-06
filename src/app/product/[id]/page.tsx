"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface CommentType {
  id: string;
  user_name: string;
  message: string;
}

interface CartItem {
  product_id: string;
  quantity: number;
  product: Product;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { supabase, user } = useSupabase();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();
      setProduct(data);
      if (data) {
        let sessionId = localStorage.getItem("session_id");
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          localStorage.setItem("session_id", sessionId);
        }
        await supabase.from("product_views").insert({
          product_id: data.id,
          user_id: user?.id,
          session_id: sessionId,
        });
      }
      if (user) {
        const { data: like } = await supabase
          .from("product_likes")
          .select("id")
          .eq("product_id", params.id)
          .eq("user_id", user.id)
          .maybeSingle();
        setLiked(!!like);
        const { data: fav } = await supabase
          .from("favorites")
          .select("id")
          .eq("product_id", params.id)
          .eq("user_id", user.id)
          .maybeSingle();
        setFavorite(!!fav);
      }
      const { data: commentData } = await supabase
        .from("comments")
        .select("*")
        .eq("product_id", params.id)
        .order("created_at", { ascending: false });
      setComments(commentData || []);
    };
    fetchData();
  }, [supabase, params.id, user]);

  const toggleLike = async () => {
    if (!user || !product) {
      alert("Connectez-vous");
      return;
    }
    if (liked) {
      await supabase
        .from("product_likes")
        .delete()
        .eq("product_id", product.id)
        .eq("user_id", user.id);
      setLiked(false);
    } else {
      await supabase.from("product_likes").insert({
        product_id: product.id,
        user_id: user.id,
      });
      setLiked(true);
    }
  };

  const toggleFavorite = async () => {
    if (!user || !product) {
      alert("Connectez-vous");
      return;
    }
    if (favorite) {
      await supabase
        .from("favorites")
        .delete()
        .eq("product_id", product.id)
        .eq("user_id", user.id);
      setFavorite(false);
    } else {
      await supabase.from("favorites").insert({
        product_id: product.id,
        user_id: user.id,
      });
      setFavorite(true);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !comment) return;
    const { data: newComment, error } = await supabase
      .from("comments")
      .insert({
        product_id: product.id,
        user_id: user?.id,
        user_name: user?.email || "Anonyme",
        message: comment,
      })
      .select()
      .single();
    if (!error && newComment) {
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  const addToCart = () => {
    if (!product) return;
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.product_id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ product_id: product.id, quantity: 1, product });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/order");
  };

  const shareProduct = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: product?.name, url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Lien copié");
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24">Produit introuvable</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid md:grid-cols-2 gap-8">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-brown mb-4">{product.name}</h1>
          <p className="text-brown mb-6">{product.description}</p>
          <div className="text-2xl font-bold text-orange-600 mb-6">
            {product.price} FCFA
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              onClick={addToCart}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Ajouter au panier
            </Button>
            <Button
              onClick={toggleLike}
              variant="outline"
              className={liked ? "bg-orange-500 text-white" : ""}
            >
              Like
            </Button>
            <Button
              onClick={toggleFavorite}
              variant="outline"
              className={favorite ? "bg-orange-500 text-white" : ""}
            >
              Favori
            </Button>
            <Button onClick={shareProduct} variant="outline">
              Partager
            </Button>
          </div>
          <form onSubmit={handleComment} className="mb-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Votre commentaire"
              className="w-full p-2 border rounded mb-2"
            />
            <Button type="submit" className="bg-orange-600 text-white">
              Envoyer
            </Button>
          </form>
          <div>
            {comments.map((c) => (
              <div key={c.id} className="border-b border-brown/20 py-2">
                <p className="text-sm font-semibold">{c.user_name}</p>
                <p className="text-sm">{c.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
