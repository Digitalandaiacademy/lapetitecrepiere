"use client";

export function About() {
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brown mb-8">
            À Propos de La Petite Crêpière
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
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
        </div>
      </div>
    </section>
  );
}
