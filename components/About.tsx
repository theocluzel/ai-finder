"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, Sparkles, FileText, Lightbulb, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function About({ isOpen, onClose }: AboutProps) {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<"intro" | "framework" | "examples">("intro");
  
  
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl p-6 md:p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t.aboutTitle}
          </h2>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveSection("intro")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeSection === "intro"
                ? "bg-purple-500 text-white"
                : "glass text-gray-300 hover:bg-white/10"
            }`}
          >
            {t.intro || "Introduction"}
          </button>
          <button
            onClick={() => setActiveSection("framework")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeSection === "framework"
                ? "bg-purple-500 text-white"
                : "glass text-gray-300 hover:bg-white/10"
            }`}
          >
            Framework
          </button>
          <button
            onClick={() => setActiveSection("examples")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeSection === "examples"
                ? "bg-purple-500 text-white"
                : "glass text-gray-300 hover:bg-white/10"
            }`}
          >
            {t.examples}
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeSection === "intro" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{t.whyPrompt}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t.whyPromptText}
                  </p>
                </div>
              </div>
              
              <div className="glass rounded-2xl p-4">
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-white">{t.effectivePrompt}</strong> {t.effectivePromptText} <strong className="text-purple-400">{t.task}</strong>, 
                  le <strong className="text-purple-400">{t.context}</strong>, et les <strong className="text-purple-400">{t.references}</strong>.
                </p>
              </div>
            </motion.div>
          )}

          {activeSection === "framework" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-400" />
                  {t.createPetition}
                </h3>
                
                <div className="space-y-4">
                  <div className="glass rounded-2xl p-4">
                    <h4 className="text-lg font-bold text-purple-400 mb-2">1. {t.task}</h4>
                    <p className="text-gray-300 mb-2">
                      {t.taskDesc}
                    </p>
                    <div className="glass rounded-lg p-3 mt-2">
                      <p className="text-sm text-gray-400 italic">
                        {t.taskExample}
                      </p>
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-4">
                    <h4 className="text-lg font-bold text-purple-400 mb-2">2. {t.context}</h4>
                    <p className="text-gray-300 mb-2">
                      {t.contextDesc}
                    </p>
                    <div className="glass rounded-lg p-3 mt-2">
                      <p className="text-sm text-gray-400 italic">
                        {t.contextExample}
                      </p>
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-4">
                    <h4 className="text-lg font-bold text-purple-400 mb-2">3. {t.references}</h4>
                    <p className="text-gray-300 mb-2">
                      {t.referencesDesc}
                    </p>
                    <div className="glass rounded-lg p-3 mt-2">
                      <p className="text-sm text-gray-400 italic">
                        {t.referencesExample}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  {t.reviewResponse}
                </h3>
                
                <div className="space-y-4">
                  <div className="glass rounded-2xl p-4">
                    <h4 className="text-lg font-bold text-green-400 mb-2">{t.evaluation}</h4>
                    <p className="text-gray-300 mb-2">
                      {t.evaluationDesc}
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 mt-2">
                      <li>{t.evaluationQ1}</li>
                      <li>{t.evaluationQ2}</li>
                      <li>{t.evaluationQ3}</li>
                    </ul>
                  </div>

                  <div className="glass rounded-2xl p-4">
                    <h4 className="text-lg font-bold text-green-400 mb-2">{t.iterate}</h4>
                    <p className="text-gray-300 mb-2">
                      {t.iterateDesc}
                    </p>
                    <div className="glass rounded-lg p-3 mt-2">
                      <p className="text-sm text-gray-400 italic">
                        {t.iterateExample}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "examples" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  {t.examplesTitle}
                </h3>
              </div>

              <div className="glass rounded-2xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">{t.example1}</h4>
                <div className="glass rounded-lg p-3 mt-2">
                  <pre className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
{`En tant que rédacteur professionnel, rédige un article de blog de 1000 mots sur l&apos;intelligence artificielle en marketing.

Contexte : L&apos;article doit être informatif, bien structuré avec des sous-titres, optimisé SEO avec les mots-clés &quot;IA marketing&quot;, &quot;automatisation&quot;. Ton professionnel mais accessible.

Références : Style éditorial de blogs tech (Medium, TechCrunch). Utilise des exemples concrets et un ton engageant.`}
                  </pre>
                </div>
              </div>

              <div className="glass rounded-2xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">{t.example2}</h4>
                <div className="glass rounded-lg p-3 mt-2">
                  <pre className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
{`En tant que designer graphique, crée un logo moderne pour une startup de fintech.

Contexte : Le logo doit être reconnaissable à petite taille, fonctionner en noir et blanc, et refléter l&apos;innovation financière. Format vectoriel.

Références : Inspire-toi des logos de Stripe, Revolut. Style épuré, couleurs limitées (bleu et blanc), typographie moderne.`}
                  </pre>
                </div>
              </div>

              <div className="glass rounded-2xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">{t.example3}</h4>
                <div className="glass rounded-lg p-3 mt-2">
                  <pre className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
{`En tant que réalisateur vidéo, crée une vidéo publicitaire de 30 secondes pour un nouveau produit tech.

Contexte : La vidéo doit être accrocheuse dès les 3 premières secondes. Message clair, rythme dynamique, call-to-action à la fin.

Références : Style publicitaire moderne (Apple, Tesla). Montage dynamique, musique entraînante, visuels impactants.`}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}



