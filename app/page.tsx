"use client";
import Features from "./components/features";
import Footer from "./components/footer";
import Hero from "./components/hero";
import { ProductCarousel } from "./components/productCarousel";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <ProductCarousel />
      <Footer />
    </main>
  );
}
