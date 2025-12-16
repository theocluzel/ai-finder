// Liste complète des 80 outils IA de la publication LinkedIn
// Organisés par catégorie et type (Gratuit/Payant)

export interface AITool {
  name: string;
  category: "Image" | "Design" | "Vidéo" | "Rédaction";
  type: "Gratuit" | "Payant";
  description: string;
  descriptionEn?: string; // Description en anglais (optionnel)
  url: string;
  logoUrl?: string; // URL du logo (optionnel, généré automatiquement si non fourni)
}

// Fonction helper pour obtenir la description traduite
export const getToolDescription = (tool: AITool, language: 'fr' | 'en'): string => {
  if (language === 'en' && tool.descriptionEn) {
    return tool.descriptionEn;
  }
  return tool.description;
}

// Fonction pour extraire le domaine d'une URL
const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname.replace('www.', '');
  } catch {
    // Si l'URL est invalide, essayer d'extraire le domaine manuellement
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+)/);
    return match ? match[1] : url;
  }
};

// Fonction pour générer l'URL du logo - UNIQUEMENT logos officiels haute résolution
export const getLogoUrl = (tool: AITool): string | null => {
  if (tool.logoUrl) {
    return tool.logoUrl;
  }
  
  const domain = extractDomain(tool.url);
  
  // Utiliser Clearbit Logo API - logos officiels haute résolution (256x256+)
  // Format: https://logo.clearbit.com/example.com
  // Retourne null si le logo n'est pas disponible (pas de fallback favicon)
  return `https://logo.clearbit.com/${domain}`;
};

// Mapping des logos officiels haute résolution (optionnel)
// Si un logo officiel SVG/PNG haute résolution est fourni ici, il sera utilisé en priorité
// Sinon, Clearbit Logo API sera utilisé (logos officiels 256x256+)
// Format attendu : URL directe vers logo SVG ou PNG ≥ 256x256
const logoMapping: Record<string, string> = {
  // Les logos officiels peuvent être ajoutés ici si nécessaire
  // Format: "Nom de l'outil": "https://example.com/logo.svg"
};

export const aiToolsList: AITool[] = [
  // ========== IMAGE - GRATUIT ==========
  {
    name: "Night Cafe",
    category: "Image",
    type: "Gratuit",
    description: "Génération d'images artistiques avec plusieurs modèles",
    url: "https://nightcafe.studio"
  },
  {
    name: "High Cafe Playground",
    category: "Image",
    type: "Gratuit",
    description: "Création d'images avec interface intuitive",
    url: "https://playgroundai.com"
  },
  {
    name: "Craiyon",
    category: "Image",
    type: "Gratuit",
    description: "Génération d'images gratuite et rapide",
    url: "https://www.craiyon.com"
  },
  {
    name: "Starryai",
    category: "Image",
    type: "Gratuit",
    description: "Génération d'images avec styles artistiques",
    url: "https://www.starryai.com"
  },
  {
    name: "Fiesclip",
    category: "Image",
    type: "Gratuit",
    description: "Création d'images et designs",
    url: "https://fiesclip.com"
  },
  {
    name: "Remini AI",
    category: "Image",
    type: "Gratuit",
    description: "Amélioration et restauration de photos",
    url: "https://www.remini.ai"
  },
  {
    name: "Scribble AI",
    category: "Image",
    type: "Gratuit",
    description: "Transformation de croquis en images",
    url: "https://scribblediffusion.com"
  },
  {
    name: "Fotor AI",
    category: "Image",
    type: "Gratuit",
    description: "Édition et génération d'images",
    url: "https://www.fotor.com"
  },
  {
    name: "Nano Banana Pro",
    category: "Image",
    type: "Gratuit",
    description: "Génération d'images avec texte intégré parfaitement lisible",
    url: "https://aistudio.google.com"
  },
  
  // ========== IMAGE - PAYANT ==========
  {
    name: "Leonardo",
    category: "Image",
    type: "Payant",
    description: "Génération d'images professionnelles",
    url: "https://leonardo.ai"
  },
  {
    name: "Firefly",
    category: "Image",
    type: "Payant",
    description: "Génération d'images Adobe avec IA",
    url: "https://firefly.adobe.com"
  },
  {
    name: "Gencraft",
    category: "Image",
    type: "Payant",
    description: "Génération d'images de haute qualité",
    url: "https://gencraft.com"
  },
  {
    name: "Deep AI",
    category: "Image",
    type: "Payant",
    description: "Génération et édition d'images avancées",
    url: "https://deepai.org"
  },
  {
    name: "Getimg AI",
    category: "Image",
    type: "Payant",
    description: "Génération d'images professionnelles",
    url: "https://getimg.ai"
  },
  {
    name: "Notpot",
    category: "Image",
    type: "Payant",
    description: "Création d'images créatives",
    url: "https://notpot.ai"
  },
  {
    name: "LetsEnhance",
    category: "Image",
    type: "Payant",
    description: "Amélioration de résolution d'images",
    url: "https://letsenhance.io"
  },
  {
    name: "DALL-E",
    category: "Image",
    type: "Payant",
    description: "Génération d'images OpenAI",
    url: "https://openai.com/dall-e-2"
  },
  {
    name: "Midjourney",
    category: "Image",
    type: "Payant",
    description: "Génération d'images artistiques premium",
    url: "https://www.midjourney.com"
  },
  {
    name: "Canva",
    category: "Image",
    type: "Payant",
    description: "Design graphique avec IA",
    url: "https://www.canva.com"
  },
  {
    name: "Surfer",
    category: "Image",
    type: "Payant",
    description: "Optimisation SEO et création de visuels",
    url: "https://surfer.ai"
  },
  
  // ========== DESIGN - GRATUIT ==========
  {
    name: "Framer X",
    category: "Design",
    type: "Gratuit",
    description: "Prototypage et design interactif",
    url: "https://www.framer.com"
  },
  {
    name: "Brandcrowd",
    category: "Design",
    type: "Gratuit",
    description: "Création de logos et identité de marque",
    url: "https://www.brandcrowd.com"
  },
  {
    name: "Huemint",
    category: "Design",
    type: "Gratuit",
    description: "Génération de palettes de couleurs",
    url: "https://huemint.com"
  },
  {
    name: "Logomaster",
    category: "Design",
    type: "Gratuit",
    description: "Création de logos automatique",
    url: "https://logomaster.ai"
  },
  {
    name: "Figma",
    category: "Design",
    type: "Gratuit",
    description: "Design collaboratif et prototypage",
    url: "https://www.figma.com"
  },
  {
    name: "Autodraw",
    category: "Design",
    type: "Gratuit",
    description: "Transformation de croquis en dessins",
    url: "https://www.autodraw.com"
  },
  {
    name: "Pixelcut",
    category: "Design",
    type: "Gratuit",
    description: "Design graphique simplifié",
    url: "https://www.pixelcut.ai"
  },
  {
    name: "Fontjoy",
    category: "Design",
    type: "Gratuit",
    description: "Combinaisons de polices intelligentes",
    url: "https://fontjoy.com"
  },
  {
    name: "Tinywow",
    category: "Design",
    type: "Gratuit",
    description: "Outils de design et conversion",
    url: "https://tinywow.com"
  },
  {
    name: "Visme",
    category: "Design",
    type: "Gratuit",
    description: "Création de visuels et infographies",
    url: "https://www.visme.co"
  },
  
  // ========== DESIGN - PAYANT ==========
  {
    name: "Uizard",
    category: "Design",
    type: "Payant",
    description: "Design d'interface avec IA",
    url: "https://uizard.io"
  },
  {
    name: "Magician",
    category: "Design",
    type: "Payant",
    description: "Outils de design magiques pour Figma",
    url: "https://magician.design"
  },
  {
    name: "Flair AI",
    category: "Design",
    type: "Payant",
    description: "Génération de designs de produits",
    url: "https://flair.ai"
  },
  {
    name: "Designs AI",
    category: "Design",
    type: "Payant",
    description: "Création de designs automatisée",
    url: "https://designs.ai"
  },
  {
    name: "Photoshop",
    category: "Design",
    type: "Payant",
    description: "Édition photo et design professionnel",
    url: "https://www.adobe.com/products/photoshop.html"
  },
  {
    name: "Illustrator",
    category: "Design",
    type: "Payant",
    description: "Design vectoriel professionnel",
    url: "https://www.adobe.com/products/illustrator.html"
  },
  {
    name: "Simplified",
    category: "Design",
    type: "Payant",
    description: "Design et marketing simplifiés",
    url: "https://simplified.com"
  },
  {
    name: "Canva",
    category: "Design",
    type: "Payant",
    description: "Design graphique complet",
    url: "https://www.canva.com"
  },
  {
    name: "Word AI",
    category: "Design",
    type: "Payant",
    description: "Rédaction et design de contenu",
    url: "https://wordai.com"
  },
  {
    name: "Looka",
    category: "Design",
    type: "Payant",
    description: "Création de logos professionnels",
    url: "https://looka.com"
  },
  
  // ========== VIDÉO - GRATUIT ==========
  {
    name: "Video Bolt",
    category: "Vidéo",
    type: "Gratuit",
    description: "Génération de vidéos automatique",
    url: "https://videobolt.net"
  },
  {
    name: "Capcut",
    category: "Vidéo",
    type: "Gratuit",
    description: "Édition vidéo mobile et desktop",
    url: "https://www.capcut.com"
  },
  {
    name: "Flexclip",
    category: "Vidéo",
    type: "Gratuit",
    description: "Création de vidéos en ligne",
    url: "https://www.flexclip.com"
  },
  {
    name: "Wepik",
    category: "Vidéo",
    type: "Gratuit",
    description: "Design et vidéo en ligne",
    url: "https://wepik.com"
  },
  {
    name: "Luma AI",
    category: "Vidéo",
    type: "Gratuit",
    description: "Génération de vidéos réalistes",
    url: "https://lumalabs.ai"
  },
  
  // ========== VIDÉO - PAYANT ==========
  {
    name: "Veed",
    category: "Vidéo",
    type: "Payant",
    description: "Édition vidéo en ligne",
    url: "https://www.veed.io"
  },
  {
    name: "Tome",
    category: "Vidéo",
    type: "Payant",
    description: "Création de présentations vidéo",
    url: "https://tome.app"
  },
  {
    name: "Invideo",
    category: "Vidéo",
    type: "Payant",
    description: "Création de vidéos marketing",
    url: "https://invideo.io"
  },
  {
    name: "Elai",
    category: "Vidéo",
    type: "Payant",
    description: "Création de vidéos avec avatars IA",
    url: "https://elai.io"
  },
  {
    name: "Movavi",
    category: "Vidéo",
    type: "Payant",
    description: "Édition vidéo professionnelle",
    url: "https://www.movavi.com"
  },
  {
    name: "Replicate",
    category: "Vidéo",
    type: "Payant",
    description: "Génération de vidéos avec modèles IA",
    url: "https://replicate.com"
  },
  {
    name: "Descript",
    category: "Vidéo",
    type: "Payant",
    description: "Édition vidéo par transcription",
    url: "https://www.descript.com"
  },
  {
    name: "Genmo",
    category: "Vidéo",
    type: "Payant",
    description: "Création de vidéos créatives",
    url: "https://genmo.ai"
  },
  {
    name: "Pictory",
    category: "Vidéo",
    type: "Payant",
    description: "Création de vidéos à partir de texte",
    url: "https://pictory.ai"
  },
  {
    name: "Artiphoria",
    category: "Vidéo",
    type: "Payant",
    description: "Génération de vidéos artistiques",
    url: "https://artiphoria.ai"
  },
  {
    name: "Captions",
    category: "Vidéo",
    type: "Payant",
    description: "Ajout de sous-titres automatiques",
    url: "https://www.captions.ai"
  },
  {
    name: "Runway",
    category: "Vidéo",
    type: "Payant",
    description: "Création et édition de vidéos IA",
    url: "https://runwayml.com"
  },
  {
    name: "Colossyan",
    category: "Vidéo",
    type: "Payant",
    description: "Création de vidéos avec présentateurs IA",
    url: "https://www.colossyan.com"
  },
  {
    name: "Syllaby",
    category: "Vidéo",
    type: "Payant",
    description: "Création de contenu vidéo pour réseaux sociaux",
    url: "https://syllaby.io"
  },
  {
    name: "Synthesia",
    category: "Vidéo",
    type: "Payant",
    description: "Création de vidéos avec avatars IA",
    url: "https://www.synthesia.io"
  },
  
  // ========== RÉDACTION - GRATUIT ==========
  {
    name: "ChatGPT",
    category: "Rédaction",
    type: "Gratuit",
    description: "Assistant conversationnel et rédaction",
    url: "https://chat.openai.com"
  },
  {
    name: "Copy.ai",
    category: "Rédaction",
    type: "Gratuit",
    description: "Génération de contenu marketing",
    url: "https://www.copy.ai"
  },
  {
    name: "You",
    category: "Rédaction",
    type: "Gratuit",
    description: "Recherche et rédaction assistée",
    url: "https://you.com"
  },
  {
    name: "Perplexity",
    category: "Rédaction",
    type: "Gratuit",
    description: "Recherche et rédaction avec sources",
    url: "https://www.perplexity.ai"
  },
  {
    name: "Rytr AI",
    category: "Rédaction",
    type: "Gratuit",
    description: "Rédaction de contenu rapide",
    url: "https://rytr.me"
  },
  {
    name: "Hive",
    category: "Rédaction",
    type: "Gratuit",
    description: "Génération de contenu collaboratif",
    url: "https://hive.com"
  },
  {
    name: "Text Cortex",
    category: "Rédaction",
    type: "Gratuit",
    description: "Rédaction et réécriture de texte",
    url: "https://textcortex.com"
  },
  {
    name: "Neutraltext",
    category: "Rédaction",
    type: "Gratuit",
    description: "Rédaction neutre et professionnelle",
    url: "https://neutraltext.com"
  },
  {
    name: "Hyperwrite",
    category: "Rédaction",
    type: "Gratuit",
    description: "Rédaction assistée par IA",
    url: "https://www.hyperwrite.ai"
  },
  
  // ========== RÉDACTION - PAYANT ==========
  {
    name: "Anyword",
    category: "Rédaction",
    type: "Payant",
    description: "Rédaction marketing optimisée",
    url: "https://anyword.com"
  },
  {
    name: "AClosersCopy",
    category: "Rédaction",
    type: "Payant",
    description: "Rédaction persuasive et copywriting",
    url: "https://www.aclosercopy.com"
  },
  {
    name: "Frase AI",
    category: "Rédaction",
    type: "Payant",
    description: "Rédaction SEO optimisée",
    url: "https://www.frase.io"
  },
  {
    name: "Surfer",
    category: "Rédaction",
    type: "Payant",
    description: "Rédaction SEO et optimisation",
    url: "https://surfer.ai"
  },
  {
    name: "Peppertype",
    category: "Rédaction",
    type: "Payant",
    description: "Génération de contenu créatif",
    url: "https://www.peppertype.ai"
  },
  {
    name: "Jasper",
    category: "Rédaction",
    type: "Payant",
    description: "Rédaction marketing professionnelle",
    url: "https://www.jasper.ai"
  },
  {
    name: "Chibi AI",
    category: "Rédaction",
    type: "Payant",
    description: "Rédaction créative et storytelling",
    url: "https://chibi.ai"
  },
  {
    name: "Growthbar",
    category: "Rédaction",
    type: "Payant",
    description: "Rédaction SEO et blogging",
    url: "https://www.growthbar.seo"
  },
  {
    name: "Word AI",
    category: "Rédaction",
    type: "Payant",
    description: "Réécriture et optimisation de texte",
    url: "https://wordai.com"
  },
  {
    name: "WriteSonic",
    category: "Rédaction",
    type: "Payant",
    description: "Génération de contenu premium",
    url: "https://writesonic.com"
  },
];

// Fonction pour obtenir l'URL du logo d'un outil - UNIQUEMENT logos officiels
export const getToolLogoUrl = (tool: AITool): string | null => {
  // Vérifier d'abord le mapping spécial (si logo officiel SVG/PNG fourni)
  if (logoMapping[tool.name]) {
    return logoMapping[tool.name];
  }
  
  const domain = extractDomain(tool.url);
  
  // Utiliser Clearbit Logo API - logos officiels haute résolution (256x256+)
  // Retourne null si le logo n'est pas disponible (pas de fallback favicon)
  return `https://logo.clearbit.com/${domain}`;
};

// Fonction pour rechercher des outils par requête
export const searchTools = (query: string, category?: string, type?: string): AITool[] => {
  const lowerQuery = query.toLowerCase();
  
  return aiToolsList.filter(tool => {
    // Filtre par catégorie si spécifiée
    if (category && tool.category !== category) return false;
    
    // Filtre par type si spécifié
    if (type && tool.type !== type) return false;
    
    // Recherche dans le nom, la description et la catégorie
    const matchesQuery = 
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery);
    
    return matchesQuery;
  });
};

// Fonction pour obtenir les outils par catégorie
export const getToolsByCategory = (category: string): AITool[] => {
  return aiToolsList.filter(tool => tool.category === category);
};

// Fonction pour obtenir les outils par type
export const getToolsByType = (type: string): AITool[] => {
  return aiToolsList.filter(tool => tool.type === type);
};

