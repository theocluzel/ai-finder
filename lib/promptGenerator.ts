// Fonction pour générer un prompt optimisé avec framework structuré (Tâche, Contexte, Références)
export const generateOptimizedPrompt = (
  userQuery: string,
  toolType: string,
  toolName: string,
  language: 'fr' | 'en' = 'fr'
): string => {
  const query = userQuery.toLowerCase();
  
  // Déterminer le profil selon le type d'outil
  let profile = "";
  let task = "";
  let context = "";
  let references = "";
  let contextLabel = "";
  let referencesLabel = "";
  
  if (language === 'en') {
    contextLabel = "Context:";
    referencesLabel = "References:";
  } else {
    contextLabel = "Contexte :";
    referencesLabel = "Références :";
  }
  
  // Prompts pour génération d'images
  if (toolType === "Image" || toolType === "Images" || toolName.includes("image") || toolName.includes("Image") || toolName.includes("DALL") || toolName.includes("Midjourney")) {
    if (language === 'en') {
      profile = "As a professional graphic designer specialized in visual creation";
      
      if (query.includes("logo") || query.includes("identity")) {
        task = `Create a modern and professional logo for ${userQuery}. Vector format, minimalist style, adapted for digital and print.`;
        context = "The logo must be recognizable at small size, work in black and white, and reflect the brand identity. Use simple geometric shapes and readable typography.";
        references = "Take inspiration from modern tech brand logos: Apple, Google, Airbnb. Clean style, vibrant but limited colors (2-3 colors max).";
      } else if (query.includes("photo") || query.includes("realistic")) {
        task = `Generate a photorealistic image of ${userQuery}. 4K resolution, professional quality, precise details.`;
        context = "The image must be credible and natural. Realistic lighting, depth of field, detailed textures. Avoid artifacts or unrealistic elements.";
        references = "Professional photographic style: natural lighting, balanced composition following the rule of thirds, natural and saturated colors.";
      } else if (query.includes("art") || query.includes("artistic")) {
        task = `Create an artistic illustration of ${userQuery}. Unique and creative style, dynamic composition.`;
        context = "The illustration must be aesthetically pleasing and original. Harmonious color palette, coherent style, balanced visual elements.";
        references = "Take inspiration from modern artistic styles: digital art, conceptual illustration, contemporary graphic design. Use contrasts and subtle gradients.";
      } else {
        task = `Generate a high-quality image representing ${userQuery}. Modern style, professional composition.`;
        context = "The image must be visually appealing and adapted for professional use. Premium quality, careful details, contemporary aesthetics.";
        references = "Modern visual style: clean design, balanced colors, centered composition or following the rule of thirds, professional quality.";
      }
    } else {
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
  }
  // Prompts pour vidéo
  else if (toolType === "Vidéo" || toolName.includes("video") || toolName.includes("Video") || toolName.includes("Runway")) {
    if (language === 'en') {
      profile = "As a professional video director specialized in content creation";
      
      if (query.includes("ad") || query.includes("marketing")) {
        task = `Create a 30-second advertising video for ${userQuery}. 16:9 format, HD quality, dynamic pace.`;
        context = "The video must be catchy from the first 3 seconds. Clear message, sustained pace, smooth transitions. Include a call-to-action at the end.";
        references = "Modern advertising style: dynamic editing, upbeat music, impactful visuals. Take inspiration from tech brand ads (Apple, Nike).";
      } else if (query.includes("tutorial") || query.includes("explanation")) {
        task = `Produce an explanatory video about ${userQuery}. Tutorial format, 5-10 minutes duration, educational.`;
        context = "The video must be clear and easy to follow. Numbered steps, explanatory visuals, slow and clear narration. Subtitles recommended.";
        references = "Professional tutorial style: shared screen, visual annotations, logical progression, concrete examples. Take inspiration from educational YouTube tutorials.";
      } else {
        task = `Create a professional video about ${userQuery}. Smooth editing, HD quality, engaging narration.`;
        context = "The video must maintain viewer attention. Varied pace, smooth transitions, optimal audio and video quality.";
        references = "Professional video style: cinematic editing, smooth transitions, careful color grading, quality sound.";
      }
    } else {
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
  }
  // Prompts pour design
  else if (toolType === "Design" || toolName.includes("design") || toolName.includes("Design") || toolName.includes("Figma") || toolName.includes("Canva")) {
    if (language === 'en') {
      profile = "As a professional graphic designer specialized in visual creation";
      
      if (query.includes("logo") || query.includes("identity")) {
        task = `Create a modern and professional logo for ${userQuery}. Vector format, minimalist style, adapted for digital and print.`;
        context = "The logo must be recognizable at small size, work in black and white, and reflect the brand identity. Use simple geometric shapes and readable typography.";
        references = "Take inspiration from modern tech brand logos: Apple, Google, Airbnb. Clean style, vibrant but limited colors (2-3 colors max).";
      } else if (query.includes("interface") || query.includes("UI") || query.includes("UX")) {
        task = `Design a modern and intuitive user interface for ${userQuery}. User-centered design, clear navigation.`;
        context = "The interface must be accessible, responsive, and offer a smooth user experience. Clear visual hierarchy, consistent spacing, visible call-to-actions.";
        references = "Modern UI/UX style: coherent design system, subtle micro-interactions, harmonious color palette. Take inspiration from tech product interfaces (Figma, Notion, Linear).";
      } else if (query.includes("poster") || query.includes("flyer")) {
        task = `Create a visually impactful poster for ${userQuery}. Balanced composition, readable typography, clear message.`;
        context = "The poster must attract attention immediately. Strong visual hierarchy, high contrast, main message highlighted. Format adapted to the medium (print or digital).";
        references = "Modern poster style: bold compositions, expressive typography, contrasting colors. Take inspiration from contemporary event and advertising posters.";
      } else {
        task = `Create a professional and modern design for ${userQuery}. Contemporary aesthetics, premium quality.`;
        context = "The design must be visually appealing and adapted to the intended use. Visual coherence, attention to details, finalized result ready for use.";
        references = "Modern design style: elegant minimalism, generous spacing, careful typography, balanced color palette. Take inspiration from premium brand designs.";
      }
    } else {
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
  }
  // Prompts pour rédaction
  else if (toolType === "Rédaction" || toolType === "Texte" || toolName.includes("text") || toolName.includes("Text") || toolName.includes("Copy") || toolName.includes("Jasper") || toolName.includes("Claude")) {
    if (language === 'en') {
      profile = "As a professional writer specialized in content creation";
      
      if (query.includes("article") || query.includes("blog")) {
        task = `Write a complete and detailed article about ${userQuery}. Minimum 1000 words, clear structure with introduction, development and conclusion.`;
        context = "The article must be informative, well-structured with H2/H3 subtitles, SEO optimized with relevant keywords. Professional but accessible tone.";
        references = "Professional editorial style: tech blog articles (Medium, TechCrunch). Use concrete examples, data if possible, and an engaging tone.";
      } else if (query.includes("ad") || query.includes("marketing") || query.includes("advertising")) {
        task = `Create a persuasive advertising text for ${userQuery}. Short and impactful format, strong call-to-action.`;
        context = "The text must be catchy, highlight benefits rather than features. Enthusiastic but credible tone, length adapted to the medium (social media, email, etc.).";
        references = "Modern copywriting style: impactful hooks, clear benefits, measured urgency. Take inspiration from major brands (Apple, Tesla) for premium tone.";
      } else if (query.includes("email") || query.includes("mail")) {
        task = `Write a professional email about ${userQuery}. Catchy subject, concise and clear message.`;
        context = "The email must be direct and actionable. Short subject (50 characters max), structured message body, visible call-to-action. Professional but human tone.";
        references = "Effective email marketing style: personalized subject, scannable message, clear CTA. Take inspiration from professional newsletter emails (Substack, Revue).";
      } else if (query.includes("cv") || query.includes("resume") || query.includes("curriculum")) {
        task = `Optimize and improve my CV for ${userQuery}. Professional formatting, relevant keywords, clear structure.`;
        context = "The CV must be ATS-friendly (simple format), highlight achievements with numbers, use action verbs. Adapt content to the targeted position.";
        references = "Modern CV style: reverse chronological format, clear sections, clean design. Take inspiration from tech CVs (GitHub, LinkedIn) for structure.";
      } else {
        task = `Write professional quality content about ${userQuery}. Adapted style, precise information.`;
        context = "The content must be relevant, well-structured and adapted to the target audience. Professional tone, verifiable information, appropriate length.";
        references = "Professional writing style: clarity, precision, engagement. Take inspiration from quality content (Harvard Business Review, The Guardian).";
      }
    } else {
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
  }
  // Prompt par défaut
  else {
    if (language === 'en') {
      profile = "As a creative professional";
      task = `Create professional and optimized content for ${userQuery}. Premium quality, finalized result.`;
      context = "The content must be high quality, adapted to the intended use, and precisely respond to the expressed need.";
      references = "Modern professional style: premium quality, attention to details, finalized result ready for use.";
    } else {
      profile = "En tant que professionnel créatif";
      task = `Crée un contenu professionnel et optimisé pour ${userQuery}. Qualité premium, résultat finalisé.`;
      context = "Le contenu doit être de haute qualité, adapté à l'usage prévu, et répondre précisément au besoin exprimé.";
      references = "Style professionnel moderne : qualité premium, attention aux détails, résultat finalisé et prêt à l'emploi.";
    }
  }
  
  // Retourner le prompt structuré
  return `${profile}, ${task.toLowerCase()}\n\n${contextLabel} ${context}\n\n${referencesLabel} ${references}`;
};

