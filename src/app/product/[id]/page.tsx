import { products } from "@/lib/data";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-brown mb-4">{product.name}</h1>
          <p className="text-brown mb-6">{product.description}</p>
          <div className="text-2xl font-bold text-orange-600 mb-6">
            {product.price} FCFA
          </div>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}

