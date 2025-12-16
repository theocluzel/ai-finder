"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { MessageSquare, Search, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = useMemo(() => [
    {
      number: "01",
      title: t.step1Title,
      description: t.step1Desc,
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "02",
      title: t.step2Title,
      description: t.step2Desc,
      icon: Search,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "03",
      title: t.step3Title,
      description: t.step3Desc,
      icon: Sparkles,
      color: "from-pink-500 to-rose-500",
    },
  ], [t]);

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-32 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            {t.howItWorks}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-snug">
            {t.howItWorksSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.96 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                    <motion.div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </motion.div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 opacity-20">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-snug sm:leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

