"use client";

export default function LogoSimple({ size = 36 }: { size?: number }) {
  const s = size;
  const border = Math.round(s * 0.072); // Bord fin réduit de ~10% (≈ 2.6px pour size=36)
  const innerSize = s - border * 2;

  return (
    <div
      className="relative"
      style={{ width: s, height: s }}
    >
      {/* Cercle extérieur - bord fin et élégant */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
        }}
      />

      {/* Intérieur - effet verre très léger, à peine teinté */}
      <div
        className="absolute rounded-full logo-glass"
        style={{
          width: innerSize,
          height: innerSize,
          left: border,
          top: border,
          background: "rgba(255, 255, 255, 0.03)",
          boxShadow: `
            inset 0 0 25px rgba(96, 165, 250, 0.05),
            inset 0 0 50px rgba(0, 0, 0, 0.15),
            0 0 0 0.5px rgba(255, 255, 255, 0.08)
          `,
        }}
      />

      {/* Manche - fin et moins contrasté */}
      <div
        className="absolute rounded-full"
        style={{
          width: border * 2.2,
          height: border * 0.4,
          background: "linear-gradient(135deg, rgba(96, 165, 250, 0.7), rgba(167, 139, 250, 0.7), rgba(244, 114, 182, 0.7))",
          bottom: -border * 0.3,
          right: -border * 0.3,
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}

