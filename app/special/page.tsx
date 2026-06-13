"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SpecialProposalPage() {
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; scale: number }[]>([]);

  // Escape animation for the NO button
  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 320;
    const randomY = (Math.random() - 0.5) * 200;
    setNoBtnPos({ x: randomX, y: randomY });
  };

  // Generate floating hearts upon acceptance
  useEffect(() => {
    if (isAccepted) {
      const newHearts = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage of screen width
        delay: Math.random() * 6,
        scale: Math.random() * 0.8 + 0.4
      }));
      setHearts(newHearts);
    }
  }, [isAccepted]);

  return (
    <div className="min-h-screen bg-[#fff2f2] flex items-center justify-center p-6 relative select-none overflow-hidden font-display">
      {/* Blueprint Grid Lines Background but pinkish-soft (custom theme) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,105,180,0.025)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(255,105,180,0.025)_1.5px,transparent_1.5px)] bg-[size:35px_35px] pointer-events-none z-0"></div>

      {/* Floating hearts particles layer */}
      {isAccepted && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: "110vh", opacity: 0, x: `${heart.x}vw` }}
              animate={{ 
                y: "-10vh", 
                opacity: [0, 1, 1, 0],
                x: [
                  `${heart.x}vw`, 
                  `${heart.x + (Math.random() * 12 - 6)}vw`,
                  `${heart.x + (Math.random() * 24 - 12)}vw`
                ]
              }}
              transition={{ 
                duration: 5.5, 
                delay: heart.delay, 
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute text-red-400 text-3xl pointer-events-none select-none z-0"
              style={{ transform: `scale(${heart.scale})` }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}

      {/* Back to Home Button */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 font-display font-black text-[11px] tracking-widest text-black/60 hover:text-[#ff5722] transition-colors pointer-events-auto bg-white doodle-border-sm px-4 py-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] z-30"
      >
        ← BACK TO HOME
      </Link>

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center pt-24 pb-12">
        <AnimatePresence mode="wait">
          {!isAccepted ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full flex flex-col items-center"
            >
              {/* Shin-chan peeking from the top center of the board */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-[102px] w-[200px] h-[110px] z-0 pointer-events-none">
                <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
                  {/* Head (Skin - Asymmetric 3/4 view cheek bulge on the right, looking down) */}
                  <path 
                    d="M 60,32 
                       C 85,22 120,22 135,32 
                       C 145,40 150,45 160,50
                       C 176,58 184,72 178,85
                       C 172,98 140,106 100,106
                       C 65,106 48,94 40,82
                       C 32,70 38,42 60,32 Z" 
                    fill="#ffd3b6" 
                    stroke="black" 
                    strokeWidth="4" 
                    strokeLinejoin="round" 
                  />

                  {/* Left Ear */}
                  <path d="M 38,62 C 28,62 24,70 24,76 C 24,82 30,86 38,84" fill="#ffd3b6" stroke="black" strokeWidth="4" />
                  <path d="M 33,70 C 30,70 30,74 33,74" stroke="black" strokeWidth="2" fill="none" />

                  {/* Hair */}
                  <path 
                    d="M 40,65 
                       C 38,50 48,32 65,24 
                       C 85,14 125,16 142,32 
                       C 146,36 148,42 144,40 
                       C 130,32 100,30 70,34 
                       C 55,38 45,48 42,65 Z" 
                    fill="black" 
                    stroke="black" 
                    strokeWidth="1" 
                  />

                  {/* Eyes looking down at the board */}
                  <ellipse cx="94" cy="68" rx="7" ry="10" fill="white" stroke="black" strokeWidth="4" />
                  <circle cx="94" cy="73" r="4.5" fill="black" />
                  <circle cx="92.5" cy="71" r="1.2" fill="white" />

                  <ellipse cx="126" cy="66" rx="7.5" ry="10.5" fill="white" stroke="black" strokeWidth="4" />
                  <circle cx="126" cy="71" r="5" fill="black" />
                  <circle cx="124.5" cy="69" r="1.3" fill="white" />

                  {/* Eyebrows */}
                  <path d="M 84,52 Q 94,40 104,50" stroke="black" strokeWidth="10" strokeLinecap="round" fill="none" />
                  <path d="M 116,50 Q 126,38 136,48" stroke="black" strokeWidth="10.5" strokeLinecap="round" fill="none" />

                  {/* Rosy Cheeks */}
                  <ellipse cx="65" cy="82" rx="9" ry="5" fill="#ff9999" opacity="0.65" />
                  <ellipse cx="158" cy="80" rx="13" ry="7.5" fill="#ff9999" opacity="0.65" />

                  {/* Smile */}
                  <ellipse cx="112" cy="86" rx="6" ry="8" fill="#ff6666" stroke="black" strokeWidth="3" />
                </svg>
              </div>

              {/* The Proposal Board Card */}
              <div className="relative w-full bg-white border-3 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[32px] doodle-border-lg flex flex-col items-center text-center z-10">
                {/* Left hand clamp */}
                <div className="absolute -left-[18px] top-[100px] w-[45px] h-[45px] z-20 pointer-events-none">
                  <svg viewBox="0 0 40 40" className="w-full h-full overflow-visible">
                    <circle cx="20" cy="20" r="12" fill="#ffd3b6" stroke="black" strokeWidth="3.5" />
                    <rect x="24" y="10" width="6" height="14" rx="2.5" fill="#ffd3b6" stroke="black" strokeWidth="2.5" />
                    <rect x="28" y="14" width="6" height="14" rx="2.5" fill="#ffd3b6" stroke="black" strokeWidth="2.5" />
                  </svg>
                </div>

                {/* Right hand clamp */}
                <div className="absolute -right-[18px] top-[100px] w-[45px] h-[45px] z-20 pointer-events-none">
                  <svg viewBox="0 0 40 40" className="w-full h-full overflow-visible">
                    <circle cx="20" cy="20" r="12" fill="#ffd3b6" stroke="black" strokeWidth="3.5" />
                    <rect x="10" y="10" width="6" height="14" rx="2.5" fill="#ffd3b6" stroke="black" strokeWidth="2.5" />
                    <rect x="6" y="14" width="6" height="14" rx="2.5" fill="#ffd3b6" stroke="black" strokeWidth="2.5" />
                  </svg>
                </div>

                {/* Board Content */}
                <span className="font-sans font-bold text-lg sm:text-xl text-[#0c0d0e]/60 tracking-wider uppercase block mt-2">
                  hey cute baby shark
                </span>
                
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#ff3344] tracking-wider uppercase mt-4 leading-none">
                  will you marry me?
                </h2>

                {/* Buttons container */}
                <div className="flex flex-row justify-center items-center gap-8 mt-12 w-full relative min-h-[60px]">
                  {/* YES Button */}
                  <button
                    onClick={() => setIsAccepted(true)}
                    className="bg-[#ff3344] text-white border-2 border-black py-3 px-8 font-display font-black text-sm tracking-widest hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer rounded-xl z-20"
                  >
                    YES! 💖
                  </button>

                  {/* NO Button (Escapes) */}
                  <motion.button
                    onMouseEnter={handleNoHover}
                    onClick={handleNoHover}
                    animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="bg-white text-black border-2 border-black py-3 px-8 font-display font-black text-sm tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer rounded-xl z-10"
                    style={{ position: noBtnPos.x === 0 && noBtnPos.y === 0 ? "relative" : "absolute" }}
                  >
                    NO 💔
                  </motion.button>
                </div>
              </div>

              {/* Shin-chan feet peeking from below the card */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-[40px] w-[120px] h-[60px] z-0 pointer-events-none">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  {/* Yellow Shorts */}
                  <path d="M 30,10 L 25,25 L 47,27 L 50,10 Z" fill="#ffcc00" stroke="black" strokeWidth="3" />
                  <path d="M 50,10 L 53,27 L 75,25 L 70,10 Z" fill="#ffcc00" stroke="black" strokeWidth="3" />
                  {/* Legs & Shoes */}
                  <path d="M 35,26 L 35,38" stroke="black" strokeWidth="3.5" />
                  <ellipse cx="35" cy="38" rx="8" ry="5.5" fill="white" stroke="black" strokeWidth="3" />
                  
                  <path d="M 65,26 L 65,38" stroke="black" strokeWidth="3.5" />
                  <ellipse cx="65" cy="38" rx="8" ry="5.5" fill="white" stroke="black" strokeWidth="3" />
                </svg>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center text-center"
            >
              {/* Dancing Shin-chan */}
              <motion.div 
                animate={{ 
                  rotate: [0, -8, 8, -8, 8, 0],
                  y: [0, -6, 0, -6, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.6,
                  ease: "easeInOut"
                }}
                className="w-[200px] h-[250px] pointer-events-none select-none relative mb-6"
              >
                <svg viewBox="0 0 120 150" className="w-full h-full overflow-visible">
                  {/* Left leg & shoe dancing */}
                  <path d="M 40,110 C 35,120 28,125 32,130" stroke="black" strokeWidth="3" fill="none" />
                  <ellipse cx="32" cy="130" rx="7" ry="5" fill="white" stroke="black" strokeWidth="3" />
                  
                  {/* Right leg & shoe dancing */}
                  <path d="M 75,110 C 80,120 85,125 82,130" stroke="black" strokeWidth="3" fill="none" />
                  <ellipse cx="82" cy="130" rx="7" ry="5" fill="white" stroke="black" strokeWidth="3" />

                  {/* Yellow Shorts */}
                  <path d="M 32,95 L 26,110 L 48,112 L 52,95 Z" fill="#ffcc00" stroke="black" strokeWidth="3" />
                  <path d="M 52,95 L 56,112 L 78,110 L 72,95 Z" fill="#ffcc00" stroke="black" strokeWidth="3" />

                  {/* Red Shirt */}
                  <path d="M 32,55 L 32,95 L 72,95 L 72,55 Z" fill="#ff3344" stroke="black" strokeWidth="3" />
                  
                  {/* Left Arm Raised Happily */}
                  <path d="M 32,60 Q 15,35 18,20" stroke="black" strokeWidth="3.5" fill="none" />
                  <circle cx="18" cy="20" r="7" fill="#ffd3b6" stroke="black" strokeWidth="3" />
                  
                  {/* Right Arm Raised Happily */}
                  <path d="M 72,60 Q 90,35 87,20" stroke="black" strokeWidth="3.5" fill="none" />
                  <circle cx="87" cy="20" r="7" fill="#ffd3b6" stroke="black" strokeWidth="3" />

                  {/* Head (Skin) */}
                  <path 
                    d="M 55,20 
                       C 37,20 25,28 27,44 
                       C 28,54 39,60 51,60 
                       C 61,60 67,52 67,42 
                       C 67,32 63,20 55,20 Z" 
                    fill="#ffd3b6" 
                    stroke="black" 
                    strokeWidth="3.5" 
                    strokeLinejoin="round" 
                  />
                  {/* Left Ear */}
                  <path d="M 27,42 C 21,42 17,47 17,52 C 17,57 23,61 27,59" fill="#ffd3b6" stroke="black" strokeWidth="3" />
                  
                  {/* Hair */}
                  <path 
                    d="M 35,28 
                       C 38,16 50,14 58,22 
                       C 61,20 64,24 65,30 
                       C 66,34 65,40 65,40 
                       L 59,38 
                       C 55,34 49,32 41,30 Z" 
                    fill="black" 
                    stroke="black" 
                    strokeWidth="1" 
                  />

                  {/* Eyes (Accurate happy arches for laughing eyes) */}
                  <path d="M 40,36 Q 46,28 52,36" stroke="black" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M 60,36 Q 66,28 72,36" stroke="black" strokeWidth="3.5" strokeLinecap="round" fill="none" />

                  {/* Rosy Cheeks */}
                  <ellipse cx="33" cy="48" rx="8" ry="4.5" fill="#ff9999" opacity="0.7" />
                  <ellipse cx="65" cy="48" rx="8" ry="4.5" fill="#ff9999" opacity="0.7" />

                  {/* Big happy mouth */}
                  <path d="M 44,48 Q 51,58 58,48 Z" fill="#ff6666" stroke="black" strokeWidth="2.5" />
                </svg>
              </motion.div>

              {/* Celebrating Card */}
              <div className="w-full bg-white border-3 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[32px] doodle-border-lg flex flex-col items-center text-center">
                <span className="text-5xl mb-4">🎉 💖 🍾</span>
                <h1 className="font-display font-black text-3xl sm:text-4xl text-[#ff3344] tracking-wider uppercase leading-none mt-2">
                  YAYYYYY!
                </h1>
                <p className="font-sans text-sm sm:text-base text-black/75 font-bold uppercase tracking-wider mt-4 max-w-sm">
                  I knew you would say YES! I love you so much, cute baby shark! Forever and ever! ❤️
                </p>
                <Link 
                  href="/" 
                  className="mt-8 bg-black text-[#faf9f6] border-2 border-black py-2.5 px-6 font-display font-black text-xs tracking-widest hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(255,105,180,0.5)] cursor-pointer rounded-xl"
                >
                  GO BACK HOME 🏠
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
