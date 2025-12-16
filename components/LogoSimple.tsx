"use client";

import { motion } from "framer-motion";

export default function LogoSimple({ size = 36 }: { size?: number }) {
  const s = size;
  const border = Math.round(s * 0.22);
  const innerSize = s - border * 2;
  const center = s / 2;

  // Positions des motifs animés à l'intérieur de la loupe (relatives au conteneur intérieur)
  const innerCenter = innerSize / 2;
  const motifs = [
    { x: innerCenter - innerSize * 0.15, y: innerCenter - innerSize * 0.2, delay: 0 },
    { x: innerCenter + innerSize * 0.12, y: innerCenter - innerSize * 0.1, delay: 0.2 },
    { x: innerCenter - innerSize * 0.08, y: innerCenter + innerSize * 0.15, delay: 0.4 },
    { x: innerCenter + innerSize * 0.15, y: innerCenter + innerSize * 0.12, delay: 0.6 },
    { x: innerCenter, y: innerCenter - innerSize * 0.25, delay: 0.8 },
    { x: innerCenter - innerSize * 0.18, y: innerCenter + innerSize * 0.2, delay: 1.0 },
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
          position: 'relative',
        }}
      >
        {/* Motifs animés à l'intérieur - VISIBLES POUR DEBUG */}
        {motifs.map((motif, index) => (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#ffffff',
              opacity: 0.6,
              left: `${(motif.x / innerSize) * 100}%`,
              top: `${(motif.y / innerSize) * 100}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
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

