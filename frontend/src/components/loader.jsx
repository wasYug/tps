import React, { useEffect, useRef, useState } from 'react';

/**
 * TakshashilaLoader
 * ------------------------------------------------------------------
 * A full-screen preloader: the school crest gently breathes (fades +
 * scales) on a white background, then fades itself out and unmounts.
 *
 * USAGE
 *   <TakshashilaLoader />
 *     Shows for `minDisplayMs`, then hides itself. Good enough if you
 *     just want a splash on mount.
 *
 *   <TakshashilaLoader ready={dataLoaded} onComplete={() => ...} />
 *     Waits until `ready` is true (e.g. your data/auth/assets have
 *     finished loading) before hiding — but never less than
 *     `minDisplayMs`, so it never just flashes by. `onComplete` fires
 *     the moment the fade-out begins.
 *
 * SWAPPING THE LOGO FOR PRODUCTION
 *   Right now `logoSrc` defaults to an embedded base64 string so this
 *   file works immediately with zero setup. For a real app, import the
 *   asset normally and pass it in instead — it's lighter on your bundle:
 *
 *     import crest from './assets/takshashila-crest.png';
 *     <TakshashilaLoader logoSrc={crest} />
 * ------------------------------------------------------------------
 */

const DEFAULT_LOGO_SRC = '/logo.png';

function TakshashilaLoader({
  ready = true,
  minDisplayMs = 2400,
  onComplete,
  logoSrc = DEFAULT_LOGO_SRC,
  alt = 'Takshashila Public School crest',
}) {
  const [hidden, setHidden] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const startRef = useRef(Date.now());

  // Hide once `ready` is true AND at least `minDisplayMs` has elapsed.
  useEffect(() => {
    if (!ready || hidden) return;

    const elapsed = Date.now() - startRef.current;
    const remaining = Math.max(0, minDisplayMs - elapsed);

    const showTimer = setTimeout(() => {
      setHidden(true);
      onComplete?.();
    }, remaining);

    return () => clearTimeout(showTimer);
  }, [ready, minDisplayMs, onComplete, hidden]);

  // Remove from the DOM once the fade-out transition finishes.
  useEffect(() => {
    if (!hidden) return;
    const removeTimer = setTimeout(() => setUnmounted(true), 720);
    return () => clearTimeout(removeTimer);
  }, [hidden]);

  if (unmounted) return null;

  return (
    <>
      <style>{`
        .tps-preloader {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          transition: opacity 0.7s ease, visibility 0.7s ease;
        }
        .tps-preloader.tps-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        .tps-crest-stage {
          width: clamp(118px, 24vw, 208px);
          height: clamp(118px, 24vw, 208px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tps-crest {
          width: 100%;
          height: 100%;
          object-fit: contain;
          animation: tps-breathe 2.6s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes tps-breathe {
          0%, 100% {
            transform: scale(0.92);
            opacity: 0.35;
            filter: drop-shadow(0 4px 10px rgba(20, 20, 20, 0.06));
          }
          50% {
            transform: scale(1.04);
            opacity: 1;
            filter: drop-shadow(0 10px 26px rgba(20, 20, 20, 0.14));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .tps-crest {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
      <div className={`tps-preloader${hidden ? ' tps-hidden' : ''}`}>
        <div className="tps-crest-stage">
          <img className="tps-crest" src={logoSrc} alt={alt} />
        </div>
      </div>
    </>
  );
}

export default TakshashilaLoader;
