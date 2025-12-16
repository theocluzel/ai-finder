"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe, X } from "lucide-react";
import About from "./About";
import LogoAnimated from "./LogoAnimated";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string | null) => void;
}

export default function Header({ selectedCategory, onCategoryChange }: HeaderProps) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const categories = [
    { value: null, label: t.allCategories },
    { value: "Image", label: t.categoryImage },
    { value: "Design", label: t.categoryDesign },
    { value: "Vidéo", label: t.categoryVideo },
    { value: "Rédaction", label: t.categoryWriting },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string | null) => {
    onCategoryChange?.(category);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass-strong"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="scale-90 sm:scale-100"
            >
              <div className="sm:hidden">
                <LogoAnimated size={36} />
              </div>
              <div className="hidden sm:block">
                <LogoAnimated size={44} />
              </div>
            </motion.div>
            
            <nav className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {/* Menu déroulant des catégories */}
              <div className="relative" ref={dropdownRef}>
                <div className="flex items-center gap-1.5">
                  <motion.button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base glass rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-1 sm:gap-2 ${
                      selectedCategory ? 'bg-purple-500/20' : ''
                    }`}
                  >
                    <span className="hidden sm:inline">
                      {selectedCategory ? categories.find(c => c.value === selectedCategory)?.label : t.allCategories}
                    </span>
                    <span className="sm:hidden">Cat.</span>
                    <ChevronDown 
                      className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </motion.button>
                  
                  {/* Bouton pour enlever le filtre */}
                  {selectedCategory && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategorySelect(null);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 glass rounded-lg text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                      title={t.removeFilter}
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                  )}
                </div>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 sm:w-56 glass-strong rounded-xl overflow-hidden shadow-xl"
                    >
                      {categories.map((category) => (
                        <button
                          key={category.value || "all"}
                          onClick={() => handleCategorySelect(category.value || null)}
                          className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm transition-colors ${
                            (!selectedCategory && !category.value) || selectedCategory === category.value
                              ? "bg-purple-500/20 text-purple-300"
                              : "text-gray-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {category.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sélecteur de langue */}
              <div className="relative" ref={langDropdownRef}>
                <motion.button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 glass rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-semibold uppercase">{language}</span>
                  <ChevronDown 
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </motion.button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-32 glass-strong rounded-xl overflow-hidden shadow-xl"
                    >
                      <button
                        onClick={() => {
                          setLanguage('fr');
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm transition-colors ${
                          language === 'fr'
                            ? "bg-purple-500/20 text-purple-300"
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        🇫🇷 Français
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('en');
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm transition-colors ${
                          language === 'en'
                            ? "bg-purple-500/20 text-purple-300"
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        🇬🇧 English
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                onClick={() => setIsAboutOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-xs sm:text-sm md:text-base text-gray-300 hover:text-white transition-colors hidden md:block"
              >
                {t.aboutTitle}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base glass rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <span className="hidden sm:inline">Prochainement</span>
                <span className="sm:hidden">Soon</span>
              </motion.button>
            </nav>
          </div>
        </div>
      </motion.header>
      
      <About isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
}

