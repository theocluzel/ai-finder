"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon, Video, Mic, Code2, FileText, Sparkles } from "lucide-react";

const floating = [
  { Icon: Sparkles, x: 30, y: 26, delay: 0.0 },
  { Icon: ImageIcon, x: 54, y: 34, delay: 0.2 },
  { Icon: Video, x: 36, y: 52, delay: 0.35 },
  { Icon: Mic, x: 56, y: 58, delay: 0.55 },
  { Icon: Code2, x: 44, y: 72, delay: 0.75 },
  { Icon: FileText, x: 28, y: 66, delay: 0.95 },
];

export default function LogoAnimated({ size = 44 }: { size?: number }) {
  const vb = 92;
  const cx = 42, cy = 42, r = 34;

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${vb} ${vb}`} className="w-full h-full">
          <defs>
            <linearGradient id="afGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>

            {/* Tout ce qui est dans ce groupe reste dans la loupe */}
            <clipPath id="glassClip">
              <circle cx={cx} cy={cy} r={r - 5} />
            </clipPath>

            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Lentille glass */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="rgba(255,255,255,0.06)"
            stroke="url(#afGrad)"
            strokeWidth="5"
            filter="url(#softGlow)"
          />
          {/* Manche */}
          <path d="M62 62 L82 82" stroke="url(#afGrad)" strokeWidth="7" strokeLinecap="round" />
        </svg>

        {/* Icônes flottantes (clippées dans la loupe) */}
        <svg viewBox={`0 0 ${vb} ${vb}`} className="absolute inset-0 w-full h-full">
          <g clipPath="url(#glassClip)">
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
        <div className="text-xs text-white/45 -mt-0.5">Trouvez l&apos;IA idéale</div>
      </div>
    </div>
  );
}




