"use client";

import { useState, useEffect } from "react";

interface LogoImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onError?: () => void; // Callback si le logo ne charge pas
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-16 h-16 md:w-20 md:h-20",
  xl: "w-24 h-24",
};

export default function LogoImage({ src, alt, className = "", size = "md", onError }: LogoImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setImageError(false);
    setImageLoading(true);
  }, [src]);

  const handleError = () => {
    setImageError(true);
    setImageLoading(false);
    // Appeler le callback pour signaler l'erreur au parent
    onError?.();
  };

  const handleLoad = () => {
    setImageLoading(false);
  };

  // Si erreur, ne rien afficher (pas de fallback avec initiales)
  if (imageError || !src) {
    return null;
  }

  return (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 rounded-xl bg-white/5 animate-pulse" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`${sizeClasses[size]} rounded-xl object-contain bg-white/5 p-2 transition-opacity duration-300 ${
          imageLoading ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
        referrerPolicy="no-referrer"
        style={{ 
          display: imageLoading ? 'none' : 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

