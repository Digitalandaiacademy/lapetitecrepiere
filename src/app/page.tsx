import { Hero } from "@/components/hero";
import { FeaturedProducts } from "@/components/featured-products";
import { Categories } from "@/components/categories";
import { About } from "@/components/about";
import { Reviews } from "@/components/reviews";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Categories />
      <FeaturedProducts />
      <Reviews />
    </div>
  );
}
