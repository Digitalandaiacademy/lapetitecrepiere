"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200"
        alt="Table de restaurant"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          La Petite Crêpière
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Chaque bouchée est un voyage gustatif !
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto opacity-90">
          Découvrez nos délicieuses crêpes, burgers savoureux et boissons rafraîchissantes
          dans le cœur de Yaoundé, Cameroun.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-orange-600 hover:bg-orange-50"
          >
            <Link href="/menu">
              Voir le Menu
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white hover:text-orange-600"
          >
            <Link href="/order">
              Commander Maintenant
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
