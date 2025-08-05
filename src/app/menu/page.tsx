import { Categories } from "@/components/categories";
import { products } from "@/lib/data";
import Link from "next/link";

export default function MenuPage() {
  return (
    <div>
      <section className="bg-cream text-center py-12">
        <h1 className="text-4xl font-bold text-brown mb-2">Notre Menu</h1>
        <p className="text-brown/80">Découvrez toutes nos spécialités</p>
      </section>
      <Categories />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brown mb-8 text-center">Tous les Produits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-cream rounded-lg shadow-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-brown mb-2">{product.name}</h3>
                  <p className="text-sm text-brown mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">{product.price} FCFA</span>
                    <Link
                      href={product.href}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

