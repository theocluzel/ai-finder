"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const typingPhrases = [
  "Je souhaite finir un exercice de maths à partir d'une photo",
  "Je souhaite transformer un article en vidéo",
  "Je souhaite générer des images pour mon e-commerce",
  "Je souhaite corriger mon CV automatiquement",
  "Je souhaite créer une voix-off pour ma vidéo",
  "Je souhaite traduire un document en plusieurs langues",
];

export default function AnimatedSearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typingText, setTypingText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentPhrase = typingPhrases[currentPhraseIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        if (typingText.length < currentPhrase.length) {
          setTypingText(currentPhrase.substring(0, typingText.length + 1));
          setTypingSpeed(100);
        } else {
          setIsDeleting(true);
          setTypingSpeed(50);
        }
      } else {
        if (typingText.length > 0) {
          setTypingText(currentPhrase.substring(0, typingText.length - 1));
          setTypingSpeed(50);
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
          setTypingSpeed(100);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, currentPhraseIndex, typingSpeed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit}>
        {/* Mobile: layout vertical (bouton sous input) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-white/10 glass-strong p-2">
          <div className="flex-1 relative">
            <motion.input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(147, 51, 234, 0.5)";
                e.target.style.boxShadow = "0 0 20px rgba(147, 51, 234, 0.3)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.boxShadow = "none";
              }}
              className="w-full bg-transparent px-4 py-3 sm:py-3.5 md:px-5 md:py-4 h-12 sm:h-auto text-sm sm:text-base md:text-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-xl transition-all"
              placeholder=" "
            />
            
            {!searchQuery && (
              <div className="absolute left-4 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1.5 overflow-hidden max-w-[calc(100%-80px)] sm:max-w-none">
                <span className="text-sm sm:text-base md:text-lg text-gray-400 leading-[1.5] truncate">
                  {typingText}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block w-0.5 h-4 sm:h-4 md:h-5 bg-purple-400 self-center"
                />
              </div>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto shrink-0 rounded-xl px-4 py-2.5 sm:py-3 md:px-6 md:py-4 font-semibold text-sm md:text-base text-white bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Trouver une IA</span>
            <span className="sm:hidden">Rechercher</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

