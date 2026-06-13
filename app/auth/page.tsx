"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("General");
  const [agreed, setAgreed] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6 relative select-none overflow-x-hidden font-display">
      {/* Blueprint Grid Lines Background (matching main page style) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] bg-[size:35px_35px] pointer-events-none z-0"></div>
      
      {/* HUD Layout Blueprint overlays */}
      <div className="absolute left-[10%] top-0 bottom-0 w-[1px] border-l border-dashed border-black/[0.03] pointer-events-none"></div>
      <div className="absolute left-[90%] top-0 bottom-0 w-[1px] border-l border-dashed border-black/[0.03] pointer-events-none"></div>

      {/* Back to Home Navigation Button */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 font-display font-black text-[11px] tracking-widest text-[#0c0d0e]/60 hover:text-[#ff5722] transition-colors pointer-events-auto bg-[#faf9f6] doodle-border-sm px-4 py-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px]"
      >
        ← BACK TO HOME
      </Link>

      {/* Main Container Grid */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12 pb-48">
        
        {/* Left Column: Platform info & check list (Desktop only) */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <div className="mb-4">
            <span className="text-[10px] tracking-[0.3em] font-black text-[#ff5722] uppercase">
              CounselAI Portal
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl tracking-wider text-[#0c0d0e] mt-2 uppercase leading-none">
              Start Your Journey
            </h1>
            <p className="font-sans text-xs text-black/60 font-bold uppercase tracking-wider mt-3 leading-relaxed">
              Unlock collaborative agent analysis and mathematically optimized counseling choices.
            </p>
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-4 mt-8">
            {[
              "98.4% Admission Probability Predictions",
              "joSAA & CSAB Option Lock Optimizers",
              "24/7 Specialized AI Agents Dialogue",
              "Certified PDF Counselor Strategy Reports"
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-3.5"
              >
                <div className="w-6 h-6 rounded-full bg-[#ff5722]/10 border-2 border-black flex items-center justify-center text-[10px] text-[#ff5722] font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  ✓
                </div>
                <span className="font-sans text-[12.5px] text-black/85 font-black uppercase">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Authorization Form Card */}
        <div className="lg:col-span-6 flex justify-center relative">
          
          {/* Shin-chan Doodle holding the login section from below */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[181px] w-[380px] h-[210px] z-20 pointer-events-none hidden lg:block select-none">
            <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
              {/* Head (Skin - Asymmetric 3/4 view with cheek bulge on the right) */}
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

              {/* Left Ear (Only left ear is visible in this 3/4 view) */}
              <path d="M 38,62 C 28,62 24,70 24,76 C 24,82 30,86 38,84" fill="#ffd3b6" stroke="black" strokeWidth="4" />
              <path d="M 33,70 C 30,70 30,74 33,74" stroke="black" strokeWidth="2" fill="none" />

              {/* Hair (Black cap covering top and back left) */}
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

              {/* Eyes (Accurate Shin-chan style: vertical ovals, scaled even smaller and aligned) */}
              {/* Left Eye */}
              <ellipse cx="94" cy="68" rx="7" ry="10" fill="white" stroke="black" strokeWidth="4" />
              <circle cx="94" cy="62" r="4.5" fill="black" />
              <circle cx="92.5" cy="59.5" r="1.2" fill="white" />

              {/* Right Eye */}
              <ellipse cx="126" cy="66" rx="7.5" ry="10.5" fill="white" stroke="black" strokeWidth="4" />
              <circle cx="126" cy="60" r="5" fill="black" />
              <circle cx="124.5" cy="57.5" r="1.3" fill="white" />

              {/* Eyebrows (Thick & Bushy, aligned perfectly above the eyes) */}
              <path d="M 84,52 Q 94,40 104,50" stroke="black" strokeWidth="10" strokeLinecap="round" fill="none" />
              <path d="M 116,50 Q 126,38 136,48" stroke="black" strokeWidth="10.5" strokeLinecap="round" fill="none" />

              {/* Rosy Cheeks (Aligned on the outer cheeks) */}
              <ellipse cx="65" cy="82" rx="9" ry="5" fill="#ff9999" opacity="0.65" />
              <ellipse cx="158" cy="80" rx="13" ry="7.5" fill="#ff9999" opacity="0.65" />

              {/* Mouth (Accurate open laugh smile placed between the eyes, below eyes) */}
              <path d="M 100,82 C 104,78 120,78 124,82 C 124,92 100,92 100,82 Z" fill="#ff6666" stroke="black" strokeWidth="3" />
              <path d="M 103,87 C 103,91 121,91 121,87 Z" fill="#ff9999" />

              {/* Left Hand Clamping Bottom Border (Stubby fingers wrapping over) */}
              <circle cx="60" cy="24" r="14" fill="#ffd3b6" stroke="black" strokeWidth="4" />
              <rect x="52" y="8" width="6" height="16" rx="3" fill="#ffd3b6" stroke="black" strokeWidth="3" />
              <rect x="60" y="6" width="6" height="18" rx="3" fill="#ffd3b6" stroke="black" strokeWidth="3" />
              <rect x="68" y="8" width="6" height="16" rx="3" fill="#ffd3b6" stroke="black" strokeWidth="3" />

              {/* Right Hand Clamping Bottom Border */}
              <circle cx="140" cy="24" r="14" fill="#ffd3b6" stroke="black" strokeWidth="4" />
              <rect x="126" y="8" width="6" height="16" rx="3" fill="#ffd3b6" stroke="black" strokeWidth="3" />
              <rect x="134" y="6" width="6" height="18" rx="3" fill="#ffd3b6" stroke="black" strokeWidth="3" />
              <rect x="142" y="8" width="6" height="16" rx="3" fill="#ffd3b6" stroke="black" strokeWidth="3" />
            </svg>
          </div>

          <div className="w-full max-w-[460px] bg-white border-3 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[32px] doodle-border-lg relative overflow-hidden z-10">
            
            {/* Header Tabs Toggle */}
            <div className="grid grid-cols-2 gap-3 mb-8 border-b-2 border-dashed border-black/15 pb-6">
              <button 
                onClick={() => setIsSignUp(false)}
                className={`py-2 px-4 font-display font-black text-xs tracking-wider border-2 border-black rounded-xl transition-all duration-200 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] ${
                  !isSignUp 
                    ? "bg-[#ff5722] text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" 
                    : "bg-[#faf9f6] text-[#0c0d0e] hover:bg-black/5"
                }`}
              >
                SIGN IN
              </button>
              <button 
                onClick={() => setIsSignUp(true)}
                className={`py-2 px-4 font-display font-black text-xs tracking-wider border-2 border-black rounded-xl transition-all duration-200 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] ${
                  isSignUp 
                    ? "bg-[#ff5722] text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" 
                    : "bg-[#faf9f6] text-[#0c0d0e] hover:bg-black/5"
                }`}
              >
                SIGN UP
              </button>
            </div>

            {/* Dynamic Form Content */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSignUp ? "signup" : "signin"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  {isSignUp && (
                    <div className="flex flex-col">
                      <label className="font-display font-bold text-[10px] tracking-wider text-black/50 uppercase mb-1.5 block">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full border-2 border-black rounded-xl px-4 py-2.5 bg-white text-[#0c0d0e] font-sans font-bold text-sm focus:outline-none focus:ring-0 focus:border-[#ff5722] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                      />
                    </div>
                  )}

                  <div className="flex flex-col">
                    <label className="font-display font-bold text-[10px] tracking-wider text-black/50 uppercase mb-1.5 block">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full border-2 border-black rounded-xl px-4 py-2.5 bg-white text-[#0c0d0e] font-sans font-bold text-sm focus:outline-none focus:ring-0 focus:border-[#ff5722] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                    />
                  </div>

                  {isSignUp && (
                    <div className="grid grid-cols-2 gap-4">
                      {/* JEE Main CRL Rank field */}
                      <div className="flex flex-col">
                        <label className="font-display font-bold text-[10px] tracking-wider text-black/50 uppercase mb-1.5 block">
                          JEE CRL Rank
                        </label>
                        <input 
                          type="number" 
                          required 
                          value={rank}
                          onChange={(e) => setRank(e.target.value)}
                          placeholder="e.g. 6240"
                          className="w-full border-2 border-black rounded-xl px-4 py-2.5 bg-white text-[#0c0d0e] font-sans font-bold text-sm focus:outline-none focus:ring-0 focus:border-[#ff5722] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                        />
                      </div>
                      
                      {/* Category Selection Dropdown */}
                      <div className="flex flex-col">
                        <label className="font-display font-bold text-[10px] tracking-wider text-black/50 uppercase mb-1.5 block">
                          Category Quota
                        </label>
                        <select 
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full border-2 border-black rounded-xl px-4 py-2.5 bg-white text-[#0c0d0e] font-sans font-bold text-sm focus:outline-none focus:ring-0 focus:border-[#ff5722] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] appearance-none cursor-pointer"
                        >
                          <option value="General">General</option>
                          <option value="OBC-NCL">OBC-NCL</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="EWS">EWS</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col">
                    <label className="font-display font-bold text-[10px] tracking-wider text-black/50 uppercase mb-1.5 block">
                      Password
                    </label>
                    <input 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border-2 border-black rounded-xl px-4 py-2.5 bg-white text-[#0c0d0e] font-sans font-bold text-sm focus:outline-none focus:ring-0 focus:border-[#ff5722] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                    />
                  </div>

                  {/* Checkbox agreement */}
                  <div className="flex items-start gap-2.5 mt-1">
                    <input 
                      type="checkbox" 
                      id="auth-check" 
                      required={isSignUp}
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4.5 h-4.5 border-2 border-black rounded cursor-pointer accent-[#ff5722] mt-0.5"
                    />
                    <label htmlFor="auth-check" className="font-sans text-[10.5px] font-black text-black/60 uppercase select-none cursor-pointer leading-tight">
                      {isSignUp 
                        ? "I verify that the CRL Rank and Category Quotas provided are true and accurate." 
                        : "Remember me on this browser // SAVE_SESSION"}
                    </label>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-[#ff5722] text-[#faf9f6] border-2 border-black py-3.5 px-6 font-display font-black text-xs tracking-widest hover:scale-[1.01] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer mt-4 rounded-xl"
              >
                {isSignUp ? "CREATE ACCOUNT →" : "LOG IN →"}
              </button>

              {/* Divider */}
              <div className="flex items-center my-1.5">
                <div className="flex-grow border-t border-dashed border-black/20"></div>
                <span className="mx-4 font-display font-black text-[9px] tracking-wider text-black/40 uppercase">OR CONTINUE WITH</span>
                <div className="flex-grow border-t border-dashed border-black/20"></div>
              </div>

              {/* Google login button */}
              <button 
                type="button"
                onClick={() => router.push("/dashboard")}
                className="w-full bg-white text-[#0c0d0e] border-2 border-black py-3 px-6 font-display font-black text-xs tracking-widest hover:scale-[1.01] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer rounded-xl flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                {isSignUp ? "SIGN UP WITH GOOGLE" : "SIGN IN WITH GOOGLE"}
              </button>
            </form>

            {/* Bottom helper links */}
            <div className="text-center mt-6">
              <span className="font-sans text-[10.5px] text-black/50 font-bold uppercase">
                {isSignUp ? "Already have an account? " : "New to the platform? "}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[#ff5722] font-black underline hover:text-[#ff5722]/80"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </span>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
