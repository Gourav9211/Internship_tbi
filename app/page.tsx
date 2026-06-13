"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, animate, useInView } from "framer-motion";

const DoodleIcon = ({ type }: { type: string }) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 1.2, ease: "easeInOut" as const },
        opacity: { duration: 0.2 }
      }
    }
  };

  const fillVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.8, duration: 0.4 } }
  };

  if (type === "predictor") {
    return (
      <svg viewBox="0 0 50 50" className="w-9 h-9 fill-none stroke-black stroke-[2.5] overflow-visible">
        {/* Target circles */}
        <motion.circle cx="25" cy="25" r="20" variants={pathVariants} />
        <motion.circle cx="25" cy="25" r="12" variants={pathVariants} />
        <motion.circle cx="25" cy="25" r="4" variants={pathVariants} fill="#ffccd5" />
        {/* Crosshair lines */}
        <motion.line x1="25" y1="2" x2="25" y2="48" variants={pathVariants} />
        <motion.line x1="2" y1="25" x2="48" y2="25" variants={pathVariants} />
        {/* Dart path hitting center */}
        <motion.path d="M 45,5 L 30,20" variants={pathVariants} />
        <motion.polygon points="28,18 28,24 34,24" variants={fillVariants} fill="#ff5722" className="stroke-none" />
      </svg>
    );
  }
  if (type === "chat") {
    return (
      <svg viewBox="0 0 50 50" className="w-9 h-9 fill-none stroke-black stroke-[2.5] overflow-visible">
        {/* Speech bubble left */}
        <motion.path d="M 5,22 C 5,12 18,12 25,12 C 32,12 37,16 37,22 C 37,28 30,32 25,32 C 23,32 18,34 15,36 C 16,33 16,30 15,29 C 9,29 5,26 5,22 Z" variants={pathVariants} fill="#ffffff" />
        {/* Speech bubble right */}
        <motion.path d="M 45,28 C 45,20 37,20 33,20 C 29,20 25,23 25,28 C 25,33 29,36 33,36 C 34,36 36,38 38,39 C 37,37 37,35 38,34 C 42,34 45,31 45,28 Z" variants={pathVariants} fill="#ffebd8" />
        {/* Chat dots */}
        <motion.circle cx="15" cy="22" r="1.5" fill="black" variants={fillVariants} stroke="none" />
        <motion.circle cx="25" cy="22" r="1.5" fill="black" variants={fillVariants} stroke="none" />
        <motion.circle cx="33" cy="28" r="1" fill="black" variants={fillVariants} stroke="none" />
      </svg>
    );
  }
  if (type === "optimizer") {
    return (
      <svg viewBox="0 0 50 50" className="w-9 h-9 fill-none stroke-black stroke-[2.5] overflow-visible">
        {/* Checklist box */}
        <motion.rect x="8" y="8" width="34" height="34" rx="4" variants={pathVariants} fill="#ffffff" />
        {/* Items checkmarks */}
        <motion.path d="M 14,19 L 18,23 L 26,13" variants={pathVariants} stroke="#4caf50" strokeWidth="3" />
        <motion.path d="M 14,31 L 18,35 L 32,21" variants={pathVariants} stroke="#ff5722" strokeWidth="3" />
        {/* Text lines */}
        <motion.line x1="22" y1="18" x2="36" y2="18" variants={pathVariants} />
        <motion.line x1="22" y1="32" x2="36" y2="32" variants={pathVariants} />
        <motion.line x1="14" y1="26" x2="36" y2="26" variants={pathVariants} strokeDasharray="3 3" />
      </svg>
    );
  }
  if (type === "probability") {
    return (
      <svg viewBox="0 0 50 50" className="w-9 h-9 fill-none stroke-black stroke-[2.5] overflow-visible">
        {/* Grid axes */}
        <motion.line x1="6" y1="44" x2="46" y2="44" variants={pathVariants} />
        <motion.line x1="8" y1="6" x2="8" y2="46" variants={pathVariants} />
        {/* Trending curve line */}
        <motion.path d="M 12,38 Q 20,38 25,24 T 42,10" variants={pathVariants} stroke="#ff5722" strokeWidth="3" />
        {/* Bar graphs underneath (in doodle lines) */}
        <motion.line x1="16" y1="44" x2="16" y2="32" variants={pathVariants} strokeWidth="4" />
        <motion.line x1="24" y1="44" x2="24" y2="22" variants={pathVariants} strokeWidth="4" />
        <motion.line x1="32" y1="44" x2="32" y2="18" variants={pathVariants} strokeWidth="4" />
        {/* Star highlight */}
        <motion.path d="M 42,10 L 44,6 L 40,8 L 42,10" variants={pathVariants} fill="#ffd54f" />
      </svg>
    );
  }
  if (type === "scholarship") {
    return (
      <svg viewBox="0 0 50 50" className="w-9 h-9 fill-none stroke-black stroke-[2.5] overflow-visible">
        {/* Graduation cap cap shape */}
        <motion.polygon points="25,10 45,18 25,26 5,18" variants={pathVariants} fill="#ffffff" />
        {/* Tassel */}
        <motion.path d="M 38,19 L 40,28 L 43,30" variants={pathVariants} />
        {/* Under cap band */}
        <motion.path d="M 12,21.5 L 12,32 C 12,36 38,36 38,32 L 38,21.5" variants={pathVariants} fill="#e1f5fe" />
        {/* Diploma scroll at bottom */}
        <motion.path d="M 16,40 L 34,40 M 18,37 L 32,37 M 18,43 L 32,43" variants={pathVariants} />
        <motion.circle cx="34" cy="40" r="3" fill="#ff5722" variants={pathVariants} stroke="none" />
      </svg>
    );
  }
  // defaults to comparison tool
  return (
    <svg viewBox="0 0 50 50" className="w-9 h-9 fill-none stroke-black stroke-[2.5] overflow-visible">
      {/* Center balance pillar */}
      <motion.line x1="25" y1="12" x2="25" y2="44" variants={pathVariants} />
      <motion.path d="M 18,44 L 32,44" variants={pathVariants} />
      {/* Balance beam */}
      <motion.path d="M 10,18 Q 25,12 40,16" variants={pathVariants} strokeWidth="3" />
      {/* Left hanging pan */}
      <motion.path d="M 10,18 L 4,32 L 16,32 Z" variants={pathVariants} fill="#ffebee" />
      <motion.line x1="10" y1="18" x2="10" y2="32" variants={pathVariants} />
      {/* Right hanging pan */}
      <motion.path d="M 40,16 L 34,34 L 46,30 Z" variants={pathVariants} fill="#e8f5e9" />
      <motion.line x1="40" y1="16" x2="40" y2="32" variants={pathVariants} />
    </svg>
  );
};

const agentsList = [
  { 
    id: 0,
    name: "Student Profile Parser", 
    agent: "Profile Parser", 
    role: "Extracts JEE scorecard data, rank, category quotas, state, and preference list.", 
    logs: [
      "[OK] Parser engine successfully initialized.",
      "[INFO] Extracting NTA scorecard data fields...",
      "[SUCCESS] Common Rank List (CRL): 6,240 // Cat Rank: General // Home State: Tamil Nadu."
    ],
    checklist: ["Extract CRL and Category Rank", "Verify State of Eligibility", "Scan initial preference list"]
  },
  { 
    id: 1,
    name: "Rank Analysis Engine", 
    agent: "Safety Analyzer", 
    role: "Segments colleges into SAFE, MODERATE, and DREAM options using multi-year cutoffs.", 
    logs: [
      "[QUERY] Fetching JoSAA historical closing ranks (2016-2025)...",
      "[EXEC] Running safety segmentation model...",
      "[MATCH] Safe matches: 42 // Moderate matches: 28 // Dream matches: 12."
    ],
    checklist: ["Process multi-year cutoff databases", "Perform safety boundary calculations", "Generate safety status segments"]
  },
  { 
    id: 2,
    name: "Cutoff Predictor Engine", 
    agent: "Trend Engine", 
    role: "Evaluates standard deviations and round movements to predict seat vacant allocations.", 
    logs: [
      "[SIM] Simulating round-by-round vacancy transitions...",
      "[COMPUTE] Analyzing category quota distributions...",
      "[PREDICT] Safest ECE seat: NIT Trichy (Round 3 prediction probability: 98.4%)."
    ],
    checklist: ["Evaluate round movement trends", "Factor category & gender quota shifts", "Run Monte Carlo probability models"]
  },
  { 
    id: 3,
    name: "College Research Collector", 
    agent: "Fact Collector", 
    role: "Gathers placements statistics, hostel charges, fee reports, and campus connectivity.", 
    logs: [
      "[CONNECT] Fetching placement data for NIT Trichy & Surathkal...",
      "[DATA] ECE Avg Package: ₹22.8 LPA // Fee: ₹1.2L per semester.",
      "[READY] Hostel metrics and connectivity indices indexed."
    ],
    checklist: ["Scrape certified placement reports", "Extract fee structure and hostel costs", "Verify campus connectivity indices"]
  },
  { 
    id: 4,
    name: "Choice Sequence Builder", 
    agent: "List Builder", 
    role: "Compiles a verified preference list based on safety, branch value, and round sequences.", 
    logs: [
      "[GEN] Organizing preference list with 74 options...",
      "[VALIDATE] Checking sequence compliance with JoSAA lock rules...",
      "[SUCCESS] Optimized preference list compiled and ready for locking."
    ],
    checklist: ["Build optimized preference list", "Verify locking rules compliance", "Export choice configuration format"]
  },
  { 
    id: 5,
    name: "Counseling Strategy Evaluator", 
    agent: "Risk Evaluator", 
    role: "Formulates round-by-round strategies: when to slide, freeze, float, or enter CSAB.", 
    logs: [
      "[STRATEGY] Setting initial state to FLOAT for Rounds 1 & 2.",
      "[ANALYZING] Evaluating slide opportunity for Surathkal CSE...",
      "[RISK] CSAB Special Round fallback path formulated."
    ],
    checklist: ["Generate Float/Slide/Freeze timeline", "Formulate round safety thresholds", "Prepare CSAB round recovery plan"]
  },
  { 
    id: 6,
    name: "Final Recommendation Compiler", 
    agent: "Final Report", 
    role: "Compiles a certified JoSAA report, saving choice configurations and matching steps.", 
    logs: [
      "[COMPRESS] Gathering pipeline step results...",
      "[SIGN] Final certified JoSAA report compiled successfully.",
      "[EXPORT] Report generated: joSAA_counseling_strategy_final.pdf."
    ],
    checklist: ["Aggregate multi-agent reports", "Verify strategy safety signatures", "Generate downloadable report PDF"]
  }
];

const nodeCoords = [
  { x: 50, y: 15 },
  { x: 82, y: 25 },
  { x: 85, y: 60 },
  { x: 68, y: 85 },
  { x: 32, y: 85 },
  { x: 15, y: 60 },
  { x: 18, y: 25 }
];

const carVariants = {
  hidden: { left: "-180px" },
  visible: { 
    left: "105%",
    transition: { 
      duration: 3.5, 
      ease: "linear" as const
    }
  }
};

const cloudVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (delay: number) => ({
    scale: [0, 1.15, 1],
    opacity: 1,
    transition: { 
      delay: delay, 
      duration: 0.5, 
      ease: "easeOut" as const
    }
  })
};

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Dashboard view tracking for premium animations
  const dashboardRef = useRef<HTMLDivElement>(null);
  const isDashboardInView = useInView(dashboardRef, { once: true, margin: "-100px" });
  
  const chancesCount = useMotionValue(0);
  const chancesRounded = useTransform(chancesCount, Math.round);

  useEffect(() => {
    if (isDashboardInView) {
      animate(chancesCount, 91, { duration: 1.6, ease: "easeOut" });
    }
  }, [isDashboardInView]);
  
  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Multi-agent pipeline state
  const [selectedAgent, setSelectedAgent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setSelectedAgent((prev) => (prev + 1) % 7);
    }, 2800);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleSelectAgent = (index: number) => {
    setSelectedAgent(index);
    setIsAutoPlay(false);
  };

  // AI Chat simulator state
  const [chatStep, setChatStep] = useState(0);
  const chatMessages = [
    { sender: "user", text: "Can I get CSE at NIT Surathkal with CRL 4,120?" },
    { sender: "agent", text: "Checking my records... Last year, CSE closed at 4,280 in Round 6. You have a 98.4% chance. That is a SAFE choice!" },
    { sender: "user", text: "Should I accept ECE at IIT Kharagpur or wait for CSAB?" },
    { sender: "agent", text: "Here is my tip: IIT KGP ECE median is ₹22L/yr, while CSAB NIT CSE options average ₹18L/yr. If campus brand is top priority, freeze ECE!" }
  ];

  // Intro swing animation state
  const [robotState, setRobotState] = useState<"idle" | "shooting" | "swinging" | "dropping" | "firstLand" | "jumping" | "secondLand" | "disappearing" | "done">("idle");
  const [coords, setCoords] = useState<{ x0: number; y0: number; x1: number; y1: number; x2: number; y2: number } | null>(null);

  const [isFirstNAligned, setIsFirstNAligned] = useState(false);
  const [isSecondNAligned, setIsSecondNAligned] = useState(false);

  const firstNRef = useRef<HTMLSpanElement>(null);
  const secondNRef = useRef<HTMLSpanElement>(null);
  const topbarHomeRef = useRef<HTMLDivElement>(null);

  const introRobotPos = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };
  const introRobotRotate = useMotionValue(0);
  const introRobotScaleY = useMotionValue(1);
  const introRobotXOffset = useTransform(introRobotPos.x, (val) => val - 25);
  const introRobotYOffset = useTransform(introRobotPos.y, (val) => val - 168);

  const webLineX2 = useMotionValue(0);
  const webLineY2 = useMotionValue(0);

  // Mouse position tracking motion values (normalized from -1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    document.title = "CounselAI - Next-Gen College Counseling & Prediction Platform";
    
    // Cycle chat simulation messages
    const timer = setInterval(() => {
      setChatStep((prev) => (prev + 1) % chatMessages.length);
    }, 2200);

    // Track mouse coordinates normalized from -1 to 1
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Measure layout coordinates for swinging robot after layout settles
  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstNRef.current && secondNRef.current && topbarHomeRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const firstNRect = firstNRef.current.getBoundingClientRect();
        const secondNRect = secondNRef.current.getBoundingClientRect();
        const topbarRect = topbarHomeRef.current.getBoundingClientRect();

        let x0 = topbarRect.left - containerRect.left + topbarRect.width / 2;
        let y0 = topbarRect.top - containerRect.top + topbarRect.height;
        const x1 = firstNRect.left - containerRect.left + firstNRect.width / 2;
        const y1 = firstNRect.top - containerRect.top;
        const x2 = secondNRect.left - containerRect.left + secondNRect.width / 2;
        const y2 = secondNRect.top - containerRect.top;

        // Fallback for mobile/hidden nav (if width is 0)
        if (topbarRect.width === 0) {
          x0 = containerRect.width / 2;
          y0 = 60; // Top header height
        }

        setCoords({ x0, y0, x1, y1, x2, y2 });
        setRobotState("shooting");
      }
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  // Execute programmatic robot swinging and jumping animation sequence
  useEffect(() => {
    if (!coords || robotState === "idle") return;

    let animFrameId: number;
    const startTime = performance.now();

    // Robot starts falling from top-right
    const xStart = coords.x0 + 420;
    const yStart = -80;
    const gFall = 1500; // gravity acceleration for falling

    // Phase timings
    const tFall = 0.35; // falls for 0.35s before shooting web
    const tShoot = 0.2; // shoots web while falling for 0.2s
    const tSwing = 0.6; // swings for 0.6s
    const tRelease = tFall + tShoot + tSwing; // releases web at 1.15s

    // Swing parameters
    const thetaStart = 52; // attachment angle in degrees
    const omega = 2.8; // angular frequency

    // Solve exact attachment point for seamless handoff
    const thetaAttachRad = (thetaStart * Math.PI) / 180;
    const xAttach = coords.x0 + 168 * Math.sin(thetaAttachRad);
    const yAttach = coords.y0 + 168 * Math.cos(thetaAttachRad);
    
    // Parabolic solver for falling phases (Phase 0 & 1) to land exactly at xAttach, yAttach
    const tFallTotal = tFall + tShoot;
    const vxFall = (xAttach - xStart) / tFallTotal;
    const vyFall = (yAttach - yStart - 0.5 * gFall * tFallTotal * tFallTotal) / tFallTotal;

    // Flight parameters
    const tFly = 0.5; // duration of flight
    const gFly = 1000; // gravity for flight

    // First land pause (GEN N)
    const tPause1 = 0.3;

    // Jump parameters (GEN N to NEXT N)
    const tJump = 0.6; // duration of jump
    const gJump = 1400; // gravity for jump

    // Second land pause (NEXT N)
    const tPause2 = 0.3;

    // Jump to edge of screen
    const tToEdge = 0.45;
    const gEdge = 1200;

    // Slide down left edge
    const tSlide = 0.75;

    const updatePhysics = () => {
      const now = performance.now();
      const t = (now - startTime) / 1000; // time in seconds

      if (t < tFall) {
        // --- 0. FALLING FROM TOP-RIGHT ---
        if (robotState !== "dropping") {
          setRobotState("dropping");
        }
        // Continuous parabolic fall
        const x = xStart + vxFall * t;
        const y = yStart + vyFall * t + 0.5 * gFall * t * t;
        const theta = -15 * (t / tFall); // slight forward tilt

        introRobotPos.x.set(x);
        introRobotPos.y.set(y);
        introRobotRotate.set(theta);
        introRobotScaleY.set(1.0);

        animFrameId = requestAnimationFrame(updatePhysics);
      } else if (t < tFall + tShoot) {
        // --- 1. SHOOTING WEB WHILE FALLING ---
        if (robotState !== "shooting") {
          setRobotState("shooting");
        }
        const tPrime = t - tFall;
        const webProgress = tPrime / tShoot;

        // Continue along same continuous parabola
        const x = xStart + vxFall * t;
        const y = yStart + vyFall * t + 0.5 * gFall * t * t;
        const theta = -15;

        introRobotPos.x.set(x);
        introRobotPos.y.set(y);
        introRobotRotate.set(theta);
        introRobotScaleY.set(1.0);

        // Web line shoots from hands (46px above feet coordinate)
        const xHands = x;
        const yHands = y - 46;
        webLineX2.set(xHands + (coords.x0 - xHands) * webProgress);
        webLineY2.set(yHands + (coords.y0 - yHands) * webProgress);

        animFrameId = requestAnimationFrame(updatePhysics);
      } else if (t < tRelease) {
        // --- 2. SWINGING ---
        if (robotState !== "swinging") {
          setRobotState("swinging");
        }
        const tPrime = t - (tFall + tShoot);

        // Angle follows continuous-velocity pendulum swing
        const theta = thetaStart * Math.cos(omega * tPrime) - 18 * Math.sin(omega * tPrime);
        introRobotRotate.set(theta);
        introRobotScaleY.set(1.0);

        // In swing state, robot pivots around (coords.x0, coords.y0)
        introRobotPos.x.set(coords.x0);
        introRobotPos.y.set(coords.y0);

        // Web connects anchor to hands
        const thetaRad = (theta * Math.PI) / 180;
        webLineX2.set(coords.x0 + 122 * Math.sin(thetaRad));
        webLineY2.set(coords.y0 + 122 * Math.cos(thetaRad));

        animFrameId = requestAnimationFrame(updatePhysics);
      } else if (t < tRelease + tFly) {
        // --- 3. FLYING TO GEN N ---
        if (robotState !== "dropping") {
          setRobotState("dropping");
        }
        const tPrime = t - tRelease;

        // Compute exact release position of feet (continuous handoff)
        const thetaR = thetaStart * Math.cos(omega * tSwing) - 18 * Math.sin(omega * tSwing);
        const thetaRRad = (thetaR * Math.PI) / 180;
        const xR = coords.x0 + 168 * Math.sin(thetaRRad);
        const yR = coords.y0 + 168 * Math.cos(thetaRRad);

        // Parabolic trajectory from release point (xR, yR) to GEN N (coords.x2, coords.y2)
        const vx = (coords.x2 - xR) / tFly;
        const vy = (coords.y2 - yR - 0.5 * gFly * tFly * tFly) / tFly;

        const x = xR + vx * tPrime;
        const y = yR + vy * tPrime + 0.5 * gFly * tPrime * tPrime;
        const theta = thetaR * (1 - tPrime / tFly);

        introRobotPos.x.set(x);
        introRobotPos.y.set(y);
        introRobotRotate.set(theta);
        introRobotScaleY.set(1.0);

        animFrameId = requestAnimationFrame(updatePhysics);
      } else if (t < tRelease + tFly + tPause1) {
        // --- 4. LANDING 1 (GEN N) ---
        if (robotState !== "firstLand") {
          setRobotState("firstLand");
          setIsSecondNAligned(true); // Gen N is second N in NEXT-GEN
        }
        const tPrime = t - (tRelease + tFly);

        introRobotPos.x.set(coords.x2);
        introRobotPos.y.set(coords.y2);
        introRobotRotate.set(0);

        // Squash bounce
        const scaleY = 1.0 - 0.45 * Math.exp(-8 * tPrime) * Math.cos(20 * tPrime);
        introRobotScaleY.set(scaleY);

        animFrameId = requestAnimationFrame(updatePhysics);
      } else if (t < tRelease + tFly + tPause1 + tJump) {
        // --- 5. JUMPING TO NEXT N ---
        if (robotState !== "jumping") {
          setRobotState("jumping");
        }
        const tPrime = t - (tRelease + tFly + tPause1);

        // Parabolic trajectory from GEN N (coords.x2, coords.y2) to NEXT N (coords.x1, coords.y1)
        const vx = (coords.x1 - coords.x2) / tJump;
        const vy = (coords.y1 - coords.y2 - 0.5 * gJump * tJump * tJump) / tJump;

        const x = coords.x2 + vx * tPrime;
        const y = coords.y2 + vy * tPrime + 0.5 * gJump * tPrime * tPrime;
        const theta = -360 * (tPrime / tJump); // Full roll rotation

        introRobotPos.x.set(x);
        introRobotPos.y.set(y);
        introRobotRotate.set(theta);
        introRobotScaleY.set(1.0);

        animFrameId = requestAnimationFrame(updatePhysics);
      } else if (t < tRelease + tFly + tPause1 + tJump + tPause2) {
        // --- 6. LANDING 2 (NEXT N) ---
        if (robotState !== "secondLand") {
          setRobotState("secondLand");
          setIsFirstNAligned(true); // Next N is first N in NEXT-GEN
        }
        const tPrime = t - (tRelease + tFly + tPause1 + tJump);

        introRobotPos.x.set(coords.x1);
        introRobotPos.y.set(coords.y1);
        introRobotRotate.set(0);

        // Squash bounce
        const scaleY = 1.0 - 0.45 * Math.exp(-8 * tPrime) * Math.cos(20 * tPrime);
        introRobotScaleY.set(scaleY);

        animFrameId = requestAnimationFrame(updatePhysics);
      } else if (t < tRelease + tFly + tPause1 + tJump + tPause2 + tToEdge) {
        // --- 7. JUMP TO LEFT EDGE ---
        if (robotState !== "disappearing") {
          setRobotState("disappearing");
        }
        const tPrime = t - (tRelease + tFly + tPause1 + tJump + tPause2);

        // Target edge point
        const xEdge = 25;
        const yEdge = coords.y1 + 120;

        const vx = (xEdge - coords.x1) / tToEdge;
        const vy = (yEdge - coords.y1 - 0.5 * gEdge * tToEdge * tToEdge) / tToEdge;

        const x = coords.x1 + vx * tPrime;
        const y = coords.y1 + vy * tPrime + 0.5 * gEdge * tPrime * tPrime;
        const theta = -90 * (tPrime / tToEdge); // rotate sideways to -90 degrees

        introRobotPos.x.set(x);
        introRobotPos.y.set(y);
        introRobotRotate.set(theta);
        introRobotScaleY.set(1.0);

        animFrameId = requestAnimationFrame(updatePhysics);
      } else if (t < tRelease + tFly + tPause1 + tJump + tPause2 + tToEdge + tSlide) {
        // --- 8. SLIDING DOWN LEFT EDGE ---
        const tPrime = t - (tRelease + tFly + tPause1 + tJump + tPause2 + tToEdge);

        const xEdge = 25;
        const yEdge = coords.y1 + 120;

        const x = xEdge;
        const y = yEdge + 650 * (tPrime / tSlide) * (tPrime / tSlide); // accelerating downward
        const theta = -90; // stay sideways

        introRobotPos.x.set(x);
        introRobotPos.y.set(y);
        introRobotRotate.set(theta);
        introRobotScaleY.set(1.0);

        animFrameId = requestAnimationFrame(updatePhysics);
      } else {
        // --- 9. DONE ---
        setRobotState("done");
      }
    };

    animFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [coords]);

  // Monitor scroll progress of the page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mouse mapping animations for Doodle Robot Head & Neck Turn (Normalized cursor tracking)
  const headX = useTransform(mouseX, [-1, 1], [-12, 12]);
  const headY = useTransform(mouseY, [-1, 1], [-8, 8]);
  const headRotate = useTransform(mouseX, [-1, 1], [-4, 4]);

  const faceX = useTransform(mouseX, [-1, 1], [-15, 15]); // relative to head
  const faceY = useTransform(mouseY, [-1, 1], [-10, 10]); // relative to head
  const leftEarX = useTransform(mouseX, [-1, 1], [12, -12]); // relative to head
  const rightEarX = useTransform(mouseX, [-1, 1], [-12, 12]); // relative to head
  const earY = useTransform(mouseY, [-1, 1], [3, -3]); // relative to head
  const antennaRotate = useTransform(mouseX, [-1, 1], [-16, 16]); // relative to head
  const antennaX = useTransform(mouseX, [-1, 1], [-6, 6]); // relative to head
  const eyeScaleX = useTransform(mouseX, [-1, 0, 1], [0.72, 1.0, 0.72]);
  
  // Bending Neck Parallax
  const neck1X = useTransform(mouseX, [-1, 1], [-7, 7]);
  const neck1Y = useTransform(mouseY, [-1, 1], [-4, 4]);
  const neck2X = useTransform(mouseX, [-1, 1], [-4, 4]);
  const neck2Y = useTransform(mouseY, [-1, 1], [-2, 2]);
  const neck3X = useTransform(mouseX, [-1, 1], [-1.5, 1.5]);
  const neck3Y = useTransform(mouseY, [-1, 1], [-0.5, 0.5]);

  const robotRotate = useTransform(mouseX, [-1, 1], [-4, 4]);
  const robotY = useTransform(mouseY, [-1, 1], [-6, 6]);

  // Scroll mapping for instructions overlay (fades out as user scrolls)
  const promptOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const promptY = useTransform(scrollYProgress, [0, 0.2], [0, 15]);

  // 3D flying page variants for scroll reveal animations
  const pageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.88, 
      rotateX: 8, 
      y: 80,
      z: -100
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0, 
      y: 0,
      z: 0,
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      }
    }
  };

  return (
    <>
      {/* 0. INTRO SWINGING DOODLE ROBOT ANIMATION */}
      {robotState !== "done" && coords && (
        <div className="absolute inset-0 z-[150] pointer-events-none overflow-hidden h-[180vh] w-full">
              {/* Web Strand (Drawn during web shooting and swinging) */}
              {(robotState === "shooting" || robotState === "swinging") && (
                <svg className="absolute inset-0 w-full h-full">
                  <motion.line 
                    x1={robotState === "shooting" ? coords.x0 + 400 : coords.x0} 
                    y1={robotState === "shooting" ? 35 - 46 : coords.y0} 
                    x2={webLineX2} 
                    y2={webLineY2} 
                    stroke="black" 
                    strokeWidth="2.5" 
                    strokeDasharray="4 4"
                  />
                </svg>
              )}

          {/* Swinging/Jumping Robot Overlay */}
          <motion.div 
            style={{ 
              x: robotState === "swinging" ? coords.x0 - 25 : introRobotXOffset,
              y: robotState === "swinging" ? coords.y0 : introRobotYOffset,
              rotate: introRobotRotate,
              scaleY: introRobotScaleY,
              transformOrigin: robotState === "swinging" ? "25px 0px" : "25px 168px"
            }}
            className="absolute"
          >
            <svg viewBox="0 0 50 170" className="w-[50px] h-[170px] fill-none stroke-black stroke-[3.5] filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">

              
              {/* Robot group */}
              <g transform="translate(0, 110)">
                {/* Torso */}
                <rect x="10" y="30" width="30" height="20" rx="3" fill="#ffffff" />
                <line x1="18" y1="40" x2="32" y2="40" strokeWidth="2.5" />
                {/* Legs */}
                <line x1="18" y1="50" x2="18" y2="58" strokeWidth="3" />
                <line x1="32" y1="50" x2="32" y2="58" strokeWidth="3" />
                {/* Arms (holding rope) */}
                <path d="M 5,32 Q 2,12 25,12" strokeWidth="3" fill="none" />
                <path d="M 45,32 Q 48,12 25,12" strokeWidth="3" fill="none" />
                {/* Neck */}
                <line x1="25" y1="26" x2="25" y2="30" strokeWidth="3.5" />
                {/* Head */}
                <rect x="11" y="8" width="28" height="20" rx="5" fill="#ffffff" />
                {/* Eyes */}
                <circle cx="20" cy="17" r="2.5" fill="#ff5722" />
                <circle cx="30" cy="17" r="2.5" fill="#ff5722" />
                {/* Smile */}
                <path d="M 22,23 Q 25,26 28,23" strokeWidth="1.5" />
                {/* Antenna */}
                <line x1="25" y1="8" x2="25" y2="2" strokeWidth="2.5" />
                <circle cx="25" cy="0" r="2.5" fill="#ff5722" />
              </g>
            </svg>
          </motion.div>
        </div>
      )}

      {/* GLOBAL FLOATING HEADER NAVIGATION (Fixed top-0, z-50 to float above all sections) */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-8 px-6 md:px-16 flex items-center justify-between pointer-events-none">
        
        {/* Logo (Shield + Name) */}
        <div className="flex items-center gap-3 cursor-pointer group pointer-events-auto">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#0c0d0e] stroke-[6.5] transition-transform duration-500 group-hover:rotate-12">
              <polygon points="50,8 90,27 88,72 52,93 12,72 14,27" />
              <circle cx="50" cy="32" r="6.5" className="fill-[#0c0d0e]" />
              <circle cx="32" cy="62" r="6.5" className="fill-[#ff5722] stroke-[#ff5722]" />
              <circle cx="68" cy="62" r="6.5" className="fill-[#0c0d0e]" />
              <line x1="50" y1="32" x2="32" y2="62" className="stroke-[#0c0d0e] stroke-[4]" />
              <line x1="50" y1="32" x2="68" y2="62" className="stroke-[#0c0d0e] stroke-[4]" />
              <line x1="32" y1="62" x2="68" y2="62" className="stroke-[#0c0d0e] stroke-[4]" />
            </svg>
          </div>
          <span className="font-display font-black text-xl tracking-wider text-[#0c0d0e] select-none">
            Counsel<span className="text-[#ff5722]">AI</span>
          </span>
        </div>

        {/* Center Nav Link Box */}
        <nav ref={topbarHomeRef} className="hidden md:block bg-black/[0.08] p-[1.5px] doodle-border pointer-events-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] bg-[#faf9f6]/95">
          <div className="bg-[#faf9f6]/95 backdrop-blur-md px-10 py-2.5 flex items-center gap-8 doodle-border">
            {["HOME", "FEATURES", "WORKFLOW", "DASHBOARD", "FAQ"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="font-display font-black text-[11px] tracking-[0.18em] text-[#0c0d0e]/75 hover:text-[#ff5722] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Right Get Started Button */}
        <Link 
          href="/auth" 
          className="bg-[#0c0d0e] p-[1.2px] doodle-border hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 cursor-pointer pointer-events-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] block"
        >
          <button className="bg-[#faf9f6] text-[#0c0d0e] px-6 py-2 font-display font-black text-[11px] tracking-widest doodle-border cursor-pointer w-full">
            GET STARTED
          </button>
        </Link>
      </header>

      <div ref={containerRef} className="relative w-full bg-[#faf9f6] perspective-[1200px]">
        {/* 1. HERO SECTION (Pinned Scroll Range) */}
        <section id="home" className="relative h-[160vh] lg:h-[220vh] w-full">
        
        {/* Sticky container matching screen viewport */}
        <div className="sticky top-0 h-screen w-full tech-grid-bg flex flex-col justify-between select-none overflow-hidden font-display pt-24">
          
          {/* Background Video Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.05]">
            <video
              autoPlay
              loop
              muted
              playsInline
              onCanPlay={() => setIsVideoLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <source
                src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e338c35a6396f4b6d395a1209b5&profile_id=139&oauth2_token_id=57447761"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Blueprint Grid Lines (HUD Overlay) */}
          <div className="absolute inset-0 pointer-events-none z-1">
            <div className="absolute left-[10%] top-0 bottom-0 w-[1px] border-l border-dashed border-black/[0.04]"></div>
            <div className="absolute left-[30%] top-0 bottom-0 w-[1px] border-l border-dashed border-black/[0.04]"></div>
            <div className="absolute left-[50%] top-0 bottom-0 w-[1px] border-l border-dashed border-black/[0.04]"></div>
            <div className="absolute left-[70%] top-0 bottom-0 w-[1px] border-l border-dashed border-black/[0.04]"></div>
            <div className="absolute left-[90%] top-0 bottom-0 w-[1px] border-l border-dashed border-black/[0.04]"></div>
            
            <div className="absolute top-[18%] left-0 right-0 h-[1px] border-t border-dashed border-black/[0.04]"></div>
            <div className="absolute top-[45%] left-0 right-0 h-[1px] border-t border-dashed border-black/[0.04]"></div>
            <div className="absolute top-[75%] left-0 right-0 h-[1px] border-t border-dashed border-black/[0.04]"></div>
          </div>

          {/* Hand-Drawn Masking Tapes (Replacing solid black blocks) */}
          <div className="absolute top-[115px] right-10 w-28 h-8 bg-[#fffbeb] border-2 border-black rotate-[12deg] z-20 flex items-center justify-center font-display font-bold text-[8.5px] tracking-widest text-[#0c0d0e]/60 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] doodle-border-sm select-none pointer-events-none">
            SYS_CAL_01
          </div>
          <div className="absolute bottom-8 left-8 w-36 h-9 bg-[#fffbeb] border-2 border-black -rotate-[8deg] z-20 flex items-center justify-center font-display font-bold text-[8.5px] tracking-widest text-[#0c0d0e]/60 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] doodle-border-sm select-none pointer-events-none">
            WAKE_READY_OK
          </div>

          {/* MAIN HERO CONTENT */}
          <main className="relative z-10 w-full px-6 md:px-16 flex-grow flex items-center pt-8 lg:pt-0">
            <div className="relative w-full h-full flex flex-col lg:flex-row justify-between items-center py-6 lg:py-0 gap-6">
              
              {/* Left Text Column */}
              <div className="w-full lg:w-[50%] xl:w-[46%] flex flex-col justify-center z-20">
                <div className="overflow-hidden">
                  <motion.h1 
                    initial={{ opacity: 0, y: 45 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-display font-black text-[42px] sm:text-[58px] md:text-[72px] lg:text-[76px] xl:text-[88px] leading-[1.0] tracking-wider text-[#0c0d0e] flex flex-col"
                  >
                    <span className="opacity-95 tracking-wider flex items-center gap-[2px]">
                      <motion.span 
                        ref={firstNRef} 
                        className="inline-block origin-bottom-left"
                        animate={isFirstNAligned ? { rotate: 0, y: 0, scaleY: [0.8, 1.15, 0.95, 1.0] } : { rotate: -16, y: -8 }}
                        transition={isFirstNAligned ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                      >
                        N
                      </motion.span>
                      <span>EXT-GE</span>
                      <motion.span 
                        ref={secondNRef} 
                        className="inline-block origin-bottom-right"
                        animate={isSecondNAligned ? { rotate: 0, y: 0, scaleY: [0.8, 1.15, 0.95, 1.0] } : { rotate: 18, y: 6 }}
                        transition={isSecondNAligned ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                      >
                        N
                      </motion.span>
                    </span>
                    <span className="relative mt-2 text-wrap uppercase break-words inline-block">
                      COUNSELING
                      {/* Doodle red underline marker path */}
                      <svg className="absolute left-0 bottom-[-6px] w-full h-5 text-[#ff5722] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 2,50 Q 25,20 50,50 T 98,50" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="mt-3 text-[36px] sm:text-[50px] md:text-[60px] lg:text-[64px] xl:text-[74px] leading-none text-[#0c0d0e] flex items-center gap-2">
                      WITH <span className="text-[#ff5722]">AI</span>
                    </span>
                  </motion.h1>
                </div>

                {/* Description Paragraph (Moved from right side to left side) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-col items-start mt-6 max-w-[420px]"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="relative w-6 h-6 animate-[spin_25s_linear_infinite] opacity-75">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-black stroke-[3.5]">
                        <circle cx="50" cy="50" r="42" strokeDasharray="3 6" />
                        <circle cx="50" cy="50" r="30" strokeDasharray="4 4" />
                        <circle cx="50" cy="50" r="16" />
                        <line x1="50" y1="0" x2="50" y2="100" />
                        <line x1="0" y1="50" x2="100" y2="50" />
                      </svg>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] font-display font-black text-[#ff5722] uppercase">
                      AI ENGINE COORDINATION
                    </span>
                  </div>
                  <p className="font-sans text-[11.5px] sm:text-[13px] leading-relaxed tracking-[0.06em] text-black/70 uppercase font-bold">
                    AI-powered counseling that guides your college journey and ensures optimal choices. Smarter decisions for a brighter future.
                  </p>
                </motion.div>

                {/* Left Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-row gap-6 mt-8 items-center"
                >
                  <Link 
                    href="/auth" 
                    className="bg-[#ff5722] p-[1.5px] doodle-border hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 cursor-pointer shadow-[4px_4px_0px_0px_#0c0d0e] block"
                  >
                    <button className="bg-[#ff5722] text-[#faf9f6] px-6 py-3.5 flex items-center gap-3 font-display font-black text-[12px] tracking-widest clip-btn-orange cursor-pointer w-full">
                      GET STARTED 
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </Link>

                  <div className="bg-[#faf9f6] p-[1px] doodle-border hover:bg-black/5 hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 cursor-pointer shadow-[4px_4px_0px_0px_#0c0d0e]">
                    <div className="bg-[#faf9f6] p-[0.5px] doodle-border">
                      <button className="bg-transparent text-[#0c0d0e] px-6 py-3.5 flex items-center gap-3 font-display font-black text-[12px] tracking-widest doodle-border cursor-pointer">
                        CONTACT US
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Center Scroll-Driven Robot Animation Column */}
              <div className="absolute left-[70%] xl:left-[72%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] xl:w-[480px] xl:h-[480px] z-10 hidden lg:flex items-center justify-center">
                
                {/* Rotating HUD graphics */}
                <div className="absolute inset-0 border border-dashed border-black/[0.05] rounded-full animate-[spin_120s_linear_infinite] pointer-events-none"></div>
                <div className="absolute inset-[35px] border border-dashed border-black/[0.03] rounded-full animate-[spin_60s_linear_infinite_reverse] pointer-events-none"></div>

                {/* Robot SVG Container */}
                <motion.div 
                  style={{ rotate: robotRotate, y: robotY }}
                  className="relative w-full h-full flex items-center justify-center scale-95 xl:scale-100"
                >
                  <svg 
                    viewBox="0 0 400 400" 
                    className="w-[90%] h-[90%] fill-none stroke-black stroke-[3.5] filter drop-shadow-[4px_4px_0px_rgba(0,0,0,0.08)]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* ROBOT BODY LAYER */}
                    {/* Shoulders */}
                    <path d="M 110,390 C 130,315 155,300 200,300 C 245,300 270,315 290,390" strokeWidth="4" />
                    {/* Battery indicator details */}
                    <rect x="175" y="325" width="50" height="24" rx="5" strokeWidth="3" fill="#ffffff" />
                    <motion.rect 
                      x="179" y="329" 
                      width="35" height="16" 
                      fill="#ff5722" 
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <path d="M 225,332 L 228,332 L 228,342 L 225,342" strokeWidth="3" fill="#ffffff" />
                    
                    {/* Neck rings (Bending dynamically with mouse movement) */}
                    <motion.path style={{ x: neck1X, y: neck1Y }} d="M 180,265 C 190,263 210,267 220,265" strokeWidth="4.5" />
                    <motion.path style={{ x: neck2X, y: neck2Y }} d="M 175,277 C 190,275 210,279 225,277" strokeWidth="4.5" />
                    <motion.path style={{ x: neck3X, y: neck3Y }} d="M 170,289 C 190,287 210,291 230,289" strokeWidth="4.5" />

                    {/* ROBOT HEAD GROUP (Bends and rotates with mouse) */}
                    <motion.g style={{ x: headX, y: headY, rotate: headRotate, transformOrigin: "200px 170px" }}>
                      {/* Left Ear */}
                      <motion.path style={{ x: leftEarX, y: earY }} d="M 115,160 L 95,165 L 95,185 L 115,190 Z" strokeWidth="3.5" fill="#ffffff" />
                      <motion.path style={{ x: leftEarX, y: earY }} d="M 95,175 L 115,175" strokeWidth="2" />
                      
                      {/* Right Ear */}
                      <motion.path style={{ x: rightEarX, y: earY }} d="M 285,160 L 305,165 L 305,185 L 285,190 Z" strokeWidth="3.5" fill="#ffffff" />
                      <motion.path style={{ x: rightEarX, y: earY }} d="M 285,175 L 305,175" strokeWidth="2" />

                      {/* Head main shell */}
                      <path d="M 115,105 C 150,98 250,98 285,105 C 292,138 290,202 285,235 C 250,242 150,242 115,235 C 110,202 108,138 115,105 Z" strokeWidth="4" fill="#ffffff" />

                      {/* Band-aid doodle */}
                      <path d="M 245,115 L 275,123 L 271,135 L 241,127 Z" fill="#fffbeb" strokeWidth="2.5" />
                      <line x1="258" y1="121" x2="258" y2="129" strokeWidth="1.5" />

                      {/* FACEPLATE SCREEN (Shifts to simulate turning) */}
                      <motion.g style={{ x: faceX, y: faceY }}>
                        {/* Screen border */}
                        <path d="M 140,128 C 170,123 230,123 260,128 C 267,148 267,192 260,212 C 230,217 170,217 140,212 C 133,192 133,148 140,128 Z" strokeWidth="3.5" fill="#faf9f6" />
                        
                        {/* Left Eye */}
                        <motion.ellipse cx="178" cy="164" rx="13" ry="13" style={{ scaleX: eyeScaleX }} fill="#ff5722" strokeWidth="3" />
                        <motion.ellipse cx="180" cy="162" rx="3.5" ry="3.5" style={{ scaleX: eyeScaleX }} fill="#ffffff" strokeWidth="0" />

                        {/* Right Eye */}
                        <motion.ellipse cx="222" cy="164" rx="13" ry="13" style={{ scaleX: eyeScaleX }} fill="#ff5722" strokeWidth="3" />
                        <motion.ellipse cx="224" cy="162" rx="3.5" ry="3.5" style={{ scaleX: eyeScaleX }} fill="#ffffff" strokeWidth="0" />

                        {/* Wavy mouth / soundwave */}
                        <path d="M 185,190 Q 200,205 215,190" strokeWidth="3" fill="none" />
                      </motion.g>

                      {/* ANTENNA (tilted base on head turn) */}
                      <motion.path style={{ x: antennaX }} d="M 190,101 Q 200,92 210,101" strokeWidth="3.5" fill="none" />
                      <motion.g style={{ x: antennaX, rotate: antennaRotate, transformOrigin: "200px 96px" }}>
                        <line x1="200" y1="96" x2="200" y2="52" strokeWidth="4" />
                        <circle cx="200" cy="40" r="10" fill="#ff5722" strokeWidth="3.5" />
                        <circle cx="197" cy="37" r="3" fill="#ffffff" strokeWidth="0" />
                      </motion.g>
                    </motion.g>
                  </svg>
                </motion.div>
              </div>

              {/* Mobile Robot View (Replacing mobile document layout) */}
              <div className="w-full flex lg:hidden items-center justify-center my-6">
                <div className="relative w-[240px] h-[240px] border-2 border-black bg-white rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-4 doodle-border-sm">
                  <svg 
                    viewBox="0 0 400 400" 
                    className="w-full h-full fill-none stroke-black stroke-[4]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Torso */}
                    <path d="M 110,390 C 130,315 155,300 200,300 C 245,300 270,315 290,390" strokeWidth="4.5" />
                    <rect x="175" y="325" width="50" height="24" rx="5" strokeWidth="3.5" fill="#ffffff" />
                    <rect x="179" y="329" width="35" height="16" fill="#ff5722" />
                    <path d="M 225,332 L 228,332 L 228,342 L 225,342" strokeWidth="3" fill="#ffffff" />
                    
                    {/* Neck */}
                    <path d="M 180,265 C 190,263 210,267 220,265" strokeWidth="5" />
                    <path d="M 175,277 C 190,275 210,279 225,277" strokeWidth="5" />
                    
                    {/* Ears */}
                    <path d="M 115,160 L 95,165 L 95,185 L 115,190 Z" strokeWidth="4" fill="#ffffff" />
                    <path d="M 285,160 L 305,165 L 305,185 L 285,190 Z" strokeWidth="4" fill="#ffffff" />

                    {/* Head */}
                    <path d="M 115,105 C 150,98 250,98 285,105 C 292,138 290,202 285,235 C 250,242 150,242 115,235 C 110,202 108,138 115,105 Z" strokeWidth="4.5" fill="#ffffff" />

                    {/* Faceplate (centered) */}
                    <g>
                      <path d="M 140,128 C 170,123 230,123 260,128 C 267,148 267,192 260,212 C 230,217 170,217 140,212 C 133,192 133,148 140,128 Z" strokeWidth="4" fill="#faf9f6" />
                      <ellipse cx="178" cy="164" rx="13" ry="13" fill="#ff5722" strokeWidth="3.5" />
                      <ellipse cx="180" cy="162" rx="3.5" ry="3.5" fill="#ffffff" />
                      <ellipse cx="222" cy="164" rx="13" ry="13" fill="#ff5722" strokeWidth="3.5" />
                      <ellipse cx="224" cy="162" rx="3.5" ry="3.5" fill="#ffffff" />
                      <path d="M 185,190 Q 200,205 215,190" strokeWidth="3.5" fill="none" />
                    </g>

                    {/* Antenna */}
                    <path d="M 190,101 Q 200,92 210,101" strokeWidth="4" />
                    <line x1="200" y1="96" x2="200" y2="52" strokeWidth="4.5" />
                    <circle cx="200" cy="40" r="10" fill="#ff5722" strokeWidth="4" />
                  </svg>
                </div>
              </div>

              {/* Right Column (Removed - Details moved to Left Column) */}

            </div>
          </main>

          {/* Scroll Instruction Overlay */}
          <motion.div 
            style={{ opacity: promptOpacity, y: promptY }} 
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
          >
            <span className="text-[10px] tracking-[0.25em] text-[#0c0d0e]/50 font-bold uppercase animate-pulse">
              Scroll to explore platform
            </span>
            <svg className="w-4 h-4 animate-bounce text-[#ff5722]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7"></path>
            </svg>
          </motion.div>

          {/* Styled Footer for HUD spacing */}
          <footer className="relative z-10 w-full h-[65px] flex items-center justify-between px-6 md:px-16 pointer-events-none">
            <div className="text-[10px] tracking-[0.22em] text-[#0c0d0e]/45 font-display font-bold uppercase hidden md:block">
              SECURE SELECTION ENGINE // v1.0.0
            </div>
            <div className="text-[10px] tracking-[0.22em] text-[#0c0d0e]/45 font-display font-bold uppercase">
              © {new Date().getFullYear()} COUNSELAI
            </div>
          </footer>
        </div>
      </section>

      {/* 2. FEATURES SECTION (Styled as a 3D flying page card with an unclipped cat) */}
      <div className="relative mx-4 md:mx-16 my-36 z-20">
        
        {/* Doodle Cat Sitting on Top of Border */}
        <div className="absolute top-0 left-[10%] md:left-[15%] -translate-y-[98%] z-30 pointer-events-none w-[110px] h-[100px] select-none">
          <svg viewBox="0 0 100 90" className="w-full h-full fill-none stroke-black stroke-[3.2] overflow-visible">
            {/* Angry cat tail (wiggles aggressively) */}
            <path d="M 70,54 L 74,48 L 76,51 L 80,45 L 83,48 L 88,40 L 91,44 L 95,35 L 92,41 L 88,45 L 84,50 L 80,53 L 70,58 Z" fill="#ffffff" className="animate-[tail-rage_0.5s_ease-in-out_infinite]" style={{ transformOrigin: "70px 54px" }} />
            
            {/* Standing legs behind the body fill (for depth) */}
            <path d="M 40,62 L 40,82" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 69,67 L 69,82" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 38,82 Q 40,85 42,82" />
            <path d="M 67,82 Q 69,85 71,82" />

            {/* Angry cat standing body (profile with high-arched spiky back and arched belly) */}
            <path d="M 36,65 C 34,58 32,52 32,48 L 36,43 L 38,45 L 42,39 L 45,42 L 50,37 L 53,40 L 58,39 L 61,44 L 66,44 L 70,52 C 72,58 72,68 70,72 C 60,60 46,60 36,65 Z" fill="#ffffff" />
            
            {/* Standing legs in front of body fill */}
            <path d="M 35,63 L 35,82" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 65,65 L 65,82" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 33,82 Q 35,85 37,82" />
            <path d="M 63,82 Q 65,85 67,82" />

            {/* Cat head (front-facing, tilts/vibrates, angry expression) */}
            <g className="animate-[head-rage_0.4s_ease-in-out_infinite]" style={{ transformOrigin: "33px 48px" }}>
              {/* Head shape */}
              <ellipse cx="33" cy="35" rx="20" ry="15" fill="#ffffff" />
              
              {/* Ears (pointing up/outwards, clearly cat ears) */}
              {/* Left ear */}
              <polygon points="19,25 12,9 27,21" fill="#ffffff" />
              <polygon points="17,22 14,13 23,19" fill="#ffccd5" strokeWidth="1.5" />
              
              {/* Right ear */}
              <polygon points="55,25 62,9 47,21" fill="#ffffff" />
              <polygon points="53,22 59,13 49,19" fill="#ffccd5" strokeWidth="1.5" />
              
              {/* Angry slanted eyes with eyebrows */}
              {/* Left eye & brow */}
              <path d="M 22,29 L 28,33" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M 20,25 L 29,29" strokeWidth="1.8" />
              
              {/* Right eye & brow */}
              <path d="M 44,29 L 38,33" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M 46,25 L 37,29" strokeWidth="1.8" />
              
              {/* Nose */}
              <polygon points="33,37 31,35 35,35" fill="black" strokeWidth="0" />
              
              {/* Mouth (vibrating open hissing/screaming) */}
              <g className="animate-[mouth-rage_0.3s_linear_infinite]" style={{ transformOrigin: "33px 42px" }}>
                <ellipse cx="33" cy="42" rx="7" ry="5" fill="#000000" strokeWidth="0" />
                <path d="M 29,43 Q 33,47 37,43 Z" fill="#ff8a9a" strokeWidth="0" />
              </g>
              
              {/* Whiskers (extending outwards) */}
              {/* Left side */}
              <line x1="16" y1="36" x2="3" y2="34" strokeWidth="1.5" />
              <line x1="16" y1="39" x2="4" y2="40" strokeWidth="1.5" />
              {/* Right side */}
              <line x1="50" y1="36" x2="63" y2="34" strokeWidth="1.5" />
              <line x1="50" y1="39" x2="62" y2="40" strokeWidth="1.5" />
            </g>

            {/* Shaking Dialogue bubble (increased size with uppercase doodle WAHH!!! text) */}
            <g className="animate-[wahh-bubble-rage_5s_ease-in-out_infinite]" style={{ transformOrigin: "29px 32px" }}>
              {/* Big bubble shape pointing to mouth */}
              <path d="M -5,20 L 14,20 L 29,32 L 20,20 L 22,20 C 26,20 26,-12 22,-12 L -5,-12 C -9,-12 -9,20 -5,20 Z" fill="#ffffff" strokeWidth="2.5" />
              {/* Bold doodle text "WAHH!!!" */}
              <text x="8.5" y="4" textAnchor="middle" className="font-display font-black text-[15px] uppercase tracking-wider fill-black stroke-none select-none">
                WAHH!!!
              </text>
            </g>
          </svg>
        </div>

        <motion.section 
          id="features" 
          variants={pageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-180px" }}
          className="relative w-full bg-white border-3 border-black py-36 px-8 md:px-20 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] doodle-border-lg"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] bg-[size:35px_35px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-start mb-20">
              <span className="text-[10px] tracking-[0.3em] font-black text-[#ff5722] uppercase">PLATFORM FEATURES</span>
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mt-3 tracking-wider text-[#0c0d0e]">
                AI-Powered Counseling Suite
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { title: "College Predictor", desc: "Predict JEE Main, Advanced, and CUET admission chances at NITs, IIITs, GFTIs and state colleges.", icon: "predictor" },
                { title: "AI Counselor Chat", desc: "Get 24/7 personalized answers regarding branch choices, seat upgrades, and JoSAA timelines.", icon: "chat" },
                { title: "Choice Filling Optimizer", desc: "Generate mathematically optimized preference orders to maximize your round-by-round allocation probability.", icon: "optimizer" },
                { title: "Admission Probability Engine", desc: "Visualize historical cutoff variations across categories, quotas, genders, and rounds in interactive dashboards.", icon: "probability" },
                { title: "Scholarship Finder", desc: "Input your economic background and rank profiles to identify matched governmental and private scholarships.", icon: "scholarship" },
                { title: "College Comparison Tool", desc: "Compare placements, average packages, fee systems, hostels, and locations side-by-side.", icon: "comparison" }
              ].map((feat, i) => {
                const cardVariants = {
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.6, delay: i * 0.06 } 
                  },
                  hovered: { 
                    y: -6,
                    transition: { duration: 0.25, ease: "easeOut" as const }
                  }
                };

                const borderVariants = {
                  hidden: { strokeDashoffset: 370, opacity: 0 },
                  visible: { strokeDashoffset: 370, opacity: 0 },
                  hovered: { 
                    strokeDashoffset: 0, 
                    opacity: 1, 
                    transition: { duration: 0.6, ease: "easeInOut" as const } 
                  }
                };

                return (
                  <motion.div 
                    key={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hovered"
                    viewport={{ once: true }}
                    className="bg-[#faf9f6] p-8 transition-shadow duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between border-2 border-black doodle-border-sm cursor-default"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-xl bg-black/5 flex items-center justify-center mb-6 doodle-border-sm relative overflow-visible">
                        <DoodleIcon type={feat.icon} />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#0c0d0e] mb-3">{feat.title}</h3>
                      <p className="font-sans text-[13.5px] text-black/85 leading-relaxed font-bold">{feat.desc}</p>
                    </div>
                    <div className="relative mt-8 w-[145px] h-[36px] flex items-center justify-center">
                      <span className="font-display font-black text-[10px] tracking-[0.18em] text-[#ff5722] uppercase select-none">
                        Explore Feature →
                      </span>
                      <svg viewBox="0 0 145 36" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                        <motion.path 
                          d="M 6,3 C 45,2 95,4 139,3 C 143,6 142,18 141,33 C 98,34 48,32 5,33 C 3,25 4,12 6,3 Z" 
                          stroke="#ff5722" 
                          strokeWidth="2" 
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray="370"
                          variants={borderVariants}
                        />
                      </svg>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
      </div>

      {/* 3. MULTI-AGENT AI SECTION (Styled as a 3D flying page card) */}
      <motion.section 
        id="workflow" 
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-180px" }}
        className="relative mx-4 md:mx-16 my-36 bg-[#fbfbfc] border-3 border-black py-36 px-8 md:px-20 z-20 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] doodle-border-lg"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] bg-[size:35px_35px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] font-black text-[#ff5722] uppercase">MULTI-AGENT COORDINATION</span>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mt-3 tracking-wider text-[#0c0d0e]">
              Distributed Counseling Intelligence
            </h2>
            <p className="font-sans text-xs text-black/50 tracking-wider max-w-lg mt-4 uppercase font-bold">
              Seven specialized AI agents coordinate in a synchronized pipeline to structure your complete admission strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative mt-12">
            
            {/* Left Column: Winding Snake Pipeline Map */}
            <div className="lg:col-span-6 flex flex-col items-center w-full">
              <span className="text-[9px] font-mono tracking-widest uppercase text-black/50 mb-6 font-bold flex items-center gap-1.5 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722] animate-ping"></span>
                Interactive Coordination Map // SPEED_FAST
              </span>
              
              {/* Desktop Winding Pipeline Canvas */}
              <div className="hidden sm:block relative w-full aspect-[1.3] bg-white border-3 border-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] doodle-border-md select-none overflow-hidden bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:16px_16px]">
                {/* Winding Connecting Pipeline SVGs */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100">
                  {/* Winding Arrow Base (dotted) */}
                  <path 
                    d="M 12,22 Q 27,16 42,19 Q 57,26 74,23 Q 86,34 81,54 Q 65,56 49,50 Q 33,44 17,48 Q 11,68 25,80" 
                    fill="none" 
                    stroke="black" 
                    strokeWidth="2.5" 
                    strokeDasharray="6,6" 
                    strokeLinecap="round" 
                  />
                  {/* Glowing Flow Arrow (Fast Marching Ants) */}
                  <path 
                    d="M 12,22 Q 27,16 42,19 Q 57,26 74,23 Q 86,34 81,54 Q 65,56 49,50 Q 33,44 17,48 Q 11,68 25,80" 
                    fill="none" 
                    stroke="#ff5722" 
                    strokeWidth="2.5" 
                    strokeDasharray="10,12" 
                    className="animate-[ants_1.2s_linear_infinite]" 
                    strokeLinecap="round" 
                  />
                </svg>

                {/* Circular Nodes Positioned Absolutely */}
                {[
                  { id: 0, label: "01", name: "Profile Parser", x: "12%", y: "22%" },
                  { id: 1, label: "02", name: "Safety Analyzer", x: "42%", y: "19%" },
                  { id: 2, label: "03", name: "Trend Engine", x: "74%", y: "23%" },
                  { id: 3, label: "04", name: "Fact Collector", x: "81%", y: "54%" },
                  { id: 4, label: "05", name: "List Builder", x: "49%", y: "50%" },
                  { id: 5, label: "06", name: "Risk Evaluator", x: "17%", y: "48%" },
                  { id: 6, label: "07", name: "Final Report", x: "25%", y: "80%" },
                ].map((node) => {
                  const isActive = selectedAgent === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => handleSelectAgent(node.id)}
                      style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
                      className="absolute group z-20 cursor-pointer outline-none focus:outline-none"
                    >
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Active hand-drawn sketch loop */}
                        {isActive && (
                          <svg className="absolute inset-[-6px] w-[calc(100%+12px)] h-[calc(100%+12px)] text-[#ff5722] pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.path 
                              d="M 50,6 C 25,6 6,25 6,50 C 6,75 25,94 50,94 C 75,94 94,75 94,50 C 94,25 75,6 50,6 Z" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="5" 
                              strokeLinecap="round" 
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                          </svg>
                        )}
                        {/* Node body */}
                        <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-display font-black text-xs relative z-10 transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isActive ? 'bg-[#ff5722] text-[#fbfbfc] scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:bg-black/5'}`}>
                          {node.label}
                        </div>
                      </div>
                      
                      {/* Hover Label */}
                      <span className={`absolute top-[115%] left-1/2 -translate-x-1/2 font-mono text-[7px] font-black tracking-widest uppercase bg-black text-white px-2 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,1)] pointer-events-none whitespace-nowrap transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'}`}>
                        {node.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile horizontal list layout */}
              <div className="flex sm:hidden flex-wrap justify-center gap-3 w-full">
                {[
                  { id: 0, label: "01", name: "Parser" },
                  { id: 1, label: "02", name: "Analyzer" },
                  { id: 2, label: "03", name: "Trend" },
                  { id: 3, label: "04", name: "Collector" },
                  { id: 4, label: "05", name: "Builder" },
                  { id: 5, label: "06", name: "Evaluator" },
                  { id: 6, label: "07", name: "Report" },
                ].map((node) => {
                  const isActive = selectedAgent === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => handleSelectAgent(node.id)}
                      className={`px-3 py-2 border-2 border-black font-display font-black text-[10px] tracking-widest uppercase transition-all duration-200 cursor-pointer rounded-xl ${isActive ? 'bg-[#ff5722] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'}`}
                    >
                      {node.label} · {node.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Reimagined Agent Log & Visual Workspace */}
            <div className="lg:col-span-6 flex flex-col w-full">
              {/* Tab Header */}
              <div className="flex items-center gap-2 bg-black text-white px-4 py-2 font-mono text-[9px] uppercase tracking-widest border-2 border-b-0 border-black rounded-t-xl z-10 w-fit select-none shadow-[2px_0px_0px_0px_rgba(0,0,0,1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping"></span>
                <span>{agentsList[selectedAgent].agent} // BLUEPRINT_DESK</span>
              </div>
              
              {/* Stacked Workspace & Terminal Content */}
              <div className="border-3 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-b-2xl rounded-tr-2xl relative z-10 min-h-[415px] flex flex-col justify-between doodle-border-md">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display font-black text-lg text-black leading-none">
                      {agentsList[selectedAgent].name}
                    </h3>
                    <span className="font-mono text-[8.5px] font-black uppercase text-[#ff5722] bg-orange-50 border border-[#ff5722] px-2 py-0.5 rounded-md select-none">
                      Agent 0{selectedAgent + 1}
                    </span>
                  </div>
                  
                  <p className="font-sans text-xs text-black/60 leading-relaxed mb-5">
                    {agentsList[selectedAgent].role}
                  </p>

                  {/* VISUAL BLUEPRINT WORKSPACE */}
                  {/* VISUAL BLUEPRINT WORKSPACE */}
                  <div className="mb-6">
                    <span className="font-display font-black text-[8.5px] uppercase tracking-widest text-black/40 block mb-2">
                      LIVE DRAFT WORKSPACE //
                    </span>
                    {selectedAgent === 0 && (
                      <div className="border-2 border-black bg-orange-50/30 p-4 rounded-xl font-mono text-[10px] flex flex-col gap-3 relative shadow-inner overflow-hidden">
                        {/* Folder Tab Header */}
                        <div className="absolute top-0 right-0 bg-[#0c0d0e] text-[#faf9f6] text-[8px] font-display font-bold px-3 py-1 rounded-bl-xl border-l-2 border-b-2 border-black">
                          DOCUMENT_SCAN_001
                        </div>
                        
                        <div className="flex gap-4 items-center">
                          {/* Student Avatar Silhouette Doodle */}
                          <div className="w-12 h-12 bg-white border-2 border-black rounded-lg flex items-center justify-center relative overflow-hidden">
                            <svg className="w-8 h-8 text-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#ff5722]"></div>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-display font-black text-sm text-[#0c0d0e] leading-none mb-1">AARAV SHARMA</span>
                            <span className="text-[8px] text-black/50 font-bold uppercase tracking-wider">JEE SCORECARD PARSED</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t-2 border-dashed border-black/15 pt-3 text-black/85">
                          <div className="flex flex-col">
                            <span className="text-[7.5px] text-black/40 font-bold">STATE OF ELIGIBILITY</span>
                            <span className="font-bold text-[10.5px]">TAMIL NADU <span className="text-green-600 text-[8px]">✓ HS_QUOTA</span></span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7.5px] text-black/40 font-bold">CATEGORY STATUS</span>
                            <span className="font-bold text-[10.5px]">OBC-NCL <span className="text-black/40 line-through text-[8.5px]">GEN</span></span>
                          </div>
                          <div className="flex flex-col relative">
                            <span className="text-[7.5px] text-black/40 font-bold">COMMON RANK (CRL)</span>
                            <span className="font-black text-[12px] text-[#ff5722] underline tracking-tight">6,240</span>
                            {/* Red circle marker */}
                            <svg className="absolute top-[8px] left-[55px] w-14 h-6 text-red-500/80 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <path d="M 5,30 C 50,5 98,15 95,50 C 90,85 40,95 15,75 C 2,55 0,35 12,20" fill="none" stroke="currentColor" strokeWidth="8" />
                            </svg>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7.5px] text-black/40 font-bold">CATEGORY RANK</span>
                            <span className="font-bold text-[10.5px] text-black">1,142</span>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 border border-green-500/50 rounded-lg p-1.5 flex items-center justify-between text-green-800 text-[8.5px] font-bold">
                          <span>DATA STRUCT MATCHED: NTA SERVER</span>
                          <span className="px-1.5 py-0.5 bg-green-500 text-white rounded text-[7px] font-black tracking-widest animate-pulse">100% OK</span>
                        </div>
                      </div>
                    )}
                    {selectedAgent === 1 && (
                      <div className="border-2 border-black bg-white p-4 rounded-xl min-h-[90px] flex flex-col justify-between shadow-inner relative overflow-hidden font-mono text-[9px]">
                        <div className="flex justify-between items-center text-[7.5px] font-mono text-black/50 font-bold pb-2 border-b border-black/15 mb-2">
                          <span>RANK SEGMENTATION (CRL: 6,240)</span>
                          <span className="text-purple-600 font-bold">3 REGIONS BOUNDED</span>
                        </div>
                        
                        {/* Horizontal segment thermometer/gauge bar */}
                        <div className="relative w-full h-8 bg-black/5 border-2 border-black rounded-lg flex items-stretch overflow-hidden mb-3">
                          <div className="w-[30%] bg-purple-100 flex items-center justify-center text-purple-700 font-display font-black text-[8px] border-r border-black/30">DREAM</div>
                          <div className="w-[40%] bg-blue-100 flex items-center justify-center text-blue-700 font-display font-black text-[8px] border-r border-black/30">MODERATE</div>
                          <div className="w-[30%] bg-green-100 flex items-center justify-center text-green-700 font-display font-black text-[8px]">SAFE</div>
                          
                          {/* Rank Marker (placed at 6,240 relative value) */}
                          <div className="absolute left-[72%] top-0 bottom-0 w-1 bg-red-600 z-10 flex flex-col items-center">
                            <div className="absolute top-[-5px] w-2.5 h-2.5 rounded-full bg-red-600 border border-black shadow"></div>
                            {/* Sketchy pointer flag */}
                            <div className="absolute bottom-[-16px] bg-red-600 text-white text-[7px] px-1 py-0.5 rounded font-black whitespace-nowrap border border-black">MY CRL</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-1">
                          <div className="bg-purple-50/50 border border-purple-300 text-purple-700 p-1.5 rounded-lg text-center flex flex-col justify-between min-h-[45px]">
                            <span className="text-[7px] font-bold">DREAM BOUND</span>
                            <span className="text-[9.5px] font-black leading-tight">IIT M (EE)</span>
                          </div>
                          <div className="bg-blue-50/50 border border-blue-300 text-blue-700 p-1.5 rounded-lg text-center flex flex-col justify-between min-h-[45px]">
                            <span className="text-[7px] font-bold">MODERATE BOUND</span>
                            <span className="text-[9.5px] font-black leading-tight">NIT K (CSE)</span>
                          </div>
                          <div className="bg-green-50/50 border border-green-300 text-green-700 p-1.5 rounded-lg text-center flex flex-col justify-between min-h-[45px] relative">
                            <span className="text-[7px] font-bold">SAFE BOUND</span>
                            <span className="text-[9.5px] font-black leading-tight">NIT T (ECE)</span>
                            <span className="absolute top-[-4px] right-[-2px] bg-[#ff5722] w-2.5 h-2.5 rounded-full flex items-center justify-center border border-black text-white text-[5px] font-black font-sans">✓</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedAgent === 2 && (
                      <div className="border-2 border-black bg-white p-4 rounded-xl min-h-[90px] flex flex-col justify-between shadow-inner relative overflow-hidden font-mono text-[9px]">
                        <div className="flex justify-between items-center text-[7.5px] font-mono text-black/50 font-bold border-b border-black/15 pb-1 mb-2">
                          <span>ROUND MOVEMENT / PROBABILITY SCENARIO</span>
                          <span className="text-orange-600 font-bold">✓ MONTE CARLO</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {/* Circular SVG Gauge for 98.4% success */}
                          <div className="w-16 h-16 flex-shrink-0 relative flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="16" className="fill-none stroke-black/5 stroke-[3]" />
                              <motion.circle 
                                cx="18" 
                                cy="18" 
                                r="16" 
                                className="fill-none stroke-[#ff5722] stroke-[3]" 
                                strokeDasharray="100 100" 
                                initial={{ strokeDashoffset: 100 }}
                                animate={{ strokeDashoffset: 1.6 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                              />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                              <span className="font-display font-black text-[11px] leading-none text-black">98.4%</span>
                              <span className="text-[5px] text-black/50 font-bold">PROBABILITY</span>
                            </div>
                          </div>

                          <div className="flex-grow flex flex-col gap-1.5">
                            <div className="text-[10px] font-bold text-black flex items-center gap-1.5 leading-none">
                              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                              <span>Target: NIT Trichy (ECE)</span>
                            </div>
                            <p className="text-[8.5px] text-black/60 leading-relaxed font-sans font-bold uppercase">
                              Cutoff threshold shifts outwards in Round 3 due to higher withdrawal rates in state quotas.
                            </p>
                          </div>
                        </div>

                        {/* Miniature Sparkline Graph */}
                        <div className="mt-3 border-t border-dashed border-black/15 pt-2 flex items-center justify-between">
                          <span className="text-[7.5px] text-black/40 font-bold">CONFIDENCE INTERVAL:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded text-orange-600 font-black">95% SIGMA</span>
                            <span className="text-[8px] bg-green-50 border border-green-200 px-1.5 py-0.5 rounded text-green-600 font-black">SAFE ROUND 3</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedAgent === 3 && (
                      <div className="border-2 border-black bg-white p-4 rounded-xl min-h-[90px] flex flex-col justify-between shadow-inner relative overflow-hidden font-mono text-[9px]">
                        <div className="flex justify-between items-center text-[7.5px] font-mono text-black/50 font-bold pb-2 border-b border-black/15 mb-3">
                          <span>COLLEGE FACTOR METRICS COMPARISON</span>
                          <span className="text-cyan-600">✓ CERTIFIED DATA</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { name: "NIT TRICHY (ECE)", fee: "₹1.15L", pack: "22.8 LPA", rating: "9.4/10", barH: "h-[36px]", barColor: "bg-[#ff5722]" },
                            { name: "NIT SURATHKAL (CSE)", fee: "₹1.25L", pack: "20.6 LPA", rating: "9.1/10", barH: "h-[30px]", barColor: "bg-[#0c0d0e]" }
                          ].map((col, idx) => (
                            <div key={idx} className="border-2 border-black bg-cyan-50/10 p-2.5 rounded-xl flex flex-col gap-2 shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] relative overflow-visible">
                              <div className="font-display font-black text-[9px] text-[#0c0d0e] border-b border-black/10 pb-1 flex justify-between items-center leading-none">
                                <span>{col.name}</span>
                              </div>
                              <div className="flex gap-2 items-end">
                                {/* Scribble Column Bar */}
                                <div className="w-4 bg-black/5 border border-black rounded-t flex items-end h-[42px] overflow-hidden">
                                  <motion.div 
                                    className={`w-full ${col.barColor} rounded-t`}
                                    initial={{ height: 0 }}
                                    animate={{ height: col.barH === "h-[36px]" ? "36px" : "30px" }}
                                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                                  />
                                </div>
                                <div className="flex flex-col text-[7.5px] text-black/70 leading-normal font-bold">
                                  <div>AVG: <span className="font-black text-[#0c0d0e]">{col.pack}</span></div>
                                  <div>FEE: <span className="font-black text-[#0c0d0e]">{col.fee}/sem</span></div>
                                  <div>SCORE: <span className="font-black text-[#0c0d0e]">{col.rating}</span></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedAgent === 4 && (
                      <div className="border-2 border-black bg-white p-4 rounded-xl min-h-[90px] flex flex-col justify-between shadow-inner relative overflow-hidden font-mono text-[9.5px]">
                        <div className="flex justify-between items-center text-[7.5px] font-mono text-black/50 font-bold pb-2 border-b border-black/15 mb-3">
                          <span>PRIORITY OPTIMIZER WORKSPACE</span>
                          <span className="text-[#ff5722] font-black">LOCKED FOR SUBMISSION</span>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          {[
                            { priority: "01", college: "NIT SURATHKAL // CSE", status: "DREAM_MATCH", rank: "UPWARDS", color: "bg-purple-50/60 border-purple-200" },
                            { priority: "02", college: "NIT TRICHY // ECE", status: "MODERATE_MATCH", rank: "TARGET", color: "bg-blue-50/60 border-blue-200" },
                            { priority: "03", college: "MNNIT ALLAHABAD // CSE", status: "SAFE_MATCH", rank: "FALLBACK", color: "bg-green-50/60 border-green-200" }
                          ].map((item, idx) => (
                            <div key={idx} className={`border border-black p-2 rounded-lg flex items-center justify-between ${item.color} shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] relative`}>
                              <div className="flex items-center gap-2">
                                {/* Drag Handles */}
                                <div className="flex flex-col gap-0.5 opacity-40 cursor-grab">
                                  <span className="w-2 h-0.5 bg-black"></span>
                                  <span className="w-2 h-0.5 bg-black"></span>
                                  <span className="w-2 h-0.5 bg-black"></span>
                                </div>
                                <span className="font-display font-black text-[11.5px] text-[#ff5722]">{item.priority}</span>
                                <div className="flex flex-col">
                                  <span className="font-bold text-[9px] text-[#0c0d0e] leading-none mb-0.5">{item.college}</span>
                                  <span className="text-[6.5px] text-black/40 font-bold uppercase">{item.status} · {item.rank}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {/* Lock Padlock Icon */}
                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2c-2.76 0-5 2.24-5 5v3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2v-3c0-2.76-2.24-5-5-5zm-3 5c0-1.66 1.34-3 3-3s3 1.34 3 3v3H9V7zm3 9c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1z"/>
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedAgent === 5 && (
                      <div className="border-2 border-black bg-white p-4 rounded-xl min-h-[90px] flex flex-col justify-between shadow-inner relative overflow-hidden font-mono text-[9px]">
                        <div className="flex justify-between items-center text-[7.5px] font-mono text-black/50 font-bold pb-2 border-b border-black/15 mb-3">
                          <span>ROUND-BY-ROUND ALGORITHM PATHWAY</span>
                          <span className="text-red-600 font-bold">✓ DYNAMIC PATHWAY</span>
                        </div>
                        
                        {/* Flowchart Game Tree */}
                        <div className="flex items-center justify-between gap-1 relative py-1">
                          
                          {/* Round 1 node */}
                          <div className="border-2 border-black bg-orange-50/50 p-1.5 rounded-lg text-center flex-1 relative flex flex-col justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-[6px] text-black/40 font-bold uppercase">ROUND 1</span>
                            <span className="text-[9px] font-black text-[#ff5722] leading-none mt-0.5">[FLOAT]</span>
                          </div>

                          {/* Arrow */}
                          <svg className="w-3 h-3 text-black/40 flex-shrink-0" fill="none" viewBox="0 0 24 10" stroke="currentColor" strokeWidth="2.5">
                            <path d="M 0,5 L 24,5 M 18,1 L 24,5 L 18,9" />
                          </svg>

                          {/* Round 2 node */}
                          <div className="border-2 border-black bg-orange-50/50 p-1.5 rounded-lg text-center flex-1 relative flex flex-col justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-[6px] text-black/40 font-bold uppercase">ROUND 2</span>
                            <span className="text-[9px] font-black text-[#ff5722] leading-none mt-0.5">[FLOAT]</span>
                          </div>

                          {/* Arrow */}
                          <svg className="w-3 h-3 text-black/40 flex-shrink-0" fill="none" viewBox="0 0 24 10" stroke="currentColor" strokeWidth="2.5">
                            <path d="M 0,5 L 24,5 M 18,1 L 24,5 L 18,9" />
                          </svg>

                          {/* Round 3 node */}
                          <div className="border-2 border-black bg-green-50/60 p-1.5 rounded-lg text-center flex-1 relative flex flex-col justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-[6px] text-black/40 font-bold uppercase">ROUND 3</span>
                            <span className="text-[9.5px] font-black text-green-700 leading-none mt-0.5">[FREEZE]</span>
                            <span className="absolute -top-1.5 -right-1 w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                          </div>
                        </div>

                        {/* Scenario Notes */}
                        <div className="mt-3 border-t border-dashed border-black/15 pt-2 flex items-center justify-between font-sans font-bold text-[8px] text-black/60 uppercase">
                          <span>FALLBACK: CSAB SPECIAL ROUNDS</span>
                          <span className="text-[#ff5722]">RECOVERY PATHWAY READY</span>
                        </div>
                      </div>
                    )}
                    {selectedAgent === 6 && (
                      <div className="border-2 border-black bg-white p-4 rounded-xl min-h-[90px] flex items-center justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden font-mono text-[9px] bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:10px_10px]">
                        <div className="flex flex-col gap-1.5 text-black/85">
                          <div className="font-display font-black text-[12.5px] text-[#0c0d0e] flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>joSAA_strategy_2026.pdf</span>
                          </div>
                          <div className="text-[8.5px] text-black/50 font-bold uppercase font-mono">SIZE: 1.4 MB // SECURE SHA-256 SIGNED</div>
                          <div className="flex items-center gap-2 border-t border-dashed border-black/15 pt-2 mt-1">
                            {/* Signature Scribble */}
                            <div className="flex flex-col">
                              <span className="text-[6px] text-black/40 font-bold uppercase">COUNSELOR SIGNATURE</span>
                              <span className="font-display font-bold text-[9.5px] italic text-[#ff5722] tracking-wider relative">
                                CounselAI_Sys
                                <svg className="absolute bottom-[-2px] left-0 w-full h-1 text-[#ff5722]/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                  <path d="M 0,5 Q 50,0 100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Approved Round Stamp */}
                        <div className="relative rotate-[12deg] w-20 h-20 border-3 border-green-600 rounded-full flex flex-col items-center justify-center text-green-600 font-display font-black text-[8.5px] uppercase tracking-widest bg-white/95 shadow-md flex-shrink-0">
                          <span>COUNSEL</span>
                          <span className="text-[6px] font-sans font-bold text-black/60 mt-0.5">APPROVED</span>
                          <svg className="absolute inset-0 w-full h-full text-green-600/30" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Compact Terminal Output */}
                  <span className="font-display font-black text-[8.5px] uppercase tracking-widest text-black/40 block mb-2">
                    TERMINAL EXECUTION LOGGER //
                  </span>
                  <div 
                    key={selectedAgent} /* Reset animation on change */
                    className="bg-black text-[#5ef77c] font-mono text-[9.5px] p-3 rounded-xl shadow-inner border-2 border-black min-h-[105px] flex flex-col gap-1 overflow-hidden select-none"
                  >
                    {agentsList[selectedAgent].logs.map((log, lIdx) => (
                      <div 
                        key={lIdx} 
                        className="opacity-0 animate-[terminal-print_0.4s_forwards]"
                        style={{ animationDelay: `${lIdx * 0.4}s` }}
                      >
                        {log}
                      </div>
                    ))}
                    <div 
                      className="opacity-0 animate-[terminal-print_0.1s_forwards] text-white/50"
                      style={{ animationDelay: `${agentsList[selectedAgent].logs.length * 0.4}s` }}
                    >
                      awaiting input...<span className="inline-block w-1.5 h-3 bg-[#5ef77c] ml-1.5 align-middle animate-[blink_1s_step-start_infinite]"></span>
                    </div>
                  </div>
                </div>

                {/* Core capabilities */}
                <div className="mt-4 border-t border-dashed border-black/20 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                    {agentsList[selectedAgent].checklist.slice(0, 2).map((item, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2 text-[10px] font-sans font-bold text-black/75">
                        <svg className="w-3.5 h-3.5 text-[#ff5722] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
                          <path d="M4,12 Q9,15 20,4 M9,15 Q12,18 20,4" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 4. STATISTICS SECTION (Notebook sheet layout with Doodle Race Car) */}
      <motion.section 
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-180px" }}
        className="relative mx-4 md:mx-16 my-36 py-24 px-4 md:px-16 bg-white border-3 border-black text-[#0c0d0e] rounded-[32px] z-20 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] doodle-border-lg"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] bg-[size:35px_35px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Title - Larger and Bold */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-[12px] tracking-[0.35em] font-black text-[#ff5722] uppercase">
              PLATFORM PERFORMANCE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-wider text-[#0c0d0e] mt-3 uppercase leading-none">
              CounselAI in Numbers
            </h2>
          </div>

          {/* Horizontally Scrollable Road Track Canvas */}
          <div className="w-full overflow-x-auto scrollbar-thin select-none py-6">
            
            {/* Viewport Animation Trigger Container (Runs once on scroll view) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full min-w-[800px] h-[300px] overflow-hidden bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:12px_12px] border-2 border-black/5 rounded-2xl p-4"
            >
              {/* Road Track Line */}
              <div className="absolute left-0 right-0 h-1 border-t-2 border-dashed border-black/20 bottom-[55px]"></div>
              
              {/* Doodle Race Car (No smoke trail emitting from exhaust) */}
              <motion.div
                variants={carVariants}
                className="absolute bottom-[48px] z-30"
              >
                {/* Shake container */}
                <motion.div
                  animate={{ y: [0, -1.5, 0] }}
                  transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 140 50" className="w-[140px] h-[50px] fill-none stroke-black stroke-[2.5] overflow-visible">
                    {/* F1 Rear Wing / Spoiler */}
                    <path d="M 8,10 L 28,10 L 25,17 L 11,17 Z" fill="white" stroke="black" strokeWidth="2.5" />
                    <line x1="14" y1="17" x2="14" y2="30" stroke="black" strokeWidth="2.5" />
                    <line x1="22" y1="17" x2="22" y2="30" stroke="black" strokeWidth="2.5" />

                    {/* F1 Airbox / Roll Hoop intake above driver */}
                    <path d="M 52,14 Q 57,6 63,14 Z" fill="white" stroke="black" strokeWidth="2.2" />

                    {/* Driver Helmet */}
                    <circle cx="68" cy="15" r="5" fill="#ff5722" stroke="black" strokeWidth="2.2" />
                    {/* Visor scribble */}
                    <path d="M 70,14 C 72,14 73,16 71,17" stroke="black" strokeWidth="1.5" />

                    {/* F1 Main Chassis & Nose Cone */}
                    <path d="M 22,30 L 12,30 C 9,30 8,27 10,25 L 15,20 C 18,17 22,16 26,16 L 48,16 C 52,16 55,20 58,20 L 78,20 C 81,20 85,25 90,26 L 118,26 Q 124,27 128,32 L 132,32 C 134,32 135,33 134,35 C 133,36 130,36 126,36 L 22,36" fill="white" stroke="black" strokeWidth="2.5" />

                    {/* Front Wing */}
                    <path d="M 124,36 L 137,36 L 136,31 M 137,36 L 137,34" stroke="black" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Sidepod Outline */}
                    <path d="M 45,24 C 45,21 55,21 65,24 C 75,27 85,27 92,26" stroke="black" strokeWidth="2" strokeDasharray="1 1" />
                    
                    {/* Number '07' */}
                    <text x="32" y="27" fontFamily="var(--font-display)" fontSize="9" fontWeight="900" fill="black" stroke="none">07</text>
                    
                    {/* Wheels */}
                    <g style={{ transformOrigin: "35px 33px" }} className="animate-[spin_0.25s_linear_infinite]">
                      <circle cx="35" cy="33" r="10.5" fill="white" stroke="black" strokeWidth="2.5" />
                      <circle cx="35" cy="33" r="3" fill="black" />
                      <line x1="24.5" y1="33" x2="45.5" y2="33" stroke="black" strokeWidth="2" />
                      <line x1="35" y1="22.5" x2="35" y2="43.5" stroke="black" strokeWidth="2" />
                    </g>
                    <g style={{ transformOrigin: "105px 33px" }} className="animate-[spin_0.25s_linear_infinite]">
                      <circle cx="105" cy="33" r="10.5" fill="white" stroke="black" strokeWidth="2.5" />
                      <circle cx="105" cy="33" r="3" fill="black" />
                      <line x1="94.5" y1="33" x2="115.5" y2="33" stroke="black" strokeWidth="2" />
                      <line x1="105" y1="22.5" x2="105" y2="43.5" stroke="black" strokeWidth="2" />
                    </g>
                  </svg>
                </motion.div>
              </motion.div>

              {/* Large Smoke Clouds forming Data */}
              {[
                { val: "150+", label: "Colleges Covered", left: "8%", top: "30px", delay: 0.85 },
                { val: "10Y+", label: "Historical Cutoffs", left: "31%", top: "15px", delay: 1.45 },
                { val: "2.5M+", label: "Predictions Run", left: "55%", top: "30px", delay: 2.15 },
                { val: "45,000+", label: "Students Helped", left: "78%", top: "15px", delay: 2.85 }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={cloudVariants}
                  custom={stat.delay}
                  style={{ left: stat.left, top: stat.top }}
                  className="absolute z-20 w-[180px] h-[120px]"
                >
                  {/* Floating child container */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    className="relative w-full h-full"
                  >
                    {/* Doodle Cloud Path Background - Bold stroke, Larger shape */}
                    <svg viewBox="0 0 120 80" className="absolute inset-0 w-full h-full text-black fill-white stroke-black stroke-[2.6] overflow-visible pointer-events-none drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] z-0">
                      <path 
                        d="M 30,65 C 15,65 5,50 15,35 C 10,20 28,5 48,12 C 60,-2 85,-2 97,12 C 112,5 120,20 115,35 C 120,50 110,65 90,65 C 70,70 50,70 30,65 Z" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>

                    {/* Rising connecting trail puffs */}
                    <div className="absolute top-[92px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-0">
                      <div className="w-7 h-5.5 rounded-full border-2 border-black bg-white shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"></div>
                      <div className="w-5 h-4 rounded-full border-2 border-black bg-white shadow-[1px_1px_0px_rgba(0,0,0,1)]"></div>
                      <div className="w-3 h-3 rounded-full border border-black bg-white"></div>
                    </div>

                    {/* Text content inside cloud - Larger & Bolder */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-3 text-center">
                      <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] filter blur-[0.3px] leading-none">
                        {stat.val}
                      </span>
                      <span className="font-display font-black text-[11px] md:text-[12px] tracking-wider uppercase text-black/75 mt-2 max-w-[150px] leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* 5. DASHBOARD PREVIEW (Whiteboard Sketch Dashboard Showcase) */}
      <motion.section 
        id="dashboard" 
        ref={dashboardRef}
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-180px" }}
        className="relative mx-4 md:mx-16 my-36 bg-white border-3 border-black text-[#0c0d0e] rounded-[32px] py-40 px-8 md:px-20 z-20 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] doodle-border-lg"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] bg-[size:35px_35px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.3em] font-black text-[#ff5722] uppercase">Interactive Preview</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl mt-3 tracking-wider leading-tight text-black">
                Premium Student Dashboard
              </h2>
              <p className="font-sans text-xs text-black/70 leading-relaxed mt-4">
                Verify admission factors, compare recommendations side-by-side, configure choices, and dialog with specialized AI Agents directly inside a unified panel.
              </p>
              
              <div className="flex flex-col gap-4 mt-8">
                {[
                  "Active tracker showing category probability fluctuations",
                  "Automated preference list generation with lock limits",
                  "Detailed fees, average packages, and campus overview sheets"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#ff5722]/10 border border-[#ff5722] flex items-center justify-center text-[10px] text-[#ff5722] font-black">✓</div>
                    <span className="font-sans text-[11.5px] text-black/80 font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Whiteboard Wireframe Mock Dashboard */}
            <div className="lg:col-span-7 bg-[#faf9f6] border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative doodle-border-sm">
              <div className="flex items-center justify-between pb-4 border-b-2 border-dashed border-black/20 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full border border-black bg-red-100"></div>
                  <div className="w-3.5 h-3.5 rounded-full border border-black bg-yellow-100"></div>
                  <div className="w-3.5 h-3.5 rounded-full border border-black bg-emerald-100"></div>
                  <span className="font-mono text-[9px] text-black/50 ml-2">student_panel_v1.0.js</span>
                </div>
                <span className="text-[9px] font-display font-black tracking-widest text-[#ff5722] uppercase">ACTIVE SESSION</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Sub-panel 1: Admission chances */}
                <div className="md:col-span-6 bg-white border-2 border-black rounded-xl p-4.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] doodle-border-sm">
                  <h4 className="font-display font-bold text-[12px] tracking-wider text-black/60 uppercase mb-4">Admissions chances</h4>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="28" className="fill-none stroke-black/5 stroke-[4.5]" />
                        <motion.circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          className="fill-none stroke-[#ff5722] stroke-[4.5]" 
                          strokeDasharray="176" 
                          initial={{ strokeDashoffset: 176 }}
                          animate={isDashboardInView ? { strokeDashoffset: 16 } : {}}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-display text-[12px] font-black">
                        <motion.span>{chancesRounded}</motion.span>%
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold">MNNIT Allahabad</span>
                      <span className="text-[10px] text-black/50 font-bold">IT (Information Technology)</span>
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isDashboardInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.8, duration: 0.3 }}
                        className="text-[9px] text-emerald-600 font-bold mt-1"
                      >
                        Status: Extremely Likely
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* Sub-panel 2: Preferences lists */}
                <div className="md:col-span-6 bg-white border-2 border-black rounded-xl p-4.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] doodle-border-sm">
                  <h4 className="font-display font-bold text-[12px] tracking-wider text-black/60 uppercase mb-3">Choice sequence</h4>
                  <div className="flex flex-col gap-1.5 font-sans text-[10px] text-black/70 font-bold">
                    {[
                      { name: "01. IIT Bombay CSE", tag: "Dream", match: false },
                      { name: "02. IIT Delhi CSE", tag: "Dream", match: false },
                      { name: "03. NIT Surathkal CSE", tag: "Match", match: true }
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isDashboardInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: idx * 0.2 + 0.3, duration: 0.4 }}
                        className="flex justify-between p-1 bg-black/5 rounded"
                      >
                        <span>{item.name}</span>
                        <span className={item.match ? "text-emerald-600" : "text-black/30"}>
                          {item.tag}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Sub-panel 3: Live Agent Dialogue Simulator */}
                <div className="md:col-span-12 bg-white border-2 border-black rounded-xl p-4.5 flex flex-col h-[200px] justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] doodle-border-sm">
                  <div className="flex items-center justify-between pb-2 border-b-2 border-dashed border-black/15 mb-3">
                    <span className="text-[10px] font-display font-black text-[#ff5722] uppercase tracking-wider">AI Counselor Dialogue</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>

                  <div className="flex-grow flex flex-col gap-3.5 overflow-y-auto pr-1">
                    <AnimatePresence mode="popLayout">
                      {chatMessages.slice(0, chatStep + 1).map((msg, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex flex-col max-w-[80%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
                        >
                          <span className="text-[8px] text-black/40 uppercase tracking-widest font-black mb-0.5">
                            {msg.sender === "user" ? "Student" : "CounselAI Agent"}
                          </span>
                          <div className={`rounded-xl p-2.5 text-[11px] leading-relaxed doodle-border-sm ${msg.sender === "user" ? "bg-[#ff5722] text-white rounded-tr-none border-2 border-black" : "bg-black/5 text-black/80 rounded-tl-none border-2 border-black"}`}>
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 6. TESTIMONIALS SECTION (Styled as sticky notes) */}
      <motion.section 
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-180px" }}
        className="relative mx-4 md:mx-16 my-36 bg-white border-3 border-black py-40 px-8 md:px-20 z-20 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] doodle-border-lg"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] bg-[size:35px_35px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-[10px] tracking-[0.3em] font-black text-[#ff5722] uppercase">STUDENT SUCCESS</span>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mt-3 tracking-wider text-[#0c0d0e]">
              Admissions Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { quote: "CounselAI changed my complete JoSAA sequence. Its predicted safe cutoff for NIT Trichy ECE was spot on, and I got allocated in Round 2 easily.", name: "Aarav Sharma", coll: "NIT Trichy - ECE", rank: "CRL 6,240", color: "bg-[#fff9c4] rotate-[-1deg]" },
              { quote: "The CSAB strategy suggestion was incredible. The Counseling Strategy agent advised me to float instead of slide, which got me CSE in MNNIT Round 1.", name: "Neha Patel", coll: "MNNIT Allahabad - CSE", rank: "CRL 4,120", color: "bg-[#e0f7fa] rotate-[2deg]" },
              { quote: "Matched OPJEMS scholarship cover letter generator saved me hours. The prediction engine gave me 98.4% status at Surathkal, which was accurate.", name: "Rohan Das", coll: "NIT Surathkal - CSE", rank: "CRL 3,890", color: "bg-[#ffecb3] rotate-[-2deg]" }
            ].map((testi, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 doodle-border ${testi.color}`}
              >
                <p className="font-sans text-[12px] italic text-black/85 leading-relaxed mb-8 font-bold">"{testi.quote}"</p>
                <div className="flex items-center gap-4 pt-4 border-t-2 border-dashed border-black/15">
                  <div className="w-9 h-9 rounded-full border border-black bg-white flex items-center justify-center font-display font-black text-xs text-[#ff5722]">{testi.name[0]}</div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-xs text-[#0c0d0e]">{testi.name}</span>
                    <span className="text-[10px] text-black/60 font-bold">{testi.coll} · <span className="font-display text-[9.5px] font-black text-[#ff5722]">{testi.rank}</span></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 7. FAQ SECTION (Lined Paper styled Accordion) */}
      <motion.section 
        id="faq" 
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-180px" }}
        className="relative mx-4 md:mx-16 my-36 bg-white border-3 border-black py-40 px-8 md:px-20 z-20 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] doodle-border-lg"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] bg-[size:35px_35px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-[10px] tracking-[0.3em] font-black text-[#ff5722] uppercase">FAQ HELPDESK</span>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mt-3 tracking-wider text-[#0c0d0e]">
              Common Queries
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            {[
              { q: "How accurate is the College Predictor?", a: "The CounselAI Prediction engine leverages historical cutoff databases spanning 10 years of JoSAA and CSAB rounds, factoring in standard deviation shifts, category quotas, gender limits, and home state distributions to yield a 98.4% predictive accuracy." },
              { q: "Can it generate choice filling lists for both JoSAA & CSAB?", a: "Yes. The Choice Filling Agent automatically processes your rank scorecard and segments options into safe, moderate, and dream colleges. It outputs a validated preference list compliant with locking limits for both JoSAA rounds and CSAB special counseling." },
              { q: "What documents can the PDF parser extract?", a: "The PDF parser parses NTA JEE Main and Advanced scorecards, extracting parameters such as Common Rank List (CRL), Category Rank (OBC-NCL, SC, ST, EWS), State of Eligibility (Home State Quota), and Gender indicators." },
              { q: "Does the platform support CUET predictions?", a: "Yes, the predictor supports CUET percentile calculations alongside university admissions matches for central colleges, listing matching parameters and core eligibility limits." }
            ].map((faq, i) => (
              <div key={i} className="border-2 border-black rounded-xl overflow-hidden bg-[#faf9f6] shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] doodle-border-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-display font-black text-[14px] sm:text-[15px] text-[#0c0d0e] hover:bg-black/[0.02] transition-colors"
                >
                  <span>{faq.q}</span>
                  <svg 
                    className={`w-4 h-4 text-black/60 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-black/70 leading-relaxed font-sans border-t-2 border-dashed border-black/15 bg-white font-bold">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 8. DETAILED FOOTER (with 3D flying entry) */}
      <motion.footer 
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-180px" }}
        className="relative mx-4 md:mx-16 my-16 py-20 px-8 md:px-20 bg-white border-3 border-black text-black rounded-[32px] z-20 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] doodle-border-lg"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] bg-[size:35px_35px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b-2 border-dashed border-black/20">
            
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
              <span className="font-display font-black text-xl tracking-wider text-black">
                Counsel<span className="text-[#ff5722]">AI</span>
              </span>
              <p className="font-sans text-[10px] text-black/60 leading-relaxed max-w-[200px] uppercase font-bold">
                Next-generation college counseling platform for JEE, JoSAA, CSAB, and CUET aspirants.
              </p>
            </div>

            {/* Links Column 1 */}
            <div className="flex flex-col gap-3">
              <span className="font-display font-bold text-[11px] tracking-[0.2em] uppercase text-black/55">Platform</span>
              {["Predictor", "AI Counselor", "Choice Optimizer", "Scholarships"].map((item) => (
                <a key={item} href="#" className="font-sans text-[12px] font-bold text-black/70 hover:text-[#ff5722] transition-colors">{item}</a>
              ))}
            </div>

            {/* Links Column 2 */}
            <div className="flex flex-col gap-3">
              <span className="font-display font-bold text-[11px] tracking-[0.2em] uppercase text-black/55">Resources</span>
              {["JoSAA Cutoffs", "CSAB Guide", "CUET Predictor", "Rank Converter"].map((item) => (
                <a key={item} href="#" className="font-sans text-[12px] font-bold text-black/70 hover:text-[#ff5722] transition-colors">{item}</a>
              ))}
            </div>

            {/* Links Column 3 */}
            <div className="flex flex-col gap-3">
              <span className="font-display font-bold text-[11px] tracking-[0.2em] uppercase text-black/55">Legal</span>
              {["Privacy Policy", "Terms of Use", "Security Matrix", "Cookie Settings"].map((item) => (
                <a key={item} href="#" className="font-sans text-[12px] font-bold text-black/70 hover:text-[#ff5722] transition-colors">{item}</a>
              ))}
              <Link href="/special" className="font-sans text-[11px] font-black text-[#ff5722] hover:underline transition-colors mt-1.5 uppercase tracking-wider block">
                ♥ FOR MY GIRLFRIEND ♥
              </Link>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-black/55 font-mono text-[9px] tracking-widest uppercase gap-4">
            <div>SECURE SELECTION ENGINE // v1.0.0</div>
            <div>© {new Date().getFullYear()} COUNSELAI. ALL RIGHTS RESERVED.</div>
          </div>
        </div>
      </motion.footer>
      
      {/* Dynamic Keyframes CSS for Micro-Float Animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-8px) rotate(-6deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes tail-rage {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes head-rage {
          0%, 100% { transform: rotate(-1.5deg) translate(0, 0); }
          50% { transform: rotate(1.5deg) translate(-0.5px, 0.5px); }
        }
        @keyframes mouth-rage {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05) translate(-0.5px, 0.2px); }
        }
        @keyframes wahh-bubble-rage {
          0%, 30%, 80%, 100% { transform: scale(0); opacity: 0; }
          34% { transform: scale(1.15) rotate(-3deg); opacity: 1; }
          38% { transform: scale(1) rotate(2deg); opacity: 1; }
          42% { transform: scale(1) rotate(-2deg); opacity: 1; }
          46% { transform: scale(1) rotate(1.5deg); opacity: 1; }
          50% { transform: scale(1) rotate(-1.5deg); opacity: 1; }
          54% { transform: scale(1) rotate(1deg); opacity: 1; }
          58% { transform: scale(1) rotate(-1deg); opacity: 1; }
          62% { transform: scale(1) rotate(1.5deg); opacity: 1; }
          66% { transform: scale(1) rotate(-1.5deg); opacity: 1; }
          70% { transform: scale(1) rotate(1deg); opacity: 1; }
          74%, 76% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes ants {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -40; }
        }
        @keyframes terminal-print {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>

    </div>
    </>
  );
}
