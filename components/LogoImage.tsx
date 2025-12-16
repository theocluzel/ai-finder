"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";

interface LogoImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16 md:w-20 md:h-20",
  xl: "w-24 h-24",
};

export default function LogoImage({ src, alt, className = "", size = "md" }: LogoImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackAttempt, setFallbackAttempt] = useState(0);

  // Extraire le domaine pour les fallbacks
  const extractDomain = (url: string): string => {
    try {
      if (url.includes('google.com/s2/favicons')) {
        const match = url.match(/domain=([^&]+)/);
        return match ? match[1] : url;
      }
      if (url.includes('icon.horse/icon/')) {
        return url.replace('https://icon.horse/icon/', '');
      }
      if (url.includes('logo.clearbit.com/')) {
        return url.replace('https://logo.clearbit.com/', '');
      }
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url.split('/').pop() || url;
    }
  };

  useEffect(() => {
    setCurrentSrc(src);
    setImageError(false);
    setImageLoading(true);
    setFallbackAttempt(0);
    
    // Timeout pour forcer le fallback si l'image ne charge pas en 3 secondes
    const timeout = setTimeout(() => {
      const domain = extractDomain(src);
      if (src.includes('google.com/s2/favicons')) {
        setFallbackAttempt(1);
        setCurrentSrc(`https://icon.horse/icon/${domain}`);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [src]);

  const handleError = () => {
    const domain = extractDomain(currentSrc);
    
    // Essayer plusieurs fallbacks dans l'ordre
    if (fallbackAttempt === 0 && currentSrc.includes('google.com/s2/favicons')) {
      // Fallback 1: Icon Horse
      setFallbackAttempt(1);
      setCurrentSrc(`https://icon.horse/icon/${domain}`);
      setImageError(false);
      setImageLoading(true);
    } else if (fallbackAttempt === 1 && currentSrc.includes('icon.horse')) {
      // Fallback 2: Clearbit
      setFallbackAttempt(2);
      setCurrentSrc(`https://logo.clearbit.com/${domain}`);
      setImageError(false);
      setImageLoading(true);
    } else if (fallbackAttempt === 2 && currentSrc.includes('logo.clearbit.com')) {
      // Fallback 3: Essayer directement le favicon du site
      setFallbackAttempt(3);
      setCurrentSrc(`https://${domain}/favicon.ico`);
      setImageError(false);
      setImageLoading(true);
    } else {
      // Tous les fallbacks ont échoué - afficher les initiales
      setImageError(true);
      setImageLoading(false);
    }
  };

  const handleLoad = () => {
    setImageLoading(false);
  };

  if (imageError) {
    // Fallback : afficher une icône avec les initiales
    const initials = alt
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return (
      <div
        className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-lg ${className}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse flex items-center justify-center z-10">
          <ImageIcon className="w-6 h-6 text-gray-500" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`${sizeClasses[size]} rounded-xl object-contain bg-white/10 p-2 shadow-lg transition-opacity duration-300 relative z-20 ${
          imageLoading ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
        referrerPolicy="no-referrer"
        style={{ display: imageLoading ? 'none' : 'block' }}
      />
    </div>
  );
}

