"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LogoSimple({ size = 44 }: { size?: number }) {
  const { t } = useLanguage();
  
  // Logo CSS pur - pas de SVG pour éviter les bugs WebKit
  const logoSize = size;
  const circleSize = logoSize * 0.74; // 74% de la taille totale
  const handleLength = logoSize * 0.22; // 22% pour le manche
  
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative" style={{ width: logoSize, height: logoSize }}>
        {/* Lentille - cercle avec gradient CSS pur (100% compatible WebKit/Safari) */}
        {/* Cercle extérieur avec gradient */}
        <div
          className="absolute rounded-full"
          style={{
            width: circleSize + 12,
            height: circleSize + 12,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(to right, #60A5FA, #A78BFA, #F472B6)',
            padding: '6px',
          }}
        >
          {/* Cercle intérieur */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              boxShadow: 'inset 0 0 20px rgba(96, 165, 250, 0.15)',
            }}
          />
        </div>
        
        {/* Manche - ligne avec gradient */}
        <div
          className="absolute rounded-sm"
          style={{
            width: handleLength,
            height: '7px',
            left: `${50 + (circleSize / logoSize) * 25}%`,
            top: `${50 + (circleSize / logoSize) * 25}%`,
            transform: 'translate(0, -50%) rotate(45deg)',
            transformOrigin: 'left center',
            background: 'linear-gradient(to right, #60A5FA, #A78BFA, #F472B6)',
            boxShadow: '0 0 4px rgba(168, 139, 250, 0.5)',
          }}
        />
      </div>

      <div className="leading-none">
        <div className="text-lg font-semibold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            AI Finder
          </span>
        </div>
        <div className="text-xs text-white/45 -mt-0.5">{t.logoSubtitle}</div>
      </div>
    </div>
  );
}

