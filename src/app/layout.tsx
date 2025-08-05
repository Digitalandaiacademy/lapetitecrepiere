import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";

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
          <div className="min-h-screen">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
