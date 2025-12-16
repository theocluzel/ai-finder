"use client";

import { motion } from "framer-motion";
import AnimatedSearchBar from "./AnimatedSearchBar";
import AIToolsCarousel from "./AIToolsCarousel";
import { useState, useEffect } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { searchTools, AITool, getToolLogoUrl, getToolsByCategory, getToolDescription } from "@/data/aiTools";
import LogoImage from "./LogoImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateOptimizedPrompt } from "@/lib/promptGenerator";
import { getTranslatedDescription } from "@/lib/descriptionTranslations";

interface HeroProps {
  selectedCategory?: string;
}

export default function Hero({ selectedCategory }: HeroProps) {
  const { t, language } = useLanguage();
  const [searchResults, setSearchResults] = useState<string | null>(null);
  const [results, setResults] = useState<AITool[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSearch = (query: string) => {
    setSearchResults(query);
    // Rechercher dans la liste complète des outils
    setTimeout(() => {
      const searchResults = searchTools(query, selectedCategory);
      setResults(searchResults.slice(0, 9)); // Limiter à 9 résultats pour l'affichage
    }, 500);
  };

  // Relancer la recherche quand la catégorie change
  useEffect(() => {
    if (searchResults) {
      // Si on a une recherche, filtrer les résultats
      const searchResultsData = searchTools(searchResults, selectedCategory);
      setResults(searchResultsData.slice(0, 9));
    } else if (selectedCategory) {
      // Si on a juste une catégorie sélectionnée sans recherche, afficher les outils de cette catégorie
      const categoryTools = getToolsByCategory(selectedCategory);
      setResults(categoryTools.slice(0, 9));
      setSearchResults(" "); // Définir une recherche vide pour afficher les résultats
    } else {
      // Si aucune catégorie n'est sélectionnée et pas de recherche, vider les résultats
      setResults([]);
      setSearchResults(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const handleCopyPrompt = (prompt: string, index: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <main className="min-h-screen pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight sm:leading-snug">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.heroTitle1}
            </span>
            <br />
            <span className="text-white">{t.heroTitle2}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-snug sm:leading-relaxed">
            {t.heroSubtitle}{" "}
            <span className="text-purple-400 font-semibold">{t.heroSubtitleHighlight}</span>.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-10 sm:mb-12 md:mb-24">
          <AnimatedSearchBar onSearch={handleSearch} />
        </div>

        {/* Results */}
        {(searchResults || selectedCategory) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 sm:mb-12 md:mb-24"
          >
            <div className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                {searchResults && searchResults.trim() ? (
                  <>
                    {t.resultsFor} <span className="text-purple-400">{searchResults}</span>
                  </>
                ) : selectedCategory ? (
                  <>
                    {t.resultsFor} <span className="text-purple-400">{
                      selectedCategory === "Image" ? t.categoryImage :
                      selectedCategory === "Design" ? t.categoryDesign :
                      selectedCategory === "Vidéo" ? t.categoryVideo :
                      selectedCategory === "Rédaction" ? t.categoryWriting :
                      selectedCategory
                    }</span>
                  </>
                ) : null}
              </h3>
              {selectedCategory && (
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                  {t.activeFilter} <span className="text-purple-400 font-semibold">{
                    selectedCategory === "Image" ? t.categoryImage :
                    selectedCategory === "Design" ? t.categoryDesign :
                    selectedCategory === "Vidéo" ? t.categoryVideo :
                    selectedCategory === "Rédaction" ? t.categoryWriting :
                    selectedCategory
                  }</span>
                </p>
              )}
              {results.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-gray-400 text-base sm:text-lg mb-2">{t.noToolsFound}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {t.tryAnotherSearch}
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
                    {results.length} {results.length > 1 ? t.suggestionsPlural : t.suggestions} {results.length > 1 ? t.possiblePlural : t.possible} :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                    {results.map((result, index) => {
                  const optimizedPrompt = generateOptimizedPrompt(searchResults || "", result.category, result.name, language);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:bg-white/10 transition-colors flex flex-col h-auto sm:h-[140px] md:h-auto"
                    >
                      {/* Logo et en-tête */}
                      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <LogoImage
                            src={getToolLogoUrl(result)}
                            alt={result.name}
                            size="sm"
                            className="sm:hidden"
                          />
                          <LogoImage
                            src={getToolLogoUrl(result)}
                            alt={result.name}
                            size="md"
                            className="hidden sm:block"
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2 leading-snug">
                            {result.name}
                          </h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 rounded-full">
                              {result.category === "Image" ? t.categoryImage :
                               result.category === "Design" ? t.categoryDesign :
                               result.category === "Vidéo" ? t.categoryVideo :
                               result.category === "Rédaction" ? t.categoryWriting :
                               result.category}
                            </span>
                            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full ${
                              result.type === "Gratuit" 
                                ? "bg-green-500/20 text-green-300" 
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}>
                              {result.type === "Gratuit" ? t.typeFree : t.typePaid}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-snug">
                        {getTranslatedDescription(result.description, language)}
                      </p>
                      
                      {/* Prompt optimisé */}
                      <div className="mb-3 sm:mb-4 flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <p className="text-xs text-gray-500 font-semibold">{t.optimizedPrompt}</p>
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"
                          />
                        </div>
                        <div className="glass rounded-lg p-2 sm:p-3 mb-2 max-h-48 sm:max-h-64 overflow-y-auto">
                          <pre className="text-xs text-gray-300 leading-snug sm:leading-relaxed whitespace-pre-wrap font-sans">
                            {optimizedPrompt.split('\n\n').map((section, idx) => {
                              if (section.startsWith('Contexte :')) {
                                return (
                                  <span key={idx}>
                                    <span className="text-purple-400 font-semibold">Contexte :</span>
                                    {section.replace('Contexte :', '')}
                                    {'\n\n'}
                                  </span>
                                );
                              } else if (section.startsWith('Références :')) {
                                return (
                                  <span key={idx}>
                                    <span className="text-blue-400 font-semibold">Références :</span>
                                    {section.replace('Références :', '')}
                                  </span>
                                );
                              }
                              return <span key={idx}>{section}{'\n\n'}</span>;
                            })}
                          </pre>
                        </div>
                        <motion.button
                          onClick={() => handleCopyPrompt(optimizedPrompt, index)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-3 py-1.5 sm:py-2 text-xs glass rounded-lg text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="w-3 h-3" />
                              {t.copied}
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              {t.copyPrompt}
                            </>
                          )}
                        </motion.button>
                      </div>

                      <motion.a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-xs sm:text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                      >
                        {t.visitSite}
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.a>
                    </motion.div>
                  );
                })}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* AI Tools Carousel */}
        <div className="mb-10 sm:mb-12 md:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 sm:mb-2 leading-snug">
              {t.discoverTools}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-snug">
              {t.exploreSelection}
            </p>
          </motion.div>
          <AIToolsCarousel selectedCategory={selectedCategory} />
        </div>
      </div>
    </main>
  );
}

