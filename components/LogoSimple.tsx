"use client";

export default function LogoSimple({ size = 36 }: { size?: number }) {
  const s = size;
  const border = Math.round(s * 0.22);

  return (
    <div
      className="relative"
      style={{ width: s, height: s }}
    >
      {/* Cercle extérieur */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
        }}
      />

      {/* Intérieur */}
      <div
        className="absolute rounded-full"
        style={{
          inset: border,
          background: "#0f172a",
        }}
      />

      {/* Manche */}
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

