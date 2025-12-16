"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Video, Mic, Code2, FileText, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const floating = [
  { Icon: Sparkles, x: 30, y: 26, delay: 0.0 },
  { Icon: ImageIcon, x: 54, y: 34, delay: 0.2 },
  { Icon: Video, x: 36, y: 52, delay: 0.35 },
  { Icon: Mic, x: 56, y: 58, delay: 0.55 },
  { Icon: Code2, x: 44, y: 72, delay: 0.75 },
  { Icon: FileText, x: 28, y: 66, delay: 0.95 },
];

export default function LogoAnimated({ size = 44 }: { size?: number }) {
  const { t } = useLanguage();
  const vb = 92;
  const cx = 42, cy = 42, r = 34;

  // IDs uniques pour éviter les conflits SVG - avec préfixe pour garantir l'unicité
  const baseId = useId().replace(/:/g, '-');
  const gradientId = `logo-grad-${baseId}`;
  const clipId = `logo-clip-${baseId}`;

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${vb} ${vb}`} className="w-full h-full relative z-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Même dégradé que le texte : from-blue-400 via-purple-400 to-pink-400 */}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
              <stop offset="50%" stopColor="#A78BFA" stopOpacity="1" />
              <stop offset="100%" stopColor="#F472B6" stopOpacity="1" />
            </linearGradient>

            {/* Tout ce qui est dans ce groupe reste dans la loupe */}
            <clipPath id={clipId}>
              <circle cx={cx} cy={cy} r={r - 5} />
            </clipPath>
          </defs>

          {/* Lentille glass */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="rgba(255,255,255,0.12)"
            stroke={`url(#${gradientId})`}
            strokeWidth="7"
            strokeLinejoin="round"
            style={{ 
              stroke: "#A78BFA",
              strokeWidth: "7",
              fill: "rgba(255,255,255,0.12)"
            }}
          />
          {/* Manche */}
          <path 
            d="M62 62 L82 82" 
            stroke={`url(#${gradientId})`} 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ 
              stroke: "#A78BFA",
              strokeWidth: "8"
            }}
          />
        </svg>

        {/* Icônes flottantes (clippées dans la loupe) */}
        <svg viewBox={`0 0 ${vb} ${vb}`} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 20 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <circle cx={cx} cy={cy} r={r - 5} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>
            <circle cx={cx} cy={cy} r={r - 5} fill="rgba(255,255,255,0.02)" />
            {floating.map(({ Icon, x, y, delay }, i) => (
              <foreignObject key={i} x={x} y={y} width="18" height="18">
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{
                    opacity: [0.15, 0.95, 0.25],
                    y: [6, -3, 6],
                    scale: [0.96, 1.06, 0.96],
                  }}
                  transition={{ duration: 3.6, repeat: Infinity, delay, ease: "easeInOut" }}
                  className="text-white/90"
                >
                  <Icon size={16} />
                </motion.div>
              </foreignObject>
            ))}
          </g>
        </svg>
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




