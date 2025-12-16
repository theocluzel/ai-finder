"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LogoSimple({ size = 36 }: { size?: number }) {
  const { t } = useLanguage();
  
  // Logo CSS pur - pas de SVG pour éviter les bugs WebKit
  const logoSize = size;
  const circleSize = logoSize * 0.74; // 74% de la taille totale
  const handleLength = logoSize * 0.22; // 22% pour le manche
  const borderWidth = 7; // Bordure plus épaisse pour plus de contraste
  
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative flex-shrink-0" style={{ width: logoSize, height: logoSize }}>
        {/* Lentille - cercle avec gradient CSS pur (100% compatible WebKit/Safari) */}
        {/* Cercle extérieur avec gradient - BORDURE NETTE ET CONTRASTÉE */}
        <div
          className="absolute rounded-full"
          style={{
            width: circleSize + (borderWidth * 2),
            height: circleSize + (borderWidth * 2),
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(to right, #60A5FA, #A78BFA, #F472B6)',
            padding: `${borderWidth}px`,
            boxShadow: '0 0 8px rgba(168, 139, 250, 0.6), 0 0 16px rgba(96, 165, 250, 0.3)',
          }}
        >
          {/* Cercle intérieur - FOND PLUS SOMBRE POUR CONTRASTE */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'rgba(10, 10, 15, 0.4)',
              boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(96, 165, 250, 0.1)',
            }}
          />
        </div>
        
        {/* Manche - ligne avec gradient - BIEN VISIBLE */}
        <div
          className="absolute rounded-sm"
          style={{
            width: handleLength,
            height: '8px',
            left: `${50 + (circleSize / logoSize) * 25}%`,
            top: `${50 + (circleSize / logoSize) * 25}%`,
            transform: 'translate(0, -50%) rotate(45deg)',
            transformOrigin: 'left center',
            background: 'linear-gradient(to right, #60A5FA, #A78BFA, #F472B6)',
            boxShadow: '0 0 6px rgba(168, 139, 250, 0.7), 0 0 12px rgba(96, 165, 250, 0.4)',
          }}
        />
      </div>

      {/* Texte du logo - partie intégrante de l'identité */}
      <div className="leading-none">
        <span className="text-sm font-semibold text-white">
          AI Finder
        </span>
        <span className="block text-xs text-white/50">
          {t.logoSubtitle}
        </span>
      </div>
    </div>
  );
}

