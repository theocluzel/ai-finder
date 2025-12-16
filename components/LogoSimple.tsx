"use client";

export default function LogoSimple({ size = 36 }: { size?: number }) {
  const s = size;
  const border = Math.round(s * 0.08); // Bord fin ≈ 3px pour size=36
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

      {/* Intérieur - effet verre léger */}
      <div
        className="absolute rounded-full"
        style={{
          width: innerSize,
          height: innerSize,
          left: border,
          top: border,
          background: "rgba(255, 255, 255, 0.06)",
          boxShadow: `
            inset 0 0 20px rgba(96, 165, 250, 0.1),
            inset 0 0 40px rgba(0, 0, 0, 0.2),
            0 0 0 0.5px rgba(255, 255, 255, 0.1)
          `,
        }}
      />

      {/* Manche - fin et discret */}
      <div
        className="absolute rounded-full"
        style={{
          width: border * 2.5,
          height: border * 0.5,
          background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
          bottom: -border * 0.3,
          right: -border * 0.3,
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}

