"use client";

import { motion } from "framer-motion";

export default function LogoSimple({ size = 36 }: { size?: number }) {
  const s = size;
  const border = Math.round(s * 0.22);
  const innerSize = s - border * 2;
  const innerCenter = innerSize / 2;

  // MAXIMUM 3 motifs ultra subtils - strictement contenus dans le cercle
  const motifs = [
    { x: innerCenter, y: innerCenter - innerSize * 0.12, delay: 0 },
    { x: innerCenter - innerSize * 0.1, y: innerCenter + innerSize * 0.08, delay: 2 },
    { x: innerCenter + innerSize * 0.1, y: innerCenter + innerSize * 0.08, delay: 4 },
  ];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: s, height: s }}
    >
      {/* Cercle principal - bord fin et net */}
      <div
        className="rounded-full"
        style={{
          width: s,
          height: s,
          background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
        }}
      />

      {/* Trou de la loupe - silhouette parfaite */}
      <div
        className="absolute rounded-full bg-[#0f172a] overflow-hidden"
        style={{
          width: innerSize,
          height: innerSize,
          left: border,
          top: border,
          position: 'relative',
        }}
      >
        {/* Motifs ultra subtils - animation suggestion, pas feature */}
        {motifs.map((motif, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: '3px',
              height: '3px',
              backgroundColor: '#ffffff',
              left: `${(motif.x / innerSize) * 100}%`,
              top: `${(motif.y / innerSize) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 6,
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

