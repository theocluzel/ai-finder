"use client";

import { useEffect, useRef, useState } from "react";

interface LogoImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onStatusChange?: (status: "loading" | "ok" | "fail", data?: { src: string; w?: number; h?: number }) => void;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16 md:w-20 md:h-20",
  xl: "w-24 h-24",
};

export default function LogoImage({ src, alt, className = "", size = "md", onStatusChange }: LogoImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackAttempt, setFallbackAttempt] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

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
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/12eb2311-b260-46cc-aed5-0bbfacf741c8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LogoImage.tsx:46',message:'useEffect triggered',data:{src,alt,newCurrentSrc:src},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    onStatusChange?.("loading", { src });
    setCurrentSrc(src);
    setImageError(false);
    setImageLoading(true);
    setFallbackAttempt(0);
  }, [src]);

  // Débug runtime: vérifier si l'image est déjà "complete" (cache) et si elle est visible
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/12eb2311-b260-46cc-aed5-0bbfacf741c8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LogoImage.tsx:70',message:'img runtime check',data:{currentSrc,complete:img.complete,nw:img.naturalWidth,nh:img.naturalHeight,alt},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
    // #endregion

    // Si l'image est déjà chargée depuis le cache, on débloque l'état
    if (img.complete && img.naturalWidth > 0) {
      setImageLoading(false);
    }
    // Si "complete" mais width=0, c'est une erreur silencieuse => on force la chaîne de fallback
    if (img.complete && img.naturalWidth === 0 && !imageError) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/12eb2311-b260-46cc-aed5-0bbfacf741c8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LogoImage.tsx:78',message:'silent error detected (complete && nw==0) => trigger handleError',data:{currentSrc,alt,fallbackAttempt},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      // Déclenchement manuel (certains navigateurs ne déclenchent pas onError si le composant remount)
      handleError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSrc]);

  const handleError = () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/12eb2311-b260-46cc-aed5-0bbfacf741c8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LogoImage.tsx:53',message:'handleError called',data:{currentSrc,fallbackAttempt,alt},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    const domain = extractDomain(currentSrc);
    
    // Essayer plusieurs fallbacks dans l'ordre
    if (fallbackAttempt === 0) {
      // Fallback 1: Toujours essayer Google Favicon API en premier (très fiable)
      const newSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/12eb2311-b260-46cc-aed5-0bbfacf741c8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LogoImage.tsx:60',message:'Fallback 1 triggered',data:{domain,newSrc,fallbackAttempt:1},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      setFallbackAttempt(1);
      setCurrentSrc(newSrc);
      setImageError(false);
      setImageLoading(true);
    } else if (fallbackAttempt === 1) {
      // Fallback 2: Icon Horse
      const newSrc = `https://icon.horse/icon/${domain}`;
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/12eb2311-b260-46cc-aed5-0bbfacf741c8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LogoImage.tsx:66',message:'Fallback 2 triggered',data:{domain,newSrc,fallbackAttempt:2},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      setFallbackAttempt(2);
      setCurrentSrc(newSrc);
      setImageError(false);
      setImageLoading(true);
    } else if (fallbackAttempt === 2) {
      // Fallback 3: Essayer directement le favicon du site
      const newSrc = `https://${domain}/favicon.ico`;
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/12eb2311-b260-46cc-aed5-0bbfacf741c8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LogoImage.tsx:72',message:'Fallback 3 triggered',data:{domain,newSrc,fallbackAttempt:3},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      setFallbackAttempt(3);
      setCurrentSrc(newSrc);
      setImageError(false);
      setImageLoading(true);
    } else {
      // Tous les fallbacks ont échoué - ne pas afficher les initiales, juste un placeholder
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/12eb2311-b260-46cc-aed5-0bbfacf741c8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LogoImage.tsx:77',message:'All fallbacks failed',data:{fallbackAttempt,alt},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      onStatusChange?.("fail", { src: currentSrc });
      setImageError(true);
      setImageLoading(false);
    }
  };

  const handleLoad = () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/12eb2311-b260-46cc-aed5-0bbfacf741c8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LogoImage.tsx:82',message:'handleLoad called - image loaded successfully',data:{currentSrc,alt,fallbackAttempt},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    console.log('[LogoImage] handleLoad called', {currentSrc, alt, fallbackAttempt});
    // #endregion
    const w = imgRef.current?.naturalWidth;
    const h = imgRef.current?.naturalHeight;
    onStatusChange?.("ok", { src: currentSrc, w, h });
    setImageLoading(false);
  };

  if (imageError) {
    // Règle produit: pas d'icône cassée / placeholder => ne rien rendre
    return null;
  }

  if (typeof window !== "undefined") {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/12eb2311-b260-46cc-aed5-0bbfacf741c8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LogoImage.tsx:97',message:'Render state',data:{imageLoading,imageError,currentSrc,fallbackAttempt,alt,displayStyle:imageLoading?'none':'block',opacityClass:imageLoading?'opacity-0':'opacity-100'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    console.log('[LogoImage] Render', {imageLoading, imageError, currentSrc, fallbackAttempt, alt, display: imageLoading ? 'none' : 'block'});
    // #endregion
  }
  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 rounded-xl bg-white/5 animate-pulse z-10" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`${sizeClasses[size]} rounded-xl object-contain bg-white/10 p-2 shadow-lg transition-opacity duration-300 relative z-20 ${
          imageLoading ? "opacity-50" : "opacity-100"
        }`}
        loading="eager"
        referrerPolicy="no-referrer"
        onLoadStart={() => {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/12eb2311-b260-46cc-aed5-0bbfacf741c8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LogoImage.tsx:149',message:'onLoadStart triggered',data:{currentSrc,alt},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
        }}
      />
    </div>
  );
}

