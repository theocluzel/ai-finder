"use client";

import { motion } from "framer-motion";
import AnimatedSearchBar from "./AnimatedSearchBar";
import AIToolsCarousel from "./AIToolsCarousel";
import { useState, useEffect } from "react";
import { Copy, Check, ExternalLink, Sparkles } from "lucide-react";
import { searchTools, AITool, getToolLogoUrl, getToolsByCategory, getToolDescription } from "@/data/aiTools";
import LogoImage from "./LogoImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateOptimizedPrompt } from "@/lib/promptGenerator";
import { getTranslatedDescription } from "@/lib/descriptionTranslations";

interface HeroProps {
  selectedCategory?: string;
  selectedFilter?: string | null;
}

export default function Hero({ selectedCategory, selectedFilter }: HeroProps) {
  const { t, language } = useLanguage();
  const [logoStatus, setLogoStatus] = useState<Record<string, "loading" | "ok" | "fail">>({});
  const [searchResults, setSearchResults] = useState<string | null>(null);
  const [results, setResults] = useState<AITool[]>([]);
  const [allResults, setAllResults] = useState<AITool[]>([]); // Tous les résultats disponibles
  const [displayedCount, setDisplayedCount] = useState(9); // Nombre de résultats affichés
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [generatedPrompts, setGeneratedPrompts] = useState<Record<number, string>>({}); // Prompts générés pour chaque index

  const handleSearch = (query: string) => {
    setSearchResults(query);
    setDisplayedCount(9);
    setGeneratedPrompts({});
    // Rechercher dans la liste complète des outils
    setTimeout(() => {
      const searchResultsData = searchTools(query, selectedCategory);
      setAllResults(searchResultsData);
      setResults(searchResultsData.slice(0, 9)); // Limiter à 9 résultats pour l'affichage
    }, 500);
  };

  // Fonction pour appliquer les filtres secondaires
  const applyFilters = (tools: AITool[]): AITool[] => {
    let filtered = [...tools];
    
    // Filtrer par type (Gratuit/Payant)
    if (selectedFilter === "free") {
      filtered = filtered.filter(tool => tool.type === "Gratuit");
    } else if (selectedFilter === "paid") {
      filtered = filtered.filter(tool => tool.type === "Payant");
    }
    
    // Filtrer par "top rated" (pour l'instant, on prend les premiers outils de la liste)
    // TODO: Implémenter un vrai système de notation plus tard
    if (selectedFilter === "topRated") {
      // Pour l'instant, on garde tous les outils (on peut ajouter un système de notation plus tard)
      // On pourrait trier par popularité ou autre critère
    }
    
    return filtered;
  };

  // Relancer la recherche quand la catégorie ou le filtre change
  useEffect(() => {
    if (searchResults && searchResults.trim()) {
      // Si on a une recherche, filtrer les résultats
      let searchResultsData = searchTools(searchResults, selectedCategory);
      searchResultsData = applyFilters(searchResultsData);
      setAllResults(searchResultsData);
      setResults(searchResultsData.slice(0, displayedCount));
      setDisplayedCount(9);
    } else if (selectedCategory) {
      // Si on a juste une catégorie sélectionnée sans recherche, afficher les outils de cette catégorie
      let categoryTools = getToolsByCategory(selectedCategory);
      categoryTools = applyFilters(categoryTools);
      setAllResults(categoryTools);
      setResults(categoryTools.slice(0, displayedCount));
      setDisplayedCount(9);
      setSearchResults(null); // Pas de recherche, juste une catégorie
      setGeneratedPrompts({});
    } else {
      // Si aucune catégorie n'est sélectionnée et pas de recherche, vider les résultats
      setResults([]);
      setAllResults([]);
      setSearchResults(null);
      setDisplayedCount(9);
      setGeneratedPrompts({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedFilter]);

  const handleCopyPrompt = (prompt: string, index: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleGeneratePrompt = (result: AITool, index: number) => {
    const prompt = generateOptimizedPrompt(
      selectedCategory || "", 
      result.category, 
      result.name, 
      language
    );
    setGeneratedPrompts(prev => ({ ...prev, [index]: prompt }));
  };

  const handleShowMore = () => {
    const newCount = displayedCount + 9;
    setDisplayedCount(newCount);
    setResults(allResults.slice(0, newCount));
  };

  const isSearchMode = searchResults && searchResults.trim();
  const hasMoreResults = allResults.length > displayedCount;

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
            {/* Wrapper volontairement neutre: pas de border/shadow/blur pour éviter toute “ligne” de séparation */}
            <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-8 bg-transparent">
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {results.map((result, index) => {
                  const optimizedPrompt = isSearchMode 
                    ? generateOptimizedPrompt(searchResults || "", result.category, result.name, language)
                    : generatedPrompts[index] || null;
                  const hasPrompt = isSearchMode || generatedPrompts[index];

                  const status = logoStatus[result.name] ?? "loading";
                  if (status === "fail") {
                    return null;
                  }

                  if (status !== "ok") {
                    return (
                      <div
                        key={`${result.name}-skeleton`}
                        data-ai-card="true"
                        className="card-surface rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 flex flex-col h-auto sm:h-[140px] md:h-auto"
                      >
                        <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
                          <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-white/5 animate-pulse overflow-hidden">
                            {/* On monte le LogoImage en invisible pour valider le logo sans afficher de placeholder */}
                            <div className="opacity-0">
                              <LogoImage
                                src={getToolLogoUrl(result)}
                                alt={result.name}
                                size="sm"
                                className="sm:hidden"
                                onStatusChange={(s) => setLogoStatus((prev) => ({ ...prev, [result.name]: s }))}
                              />
                              <LogoImage
                                src={getToolLogoUrl(result)}
                                alt={result.name}
                                size="md"
                                className="hidden sm:block"
                                onStatusChange={(s) => setLogoStatus((prev) => ({ ...prev, [result.name]: s }))}
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse mb-2" />
                            <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse" />
                          </div>
                        </div>
                        <div className="h-3 w-full bg-white/5 rounded animate-pulse mb-2" />
                        <div className="h-3 w-4/5 bg-white/5 rounded animate-pulse" />
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={result.name}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -2 }}
                      transition={{ delay: index * 0.05 }}
                      data-ai-card="true"
                      className="card-surface rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 transition-colors flex flex-col h-auto sm:h-[140px] md:h-auto"
                    >
                      {/* Logo et en-tête */}
                      <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
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
                            onStatusChange={(s) => setLogoStatus((prev) => ({ ...prev, [result.name]: s }))}
                          />
                          <LogoImage
                            src={getToolLogoUrl(result)}
                            alt={result.name}
                            size="md"
                            className="hidden sm:block"
                            onStatusChange={(s) => setLogoStatus((prev) => ({ ...prev, [result.name]: s }))}
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 leading-tight sm:leading-snug">
                          {result.name}
                        </h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            <span className="px-1.5 sm:px-3 py-0.5 text-[10px] sm:text-xs font-semibold bg-purple-500/20 text-purple-300 rounded-full">
                              {result.category === "Image" ? t.categoryImage :
                               result.category === "Design" ? t.categoryDesign :
                               result.category === "Vidéo" ? t.categoryVideo :
                               result.category === "Rédaction" ? t.categoryWriting :
                               result.category}
                            </span>
                            <span className={`px-1.5 sm:px-3 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full ${
                              result.type === "Gratuit" 
                                ? "bg-green-500/20 text-green-300" 
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}>
                              {result.type === "Gratuit" ? t.typeFree : t.typePaid}
                        </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-[11px] sm:text-sm mb-2 sm:mb-4 line-clamp-2 leading-tight sm:leading-snug">
                        {getTranslatedDescription(result.description, language)}
                      </p>
                      
                      {/* Prompt optimisé - seulement si recherche ou si généré */}
                      {hasPrompt ? (
                        <div className="mb-3 sm:mb-4 flex-1">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                            <p className="text-xs text-gray-500 font-semibold">{t.optimizedPrompt}</p>
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"
                          />
                        </div>
                          <div className="glass rounded-lg p-2 sm:p-3 mb-2 max-h-48 sm:max-h-64 overflow-y-auto custom-scrollbar">
                            <pre className="text-xs text-gray-300 leading-snug sm:leading-relaxed whitespace-pre-wrap font-sans">
                              {optimizedPrompt && optimizedPrompt.split('\n\n').map((section, idx) => {
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
                            onClick={() => optimizedPrompt && handleCopyPrompt(optimizedPrompt, index)}
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
                      ) : (
                        <motion.button
                          onClick={() => handleGeneratePrompt(result, index)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full mb-3 sm:mb-4 px-3 py-2 sm:py-2.5 text-xs sm:text-sm glass rounded-lg text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                        >
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                          {t.generatePrompt}
                        </motion.button>
                      )}

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
                  {/* Bouton "Show me other" si il y a plus de résultats */}
                  {hasMoreResults && (
                    <div className="mt-4 sm:mt-6 text-center">
                      <motion.button
                        onClick={handleShowMore}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 sm:px-6 py-2 sm:py-3 glass rounded-lg text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                      >
                        <span className="text-sm sm:text-base font-semibold">{t.showMeOther}</span>
                      </motion.button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}

      </div>

      {/* AI Tools Carousel - seulement à l'accueil (pas dans les catégories) - pleine largeur */}
      {!selectedCategory && (
        <div className="w-full mb-10 sm:mb-12 md:mb-24">
          <div className="container mx-auto max-w-6xl px-4">
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
          </div>
          <AIToolsCarousel selectedCategory={selectedCategory} />
        </div>
      )}
    </main>
  );
}

