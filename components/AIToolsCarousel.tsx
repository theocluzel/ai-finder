"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Image,
  Video,
  Music,
  Code,
  FileText,
  Sparkles,
  Brain,
  Palette,
  PenTool,
  Type,
  Film,
  BarChart3,
  Building2,
  TrendingUp,
  Users,
  Calculator,
  Briefcase,
  Target,
  PieChart,
  DollarSign,
  Mail,
  Calendar,
  Zap,
  Shield,
  Eye,
  Scan,
  GraduationCap,
  Mic,
  FlaskConical,
  Cpu,
} from "lucide-react";
import LogoImage from "./LogoImage";
import { aiToolsList, getToolsByCategory } from "@/data/aiTools";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslatedDescription } from "@/lib/descriptionTranslations";

// Mapping spécial pour les outils du carrousel qui ne sont pas dans la liste principale
const carouselLogoMapping: Record<string, string> = {
  "ChatGPT": "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
  "Claude": "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128",
  "Perplexity": "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128",
  "Notion AI": "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
  "Zapier": "https://www.google.com/s2/favicons?domain=zapier.com&sz=128",
  "Make": "https://www.google.com/s2/favicons?domain=make.com&sz=128",
  "Jasper": "https://www.google.com/s2/favicons?domain=jasper.ai&sz=128",
  "Surfer": "https://www.google.com/s2/favicons?domain=surfer.ai&sz=128",
  "Frase AI": "https://www.google.com/s2/favicons?domain=frase.io&sz=128",
  "Growthbar": "https://www.google.com/s2/favicons?domain=growthbar.seo&sz=128",
  "QuickBooks AI": "https://www.google.com/s2/favicons?domain=quickbooks.intuit.com&sz=128",
  "Xero": "https://www.google.com/s2/favicons?domain=xero.com&sz=128",
  "Plaid": "https://www.google.com/s2/favicons?domain=plaid.com&sz=128",
  "Klarity": "https://www.google.com/s2/favicons?domain=klarity.com&sz=128",
  "Salesforce Einstein": "https://www.google.com/s2/favicons?domain=salesforce.com&sz=128",
  "HubSpot": "https://www.google.com/s2/favicons?domain=hubspot.com&sz=128",
  "Intercom": "https://www.google.com/s2/favicons?domain=intercom.com&sz=128",
  "Drift": "https://www.google.com/s2/favicons?domain=drift.com&sz=128",
  "Crayon": "https://www.google.com/s2/favicons?domain=crayon.co&sz=128",
  "Brandwatch": "https://www.google.com/s2/favicons?domain=brandwatch.com&sz=128",
  "Sprout Social": "https://www.google.com/s2/favicons?domain=sproutsocial.com&sz=128",
  "BuzzSumo": "https://www.google.com/s2/favicons?domain=buzzsumo.com&sz=128",
  "Otter.ai": "https://www.google.com/s2/favicons?domain=otter.ai&sz=128",
  "Fireflies": "https://www.google.com/s2/favicons?domain=fireflies.ai&sz=128",
  "Calendly AI": "https://www.google.com/s2/favicons?domain=calendly.com&sz=128",
  "Motion": "https://www.google.com/s2/favicons?domain=motion.app&sz=128",
  "Reclaim": "https://www.google.com/s2/favicons?domain=reclaim.ai&sz=128",
  "Superhuman": "https://www.google.com/s2/favicons?domain=superhuman.com&sz=128",
  "SaneBox": "https://www.google.com/s2/favicons?domain=sanebox.com&sz=128",
  "Boomerang": "https://www.google.com/s2/favicons?domain=boomerangapp.com&sz=128",
  "Midjourney": "https://www.google.com/s2/favicons?domain=midjourney.com&sz=128",
  "DALL-E": "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
  "Figma": "https://www.google.com/s2/favicons?domain=figma.com&sz=128",
  "Canva": "https://www.google.com/s2/favicons?domain=canva.com&sz=128",
  "Looka": "https://www.google.com/s2/favicons?domain=looka.com&sz=128",
  "Runway": "https://www.google.com/s2/favicons?domain=runwayml.com&sz=128",
  "Synthesia": "https://www.google.com/s2/favicons?domain=synthesia.io&sz=128",
  "Descript": "https://www.google.com/s2/favicons?domain=descript.com&sz=128",
  "GitHub Copilot": "https://www.google.com/s2/favicons?domain=github.com&sz=128",
  "Cursor": "https://www.google.com/s2/favicons?domain=cursor.sh&sz=128",
  "Replit": "https://www.google.com/s2/favicons?domain=replit.com&sz=128",
  "GPTZero": "https://www.google.com/s2/favicons?domain=gptzero.me&sz=128",
  "Originality.ai": "https://www.google.com/s2/favicons?domain=originality.ai&sz=128",
  "Copyleaks": "https://www.google.com/s2/favicons?domain=copyleaks.com&sz=128",
  "Sensity AI": "https://www.google.com/s2/favicons?domain=sensity.ai&sz=128",
  "Reality Defender": "https://www.google.com/s2/favicons?domain=realitydefender.com&sz=128",
  "GPT-4o": "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
  "Gemini 2.0": "https://www.google.com/s2/favicons?domain=google.com&sz=128",
  "Grok": "https://www.google.com/s2/favicons?domain=x.com&sz=128",
  "Mistral Large": "https://www.google.com/s2/favicons?domain=mistral.ai&sz=128",
  "LLaVA": "https://www.google.com/s2/favicons?domain=llava-vl.github.io&sz=128",
  "Kosmos-2": "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128",
  "Stable Diffusion XL": "https://www.google.com/s2/favicons?domain=stability.ai&sz=128",
  "Ideogram": "https://www.google.com/s2/favicons?domain=ideogram.ai&sz=128",
  "Kandinsky": "https://www.google.com/s2/favicons?domain=kandinsky.ai&sz=128",
  "Playground v2": "https://www.google.com/s2/favicons?domain=playgroundai.com&sz=128",
  "Fooocus": "https://www.google.com/s2/favicons?domain=fooocus.com&sz=128",
  "DragGAN": "https://www.google.com/s2/favicons?domain=draggan.github.io&sz=128",
  "ControlNet": "https://www.google.com/s2/favicons?domain=lllyasviel.github.io&sz=128",
  "Sora": "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
  "Pika Labs": "https://www.google.com/s2/favicons?domain=pika.art&sz=128",
  "Luma Dream Machine": "https://www.google.com/s2/favicons?domain=lumalabs.ai&sz=128",
  "Kaiber": "https://www.google.com/s2/favicons?domain=kaiber.ai&sz=128",
  "PixVerse": "https://www.google.com/s2/favicons?domain=pixverse.ai&sz=128",
  "Viggle AI": "https://www.google.com/s2/favicons?domain=viggle.ai&sz=128",
  "ElevenLabs": "https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128",
  "OpenAI TTS": "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
  "Whisper": "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
  "Coqui AI": "https://www.google.com/s2/favicons?domain=coqui.ai&sz=128",
  "PlayHT": "https://www.google.com/s2/favicons?domain=play.ht&sz=128",
  "RVC": "https://www.google.com/s2/favicons?domain=rvc.com&sz=128",
  "Copy.ai": "https://www.google.com/s2/favicons?domain=copy.ai&sz=128",
  "Sudowrite": "https://www.google.com/s2/favicons?domain=sudowrite.com&sz=128",
  "NovelAI": "https://www.google.com/s2/favicons?domain=novelai.net&sz=128",
  "Rytr": "https://www.google.com/s2/favicons?domain=rytr.me&sz=128",
  "GrammarlyGO": "https://www.google.com/s2/favicons?domain=grammarly.com&sz=128",
  "Wolfram Alpha": "https://www.google.com/s2/favicons?domain=wolframalpha.com&sz=128",
  "Photomath": "https://www.google.com/s2/favicons?domain=photomath.com&sz=128",
  "MathGPT": "https://www.google.com/s2/favicons?domain=mathgpt.com&sz=128",
  "Symbolab": "https://www.google.com/s2/favicons?domain=symbolab.com&sz=128",
  "Scribe AI": "https://www.google.com/s2/favicons?domain=scribe.ai&sz=128",
  "Replit Ghostwriter": "https://www.google.com/s2/favicons?domain=replit.com&sz=128",
  "Codeium": "https://www.google.com/s2/favicons?domain=codeium.com&sz=128",
  "Devin": "https://www.google.com/s2/favicons?domain=cognition-labs.com&sz=128",
  "Tabnine": "https://www.google.com/s2/favicons?domain=tabnine.com&sz=128",
  "Cohere Command-R": "https://www.google.com/s2/favicons?domain=cohere.com&sz=128",
  "Tome AI": "https://www.google.com/s2/favicons?domain=tome.app&sz=128",
  "Remini": "https://www.google.com/s2/favicons?domain=remini.ai&sz=128",
  "Topaz Video Enhance": "https://www.google.com/s2/favicons?domain=topazlabs.com&sz=128",
  "Green Screen AI": "https://www.google.com/s2/favicons?domain=greenscreenai.com&sz=128",
  "ClipDrop": "https://www.google.com/s2/favicons?domain=clipdrop.co&sz=128",
  "Palette.fm": "https://www.google.com/s2/favicons?domain=palette.fm&sz=128",
  "Photoroom AI": "https://www.google.com/s2/favicons?domain=photoroom.com&sz=128",
  "Shortcut": "https://www.google.com/s2/favicons?domain=shortcut.com&sz=128",
  "Alforithmic": "https://www.google.com/s2/favicons?domain=alforithmic.com&sz=128",
  "DeepFaceLab": "https://www.google.com/s2/favicons?domain=deepfacelab.com&sz=128",
  "InsightFace": "https://www.google.com/s2/favicons?domain=insightface.ai&sz=128",
  "DreamTalk AI": "https://www.google.com/s2/favicons?domain=dreamtalk.ai&sz=128",
  "AlphaFold": "https://www.google.com/s2/favicons?domain=alphafold.ebi.ac.uk&sz=128",
  "AlphaMissense": "https://www.google.com/s2/favicons?domain=alphafold.ebi.ac.uk&sz=128",
  "AutoGPT": "https://www.google.com/s2/favicons?domain=autogpt.net&sz=128",
  "BabyAGI": "https://www.google.com/s2/favicons?domain=babyagi.com&sz=128",
  "Roboflow": "https://www.google.com/s2/favicons?domain=roboflow.com&sz=128",
};

// Fonction pour obtenir l'URL du logo d'un outil par son nom
const getLogoUrlByName = (toolName: string): string => {
  // Vérifier d'abord le mapping spécial
  if (carouselLogoMapping[toolName]) {
    return carouselLogoMapping[toolName];
  }
  
  // Chercher dans la liste principale
  const tool = aiToolsList.find(t => t.name === toolName || t.name.includes(toolName) || toolName.includes(t.name));
  if (tool) {
    const domain = tool.url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    // Utiliser Google Favicon API (très fiable)
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  }
  
  // Fallback : générer depuis le nom
  const domain = toolName.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/ai$/i, '')
    .replace(/\./g, '');
  return `https://www.google.com/s2/favicons?domain=${domain}.com&sz=128`;
};

const aiToolsBase = [
  // BUSINESS & ANALYSE (garder les descriptions originales)
  { name: "ChatGPT", specialty: "assistance générale et analyse de données", icon: Brain, color: "from-green-500 to-emerald-500" },
  { name: "Claude", specialty: "analyse de documents et stratégie business", icon: Brain, color: "from-indigo-500 to-blue-500" },
  { name: "Perplexity", specialty: "recherche et analyse de marché", icon: BarChart3, color: "from-blue-500 to-cyan-500" },
  { name: "Notion AI", specialty: "gestion de projets et organisation", icon: Briefcase, color: "from-gray-500 to-slate-500" },
  { name: "Zapier", specialty: "automatisation de workflows entreprise", icon: Zap, color: "from-orange-500 to-red-500" },
  { name: "Make", specialty: "automatisation de processus métier", icon: Zap, color: "from-purple-500 to-pink-500" },
  { name: "Jasper", specialty: "rédaction marketing et stratégie", icon: FileText, color: "from-orange-500 to-yellow-500" },
  { name: "Surfer", specialty: "analyse SEO et optimisation contenu", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
  { name: "Frase AI", specialty: "recherche et analyse de contenu SEO", icon: FileText, color: "from-blue-500 to-cyan-500" },
  { name: "Growthbar", specialty: "analyse SEO et stratégie blogging", icon: BarChart3, color: "from-cyan-500 to-blue-500" },
  // COMPTABILITÉ & FINANCE
  { name: "QuickBooks AI", specialty: "gestion comptable automatisée", icon: Calculator, color: "from-green-500 to-teal-500" },
  { name: "Xero", specialty: "comptabilité et facturation intelligente", icon: DollarSign, color: "from-blue-500 to-indigo-500" },
  { name: "Plaid", specialty: "analyse financière et transactions", icon: PieChart, color: "from-purple-500 to-pink-500" },
  { name: "Klarity", specialty: "analyse de contrats et documents", icon: FileText, color: "from-indigo-500 to-purple-500" },
  // CRM & RELATIONS CLIENT
  { name: "Salesforce Einstein", specialty: "gestion CRM et prédictions ventes", icon: Users, color: "from-blue-500 to-cyan-500" },
  { name: "HubSpot", specialty: "automatisation marketing et CRM", icon: Target, color: "from-orange-500 to-red-500" },
  { name: "Intercom", specialty: "support client automatisé", icon: MessageSquare, color: "from-green-500 to-emerald-500" },
  { name: "Drift", specialty: "chatbots et qualification de leads", icon: MessageSquare, color: "from-purple-500 to-pink-500" },
  // ANALYSE DE MARCHÉ
  { name: "Crayon", specialty: "veille concurrentielle et analyse marché", icon: TrendingUp, color: "from-pink-500 to-rose-500" },
  { name: "Brandwatch", specialty: "analyse de sentiment et social listening", icon: BarChart3, color: "from-indigo-500 to-blue-500" },
  { name: "Sprout Social", specialty: "analyse réseaux sociaux et engagement", icon: Users, color: "from-green-500 to-emerald-500" },
  { name: "BuzzSumo", specialty: "analyse de contenu viral et tendances", icon: TrendingUp, color: "from-orange-500 to-yellow-500" },
  // PRODUCTIVITÉ & ORGANISATION
  { name: "Otter.ai", specialty: "transcription et prise de notes automatique", icon: FileText, color: "from-cyan-500 to-blue-500" },
  { name: "Fireflies", specialty: "analyse de réunions et résumés", icon: MessageSquare, color: "from-purple-500 to-indigo-500" },
  { name: "Calendly AI", specialty: "planification de rendez-vous intelligente", icon: Calendar, color: "from-blue-500 to-cyan-500" },
  { name: "Motion", specialty: "planification de tâches optimisée", icon: Calendar, color: "from-pink-500 to-purple-500" },
  { name: "Reclaim", specialty: "optimisation de calendrier et planning", icon: Calendar, color: "from-green-500 to-teal-500" },
  // EMAIL & COMMUNICATION
  { name: "Superhuman", specialty: "gestion email intelligente", icon: Mail, color: "from-purple-500 to-pink-500" },
  { name: "SaneBox", specialty: "organisation et tri automatique d'emails", icon: Mail, color: "from-blue-500 to-indigo-500" },
  { name: "Boomerang", specialty: "planification et rappels d'emails", icon: Mail, color: "from-green-500 to-emerald-500" },
  // IMAGES & DESIGN
  { name: "Midjourney", specialty: "génération d'images artistiques", icon: Image, color: "from-pink-500 to-rose-500" },
  { name: "DALL-E", specialty: "création d'images à partir de texte", icon: Image, color: "from-indigo-500 to-purple-500" },
  { name: "Figma", specialty: "design collaboratif et prototypage", icon: Palette, color: "from-green-500 to-emerald-500" },
  { name: "Canva", specialty: "création graphique simplifiée", icon: Palette, color: "from-cyan-500 to-blue-500" },
  { name: "Looka", specialty: "création de logos professionnels", icon: Sparkles, color: "from-pink-500 to-rose-500" },
  // VIDÉO
  { name: "Runway", specialty: "création et édition de vidéos", icon: Video, color: "from-indigo-500 to-purple-500" },
  { name: "Synthesia", specialty: "création de vidéos avec avatars IA", icon: Video, color: "from-green-500 to-emerald-500" },
  { name: "Descript", specialty: "édition vidéo par transcription", icon: Video, color: "from-blue-500 to-cyan-500" },
  // CODE & TECH
  { name: "GitHub Copilot", specialty: "assistance à la programmation", icon: Code, color: "from-orange-500 to-red-500" },
  { name: "Cursor", specialty: "éditeur de code assisté par IA", icon: Code, color: "from-purple-500 to-pink-500" },
  { name: "Replit", specialty: "développement et déploiement automatisé", icon: Code, color: "from-blue-500 to-cyan-500" },
  // DÉTECTION DE CONTENU GÉNÉRÉ PAR IA
  { name: "GPTZero", specialty: "détection de texte généré par IA", icon: Shield, color: "from-red-500 to-orange-500" },
  { name: "Originality.ai", specialty: "détection de contenu IA (texte, images, vidéos)", icon: Eye, color: "from-purple-500 to-indigo-500" },
  { name: "Copyleaks", specialty: "détection de plagiat et contenu IA", icon: Scan, color: "from-blue-500 to-cyan-500" },
  { name: "Sensity AI", specialty: "détection de deepfakes et vidéos IA", icon: Video, color: "from-pink-500 to-rose-500" },
  { name: "Reality Defender", specialty: "détection de deepfakes et médias synthétiques", icon: Shield, color: "from-red-500 to-pink-500" },
  // NOUVELLES IA À AJOUTER (de la liste fournie)
  { name: "GPT-4o", specialty: "raisonnement, code, multimodalité, tâches complexes", icon: Brain, color: "from-green-500 to-emerald-500" },
  { name: "Gemini 2.0", specialty: "vision temps réel, multimodal, recherche Google", icon: Brain, color: "from-blue-500 to-cyan-500" },
  { name: "Grok", specialty: "humour, ton rebelle, mise à jour temps réel via X", icon: Brain, color: "from-purple-500 to-pink-500" },
  { name: "Mistral Large", specialty: "open source, rapidité, LLM européen", icon: Brain, color: "from-violet-500 to-purple-500" },
  { name: "LLaVA", specialty: "vision + langage open source, analyse d'images", icon: Eye, color: "from-pink-500 to-rose-500" },
  { name: "Kosmos-2", specialty: "compréhension image + texte + OCR", icon: Scan, color: "from-indigo-500 to-purple-500" },
  { name: "Stable Diffusion XL", specialty: "open source, entraînement custom, contrôle avancé", icon: Image, color: "from-purple-500 to-indigo-500" },
  { name: "Ideogram", specialty: "texte dans l'image parfait (logos, affiches)", icon: Type, color: "from-blue-500 to-cyan-500" },
  { name: "Kandinsky", specialty: "style artistique fluide et abstrait", icon: Palette, color: "from-green-500 to-emerald-500" },
  { name: "Playground v2", specialty: "photoréalisme optimisé", icon: Image, color: "from-orange-500 to-yellow-500" },
  { name: "Fooocus", specialty: "interface simple + pipeline optimisé automatique", icon: Image, color: "from-cyan-500 to-blue-500" },
  { name: "DragGAN", specialty: "déplacer/déformer objets dans image avec précision", icon: PenTool, color: "from-violet-500 to-purple-500" },
  { name: "ControlNet", specialty: "guider l'image via pose, profondeur, edges", icon: Image, color: "from-pink-500 to-purple-500" },
  { name: "Sora", specialty: "vidéos cohérentes longue durée", icon: Video, color: "from-green-500 to-emerald-500" },
  { name: "Pika Labs", specialty: "effets de caméra, transitions, fluidité", icon: Video, color: "from-purple-500 to-pink-500" },
  { name: "Luma Dream Machine", specialty: "réalisme vidéo très élevé", icon: Video, color: "from-blue-500 to-cyan-500" },
  { name: "Kaiber", specialty: "clips stylisés pour musique", icon: Video, color: "from-pink-500 to-rose-500" },
  { name: "PixVerse", specialty: "animations 2D/3D stylisées", icon: Video, color: "from-indigo-500 to-blue-500" },
  { name: "Viggle AI", specialty: "faire danser/mouvement humain via motion transfer", icon: Video, color: "from-orange-500 to-red-500" },
  { name: "ElevenLabs", specialty: "clonage de voix hyper réaliste", icon: Mic, color: "from-yellow-500 to-orange-500" },
  { name: "OpenAI TTS", specialty: "voix dynamiques conversationnelles", icon: Mic, color: "from-green-500 to-emerald-500" },
  { name: "Whisper", specialty: "transcription audio multilingue ultra précise", icon: Mic, color: "from-blue-500 to-cyan-500" },
  { name: "Coqui AI", specialty: "open source + TTS expressif", icon: Mic, color: "from-purple-500 to-pink-500" },
  { name: "PlayHT", specialty: "voix longues et naturelles pour podcasts", icon: Mic, color: "from-indigo-500 to-purple-500" },
  { name: "RVC", specialty: "changement de voix en temps réel", icon: Mic, color: "from-pink-500 to-rose-500" },
  { name: "Copy.ai", specialty: "contenu commercial automatisé", icon: FileText, color: "from-purple-500 to-pink-500" },
  { name: "Sudowrite", specialty: "créativité pour écrivains + romans", icon: FileText, color: "from-blue-500 to-cyan-500" },
  { name: "NovelAI", specialty: "écriture de fiction + génération anime", icon: FileText, color: "from-indigo-500 to-purple-500" },
  { name: "Rytr", specialty: "textes courts rapides", icon: FileText, color: "from-green-500 to-emerald-500" },
  { name: "GrammarlyGO", specialty: "correction & style", icon: FileText, color: "from-cyan-500 to-blue-500" },
  { name: "Wolfram Alpha", specialty: "résolution math scientifique irréprochable", icon: Calculator, color: "from-red-500 to-orange-500" },
  { name: "Photomath", specialty: "résoudre équations à partir d'une photo", icon: Calculator, color: "from-blue-500 to-indigo-500" },
  { name: "MathGPT", specialty: "résolution étape par étape", icon: Calculator, color: "from-purple-500 to-pink-500" },
  { name: "Symbolab", specialty: "résolution algébrique", icon: Calculator, color: "from-green-500 to-teal-500" },
  { name: "Scribe AI", specialty: "résumés de cours + structuration", icon: FileText, color: "from-cyan-500 to-blue-500" },
  { name: "Replit Ghostwriter", specialty: "génération de projets + debugging", icon: Code, color: "from-blue-500 to-cyan-500" },
  { name: "Codeium", specialty: "open source + complet", icon: Code, color: "from-green-500 to-emerald-500" },
  { name: "Devin", specialty: "AI Software Engineer complet", icon: Code, color: "from-indigo-500 to-purple-500" },
  { name: "Tabnine", specialty: "completions rapides, privacy friendly", icon: Code, color: "from-cyan-500 to-blue-500" },
  { name: "Cohere Command-R", specialty: "entreprises, données privées", icon: Building2, color: "from-blue-500 to-indigo-500" },
  { name: "Tome AI", specialty: "présentations automatiques", icon: Video, color: "from-blue-500 to-cyan-500" },
  { name: "Remini", specialty: "restauration visage / photos anciennes", icon: Image, color: "from-pink-500 to-rose-500" },
  { name: "Topaz Video Enhance", specialty: "upscale vidéo 4K/8K", icon: Video, color: "from-indigo-500 to-purple-500" },
  { name: "Green Screen AI", specialty: "suppression d'arrière-plan précise", icon: Image, color: "from-green-500 to-emerald-500" },
  { name: "ClipDrop", specialty: "retouche, relight, cleanup", icon: Image, color: "from-purple-500 to-pink-500" },
  { name: "Palette.fm", specialty: "colorisation photo automatique", icon: Image, color: "from-yellow-500 to-orange-500" },
  { name: "Photoroom AI", specialty: "packshots e-commerce", icon: Image, color: "from-cyan-500 to-blue-500" },
  { name: "Shortcut", specialty: "avatars parlants réalistes", icon: Video, color: "from-pink-500 to-purple-500" },
  { name: "Alforithmic", specialty: "voix émotionnelles pour narration", icon: Mic, color: "from-indigo-500 to-blue-500" },
  { name: "DeepFaceLab", specialty: "deepfakes avancés", icon: Video, color: "from-red-500 to-pink-500" },
  { name: "InsightFace", specialty: "reconnaissance et édition du visage", icon: Image, color: "from-purple-500 to-indigo-500" },
  { name: "DreamTalk AI", specialty: "synchronisation labiale parfaite", icon: Video, color: "from-blue-500 to-cyan-500" },
  { name: "AlphaFold", specialty: "prédiction de structure protéique", icon: FlaskConical, color: "from-green-500 to-teal-500" },
  { name: "AlphaMissense", specialty: "dépend mutations génétiques", icon: FlaskConical, color: "from-blue-500 to-indigo-500" },
  { name: "AutoGPT", specialty: "agents autonomes", icon: Cpu, color: "from-purple-500 to-pink-500" },
  { name: "BabyAGI", specialty: "agents autonomes avancés", icon: Cpu, color: "from-indigo-500 to-purple-500" },
  { name: "Roboflow", specialty: "vision industrielle + datasets", icon: Eye, color: "from-cyan-500 to-blue-500" },
];

// Mélanger l'ordre des outils de manière déterministe (pour éviter les erreurs d'hydratation)
// Utilisation d'une seed fixe pour avoir le même ordre à chaque rendu
const shuffleDeterministic = <T,>(array: T[], seed: number = 42): T[] => {
  const shuffled = [...array];
  let random = seed;
  const nextRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(nextRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const aiTools = shuffleDeterministic(aiToolsBase);

interface AIToolsCarouselProps {
  selectedCategory?: string;
}

export default function AIToolsCarousel({ selectedCategory }: AIToolsCarouselProps) {
  const { t, language } = useLanguage();
  
  // Filtrer les outils par catégorie si une catégorie est sélectionnée
  let filteredTools = aiTools;
  if (selectedCategory) {
    // Obtenir les outils de la catégorie depuis la vraie liste
    const categoryTools = getToolsByCategory(selectedCategory);
    // Filtrer aiTools pour ne garder que ceux qui sont dans la catégorie
    const categoryToolNames = new Set(categoryTools.map(t => t.name));
    filteredTools = aiTools.filter(tool => categoryToolNames.has(tool.name));
    
    // Si aucun outil ne correspond, utiliser tous les outils
    if (filteredTools.length === 0) {
      filteredTools = aiTools;
    }
  }
  
  // Diviser les outils en deux groupes pour les deux carrousels
  const firstHalf = filteredTools.slice(0, Math.ceil(filteredTools.length / 2));
  const secondHalf = filteredTools.slice(Math.ceil(filteredTools.length / 2));

  // Dupliquer les outils 3 fois pour un défilement infini sans bord visible
  // Cela garantit qu'il n'y a jamais de fin visible du track
  const duplicatedTools1 = [...firstHalf, ...firstHalf, ...firstHalf];
  const duplicatedTools2 = [...secondHalf, ...secondHalf, ...secondHalf];

  // Calculer la largeur totale pour l'animation
  // Utiliser une valeur moyenne qui fonctionne bien sur tous les écrans
  const cardWidth = 240; // Valeur moyenne entre mobile et desktop
  const gap = 24; // gap-4 sm:gap-6
  const segmentWidth1 = (cardWidth + gap) * firstHalf.length;
  const segmentWidth2 = (cardWidth + gap) * secondHalf.length;
  
  // L'animation boucle sur un seul segment (1/3 du contenu total)
  // Quand elle atteint la fin du segment, elle revient invisiblement au début
  const totalWidth1 = segmentWidth1;
  const totalWidth2 = segmentWidth2;

  // Durée de base (300 secondes = 5 minutes) pour tous les outils
  const baseDuration = 300;
  const totalToolsCount = aiTools.length; // Nombre total d'outils sans filtre
  
  // Ajuster la durée proportionnellement pour maintenir la même vitesse
  // Si on a moins d'outils, on réduit la durée pour parcourir la même distance relative
  const duration = selectedCategory 
    ? (baseDuration * filteredTools.length) / totalToolsCount
    : baseDuration;

  function ValidatedCarouselCard({ tool, index }: { tool: (typeof aiToolsBase)[number]; index: number }) {
    const logoUrl = getLogoUrlByName(tool.name);
    const [status, setStatus] = useState<"loading" | "ok" | "fail">("loading");

    // Si pas d'URL => on ne rend pas la carte (règle produit)
    if (!logoUrl) return null;
    if (status === "fail") return null;

    return (
      <motion.div
        whileHover={{ y: -2 }}
        data-ai-card="true"
        className="flex-shrink-0 w-56 sm:w-64 md:w-80 card-surface rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 cursor-pointer group relative z-10"
      >
        <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4">
          <div className="flex items-center justify-center relative">
            {/* Skeleton neutre tant que le logo n'est pas validé */}
            {status === "loading" && (
              <div className="absolute inset-0 rounded-xl bg-white/5 animate-pulse" />
            )}
            <LogoImage
              src={logoUrl}
              alt={tool.name}
              size="md"
              className="sm:hidden shadow-none"
              onStatusChange={(s) => setStatus(s)}
            />
            <LogoImage
              src={logoUrl}
              alt={tool.name}
              size="lg"
              className="hidden sm:block shadow-none"
              onStatusChange={(s) => setStatus(s)}
            />
          </div>
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2 leading-snug">
              {tool.name}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-snug">
              {t.veryGoodAt}{" "}
              <span className="text-purple-400 font-semibold">
                {getTranslatedDescription(tool.specialty, language)}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full py-6 sm:py-8 md:py-12 carousel-shell">
      {/* Carrousel 1 : Droite vers Gauche */}
      <div className="overflow-hidden relative mb-8 sm:mb-10 md:mb-12 carousel-viewport">
        <div className="py-2 sm:py-3 md:py-4">
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8 carousel-track"
            animate={{
              x: [0, -totalWidth1],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: duration,
                ease: "linear",
              },
            }}
            style={{
              width: `${duplicatedTools1.length * (cardWidth + gap)}px`,
            }}
          >
            {duplicatedTools1.map((tool, index) => (
              <ValidatedCarouselCard key={`carousel1-${tool.name}-${index}`} tool={tool} index={index} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Carrousel 2 : Gauche vers Droite */}
      <div className="overflow-hidden relative carousel-viewport">
        <div className="py-2 sm:py-3 md:py-4">
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8 carousel-track"
            initial={{ x: -totalWidth2 }}
            animate={{
              x: [-totalWidth2, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: duration,
                ease: "linear",
              },
            }}
            style={{
              width: `${duplicatedTools2.length * (cardWidth + gap)}px`,
            }}
          >
            {duplicatedTools2.map((tool, index) => (
              <ValidatedCarouselCard key={`carousel2-${tool.name}-${index}`} tool={tool} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

