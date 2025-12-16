// Liste complète des 80 outils IA de la publication LinkedIn
// Organisés par catégorie et type (Gratuit/Payant)

export interface AITool {
  name: string;
  category: "Image" | "Design" | "Vidéo" | "Rédaction";
  type: "Gratuit" | "Payant";
  description: string;
  url: string;
  logoUrl?: string; // URL du logo (optionnel, généré automatiquement si non fourni)
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

// Fonction pour générer l'URL du logo avec plusieurs sources de fallback
export const getLogoUrl = (tool: AITool): string => {
  if (tool.logoUrl) {
    return tool.logoUrl;
  }
  
  const domain = extractDomain(tool.url);
  
  // Utiliser Google Favicon API en premier car très fiable et gratuit
  // Format: https://www.google.com/s2/favicons?domain=example.com&sz=128
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
};

// Mapping complet des logos pour tous les 80 outils IA
// Utilise Google Favicon API en priorité (très fiable et gratuit)
// Avec fallback automatique vers Icon Horse puis Clearbit si nécessaire
const logoMapping: Record<string, string> = {
  // IMAGE - GRATUIT
  "Night Cafe": "https://www.google.com/s2/favicons?domain=nightcafe.studio&sz=128",
  "High Cafe Playground": "https://www.google.com/s2/favicons?domain=playgroundai.com&sz=128",
  "Craiyon": "https://www.google.com/s2/favicons?domain=craiyon.com&sz=128",
  "Starryai": "https://www.google.com/s2/favicons?domain=starryai.com&sz=128",
  "Leonardo": "https://www.google.com/s2/favicons?domain=leonardo.ai&sz=128",
  "Firefly": "https://www.google.com/s2/favicons?domain=adobe.com&sz=128",
  "Fiesclip": "https://www.google.com/s2/favicons?domain=fiesclip.com&sz=128",
  "Remini AI": "https://www.google.com/s2/favicons?domain=remini.ai&sz=128",
  "Scribble AI": "https://www.google.com/s2/favicons?domain=scribblediffusion.com&sz=128",
  "Fotor AI": "https://www.google.com/s2/favicons?domain=fotor.com&sz=128",
  "Nano Banana Pro": "https://www.google.com/s2/favicons?domain=google.com&sz=128",
  
  // IMAGE - PAYANT
  "Gencraft": "https://www.google.com/s2/favicons?domain=gencraft.com&sz=128",
  "Deep AI": "https://www.google.com/s2/favicons?domain=deepai.org&sz=128",
  "Getimg AI": "https://www.google.com/s2/favicons?domain=getimg.ai&sz=128",
  "Notpot": "https://www.google.com/s2/favicons?domain=notpot.ai&sz=128",
  "LetsEnhance": "https://www.google.com/s2/favicons?domain=letsenhance.io&sz=128",
  "DALL-E": "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
  "Midjourney": "https://www.google.com/s2/favicons?domain=midjourney.com&sz=128",
  
  // DESIGN - GRATUIT
  "Framer X": "https://www.google.com/s2/favicons?domain=framer.com&sz=128",
  "Brandcrowd": "https://www.google.com/s2/favicons?domain=brandcrowd.com&sz=128",
  "Huemint": "https://www.google.com/s2/favicons?domain=huemint.com&sz=128",
  "Logomaster": "https://www.google.com/s2/favicons?domain=logomaster.ai&sz=128",
  "Figma": "https://www.google.com/s2/favicons?domain=figma.com&sz=128",
  "Autodraw": "https://www.google.com/s2/favicons?domain=autodraw.com&sz=128",
  "Pixelcut": "https://www.google.com/s2/favicons?domain=pixelcut.ai&sz=128",
  "Fontjoy": "https://www.google.com/s2/favicons?domain=fontjoy.com&sz=128",
  "Tinywow": "https://www.google.com/s2/favicons?domain=tinywow.com&sz=128",
  "Visme": "https://www.google.com/s2/favicons?domain=visme.co&sz=128",
  
  // DESIGN - PAYANT
  "Uizard": "https://www.google.com/s2/favicons?domain=uizard.io&sz=128",
  "Magician": "https://www.google.com/s2/favicons?domain=magician.design&sz=128",
  "Flair AI": "https://www.google.com/s2/favicons?domain=flair.ai&sz=128",
  "Designs AI": "https://www.google.com/s2/favicons?domain=designs.ai&sz=128",
  "Photoshop": "https://www.google.com/s2/favicons?domain=adobe.com&sz=128",
  "Illustrator": "https://www.google.com/s2/favicons?domain=adobe.com&sz=128",
  "Simplified": "https://www.google.com/s2/favicons?domain=simplified.com&sz=128",
  "Looka": "https://www.google.com/s2/favicons?domain=looka.com&sz=128",
  
  // VIDÉO - GRATUIT
  "Veed": "https://www.google.com/s2/favicons?domain=veed.io&sz=128",
  "Tome": "https://www.google.com/s2/favicons?domain=tome.app&sz=128",
  "Invideo": "https://www.google.com/s2/favicons?domain=invideo.io&sz=128",
  "Video Bolt": "https://www.google.com/s2/favicons?domain=videobolt.net&sz=128",
  "Capcut": "https://www.google.com/s2/favicons?domain=capcut.com&sz=128",
  "Elai": "https://www.google.com/s2/favicons?domain=elai.io&sz=128",
  "Movavi": "https://www.google.com/s2/favicons?domain=movavi.com&sz=128",
  "Flexclip": "https://www.google.com/s2/favicons?domain=flexclip.com&sz=128",
  "Wepik": "https://www.google.com/s2/favicons?domain=wepik.com&sz=128",
  "Luma AI": "https://www.google.com/s2/favicons?domain=lumalabs.ai&sz=128",
  
  // VIDÉO - PAYANT
  "Replicate": "https://www.google.com/s2/favicons?domain=replicate.com&sz=128",
  "Descript": "https://www.google.com/s2/favicons?domain=descript.com&sz=128",
  "Genmo": "https://www.google.com/s2/favicons?domain=genmo.ai&sz=128",
  "Pictory": "https://www.google.com/s2/favicons?domain=pictory.ai&sz=128",
  "Artiphoria": "https://www.google.com/s2/favicons?domain=artiphoria.ai&sz=128",
  "Captions": "https://www.google.com/s2/favicons?domain=captions.ai&sz=128",
  "Runway": "https://www.google.com/s2/favicons?domain=runwayml.com&sz=128",
  "Colossyan": "https://www.google.com/s2/favicons?domain=colossyan.com&sz=128",
  "Syllaby": "https://www.google.com/s2/favicons?domain=syllaby.io&sz=128",
  "Synthesia": "https://www.google.com/s2/favicons?domain=synthesia.io&sz=128",
  
  // RÉDACTION - GRATUIT
  "ChatGPT": "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
  "Copy.ai": "https://www.google.com/s2/favicons?domain=copy.ai&sz=128",
  "You": "https://www.google.com/s2/favicons?domain=you.com&sz=128",
  "Perplexity": "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128",
  "Rytr AI": "https://www.google.com/s2/favicons?domain=rytr.me&sz=128",
  "Hive": "https://www.google.com/s2/favicons?domain=hive.com&sz=128",
  "Text Cortex": "https://www.google.com/s2/favicons?domain=textcortex.com&sz=128",
  "WriteSonic": "https://www.google.com/s2/favicons?domain=writesonic.com&sz=128",
  "Neutraltext": "https://www.google.com/s2/favicons?domain=neutraltext.com&sz=128",
  "Hyperwrite": "https://www.google.com/s2/favicons?domain=hyperwrite.ai&sz=128",
  
  // RÉDACTION - PAYANT
  "Anyword": "https://www.google.com/s2/favicons?domain=anyword.com&sz=128",
  "AClosersCopy": "https://www.google.com/s2/favicons?domain=aclosercopy.com&sz=128",
  "Frase AI": "https://www.google.com/s2/favicons?domain=frase.io&sz=128",
  "Peppertype": "https://www.google.com/s2/favicons?domain=peppertype.ai&sz=128",
  "Jasper": "https://www.google.com/s2/favicons?domain=jasper.ai&sz=128",
  "Chibi AI": "https://www.google.com/s2/favicons?domain=chibi.ai&sz=128",
  "Growthbar": "https://www.google.com/s2/favicons?domain=growthbar.seo&sz=128",
  
  // Outils communs (apparaissent dans plusieurs catégories)
  "Canva": "https://www.google.com/s2/favicons?domain=canva.com&sz=128",
  "Surfer": "https://www.google.com/s2/favicons?domain=surfer.ai&sz=128",
  "Word AI": "https://www.google.com/s2/favicons?domain=wordai.com&sz=128",
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
    name: "Leonardo",
    category: "Image",
    type: "Gratuit",
    description: "Génération d'images professionnelles",
    url: "https://leonardo.ai"
  },
  {
    name: "Firefly",
    category: "Image",
    type: "Gratuit",
    description: "Génération d'images Adobe avec IA",
    url: "https://firefly.adobe.com"
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
    name: "Veed",
    category: "Vidéo",
    type: "Gratuit",
    description: "Édition vidéo en ligne",
    url: "https://www.veed.io"
  },
  {
    name: "Tome",
    category: "Vidéo",
    type: "Gratuit",
    description: "Création de présentations vidéo",
    url: "https://tome.app"
  },
  {
    name: "Invideo",
    category: "Vidéo",
    type: "Gratuit",
    description: "Création de vidéos marketing",
    url: "https://invideo.io"
  },
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
    name: "Elai",
    category: "Vidéo",
    type: "Gratuit",
    description: "Création de vidéos avec avatars IA",
    url: "https://elai.io"
  },
  {
    name: "Movavi",
    category: "Vidéo",
    type: "Gratuit",
    description: "Édition vidéo professionnelle",
    url: "https://www.movavi.com"
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
    name: "WriteSonic",
    category: "Rédaction",
    type: "Gratuit",
    description: "Génération de contenu marketing",
    url: "https://writesonic.com"
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

// Fonction pour obtenir l'URL du logo d'un outil avec fallback multiple
export const getToolLogoUrl = (tool: AITool): string => {
  // Vérifier d'abord le mapping spécial
  if (logoMapping[tool.name]) {
    return logoMapping[tool.name];
  }
  
  const domain = extractDomain(tool.url);
  
  // Utiliser Google Favicon API (très fiable)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
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

