import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

// Critical resources to preload before revealing the site
const PRELOAD_VIDEOS = [
  "/videos/hero-1.mp4",
  "/videos/hero-2.mp4",
  "/videos/hero-3.mp4",
  "/videos/hero-4.mp4",
];

const PRELOAD_IMAGES = [
  "/img/about.webp",
  "/img/entrance.webp",
  "/img/swordman.webp",
  "/img/stones.webp",
  "/img/gallery-1.webp",
  "/img/gallery-2.webp",
  "/img/gallery-3.webp",
  "/img/gallery-4.webp",
  "/img/gallery-5.webp",
];

const TOTAL_RESOURCES = PRELOAD_VIDEOS.length + PRELOAD_IMAGES.length;

const Preloader = ({ onComplete }) => {
  const [realProgress, setRealProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const exploreRef = useRef(null);
  const lineRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const flashRef = useRef(null);
  const loadedCount = useRef(0);
  const animFrameRef = useRef(null);

  // Track resource loading
  const onResourceLoaded = useCallback(() => {
    loadedCount.current += 1;
    const progress = Math.min(
      100,
      Math.round((loadedCount.current / TOTAL_RESOURCES) * 100)
    );
    setRealProgress(progress);
  }, []);

  // Preload all resources
  useEffect(() => {
    // Preload videos — use { once: true } to prevent double-counting
    PRELOAD_VIDEOS.forEach((src) => {
      const video = document.createElement("video");
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;
      video.addEventListener("canplaythrough", onResourceLoaded, { once: true });
      video.src = src;
      video.load();
    });

    // Preload images
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = onResourceLoaded;
      img.onerror = onResourceLoaded; // count errors too so we don't get stuck
      img.src = src;
    });
  }, [onResourceLoaded]);

  // Smooth counter animation — eases toward realProgress
  useEffect(() => {
    let current = displayProgress;

    const animate = () => {
      const target = realProgress;
      // Ease toward real progress
      current += (target - current) * 0.08;

      if (Math.abs(target - current) < 0.5) {
        current = target;
      }

      setDisplayProgress(Math.min(100, Math.round(current)));

      if (current < 100) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [realProgress]); // eslint-disable-line react-hooks/exhaustive-deps

  // Trigger loaded state when counter hits 100
  useEffect(() => {
    if (displayProgress >= 100 && !isLoaded) {
      setIsLoaded(true);
    }
  }, [displayProgress, isLoaded]);

  // Animate counter → explore button transition
  useEffect(() => {
    if (isLoaded && counterRef.current && exploreRef.current) {
      const tl = gsap.timeline();

      tl.to(counterRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
      });

      tl.fromTo(
        exploreRef.current,
        { opacity: 0, scale: 0.6, display: "none" },
        {
          opacity: 1,
          scale: 1,
          display: "flex",
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isLoaded]);

  // Cinematic reveal animation
  const handleExploreClick = () => {
    if (isRevealing) return;
    setIsRevealing(true);

    // Calculate diagonal clip-path points for the 15° tilt
    const angle = 15;
    const rad = (angle * Math.PI) / 180;
    const sinA = Math.sin(rad); // ~0.259
    const cosA = Math.cos(rad); // ~0.966

    // Line endpoints after rotation around center (50%, 50%)
    // Extend beyond viewport edges to avoid gaps
    const extend = 60; // extend beyond 50% to cover full height + overflow
    const topX = 50 + extend * sinA;  // ~65.5%
    const topY = 50 - extend * cosA;  // ~-7.9%
    const botX = 50 - extend * sinA;  // ~34.5%
    const botY = 50 + extend * cosA;  // ~107.9%

    const leftClip = `polygon(0% 0%, ${topX}% ${topY}%, ${botX}% ${botY}%, 0% 100%)`;
    const rightClip = `polygon(${topX}% ${topY}%, 100% 0%, 100% 100%, ${botX}% ${botY}%)`;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Step 1: Show the vertical line growing from center
    tl.set(lineRef.current, {
      opacity: 1,
      scaleY: 0,
      transformOrigin: "center center",
    });

    tl.to(lineRef.current, {
      scaleY: 1,
      duration: 0.4,
      ease: "power2.inOut",
    });

    // Step 2: Line tilts
    tl.to(lineRef.current, {
      rotation: angle,
      duration: 0.3,
      ease: "power2.inOut",
    });

    // Step 3: Hide explore button quickly
    tl.to(
      exploreRef.current,
      {
        opacity: 0,
        scale: 0.5,
        duration: 0.2,
        ease: "power2.in",
      },
      "<"
    );

    // Step 4: Apply diagonal clip-paths and split the panels
    tl.set(leftPanelRef.current, { clipPath: leftClip });
    tl.set(rightPanelRef.current, { clipPath: rightClip });

    // Left panel slides left along the tilt direction
    tl.to(leftPanelRef.current, {
      xPercent: -100,
      duration: 0.7,
      ease: "power3.inOut",
    });

    // Right panel slides right simultaneously
    tl.to(
      rightPanelRef.current,
      {
        xPercent: 100,
        duration: 0.7,
        ease: "power3.inOut",
      },
      "<"
    );

    // Step 5: White flash from the split
    tl.to(
      flashRef.current,
      {
        opacity: 1,
        duration: 0.15,
        ease: "power2.out",
      },
      "<0.1"
    );

    // Fade line away as panels move
    tl.to(
      lineRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "<"
    );

    // Step 6: Flash fades out
    tl.to(flashRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={preloaderRef}
      className="preloader-wrapper"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        pointerEvents: isRevealing ? "none" : "auto",
      }}
    >
      {/* Left panel */}
      <div
        ref={leftPanelRef}
        className="preloader-panel preloader-panel-left"
      />

      {/* Right panel */}
      <div
        ref={rightPanelRef}
        className="preloader-panel preloader-panel-right"
      />

      {/* Center split line */}
      <div ref={lineRef} className="preloader-line" />

      {/* White flash overlay */}
      <div ref={flashRef} className="preloader-flash" />

      {/* Content: counter or explore button */}
      <div className="preloader-content">
        {/* Loading counter */}
        <div ref={counterRef} className="preloader-counter">
          <span className="preloader-counter-number">
            {displayProgress}
          </span>
          <span className="preloader-counter-percent">%</span>
        </div>

        {/* Explore button */}
        <button
          ref={exploreRef}
          className="preloader-explore-btn group"
          onClick={handleExploreClick}
          style={{ display: "none" }}
        >
          <span className="preloader-explore-text">
            <span className="preloader-explore-text-inner">Explore</span>
            <span className="preloader-explore-text-hover">Explore</span>
          </span>
          <span className="preloader-explore-arrow">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Preloader;
