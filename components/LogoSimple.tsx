"use client";

export default function LogoSimple({ size = 36 }: { size?: number }) {
  const s = size;
  const border = Math.round(s * 0.22);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: s, height: s }}
    >
      {/* Cercle principal */}
      <div
        className="rounded-full"
        style={{
          width: s,
          height: s,
          background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
        }}
      />

      {/* Trou de la loupe */}
      <div
        className="absolute rounded-full bg-[#0f172a]"
        style={{
          width: s - border * 2,
          height: s - border * 2,
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

