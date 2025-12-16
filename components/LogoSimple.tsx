"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LogoSimple({ size = 36 }: { size?: number }) {
  const { t } = useLanguage();
  
  // Logo CSS pur - pas de SVG pour éviter les bugs WebKit
  const logoSize = size;
  const circleSize = logoSize * 0.68; // 68% pour laisser plus de place à la bordure
  const handleLength = logoSize * 0.28; // 28% pour le manche - plus long et visible
  const borderWidth = 8; // Bordure épaisse pour impact visuel fort
  
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative flex-shrink-0" style={{ width: logoSize, height: logoSize }}>
        {/* Lentille - cercle avec gradient CSS pur - DESIGN PREMIUM */}
        {/* Cercle extérieur avec gradient FORT ET CONTRASTÉ */}
        <div
          className="absolute rounded-full"
          style={{
            width: circleSize + (borderWidth * 2),
            height: circleSize + (borderWidth * 2),
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)', // Gradient plus saturé
            padding: `${borderWidth}px`,
            boxShadow: `
              0 0 12px rgba(139, 92, 246, 0.8),
              0 0 24px rgba(59, 130, 246, 0.5),
              0 0 36px rgba(236, 72, 153, 0.3),
              inset 0 0 8px rgba(139, 92, 246, 0.4)
            `,
            filter: 'brightness(1.1)',
          }}
        >
          {/* Cercle intérieur - FOND TRÈS SOMBRE POUR CONTRASTE MAXIMAL */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(5, 5, 10, 0.9) 0%, rgba(10, 10, 20, 0.7) 100%)',
              boxShadow: `
                inset 0 0 30px rgba(0, 0, 0, 0.6),
                inset 0 0 15px rgba(59, 130, 246, 0.15),
                inset 0 2px 4px rgba(255, 255, 255, 0.05)
              `,
            }}
          />
        </div>
        
        {/* Manche - ligne avec gradient - ÉPAIS ET BIEN VISIBLE */}
        <div
          className="absolute rounded-md"
          style={{
            width: handleLength,
            height: '9px',
            left: `${50 + (circleSize / logoSize) * 22}%`,
            top: `${50 + (circleSize / logoSize) * 22}%`,
            transform: 'translate(0, -50%) rotate(45deg)',
            transformOrigin: 'left center',
            background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
            boxShadow: `
              0 0 8px rgba(139, 92, 246, 0.9),
              0 0 16px rgba(59, 130, 246, 0.6),
              0 0 24px rgba(236, 72, 153, 0.4)
            `,
            filter: 'brightness(1.05)',
          }}
        />
      </div>

      {/* Texte du logo - partie intégrante de l'identité premium */}
      <div className="leading-none">
        <span className="text-sm sm:text-base font-bold text-white tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            AI Finder
          </span>
        </span>
        <span className="block text-xs text-white/50 -mt-0.5">
          {t.logoSubtitle}
        </span>
      </div>
    </div>
  );
}

