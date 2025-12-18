"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import LanguageSetter from "@/components/LanguageSetter";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <>
      <LanguageSetter />
      <Header 
        selectedCategory={selectedCategory} 
        onCategoryChange={(category) => {
          setSelectedCategory(category || undefined);
          setSelectedFilter(null); // Réinitialiser le filtre quand on change de catégorie
        }}
        selectedFilter={selectedFilter}
        onFilterChange={(filter) => setSelectedFilter(filter)}
      />
      <Hero selectedCategory={selectedCategory} selectedFilter={selectedFilter} />
      <HowItWorks />
      <Footer />
    </>
  );
}



