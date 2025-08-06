"use client";

import { useState } from "react";
import { ChevronDown, Star, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModernHero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 via-orange-800/50 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop"
          alt="Crêperie"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          La Petite Crêpière
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-orange-100">
          Chaque bouchée est un voyage gustatif
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
          >
            Commander Maintenant
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3"
          >
            Voir le Menu
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <MapPin className="w-6 h-6 mx-auto mb-2 text-orange-400" />
            <p className="text-sm">Yaoundé, Cameroun</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Clock className="w-6 h-6 mx-auto mb-2 text-orange-400" />
            <p className="text-sm">7j/7 - 8h-22h</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Phone className="w-6 h-6 mx-auto mb-2 text-orange-400" />
            <p className="text-sm">+237 6XX XXX XXX</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
}
