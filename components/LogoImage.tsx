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
  }, [src]);

  const handleError = () => {
    const domain = extractDomain(currentSrc);
    
    // Essayer plusieurs fallbacks dans l'ordre
    if (fallbackAttempt === 0) {
      // Fallback 1: Toujours essayer Google Favicon API en premier (très fiable)
      setFallbackAttempt(1);
      setCurrentSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      setImageError(false);
      setImageLoading(true);
    } else if (fallbackAttempt === 1) {
      // Fallback 2: Icon Horse
      setFallbackAttempt(2);
      setCurrentSrc(`https://icon.horse/icon/${domain}`);
      setImageError(false);
      setImageLoading(true);
    } else if (fallbackAttempt === 2) {
      // Fallback 3: Essayer directement le favicon du site
      setFallbackAttempt(3);
      setCurrentSrc(`https://${domain}/favicon.ico`);
      setImageError(false);
      setImageLoading(true);
    } else {
      // Tous les fallbacks ont échoué - ne pas afficher les initiales, juste un placeholder
      setImageError(true);
      setImageLoading(false);
    }
  };

  const handleLoad = () => {
    setImageLoading(false);
  };

  if (imageError) {
    // Si tous les fallbacks ont échoué, afficher un placeholder simple sans initiales
    return (
      <div
        className={`${sizeClasses[size]} rounded-xl bg-white/5 flex items-center justify-center ${className}`}
      >
        <ImageIcon className="w-6 h-6 text-gray-400" />
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
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

