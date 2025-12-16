"use client";

import { motion } from "framer-motion";
import AnimatedSearchBar from "./AnimatedSearchBar";
import AIToolsCarousel from "./AIToolsCarousel";
import { useState, useEffect } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { searchTools, AITool, getToolLogoUrl } from "@/data/aiTools";
import LogoImage from "./LogoImage";

// Fonction pour générer un prompt optimisé avec framework structuré (Tâche, Contexte, Références)
const generateOptimizedPrompt = (userQuery: string, toolType: string, toolName: string): string => {
  const query = userQuery.toLowerCase();
  
  // Déterminer le profil selon le type d'outil
  let profile = "";
  let task = "";
  let context = "";
  let references = "";
  
  // Prompts pour génération d'images
  if (toolType === "Image" || toolType === "Images" || toolName.includes("image") || toolName.includes("Image") || toolName.includes("DALL") || toolName.includes("Midjourney")) {
    profile = "En tant que designer graphique professionnel spécialisé en création visuelle";
    
    if (query.includes("logo") || query.includes("identité")) {
      task = `Crée un logo moderne et professionnel pour ${userQuery}. Format vectoriel, style minimaliste, adapté au digital et à l'impression.`;
      context = "Le logo doit être reconnaissable à petite taille, fonctionner en noir et blanc, et refléter l'identité de marque. Utilise des formes géométriques simples et une typographie lisible.";
      references = "Inspire-toi des logos de marques tech modernes : Apple, Google, Airbnb. Style épuré, couleurs vibrantes mais limitées (2-3 couleurs max).";
    } else if (query.includes("photo") || query.includes("réaliste")) {
      task = `Génère une image photoréaliste de ${userQuery}. Résolution 4K, qualité professionnelle, détails précis.`;
      context = "L'image doit être crédible et naturelle. Éclairage réaliste, profondeur de champ, textures détaillées. Évite les artefacts ou éléments irréalistes.";
      references = "Style photographique professionnel : éclairage naturel, composition équilibrée selon la règle des tiers, couleurs naturelles et saturées.";
    } else if (query.includes("art") || query.includes("artistique")) {
      task = `Crée une illustration artistique de ${userQuery}. Style unique et créatif, composition dynamique.`;
      context = "L'illustration doit être esthétiquement plaisante et originale. Palette de couleurs harmonieuse, style cohérent, éléments visuels équilibrés.";
      references = "Inspire-toi des styles artistiques modernes : art digital, illustration conceptuelle, design graphique contemporain. Utilise des contrastes et des dégradés subtils.";
    } else {
      task = `Génère une image de haute qualité représentant ${userQuery}. Style moderne, composition professionnelle.`;
      context = "L'image doit être visuellement attrayante et adaptée à un usage professionnel. Qualité premium, détails soignés, esthétique contemporaine.";
      references = "Style visuel moderne : design épuré, couleurs équilibrées, composition centrée ou selon la règle des tiers, qualité professionnelle.";
    }
  }
  // Prompts pour vidéo
  else if (toolType === "Vidéo" || toolName.includes("video") || toolName.includes("Video") || toolName.includes("Runway")) {
    profile = "En tant que réalisateur vidéo professionnel spécialisé en création de contenu";
    
    if (query.includes("pub") || query.includes("marketing")) {
      task = `Crée une vidéo publicitaire de 30 secondes pour ${userQuery}. Format 16:9, qualité HD, rythme dynamique.`;
      context = "La vidéo doit être accrocheuse dès les 3 premières secondes. Message clair, rythme soutenu, transitions fluides. Inclut un call-to-action à la fin.";
      references = "Style publicitaire moderne : montage dynamique, musique entraînante, visuels impactants. Inspire-toi des pubs de marques tech (Apple, Nike).";
    } else if (query.includes("tutoriel") || query.includes("explication")) {
      task = `Produis une vidéo explicative de ${userQuery}. Format tutoriel, durée 5-10 minutes, pédagogique.`;
      context = "La vidéo doit être claire et facile à suivre. Étapes numérotées, visuels explicatifs, narration lente et claire. Sous-titres recommandés.";
      references = "Style tutoriel professionnel : écran partagé, annotations visuelles, progression logique, exemples concrets. Inspire-toi des tutoriels YouTube éducatifs.";
    } else {
      task = `Crée une vidéo professionnelle sur ${userQuery}. Montage fluide, qualité HD, narration engageante.`;
      context = "La vidéo doit maintenir l'attention du spectateur. Rythme varié, transitions douces, qualité audio et vidéo optimale.";
      references = "Style vidéo professionnel : montage cinématographique, transitions fluides, color grading soigné, son de qualité.";
    }
  }
  // Prompts pour design
  else if (toolType === "Design" || toolName.includes("design") || toolName.includes("Design") || toolName.includes("Figma") || toolName.includes("Canva")) {
    profile = "En tant que designer graphique professionnel spécialisé en création visuelle";
    
    if (query.includes("logo") || query.includes("identité")) {
      task = `Crée un logo moderne et professionnel pour ${userQuery}. Format vectoriel, style minimaliste, adapté au digital et à l'impression.`;
      context = "Le logo doit être reconnaissable à petite taille, fonctionner en noir et blanc, et refléter l'identité de marque. Utilise des formes géométriques simples et une typographie lisible.";
      references = "Inspire-toi des logos de marques tech modernes : Apple, Google, Airbnb. Style épuré, couleurs vibrantes mais limitées (2-3 couleurs max).";
    } else if (query.includes("interface") || query.includes("UI") || query.includes("UX")) {
      task = `Conçois une interface utilisateur moderne et intuitive pour ${userQuery}. Design centré utilisateur, navigation claire.`;
      context = "L'interface doit être accessible, responsive, et offrir une expérience utilisateur fluide. Hiérarchie visuelle claire, espacements cohérents, call-to-actions visibles.";
      references = "Style UI/UX moderne : design system cohérent, micro-interactions subtiles, palette de couleurs harmonieuse. Inspire-toi des interfaces de produits tech (Figma, Notion, Linear).";
    } else if (query.includes("affiche") || query.includes("poster") || query.includes("flyer")) {
      task = `Crée une affiche visuellement impactante pour ${userQuery}. Composition équilibrée, typographie lisible, message clair.`;
      context = "L'affiche doit attirer l'attention immédiatement. Hiérarchie visuelle forte, contraste élevé, message principal mis en avant. Format adapté au support (print ou digital).";
      references = "Style affiche moderne : compositions audacieuses, typographie expressive, couleurs contrastées. Inspire-toi des affiches événementielles et publicitaires contemporaines.";
    } else {
      task = `Crée un design professionnel et moderne pour ${userQuery}. Esthétique contemporaine, qualité premium.`;
      context = "Le design doit être visuellement attrayant et adapté à l'usage prévu. Cohérence visuelle, attention aux détails, résultat finalisé et prêt à l'emploi.";
      references = "Style design moderne : minimalisme élégant, espacements généreux, typographie soignée, palette de couleurs équilibrée. Inspire-toi des designs de marques premium.";
    }
  }
  // Prompts pour rédaction
  else if (toolType === "Rédaction" || toolType === "Texte" || toolName.includes("text") || toolName.includes("Text") || toolName.includes("Copy") || toolName.includes("Jasper") || toolName.includes("Claude")) {
    profile = "En tant que rédacteur professionnel spécialisé en création de contenu";
    
    if (query.includes("article") || query.includes("blog")) {
      task = `Rédige un article complet et détaillé sur ${userQuery}. Minimum 1000 mots, structure claire avec introduction, développement et conclusion.`;
      context = "L'article doit être informatif, bien structuré avec des sous-titres H2/H3, optimisé SEO avec mots-clés pertinents. Ton professionnel mais accessible.";
      references = "Style éditorial professionnel : articles de blogs tech (Medium, TechCrunch). Utilise des exemples concrets, des données si possible, et un ton engageant.";
    } else if (query.includes("pub") || query.includes("marketing") || query.includes("publicité")) {
      task = `Crée un texte publicitaire persuasif pour ${userQuery}. Format court et impactant, call-to-action fort.`;
      context = "Le texte doit être accrocheur, mettre en avant les bénéfices plutôt que les caractéristiques. Ton enthousiaste mais crédible, longueur adaptée au support (réseaux sociaux, email, etc.).";
      references = "Style copywriting moderne : accroches percutantes, bénéfices clairs, urgence mesurée. Inspire-toi des grandes marques (Apple, Tesla) pour le ton premium.";
    } else if (query.includes("email") || query.includes("mail")) {
      task = `Rédige un email professionnel sur ${userQuery}. Objet accrocheur, message concis et clair.`;
      context = "L'email doit être direct et actionnable. Objet court (50 caractères max), corps du message structuré, call-to-action visible. Ton professionnel mais humain.";
      references = "Style email marketing efficace : objet personnalisé, message scannable, CTA clair. Inspire-toi des emails de newsletters professionnelles (Substack, Revue).";
    } else if (query.includes("cv") || query.includes("curriculum")) {
      task = `Optimise et améliore mon CV pour ${userQuery}. Mise en forme professionnelle, mots-clés pertinents, structure claire.`;
      context = "Le CV doit être ATS-friendly (format simple), mettre en avant les réalisations avec chiffres, utiliser des verbes d'action. Adapte le contenu au poste visé.";
      references = "Style CV moderne : format chronologique inversé, sections claires, design épuré. Inspire-toi des CV tech (GitHub, LinkedIn) pour la structure.";
    } else {
      task = `Rédige un contenu de qualité professionnelle sur ${userQuery}. Style adapté, informations précises.`;
      context = "Le contenu doit être pertinent, bien structuré et adapté à l'audience cible. Ton professionnel, informations vérifiables, longueur appropriée.";
      references = "Style rédactionnel professionnel : clarté, précision, engagement. Inspire-toi des contenus de qualité (Harvard Business Review, The Guardian).";
    }
  }
  // Prompt par défaut
  else {
    profile = "En tant que professionnel créatif";
    task = `Crée un contenu professionnel et optimisé pour ${userQuery}. Qualité premium, résultat finalisé.`;
    context = "Le contenu doit être de haute qualité, adapté à l'usage prévu, et répondre précisément au besoin exprimé.";
    references = "Style professionnel moderne : qualité premium, attention aux détails, résultat finalisé et prêt à l'emploi.";
  }
  
  // Retourner le prompt structuré
  return `${profile}, ${task.toLowerCase()}\n\nContexte : ${context}\n\nRéférences : ${references}`;
};

interface HeroProps {
  selectedCategory?: string;
}

export default function Hero({ selectedCategory }: HeroProps) {
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
      const searchResultsData = searchTools(searchResults, selectedCategory);
      setResults(searchResultsData.slice(0, 9));
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
              Dites ce que vous voulez faire.
            </span>
            <br />
            <span className="text-white">Nous trouvons l'IA idéale.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-snug sm:leading-relaxed">
            Décrivez votre besoin, nous vous suggérons les meilleurs sites d'IA adaptés{" "}
            <span className="text-purple-400 font-semibold">avec un prompt optimisé prêt à copier-coller</span>.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-10 sm:mb-12 md:mb-24">
          <AnimatedSearchBar onSearch={handleSearch} />
        </div>

        {/* Results */}
        {searchResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 sm:mb-12 md:mb-24"
          >
            <div className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                Pour : <span className="text-purple-400">{searchResults}</span>
              </h3>
              {selectedCategory && (
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                  Filtre actif : <span className="text-purple-400 font-semibold">{selectedCategory}</span>
                </p>
              )}
              {results.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-gray-400 text-base sm:text-lg mb-2">Aucun outil trouvé</p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Essayez une autre recherche ou changez de catégorie
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
                    {results.length} suggestion{results.length > 1 ? 's' : ''} d'IA possible{results.length > 1 ? 's' : ''} :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                    {results.map((result, index) => {
                  const optimizedPrompt = generateOptimizedPrompt(searchResults || "", result.category, result.name);
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
                              {result.category}
                            </span>
                            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full ${
                              result.type === "Gratuit" 
                                ? "bg-green-500/20 text-green-300" 
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}>
                              {result.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-snug">
                        {result.description}
                      </p>
                      
                      {/* Prompt optimisé */}
                      <div className="mb-3 sm:mb-4 flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <p className="text-xs text-gray-500 font-semibold">Prompt optimisé généré :</p>
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
                              Copié !
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copier le prompt
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
                        Visiter le site
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
              Découvrez les meilleurs outils d'IA
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-snug">
              Explorez une sélection d'outils d'intelligence artificielle et leurs spécialités
            </p>
          </motion.div>
          <AIToolsCarousel />
        </div>
      </div>
    </main>
  );
}

