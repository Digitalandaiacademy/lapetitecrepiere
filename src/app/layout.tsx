import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "La Petite Crêpière - Chaque bouchée est un voyage gustatif !",
  description: "Mini fast-food à Yaoundé, Cameroun. Découvrez nos délicieuses crêpes, burgers et boissons.",
  keywords: "crêpes, burgers, fast-food, Yaoundé, Cameroun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-cream text-brown`}>
        <Providers>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 pt-20">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
