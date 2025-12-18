"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { AITool, getToolLogoUrl } from "@/data/aiTools";
import LogoImage from "./LogoImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateOptimizedPrompt } from "@/lib/promptGenerator";
import { getTranslatedDescription } from "@/lib/descriptionTranslations";

interface ToolDetailModalProps {
  tool: AITool | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ToolDetailModal({ tool, isOpen, onClose }: ToolDetailModalProps) {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [userRequest, setUserRequest] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  if (!tool) return null;

  const handleGeneratePrompt = () => {
    if (userRequest.trim()) {
      const prompt = generateOptimizedPrompt(userRequest, tool.category, tool.name, language);
      setGeneratedPrompt(prompt);
    }
  };

  const handleCopy = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Réinitialiser quand le modal s'ouvre
  const handleClose = () => {
    setUserRequest("");
    setGeneratedPrompt(null);
    setCopied(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-strong rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar pointer-events-auto">
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4 flex-1">
                    <LogoImage
                      src={getToolLogoUrl(tool)}
                      alt={tool.name}
                      size="lg"
                    />
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {tool.name}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-sm font-semibold bg-purple-500/20 text-purple-300 rounded-full">
                          {tool.category === "Image" ? t.categoryImage :
                           tool.category === "Design" ? t.categoryDesign :
                           tool.category === "Vidéo" ? t.categoryVideo :
                           tool.category === "Rédaction" ? t.categoryWriting :
                           tool.category}
                        </span>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          tool.type === "Gratuit" 
                            ? "bg-green-500/20 text-green-300" 
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}>
                          {tool.type === "Gratuit" ? t.typeFree : t.typePaid}
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={handleClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 glass rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Description améliorée */}
                <div className="mb-6 glass rounded-lg p-4">
                  <h3 className="text-sm text-gray-400 font-semibold mb-3">
                    {language === 'fr' ? 'À propos de cet outil :' : 'About this tool:'}
                  </h3>
                  <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-3 font-medium">
                    {getTranslatedDescription(tool.description, language)}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {language === 'fr' 
                      ? `Cet outil vous permet de ${getTranslatedDescription(tool.description, language).toLowerCase()}. Pour obtenir un prompt optimisé, décrivez précisément votre projet dans le champ ci-dessous.`
                      : `This tool allows you to ${getTranslatedDescription(tool.description, language).toLowerCase()}. To get an optimized prompt, describe your project precisely in the field below.`
                    }
                  </p>
                </div>

                {/* Champ de saisie pour la demande de l'utilisateur */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 font-semibold mb-2">
                    {language === 'fr' ? 'Décrivez ce que vous voulez faire :' : 'Describe what you want to do:'}
                  </label>
                  <textarea
                    value={userRequest}
                    onChange={(e) => setUserRequest(e.target.value)}
                    placeholder={
                      tool.category === "Image" ? t.placeholderImage :
                      tool.category === "Vidéo" ? t.placeholderVideo :
                      tool.category === "Design" ? t.placeholderDesign :
                      t.placeholderWriting
                    }
                    className="w-full glass rounded-lg p-4 text-white placeholder-gray-500 bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none resize-none"
                    rows={3}
                  />
                  <motion.button
                    onClick={handleGeneratePrompt}
                    disabled={!userRequest.trim()}
                    whileHover={{ scale: userRequest.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: userRequest.trim() ? 0.98 : 1 }}
                    className={`mt-3 w-full px-4 py-3 rounded-lg font-semibold transition-colors ${
                      userRequest.trim()
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                        : "bg-gray-500/20 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {t.generatePrompt}
                  </motion.button>
                </div>

                {/* Prompt optimisé - affiché seulement après génération */}
                {generatedPrompt && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <p className="text-sm text-gray-400 font-semibold">{t.optimizedPrompt}</p>
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-400 rounded-full"
                      />
                    </div>
                    <div className="glass rounded-lg p-4 mb-3">
                      <pre className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                        {generatedPrompt}
                      </pre>
                    </div>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={handleCopy}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            {t.copied}
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            {t.copyPrompt}
                          </>
                        )}
                      </motion.button>
                      <motion.a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t.visitSite}
                      </motion.a>
                    </div>
                  </div>
                )}

                {/* Bouton visiter le site - toujours visible */}
                {!generatedPrompt && (
                  <div className="mb-6">
                    <motion.a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t.visitSite}
                    </motion.a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

