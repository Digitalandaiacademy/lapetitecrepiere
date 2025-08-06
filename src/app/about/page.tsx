import Link from "next/link";
import { ChevronLeft, Heart, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="mr-4">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-brown mb-12">
            À Propos de La Petite Crêpière
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <p className="text-lg text-brown mb-6">
                Bienvenue à La Petite Crêpière, votre destination préférée pour des saveurs authentiques 
                et des moments inoubliables au cœur de Yaoundé, Cameroun.
              </p>
              <p className="text-lg text-brown mb-6">
                Notre mission est simple : offrir à chaque client une expérience gastronomique unique 
                où chaque bouchée est véritablement un voyage gustatif. Nous croyons en la qualité, 
                la fraîcheur et l&apos;amour que nous mettons dans chaque plat que nous servons.
              </p>
              <p className="text-lg text-brown">
                Que vous soyez à la recherche d&apos;un petit-déjeuner rapide, d&apos;un déjeuner savoureux
                ou d&apos;un dîner délicieux, nous sommes là pour satisfaire vos papilles.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Nos Valeurs</h3>
              <ul className="space-y-3 text-brown">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Qualité et fraîcheur garanties</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Service rapide et amical</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Ingrédients locaux et frais</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Prix abordables pour tous</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-brown mb-2">Chef Expert</h3>
              <p className="text-brown/80">Des années d&apos;expérience dans la création de crêpes parfaites</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-brown mb-2">Service Attentionné</h3>
              <p className="text-brown/80">Un accueil chaleureux et un service personnalisé</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-brown mb-2">Qualité Premium</h3>
              <p className="text-brown/80">Des ingrédients soigneusement sélectionnés pour votre plaisir</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-brown mb-4">Nous Contacter</h2>
            <p className="text-lg text-brown mb-6">
              Des questions ou des suggestions ? N&apos;hésitez pas à nous contacter !
            </p>
            <div className="space-y-4">
              <p className="text-brown">
                <strong>Adresse :</strong> Yaoundé, Cameroun
              </p>
              <p className="text-brown">
                <strong>Téléphone :</strong> +237 XXX XXX XXX
              </p>
              <p className="text-brown">
                <strong>Email :</strong> contact@lapetitecrepiere.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
