"use client";

import { motion } from "framer-motion";

export default function LogoSimple({ size = 36 }: { size?: number }) {
  const s = size;
  const border = Math.round(s * 0.22);
  const innerSize = s - border * 2;
  const center = s / 2;

  // Positions des motifs animés à l'intérieur de la loupe
  const motifs = [
    { x: center - innerSize * 0.15, y: center - innerSize * 0.2, delay: 0 },
    { x: center + innerSize * 0.12, y: center - innerSize * 0.1, delay: 0.2 },
    { x: center - innerSize * 0.08, y: center + innerSize * 0.15, delay: 0.4 },
    { x: center + innerSize * 0.15, y: center + innerSize * 0.12, delay: 0.6 },
    { x: center, y: center - innerSize * 0.25, delay: 0.8 },
    { x: center - innerSize * 0.18, y: center + innerSize * 0.2, delay: 1.0 },
  ];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: s, height: s }}
    >
      {/* Cercle principal - bord fin et sobre */}
      <div
        className="rounded-full"
        style={{
          width: s,
          height: s,
          background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
        }}
      />

      {/* Trou de la loupe - avec overflow pour clipper les motifs */}
      <div
        className="absolute rounded-full bg-[#0f172a] overflow-hidden"
        style={{
          width: innerSize,
          height: innerSize,
          left: border,
          top: border,
        }}
      >
        {/* Motifs animés à l'intérieur - petits cercles subtils */}
        {motifs.map((motif, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/20"
            style={{
              width: innerSize * 0.08,
              height: innerSize * 0.08,
              left: motif.x - (innerSize * 0.08) / 2,
              top: motif.y - (innerSize * 0.08) / 2,
            }}
            animate={{
              opacity: [0.15, 0.4, 0.15],
              scale: [0.9, 1.1, 0.9],
              y: [0, -innerSize * 0.03, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: motif.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Manche - fin et élégant */}
      <div
        className="absolute rounded-full"
        style={{
          width: border * 1.2,
          height: border * 0.35,
          background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
          bottom: -border * 0.2,
          right: -border * 0.2,
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}

