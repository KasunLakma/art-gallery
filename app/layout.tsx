import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import { CartProvider } from "@/src/context/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Art Gallery | Premium Curated Gifts",
  description: "Boutique small business specializing in curated gift items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${playfair.variable} ${jakarta.variable} font-jakarta min-h-full flex flex-col`}>
        <CartProvider>
          <Navbar />
          <main className="pt-20 flex-1 flex flex-col">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}

