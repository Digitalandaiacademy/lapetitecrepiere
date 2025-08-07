"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Share2, MessageSquare } from "lucide-react";

interface CommentType {
  id: string;
  user_name: string;
  message: string;
  created_at: string;
}

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { supabase, user } = useSupabase();
  const { addToCart } = useCart();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    setProductId(params.id);
  }, [params]);

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Product
        const { data: productData } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (productData) {
          setProduct(productData);

          // Likes count
          const { count: likesCount } = await supabase
            .from("product_likes")
            .select("*", { count: "exact", head: true })
            .eq("product_id", productId);

          setLikesCount(likesCount || 0);

          // User like/fav
          if (user) {
            const { data: like } = await supabase
              .from("product_likes")
              .select("id")
              .eq("product_id", productId)
              .eq("user_id", user.id)
              .maybeSingle();
            setLiked(!!like);

            const { data: fav } = await supabase
              .from("favorites")
              .select("id")
              .eq("product_id", productId)
              .eq("user_id", user.id)
              .maybeSingle();
            setFavorite(!!fav);
          }

          // Comments
          const { data: commentData } = await supabase
            .from("comments")
            .select("*")
            .eq("product_id", productId)
            .order("created_at", { ascending: false });

          setComments(commentData || []);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase, productId, user]);

  const toggleLike = async () => {
    if (!user || !product) {
      alert("Connectez-vous pour aimer ce produit");
      return;
    }

    try {
      if (liked) {
        await supabase
          .from("product_likes")
          .delete()
          .eq("product_id", product.id)
          .eq("user_id", user.id);
        setLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await supabase.from("product_likes").insert({
          product_id: product.id,
          user_id: user.id,
        });
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!user || !product) {
      alert("Connectez-vous pour ajouter aux favoris");
      return;
    }
    try {
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
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !comment) return;

    try {
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
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: product?.name, url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Lien copié dans le presse-papiers");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-brown mb-4">
          Produit introuvable
        </h1>
        <Button
          onClick={() => router.push("/menu")}
          className="bg-orange-500 text-white"
        >
          Retour au menu
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="overflow-hidden rounded-lg shadow-lg">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>

        {/* Infos */}
        <div>
          <h1 className="text-4xl font-bold text-brown mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="text-3xl font-bold text-orange-600 mb-6">
            {product.price} FCFA
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 mb-6">
            <button
              onClick={toggleLike}
              className="flex items-center gap-2 text-gray-500 hover:text-red-500"
            >
              <Heart
                className={`w-6 h-6 ${
                  liked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {likesCount}
            </button>
            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-2 ${
                favorite
                  ? "text-orange-500"
                  : "text-gray-500 hover:text-orange-500"
              }`}
            >
              <Heart className={favorite ? "fill-orange-500" : ""} />
              Favori
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button
              onClick={handleAddToCart}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              <ShoppingCart className="w-4 h-4 mr-2" /> Ajouter au panier
            </Button>
            <Button onClick={handleShare} variant="outline">
              <Share2 className="w-4 h-4 mr-2" /> Partager
            </Button>
          </div>

          {/* Commentaires */}
          <h2 className="text-2xl font-semibold text-brown mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" /> Commentaires
          </h2>
          <form onSubmit={handleComment} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Votre commentaire..."
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows={3}
            />
            <Button
              type="submit"
              className="bg-orange-600 text-white hover:bg-orange-700"
            >
              Commenter
            </Button>
          </form>

          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-brown">{c.user_name}</p>
                <p className="text-sm text-gray-600">{c.message}</p>
                <span className="text-xs text-gray-400">
                  {new Date(c.created_at).toLocaleDateString("fr-FR")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
