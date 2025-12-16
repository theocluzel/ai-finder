"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  return (
    <>
      <Header 
        selectedCategory={selectedCategory} 
        onCategoryChange={(category) => setSelectedCategory(category || undefined)} 
      />
      <Hero selectedCategory={selectedCategory} />
      <HowItWorks />
      <Footer />
    </>
  );
}



