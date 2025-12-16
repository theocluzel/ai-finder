"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-white/10 py-8 sm:py-10 md:py-12 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-gray-400 text-xs sm:text-sm md:text-base text-center md:text-left leading-snug">
            Projet en développement – bientôt plus de fonctionnalités.
          </p>
          <motion.a
            href="mailto:contact@aifinder.fr"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 md:py-3 glass rounded-lg sm:rounded-xl text-white hover:bg-white/10 transition-colors text-sm sm:text-base"
          >
            <Mail className="w-4 h-4" />
            <span>Me contacter</span>
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}



