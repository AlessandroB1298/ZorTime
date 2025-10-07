"use client";
import Features from "./components/features";
import Footer from "./components/footer";
import Hero from "./components/hero";
import { NavbarComponent } from "./components/navbar";
import { ProductCarousel } from "./components/productCarousel";

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavbarComponent />
      <Hero />
      <Features />
      <ProductCarousel />
      <Footer />
    </main>
  );
}
