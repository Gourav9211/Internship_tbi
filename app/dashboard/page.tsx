"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { allColleges, generateAllChoices, CollegeChoice, College, branchesList } from "./collegesData";

interface CollegeOption extends CollegeChoice {}

interface ChoiceItem extends CollegeOption {
  priority: number;
  locked: boolean;
}

interface Message {
  sender: "user" | "agent";
  text: string;
  agentName?: string;
}

interface AuditResults {
  hasAnomalies: boolean;
  anomalies: string[];
  safetyIssues: string[];
  suggestions: string[];
  showAudit: boolean;
}

const indianStates = [
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
  "Telangana",
  "Andhra Pradesh",
  "Gujarat",
  "Rajasthan",
  "Madhya Pradesh",
  "Punjab",
  "Haryana",
  "Bihar",
  "Odisha",
  "Kerala",
  "Assam",
  "Uttarakhand",
  "Jharkhand",
  "Chhattisgarh",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Goa",
  "Puducherry"
];

export default function StudentDashboard() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"overview" | "predictor" | "optimizer" | "chat" | "reports">("overview");

  // User details state (loaded from JEE values, default CRL: 6240)
  const [rankInput, setRankInput] = useState<number>(6240);
  const [category, setCategory] = useState<string>("General");
  const [quota, setQuota] = useState<string>("OS"); // Other State (OS) vs Home State (HS)
  const [gender, setGender] = useState<string>("Gender-Neutral");
  const [homeState, setHomeState] = useState<string>("Delhi");

  // Predictor filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>("ALL");
  const [selectedInstType, setSelectedInstType] = useState<"ALL" | "IIT" | "NIT" | "IIIT" | "GFTI" | "STATE_GOVT" | "PRIVATE">("ALL");
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>("ALL");
  const [selectedSafetyFilter, setSelectedSafetyFilter] = useState<string>("ALL");
  const [selectedSortFilter, setSelectedSortFilter] = useState<string>("cutoff-asc");

  // Pagination and Accordion
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Choice Optimizer states
  const [choices, setChoices] = useState<ChoiceItem[]>([]);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optimizeStatusText, setOptimizeStatusText] = useState<string>("");
  const [optimizeSuccess, setOptimizeSuccess] = useState<boolean>(false);
  const [auditResults, setAuditResults] = useState<AuditResults | null>(null);

  // Chat panel states
  const [chatInput, setChatInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "agent", text: "HI! I AM AGENT PARSER. I HAVE READ YOUR PROFILE RANK OF 6,240 AND PRE-CALIBRATED THE ALGORITHMS. LET'S DESIGN A ROBUST COLLEGE SELECTION SCHEME!", agentName: "Agent Parser" }
  ]);
  const [activeAgent, setActiveAgent] = useState<"parser" | "trend" | "builder">("parser");

  // PDF Export States
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);

  // Live Agent map selection for hover highlights on Overview tab
  const [hoveredMapNode, setHoveredMapNode] = useState<string | null>(null);

  // Load static choices database (exactly ~6,300 options)
  const [fullCollegeList] = useState<CollegeOption[]>(() => generateAllChoices());

  // Adjust baseline cutoffs dynamically based on Category, Quota, and Gender multipliers
  const getAdjustedCutoff = (base: number, colState: string): number => {
    let multiplier = 1.0;
    
    // Category quotas
    if (category === "OBC-NCL") multiplier = 1.45;
    else if (category === "SC") multiplier = 2.80;
    else if (category === "ST") multiplier = 4.20;
    else if (category === "EWS") multiplier = 1.15;

    // Home state quota multiplier (Home State cutoffs are generally more relaxed)
    if (quota === "HS" && colState === homeState) {
      multiplier *= 1.35;
    }

    // Female quota seat pool (Generally higher numerical cutoffs)
    if (gender === "Female-Only") multiplier *= 1.25;

    return Math.round(base * multiplier);
  };

  // Filtered colleges according to user rank inputs
  const calculatedColleges = fullCollegeList.map((col) => {
    const adjustedCutoff = getAdjustedCutoff(col.baseCutoff, col.state);
    
    // Safety calculation based on user rank vs adjusted cutoff
    let safety: "dream" | "moderate" | "safe";
    let matchPercent = 0;

    if (rankInput < adjustedCutoff * 0.78) {
      safety = "safe";
      matchPercent = 99;
    } else if (rankInput >= adjustedCutoff * 0.78 && rankInput <= adjustedCutoff * 1.22) {
      safety = "moderate";
      const range = adjustedCutoff * 0.44;
      const diff = adjustedCutoff * 1.22 - rankInput;
      matchPercent = Math.round(Math.max(10, Math.min(90, (diff / range) * 100)));
    } else {
      safety = "dream";
      matchPercent = Math.round(Math.max(5, Math.min(45, (adjustedCutoff / rankInput) * 100)));
    }

    return {
      ...col,
      adjustedCutoff,
      safety,
      matchPercent,
    };
  });

  // Apply search query and filters
  const filteredColleges = calculatedColleges.filter((col) => {
    const queryMatches = searchQuery === "" || 
      col.institute.toLowerCase().includes(searchQuery.toLowerCase()) || 
      col.branch.toLowerCase().includes(searchQuery.toLowerCase());
    
    const branchMatches = selectedBranchFilter === "ALL" || col.branch.includes(selectedBranchFilter);
    const typeMatches = selectedInstType === "ALL" || col.type === selectedInstType;
    const stateMatches = selectedStateFilter === "ALL" || col.state === selectedStateFilter;
    const safetyMatches = selectedSafetyFilter === "ALL" || col.safety === selectedSafetyFilter;

    return queryMatches && branchMatches && typeMatches && stateMatches && safetyMatches;
  });

  // Sort choices
  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (selectedSortFilter === "cutoff-asc") {
      return a.adjustedCutoff - b.adjustedCutoff;
    }
    if (selectedSortFilter === "cutoff-desc") {
      return b.adjustedCutoff - a.adjustedCutoff;
    }
    if (selectedSortFilter === "probability") {
      return b.matchPercent - a.matchPercent;
    }
    if (selectedSortFilter === "package") {
      const pkgA = allColleges.find(c => c.name === a.institute)?.averagePackage || 0;
      const pkgB = allColleges.find(c => c.name === b.institute)?.averagePackage || 0;
      return pkgB - pkgA;
    }
    return 0;
  });

  // Pagination slicing
  const ITEMS_PER_PAGE = 15;
  const totalPages = Math.ceil(sortedColleges.length / ITEMS_PER_PAGE);
  const paginatedColleges = sortedColleges.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page on filter changes
  useEffect(() => {
    setCurrentPage(1);
    setExpandedCardId(null);
  }, [searchQuery, selectedBranchFilter, selectedInstType, selectedStateFilter, selectedSafetyFilter, selectedSortFilter]);

  // Safe colleges count for overview
  const safeCount = calculatedColleges.filter((c) => c.safety === "safe").length;
  const moderateCount = calculatedColleges.filter((c) => c.safety === "moderate").length;
  const dreamCount = calculatedColleges.filter((c) => c.safety === "dream").length;

  // Initialize selected choices list with default choices
  useEffect(() => {
    const defaultChoices = calculatedColleges
      .filter((c) => c.safety === "moderate" || c.safety === "safe")
      .slice(0, 5)
      .map((c, index) => ({
        ...c,
        priority: index + 1,
        locked: false
      }));
    setChoices(defaultChoices);
  }, []);

  // Handler for adding a college choice
  const addChoice = (col: CollegeOption) => {
    if (choices.some((c) => c.id === col.id)) return;
    const newChoice: ChoiceItem = {
      ...col,
      priority: choices.length + 1,
      locked: false
    };
    setChoices([...choices, newChoice]);
    // Reset audit on modifications
    setAuditResults(null);
  };

  // Reordering choices
  const moveChoice = (index: number, direction: "up" | "down") => {
    const list = [...choices];
    if (direction === "up" && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === "down" && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    const updated = list.map((item, idx) => ({ ...item, priority: idx + 1 }));
    setChoices(updated);
    setAuditResults(null);
  };

  // Delete choice
  const deleteChoice = (id: string) => {
    const filtered = choices.filter((c) => c.id !== id);
    const updated = filtered.map((item, idx) => ({ ...item, priority: idx + 1 }));
    setChoices(updated);
    setAuditResults(null);
  };

  // Toggle lock
  const toggleLock = (id: string) => {
    setChoices(
      choices.map((c) => (c.id === id ? { ...c, locked: !c.locked } : c))
    );
  };

  // Run list audit reports
  const runListAudit = () => {
    const anomalies: string[] = [];
    const safetyIssues: string[] = [];
    const suggestions: string[] = [];

    if (choices.length === 0) {
      setAuditResults({
        hasAnomalies: false,
        anomalies: [],
        safetyIssues: ["Your preference list is empty."],
        suggestions: ["Go to the College Predictor tab and add some colleges first!"],
        showAudit: true
      });
      return;
    }

    // Check Priority Anomalies: placing a college with higher tier BELOW a lower tier
    let foundTierAnomaly = false;
    for (let i = 0; i < choices.length - 1; i++) {
      const current = choices[i];
      const next = choices[i + 1];
      
      const currentFull = allColleges.find(c => c.name === current.institute);
      const nextFull = allColleges.find(c => c.name === next.institute);
      
      if (currentFull && nextFull) {
        if (currentFull.tier > nextFull.tier) {
          anomalies.push(`Anomaly: Placed ${current.institute} (Tier ${currentFull.tier}) above ${next.institute} (Tier ${nextFull.tier}) at choice #${current.priority}.`);
          foundTierAnomaly = true;
        }
      }
    }

    // Check Safety Zones
    const safeCountInChoices = choices.filter(c => {
      const calculated = calculatedColleges.find(cc => cc.id === c.id);
      return calculated?.safety === "safe";
    }).length;

    if (safeCountInChoices === 0) {
      safetyIssues.push("No Safe Fallback choices found in your priority list!");
      suggestions.push("Add at least 2 verified 'Safe' choices at the bottom of your list to prevent getting zero seat allocation in JoSAA.");
    } else if (safeCountInChoices < 2) {
      safetyIssues.push("Low number of Safe choices. Only 1 safe choice found.");
      suggestions.push("Consider adding 1 or 2 more safe choices to create a secure safety net.");
    }

    if (foundTierAnomaly) {
      suggestions.push("Review the priority order of your Tier 1 and Tier 3 colleges. Click 'AI AUTO-OPTIMIZE' to sort choices dynamically by tier and safety margin.");
    } else {
      suggestions.push("Your priority ordering looks strategically solid! Good job.");
    }

    setAuditResults({
      hasAnomalies: anomalies.length > 0,
      anomalies,
      safetyIssues,
      suggestions,
      showAudit: true
    });
  };

  // AI Choice Optimizer Animation Simulator
  const runAiOptimizer = () => {
    setIsOptimizing(true);
    setOptimizeSuccess(false);
    setAuditResults(null);

    setOptimizeStatusText("1. PARSING CRL RANK AND CATEGORY PROFILES...");
    setTimeout(() => {
      setOptimizeStatusText("2. CALIBRATING HISTORICAL CUTOFF TRENDS (JOSAA/CSAB)...");
    }, 800);
    setTimeout(() => {
      setOptimizeStatusText("3. VERIFYING SEAT MATRIX COMPLIANCE...");
    }, 1600);

    setTimeout(() => {
      const listCopy = [...choices];
      const lockedItems = listCopy.filter((c) => c.locked);
      const unlockedItems = listCopy.filter((c) => !c.locked);

      // Strategic counseling sort: Tier 1 first, then Tier 2, then Tier 3
      // Within same tier: sort by Cutoff ascending (Dream first, then Moderate, then Safe)
      unlockedItems.sort((a, b) => {
        const fullA = allColleges.find((c) => c.name === a.institute);
        const fullB = allColleges.find((c) => c.name === b.institute);
        const calcA = calculatedColleges.find((c) => c.id === a.id);
        const calcB = calculatedColleges.find((c) => c.id === b.id);

        const tierA = fullA?.tier || 3;
        const tierB = fullB?.tier || 3;

        if (tierA !== tierB) {
          return tierA - tierB; // Tier 1 first
        }

        const getSafetyPriority = (safety: string) => {
          if (safety === "dream") return 1;
          if (safety === "moderate") return 2;
          return 3;
        };

        const safetyA = getSafetyPriority(calcA?.safety || "moderate");
        const safetyB = getSafetyPriority(calcB?.safety || "moderate");

        if (safetyA !== safetyB) {
          return safetyA - safetyB;
        }

        return a.baseCutoff - b.baseCutoff;
      });

      const finalized: ChoiceItem[] = [];
      let unlockedIdx = 0;
      for (let i = 0; i < listCopy.length; i++) {
        const originalItem = listCopy[i];
        if (originalItem.locked) {
          finalized.push(originalItem);
        } else {
          finalized.push({
            ...unlockedItems[unlockedIdx],
            priority: i + 1
          });
          unlockedIdx++;
        }
      }

      setChoices(finalized);
      setIsOptimizing(false);
      setOptimizeSuccess(true);
    }, 2400);
  };

  // Chat message submit
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const newMessages = [...messages, { sender: "user" as const, text: chatInput }];
    setMessages(newMessages);
    setChatInput("");
    setIsTyping(true);

    // Simulate agent replies with typing latency
    setTimeout(() => {
      let replyText = "";
      let name = "";
      if (activeAgent === "parser") {
        name = "Agent Parser";
        replyText = `UNDERSTOOD. I'VE COMPILATION AUDITED YOUR SCORE PARAMETERS. OUT OF ${fullCollegeList.length} LOGICAL PATHS, ${safeCount} ARE SOLID PICKS. LET'S ADD THEM IN TAB 2!`;
      } else if (activeAgent === "trend") {
        name = "Agent Trend Engine";
        replyText = `ALERT: TREND METRICS FOR ELECTRONICS & CS SEATS HAVE RELAXED BY 5.5% AT THE TOP NITS. VNIT NAGPUR AND IIIT ALLAHABAD OPTIONS HAVE BUMPED UP IN ADMISSION VALUE!`;
      } else {
        name = "Agent Builder";
        replyText = `I HAVE SCANNED YOUR PREFERENCE MATRIX. YOU CAN OPTIMIZE THE ENTIRE ORDER BY CLICKING 'AI AUTO-OPTIMIZE' IN THE PREFERENCE OPTIMIZER WORKSPACE.`;
      }
      setMessages([...newMessages, { sender: "agent", text: replyText, agentName: name }]);
      setIsTyping(false);
    }, 1200);
  };

  // Group discussion huddle simulation
  const startAgentHuddle = () => {
    if (isTyping) return;
    setIsTyping(true);
    const newMessages = [
      ...messages,
      { sender: "user" as const, text: "REQUEST AGENT GROUP HUDDLE DISCUSSING MY RANK STRATEGY." }
    ];
    setMessages(newMessages);

    setTimeout(() => {
      const reply1 = {
        sender: "agent" as const,
        agentName: "Agent Parser",
        text: `HUDDLE INITIATED. BASED ON CRL RANK ${rankInput.toLocaleString()}, THIS CANDIDATE LANDS IN THE TOP TIER ZONE. WE SHOULD MAINLY TARGET TIER 1/2 NITS AND IIITS.`
      };
      setMessages([...newMessages, reply1]);

      setTimeout(() => {
        const reply2 = {
          sender: "agent" as const,
          agentName: "Agent Trend Engine",
          text: `AGREED. ON-GOING SEAT DATA SHOWS CS AND DATA SCIENCE BRANCHES HAVE HIGHER TURNOVER. AVOID OVER-LOCKING STATE PRIVATE OPTIONS IN THE FIRST ROUNDS.`
        };
        setMessages([...newMessages, reply1, reply2]);

        setTimeout(() => {
          const reply3 = {
            sender: "agent" as const,
            agentName: "Agent Builder",
            text: `ORDER CHECKED. WE RECOMMEND AN ORDER OF: TOP 5 IIT/NIT DREAM CS CHOICES, THEN MNNIT ALLAHABAD ECE, AND FINALLY 2 SAFE Fallback Options. I AM READY TO AUTO-SORT.`
          };
          setMessages([...newMessages, reply1, reply2, reply3]);
          setIsTyping(false);
        }, 1200);
      }, 1200);
    }, 1000);
  };

  // Report Export simulator
  const handleExportReport = () => {
    setIsExporting(true);
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            alert("Strategy PDF Report downloaded successfully!");
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] relative select-none overflow-x-hidden font-display flex flex-col">
      {/* Print styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          header, aside, button, nav, form, footer, .no-print {
            display: none !important;
          }
          main {
            grid-column: span 12 / span 12 !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }
          .print-card {
            border: 2px solid black !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 20px !important;
          }
        }
      `}} />

      {/* Blueprint Grid Lines Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] bg-[size:35px_35px] pointer-events-none z-0"></div>

      {/* Main Top Header */}
      <header className="relative z-30 w-full border-b-3 border-black px-6 py-4 flex items-center justify-between bg-white/95 backdrop-blur-md no-print">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-display font-black text-xl tracking-wider text-[#0c0d0e] flex items-center gap-1.5 select-none">
            Counsel<span className="text-[#ff5722]">AI</span>
            <span className="text-[9px] tracking-widest font-black uppercase text-[#ff5722] border-2 border-[#ff5722] px-1.5 py-0.5 rounded-md">
              STUDENT_PORTAL
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* User Rank Indicator Card */}
          <div className="hidden sm:flex items-center gap-2 border-2 border-black bg-[#faf9f6] px-4 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-display font-black text-[10px] tracking-wider text-black/50 uppercase">CRL RANK:</span>
            <span className="font-display font-black text-xs text-[#ff5722]">{rankInput.toLocaleString()}</span>
          </div>

          <Link 
            href="/"
            className="font-display font-black text-[10px] tracking-widest bg-white border-2 border-black px-4 py-2 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] transition-all z-20"
          >
            LOG OUT
          </Link>
        </div>
      </header>

      {/* Main Body Grid */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 relative z-10 w-full">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 border-r-3 border-black bg-white p-6 flex flex-col gap-6 no-print">
          <div className="flex flex-col">
            <span className="font-display font-black text-[10px] tracking-widest text-black/40 uppercase mb-2">WORKSPACES</span>
            <div className="flex flex-col gap-3">
              {[
                { id: "overview", label: "OVERVIEW HUD", icon: "📊" },
                { id: "predictor", label: "COLLEGE PREDICTOR", icon: "🎯" },
                { id: "optimizer", label: "CHOICE OPTIMIZER", icon: "⛓️" },
                { id: "chat", label: "AI AGENTS CHAT", icon: "💬" },
                { id: "reports", label: "STRATEGY REPORT", icon: "📜" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left py-3 px-4 font-display font-black text-xs tracking-widest border-2 border-black rounded-xl transition-all duration-150 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] flex items-center gap-3 ${
                    activeTab === tab.id
                      ? "bg-[#ff5722] text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-[#faf9f6] text-[#0c0d0e] hover:bg-black/5 hover:scale-[1.01]"
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Parameters card */}
          <div className="border-3 border-black bg-[#faf9f6] p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] doodle-border mt-auto flex flex-col gap-3.5 relative">
            <div className="absolute -top-3.5 left-6 right-6 h-3 bg-black/10 rotate-[-1deg] border border-black/15"></div>

            <span className="font-display font-black text-[10px] tracking-wider text-[#ff5722] uppercase">PROFILE SECTIONS</span>
            
            <div className="flex flex-col">
              <label className="font-display font-bold text-[9px] tracking-wider text-black/40 uppercase mb-1.5 block">JEE CRL Rank (Input)</label>
              <input 
                type="number" 
                min="1"
                max="1000000"
                value={rankInput} 
                onChange={(e) => setRankInput(Math.max(1, Number(e.target.value)))}
                className="w-full border-2 border-black rounded-xl px-3 py-2 bg-white text-[#0c0d0e] font-sans font-bold text-sm focus:outline-none focus:ring-0 focus:border-[#ff5722] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col">
                <label className="font-display font-bold text-[9px] tracking-wider text-black/40 uppercase mb-1">Quota</label>
                <select 
                  value={quota} 
                  onChange={(e) => setQuota(e.target.value)}
                  className="border-2 border-black rounded-lg px-2 py-1.5 text-[11px] font-sans font-bold bg-white"
                >
                  <option value="OS">Other State</option>
                  <option value="HS">Home State</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-display font-bold text-[9px] tracking-wider text-black/40 uppercase mb-1">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="border-2 border-black rounded-lg px-2 py-1.5 text-[11px] font-sans font-bold bg-white"
                >
                  <option value="General">General</option>
                  <option value="OBC-NCL">OBC-NCL</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-display font-bold text-[9px] tracking-wider text-black/40 uppercase mb-1">Home State</label>
              <select 
                value={homeState} 
                onChange={(e) => setHomeState(e.target.value)}
                className="border-2 border-black rounded-lg px-2 py-1.5 text-[11px] font-sans font-bold bg-white"
              >
                {indianStates.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-display font-bold text-[9px] tracking-wider text-black/40 uppercase mb-1">Seat Pool</label>
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)}
                className="border-2 border-black rounded-lg px-2 py-1.5 text-[11px] font-sans font-bold bg-white"
              >
                <option value="Gender-Neutral">Gender-Neutral</option>
                <option value="Female-Only">Female-Only Pool</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main Panel Content */}
        <main className="lg:col-span-9 p-6 sm:p-8 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-8 flex-grow"
              >
                {/* HUD Title Row */}
                <div className="flex items-center justify-between border-b-2 border-dashed border-black/15 pb-4">
                  <div>
                    <h2 className="font-display font-black text-2xl tracking-wider text-black uppercase">OVERVIEW HUD</h2>
                    <p className="font-sans text-[11px] font-bold text-black/55 uppercase tracking-wider">
                      Real-time chance indices and alert metrics based on CRL: {rankInput.toLocaleString()} // {category} ({homeState})
                    </p>
                  </div>
                </div>

                {/* Scorecards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: "Dream Options", count: dreamCount, color: "text-[#ff3344] bg-[#ff3344]/5", desc: "Require higher rank cutoffs" },
                    { title: "Moderate Matches", count: moderateCount, color: "text-[#ff9900] bg-[#ff9900]/5", desc: "Competitive seat margins" },
                    { title: "Verified Safe Picks", count: safeCount, color: "text-[#34a853] bg-[#34a853]/5", desc: "Highly probable seat allocations" }
                  ].map((card, i) => (
                    <div key={i} className={`border-3 border-black p-6 rounded-[24px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] doodle-border flex flex-col bg-white ${card.color}`}>
                      <span className="font-display font-black text-[10px] tracking-widest opacity-60 uppercase mb-2">{card.title}</span>
                      <span className="font-display font-black text-4xl mb-1">{card.count.toLocaleString()}</span>
                      <span className="font-sans text-[10px] font-bold uppercase opacity-75">{card.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Middle Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Chances Gauge Tracker & Top Picks */}
                  <div className="lg:col-span-6 flex flex-col gap-6">
                    <div className="border-3 border-black bg-white p-6 rounded-[32px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] doodle-border-lg flex flex-col items-center text-center">
                      <span className="font-display font-black text-[10px] tracking-widest text-[#ff5722] uppercase mb-6">ADMISSION PROBABILITY GAUGE</span>
                      
                      {/* Circle Gauge SVG */}
                      <div className="relative w-44 h-44 flex items-center justify-center mb-4">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="88" cy="88" r="72" stroke="rgba(0,0,0,0.05)" strokeWidth="12" fill="transparent" />
                          <motion.circle 
                            cx="88" 
                            cy="88" 
                            r="72" 
                            stroke="#ff5722" 
                            strokeWidth="12" 
                            fill="transparent" 
                            strokeDasharray={452}
                            initial={{ strokeDashoffset: 452 }}
                            animate={{ strokeDashoffset: 452 - (452 * 0.94) }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="font-display font-black text-4xl text-black"
                          >
                            94%
                          </motion.span>
                          <span className="font-sans text-[8.5px] font-black text-black/50 uppercase tracking-widest">SUCCESS</span>
                        </div>
                      </div>

                      <p className="font-sans text-[11px] text-black/60 font-bold uppercase tracking-wider max-w-[240px] leading-relaxed">
                        High probability matching safe choices locked in option list.
                      </p>
                    </div>

                    {/* AI Top Recommendation Sticky Note */}
                    <div className="border-3 border-black bg-[#fff9c4] p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] relative">
                      <div className="absolute top-2 right-4 text-xs opacity-50">📌</div>
                      <span className="font-display font-black text-[10px] tracking-widest text-[#ff5722] uppercase mb-2 block">AI COUNSELOR'S CHOICE recommendation</span>
                      <p className="font-sans text-xs font-bold uppercase text-black/75 leading-relaxed">
                        "For rank <span className="text-black font-black">{rankInput.toLocaleString()}</span>, your best balanced choice is <span className="text-black font-black">NIT Trichy ECE</span> or <span className="text-black font-black">MNNIT Allahabad CSE</span>. You retain strong placements while carrying 85%+ admission probability."
                      </p>
                    </div>
                  </div>

                  {/* Right: Live Agent coordination visual Map & Zone Breakdown */}
                  <div className="lg:col-span-6 flex flex-col gap-6">
                    <div className="border-3 border-black bg-white p-6 rounded-[32px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] doodle-border-lg flex flex-col relative">
                      <span className="font-display font-black text-[10px] tracking-widest text-[#ff5722] uppercase mb-3 block">
                        AI AGENTS COORDINATION NETWORK
                      </span>
                      
                      {/* Interactive diagram canvas */}
                      <div className="w-full h-[180px] bg-[#faf9f6] border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center">
                        <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full stroke-black stroke-[1.2] fill-none overflow-visible">
                          <path d="M 30,50 Q 60,15 100,50" strokeDasharray="3 3" />
                          <path d="M 30,50 Q 60,85 100,50" strokeDasharray="3 3" />
                          <path d="M 100,50 Q 140,15 170,50" strokeDasharray="3 3" />
                          <path d="M 100,50 Q 140,85 170,50" strokeDasharray="3 3" />

                          {/* Marching Ants */}
                          <path d="M 30,50 Q 60,15 100,50" className="stroke-[#ff5722] stroke-[1.8]" strokeDasharray="6 20" style={{ animation: "ants 2.2s linear infinite" }} />
                          <path d="M 100,50 Q 140,85 170,50" className="stroke-[#34a853] stroke-[1.8]" strokeDasharray="6 20" style={{ animation: "ants 2.2s linear infinite" }} />
                        </svg>

                        {/* Parser Node (Left) */}
                        <button 
                          onMouseEnter={() => setHoveredMapNode("parser")}
                          onMouseLeave={() => setHoveredMapNode(null)}
                          onClick={() => setActiveTab("chat")}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 border-black bg-white hover:bg-[#ff5722] hover:text-white flex items-center justify-center text-sm font-display font-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                        >
                          🔍
                        </button>

                        {/* Trend Node (Center) */}
                        <button 
                          onMouseEnter={() => setHoveredMapNode("trend")}
                          onMouseLeave={() => setHoveredMapNode(null)}
                          onClick={() => setActiveTab("chat")}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-black bg-white hover:bg-[#ff9900] hover:text-white flex items-center justify-center text-base font-display font-black transition-all shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                        >
                          📈
                        </button>

                        {/* Builder Node (Right) */}
                        <button 
                          onMouseEnter={() => setHoveredMapNode("builder")}
                          onMouseLeave={() => setHoveredMapNode(null)}
                          onClick={() => setActiveTab("chat")}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 border-black bg-white hover:bg-[#34a853] hover:text-white flex items-center justify-center text-sm font-display font-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                        >
                          🛠️
                        </button>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white border border-black rounded-lg px-2.5 py-1 text-[9px] font-sans font-bold uppercase tracking-wider pointer-events-none">
                          {hoveredMapNode === "parser" && "Agent Parser: CRL Data Analyser"}
                          {hoveredMapNode === "trend" && "Agent Trend: JoSAA Historical Auditor"}
                          {hoveredMapNode === "builder" && "Agent Builder: Preference Lock Guard"}
                          {!hoveredMapNode && "Hover nodes to inspect AI Agents"}
                        </div>
                      </div>
                    </div>

                    {/* Breakdown Matrix of Options */}
                    <div className="border-3 border-black bg-white p-5 rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col">
                      <span className="font-display font-black text-[10px] tracking-widest text-[#ff5722] uppercase mb-3 block">INSTITUTE type CHANCE MATRIX</span>
                      <div className="flex flex-col gap-2 font-sans text-xs font-bold uppercase">
                        {[
                          { label: "IITs", safe: calculatedColleges.filter(c => c.type === "IIT" && c.safety === "safe").length, mod: calculatedColleges.filter(c => c.type === "IIT" && c.safety === "moderate").length, dream: calculatedColleges.filter(c => c.type === "IIT" && c.safety === "dream").length },
                          { label: "NITs & IIEST", safe: calculatedColleges.filter(c => c.type === "NIT" && c.safety === "safe").length, mod: calculatedColleges.filter(c => c.type === "NIT" && c.safety === "moderate").length, dream: calculatedColleges.filter(c => c.type === "NIT" && c.safety === "dream").length },
                          { label: "IIITs", safe: calculatedColleges.filter(c => c.type === "IIIT" && c.safety === "safe").length, mod: calculatedColleges.filter(c => c.type === "IIIT" && c.safety === "moderate").length, dream: calculatedColleges.filter(c => c.type === "IIIT" && c.safety === "dream").length },
                          { label: "State Govt", safe: calculatedColleges.filter(c => c.type === "STATE_GOVT" && c.safety === "safe").length, mod: calculatedColleges.filter(c => c.type === "STATE_GOVT" && c.safety === "moderate").length, dream: calculatedColleges.filter(c => c.type === "STATE_GOVT" && c.safety === "dream").length },
                          { label: "Privates", safe: calculatedColleges.filter(c => c.type === "PRIVATE" && c.safety === "safe").length, mod: calculatedColleges.filter(c => c.type === "PRIVATE" && c.safety === "moderate").length, dream: calculatedColleges.filter(c => c.type === "PRIVATE" && c.safety === "dream").length }
                        ].map((row, i) => (
                          <div key={i} className="flex justify-between items-center border-b border-dashed border-black/10 pb-1">
                            <span className="w-24 text-black/50">{row.label}</span>
                            <div className="flex gap-4">
                              <span className="text-[#34a853]">{row.safe} Safe</span>
                              <span className="text-[#ff9900]">{row.mod} Mod</span>
                              <span className="text-[#ff3344]">{row.dream} Dream</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* College Predictor Tab */}
            {activeTab === "predictor" && (
              <motion.div
                key="predictor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6 flex-grow"
              >
                {/* Predictor workspace header with filters */}
                <div className="flex flex-col gap-4 border-b-2 border-dashed border-black/15 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display font-black text-2xl tracking-wider text-black uppercase">COLLEGE MATCH PREDICTOR</h2>
                      <p className="font-sans text-[11px] font-bold text-black/55 uppercase tracking-wider">
                        Instantly query cutoffs relative to Rank: {rankInput.toLocaleString()} (Total choices matched: {sortedColleges.length})
                      </p>
                    </div>
                  </div>

                  {/* Advanced Filters controls */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    
                    {/* Search box */}
                    <div className="md:col-span-3 relative">
                      <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search colleges (e.g. Bombay, CS)..."
                        className="w-full border-2 border-black rounded-xl px-4 py-2 bg-white text-[#0c0d0e] font-sans font-bold text-xs focus:outline-none focus:ring-0 focus:border-[#ff5722] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs">🔍</span>
                    </div>

                    {/* State selector */}
                    <div className="md:col-span-2">
                      <select
                        value={selectedStateFilter}
                        onChange={(e) => setSelectedStateFilter(e.target.value)}
                        className="w-full border-2 border-black rounded-xl px-3 py-2 text-xs font-sans font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer"
                      >
                        <option value="ALL">ALL STATES</option>
                        {indianStates.map((st) => (
                          <option key={st} value={st}>{st.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>

                    {/* Branch select */}
                    <div className="md:col-span-3">
                      <select
                        value={selectedBranchFilter}
                        onChange={(e) => setSelectedBranchFilter(e.target.value)}
                        className="w-full border-2 border-black rounded-xl px-3 py-2 text-xs font-sans font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer"
                      >
                        <option value="ALL">ALL BRANCHES</option>
                        {branchesList.map((br) => (
                          <option key={br} value={br}>{br.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>

                    {/* Safety select */}
                    <div className="md:col-span-2">
                      <select
                        value={selectedSafetyFilter}
                        onChange={(e) => setSelectedSafetyFilter(e.target.value)}
                        className="w-full border-2 border-black rounded-xl px-3 py-2 text-xs font-sans font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer"
                      >
                        <option value="ALL">ALL CHANCES</option>
                        <option value="safe">SAFE FALLBACKS</option>
                        <option value="moderate">MODERATE TARGETS</option>
                        <option value="dream">DREAM OPTIONS</option>
                      </select>
                    </div>

                    {/* Sorting dropdown */}
                    <div className="md:col-span-2">
                      <select
                        value={selectedSortFilter}
                        onChange={(e) => setSelectedSortFilter(e.target.value)}
                        className="w-full border-2 border-black rounded-xl px-3 py-2 text-xs font-sans font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer"
                      >
                        <option value="cutoff-asc">CUTOFF: LOW-HIGH</option>
                        <option value="cutoff-desc">CUTOFF: HIGH-LOW</option>
                        <option value="probability">CHANCE PERCENTAGE</option>
                        <option value="package">AVERAGE PACKAGE</option>
                      </select>
                    </div>

                  </div>

                  {/* Institute Type toggle selectors */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full">
                    {([
                      { id: "ALL", label: "ALL TYPES" },
                      { id: "IIT", label: "IITS" },
                      { id: "NIT", label: "NITS & IIEST" },
                      { id: "IIIT", label: "IIITS" },
                      { id: "GFTI", label: "GFTIS" },
                      { id: "STATE_GOVT", label: "STATE GOVT" },
                      { id: "PRIVATE", label: "PRIVATES" }
                    ] as const).map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedInstType(type.id)}
                        className={`py-1.5 px-3 rounded-lg border-2 border-black font-display font-black text-[9px] tracking-wider uppercase cursor-pointer transition-all duration-150 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] ${
                          selectedInstType === type.id
                            ? "bg-black text-[#faf9f6]"
                            : "bg-white text-black hover:bg-black/5"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>

                </div>

                {/* College choices list with pagination */}
                <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {paginatedColleges.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-black/20 rounded-2xl bg-white font-sans text-xs font-bold text-black/50 uppercase">
                      NO MATCHES FOUND UNDER THIS RANK SETTING OR FILTERS
                    </div>
                  ) : (
                    paginatedColleges.map((col) => {
                      let tagColor = "";
                      let tagBg = "";
                      if (col.safety === "safe") {
                        tagColor = "text-[#34a853]";
                        tagBg = "bg-[#34a853]/10";
                      } else if (col.safety === "moderate") {
                        tagColor = "text-[#ff9900]";
                        tagBg = "bg-[#ff9900]/10";
                      } else {
                        tagColor = "text-[#ff3344]";
                        tagBg = "bg-[#ff3344]/10";
                      }

                      const details = allColleges.find(c => c.name === col.institute);
                      const isExpanded = expandedCardId === col.id;

                      const isHomeStateSeat = quota === "HS" && col.state === homeState;

                      return (
                        <div 
                          key={col.id}
                          className="bg-white border-2 border-black p-4 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.005] transition-all flex flex-col"
                        >
                          {/* Main Row */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer" onClick={() => setExpandedCardId(isExpanded ? null : col.id)}>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-display font-black text-sm uppercase text-black">
                                  {col.institute}
                                </span>
                                <span className="text-[8px] font-mono font-black border-2 border-black px-1.5 py-0.2 rounded-md uppercase tracking-wider text-black bg-black/[0.03]">
                                  {col.type}
                                </span>
                                {isHomeStateSeat && (
                                  <span className="text-[8px] font-mono font-black border-2 border-[#34a853] px-1.5 py-0.2 rounded-md uppercase tracking-wider text-[#34a853] bg-[#34a853]/5">
                                    Home State Quota
                                  </span>
                                )}
                              </div>
                              <span className="font-sans text-[11px] font-bold text-black/60 uppercase tracking-wide">
                                {col.branch}
                              </span>
                            </div>

                            <div className="flex items-center gap-6 justify-between sm:justify-end">
                              <div className="flex flex-col text-left sm:text-right">
                                <span className="font-mono text-[9px] font-bold text-black/40 uppercase">ADJUSTED CUTOFF</span>
                                <span className="font-display font-black text-xs text-black">{col.adjustedCutoff.toLocaleString()}</span>
                              </div>

                              <span className={`px-3 py-1 rounded-lg font-display font-black text-[9px] tracking-widest uppercase border border-black/10 ${tagColor} ${tagBg}`}>
                                {col.safety}
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addChoice(col);
                                }}
                                disabled={choices.some((c) => c.id === col.id)}
                                className={`py-2 px-3 border-2 border-black rounded-xl text-[10px] font-display font-black tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer transition-all ${
                                  choices.some((c) => c.id === col.id)
                                    ? "bg-black/5 border-black/15 text-black/30 shadow-none cursor-default"
                                    : "bg-[#ff5722] text-white hover:bg-[#ff5722]/90"
                                }`}
                              >
                                {choices.some((c) => c.id === col.id) ? "ADDED" : "+ ADD CHOICE"}
                              </button>
                            </div>
                          </div>

                          {/* Accordion placement stats */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t-2 border-dashed border-black/15 mt-3 pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 overflow-hidden"
                              >
                                <div className="flex flex-col bg-[#faf9f6]/50 p-2.5 rounded-lg border border-black/5">
                                  <span className="font-mono text-[8.5px] text-black/40 uppercase">AVG PLACEMENT</span>
                                  <span className="font-display font-black text-sm text-[#ff5722]">{details?.averagePackage} LPA</span>
                                </div>
                                <div className="flex flex-col bg-[#faf9f6]/50 p-2.5 rounded-lg border border-black/5">
                                  <span className="font-mono text-[8.5px] text-black/40 uppercase">MEDIAN PACKAGE</span>
                                  <span className="font-display font-black text-sm text-black">{details?.medianPackage} LPA</span>
                                </div>
                                <div className="flex flex-col bg-[#faf9f6]/50 p-2.5 rounded-lg border border-black/5">
                                  <span className="font-mono text-[8.5px] text-black/40 uppercase">ANNUAL FEES</span>
                                  <span className="font-display font-black text-sm text-black">₹{details?.annualFees.toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col bg-[#faf9f6]/50 p-2.5 rounded-lg border border-black/5">
                                  <span className="font-mono text-[8.5px] text-black/40 uppercase">HOSTEL / LIFE</span>
                                  <span className="font-display font-black text-sm text-black">₹{details?.hostelFees.toLocaleString()}</span>
                                </div>
                                <div className="col-span-2 sm:col-span-4 flex items-center justify-between flex-wrap gap-2 bg-black/[0.02] p-2.5 rounded-lg border border-black/5 text-xs font-sans font-bold uppercase text-black/60">
                                  <span>Location: <span className="text-black font-black">{details?.city}, {details?.state}</span></span>
                                  <span>Placement Rate: <span className="text-[#34a853] font-black">{details?.placementRate}%</span></span>
                                  <span>Campus Rating: <span className="text-black font-black">{"★".repeat(details?.rating || 3)}{"☆".repeat(5 - (details?.rating || 3))}</span></span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-2 border-black bg-white p-3.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mt-2">
                    <span className="font-sans text-[10px] font-black uppercase text-black/55">
                      PAGE {currentPage} OF {totalPages} ({sortedColleges.length} MATCHES)
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3.5 py-1.5 border-2 border-black bg-white rounded-lg font-display font-black text-[10px] tracking-wider hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px]"
                      >
                        ◄ PREV
                      </button>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3.5 py-1.5 border-2 border-black bg-white rounded-lg font-display font-black text-[10px] tracking-wider hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px]"
                      >
                        NEXT ►
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Choice Optimizer Tab */}
            {activeTab === "optimizer" && (
              <motion.div
                key="optimizer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6 flex-grow"
              >
                <div className="flex items-center justify-between border-b-2 border-dashed border-black/15 pb-4">
                  <div>
                    <h2 className="font-display font-black text-2xl tracking-wider text-black uppercase">CHOICE OPTIMIZER</h2>
                    <p className="font-sans text-[11px] font-bold text-black/55 uppercase tracking-wider">
                      Design your option preference list and run safety zone sorting audits.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={runListAudit}
                      className="px-4 py-2.5 bg-white text-black border-2 border-black rounded-xl font-display font-black text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1.5px] active:translate-y-[1.5px] transition-all cursor-pointer hover:bg-black/5"
                    >
                      📋 ANALYZE LIST
                    </button>
                    <button
                      onClick={runAiOptimizer}
                      disabled={isOptimizing || choices.length <= 1}
                      className={`px-5 py-2.5 bg-[#ff5722] text-white border-2 border-black rounded-xl font-display font-black text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer ${
                        isOptimizing || choices.length <= 1 ? "opacity-50 cursor-not-allowed shadow-none" : ""
                      }`}
                    >
                      {isOptimizing ? "OPTIMIZING..." : "✨ AI AUTO-OPTIMIZE"}
                    </button>
                  </div>
                </div>

                {/* Main list workspace */}
                <div className="bg-white border-3 border-black p-6 rounded-[28px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] doodle-border flex flex-col flex-grow relative overflow-hidden min-h-[440px]">
                  <span className="font-display font-black text-[10px] tracking-widest text-[#ff5722] uppercase mb-4 block">
                    LOCK PREFERENCE ORDER
                  </span>

                  {/* Whiteboard loading overlay during AI optimization */}
                  <AnimatePresence>
                    {isOptimizing && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-6"
                      >
                        {/* Wiggle spinner */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          className="w-16 h-16 relative"
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-black stroke-[4] overflow-visible">
                            <circle cx="50" cy="50" r="40" strokeDasharray="60 180" />
                          </svg>
                        </motion.div>
                        <span className="font-display font-black text-sm tracking-widest text-[#ff5722] mt-6 uppercase animate-pulse">
                          {optimizeStatusText}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Optimize success alert */}
                  {optimizeSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#34a853]/15 text-[#34a853] border-2 border-[#34a853] p-3.5 rounded-xl font-display font-black text-xs tracking-wider uppercase mb-4 flex items-center justify-between"
                    >
                      <span>✓ List reordered dynamically using mathematical safety margin audits!</span>
                      <button onClick={() => setOptimizeSuccess(false)} className="font-black text-sm cursor-pointer ml-3">✕</button>
                    </motion.div>
                  )}

                  {/* Choice stack */}
                  <div className="flex flex-col gap-3.5 max-h-[340px] overflow-y-auto pr-1">
                    {choices.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-black/25 rounded-2xl font-sans text-xs font-bold text-black/50 uppercase">
                        YOUR CHOICE PREFERENCE LIST IS EMPTY. ADD OPTIONS IN THE PREDICTOR TAB!
                      </div>
                    ) : (
                      choices.map((item, index) => (
                        <div 
                          key={item.id}
                          className={`border-2 border-black p-4 rounded-xl flex items-center justify-between gap-4 transition-all ${
                            item.locked ? "bg-black/[0.03] border-dashed" : "bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col gap-[3px] opacity-25">
                              <div className="flex gap-[3px]"><div className="w-1.5 h-1.5 rounded-full bg-black"></div><div className="w-1.5 h-1.5 rounded-full bg-black"></div></div>
                              <div className="flex gap-[3px]"><div className="w-1.5 h-1.5 rounded-full bg-black"></div><div className="w-1.5 h-1.5 rounded-full bg-black"></div></div>
                              <div className="flex gap-[3px]"><div className="w-1.5 h-1.5 rounded-full bg-black"></div><div className="w-1.5 h-1.5 rounded-full bg-black"></div></div>
                            </div>

                            <span className="font-display font-black text-sm text-[#ff5722] w-6 text-center">
                              #{item.priority}
                            </span>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-display font-black text-[12.5px] uppercase text-black">
                                  {item.institute}
                                </span>
                                <span className="text-[7.5px] font-mono font-black border border-black px-1 py-0.1 rounded uppercase tracking-wider text-black bg-black/[0.03]">
                                  {item.type}
                                </span>
                              </div>
                              <span className="font-sans text-[10px] font-bold text-black/55 uppercase">
                                {item.branch}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => moveChoice(index, "up")}
                              disabled={index === 0 || item.locked}
                              className="w-8 h-8 rounded-lg border-2 border-black bg-[#faf9f6] flex items-center justify-center font-black text-xs cursor-pointer hover:bg-black/5 disabled:opacity-35 disabled:cursor-not-allowed shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px]"
                            >
                              ▲
                            </button>
                            <button
                              onClick={() => moveChoice(index, "down")}
                              disabled={index === choices.length - 1 || item.locked}
                              className="w-8 h-8 rounded-lg border-2 border-black bg-[#faf9f6] flex items-center justify-center font-black text-xs cursor-pointer hover:bg-black/5 disabled:opacity-35 disabled:cursor-not-allowed shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px]"
                            >
                              ▼
                            </button>

                            <button
                              onClick={() => toggleLock(item.id)}
                              className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center text-xs cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] ${
                                item.locked ? "bg-black text-[#faf9f6]" : "bg-white text-black hover:bg-black/5"
                              }`}
                            >
                              {item.locked ? "🔒" : "🔓"}
                            </button>

                            <button
                              onClick={() => deleteChoice(item.id)}
                              className="w-8 h-8 rounded-lg border-2 border-black bg-[#ff3344]/10 text-[#ff3344] flex items-center justify-center text-xs cursor-pointer hover:bg-[#ff3344]/20 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px]"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Audit Sticky Note Results */}
                {auditResults?.showAudit && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-3 border-black bg-[#fffde7] p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative"
                  >
                    <button onClick={() => setAuditResults(null)} className="absolute top-3 right-4 font-display font-black text-xs cursor-pointer text-black/50 hover:text-black">✕ CLOSE</button>
                    <span className="font-display font-black text-xs tracking-widest text-[#ff5722] uppercase mb-3 block">📋 LIST STRATEGY AUDIT RESULTS</span>
                    
                    <div className="flex flex-col gap-3 font-sans text-xs font-bold uppercase text-black/85">
                      {auditResults.anomalies.length > 0 && (
                        <div className="flex flex-col">
                          <span className="text-[#ff3344] font-black">✔ Priority Anomalies Found:</span>
                          <ul className="list-disc pl-5 mt-1 text-[11px] text-[#ff3344]/90">
                            {auditResults.anomalies.map((a, i) => <li key={i}>{a}</li>)}
                          </ul>
                        </div>
                      )}
                      
                      {auditResults.safetyIssues.length > 0 && (
                        <div className="flex flex-col">
                          <span className="text-[#ff9900] font-black">⚠ Safety Failbacks Check:</span>
                          <ul className="list-disc pl-5 mt-1 text-[11px] text-[#ff9900]/90">
                            {auditResults.safetyIssues.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                      )}

                      {auditResults.anomalies.length === 0 && auditResults.safetyIssues.length === 0 && (
                        <span className="text-[#34a853] font-black">✓ No anomalies or safety issues found! Your choice ordering complies with top counseling standards.</span>
                      )}

                      <div className="flex flex-col border-t border-dashed border-black/15 pt-2 mt-1">
                        <span className="text-black/55">AI Agent Suggestions:</span>
                        <ul className="list-decimal pl-5 mt-1 text-[11px]">
                          {auditResults.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* AI Agents Chat Tab */}
            {activeTab === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6 flex-grow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-dashed border-black/15 pb-4 gap-4">
                  <div>
                    <h2 className="font-display font-black text-2xl tracking-wider text-black uppercase">AI SPECIALIST CHAT</h2>
                    <p className="font-sans text-[11px] font-bold text-black/55 uppercase tracking-wider">
                      Cycle between agents for target cutoff analyses and lock verification audits.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Agent Switch */}
                    <div className="flex flex-row gap-2 border-2 border-black bg-[#faf9f6] p-[2px] rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      {[
                        { id: "parser", label: "Agent Parser" },
                        { id: "trend", label: "Agent Trend" },
                        { id: "builder", label: "Agent Builder" }
                      ].map((agent) => (
                        <button
                          key={agent.id}
                          onClick={() => setActiveAgent(agent.id as any)}
                          className={`py-1.5 px-3 rounded-lg font-display font-black text-[9px] tracking-wider uppercase cursor-pointer transition-all duration-150 ${
                            activeAgent === agent.id
                              ? "bg-black text-[#faf9f6]"
                              : "bg-transparent text-black hover:bg-black/5"
                          }`}
                        >
                          {agent.label}
                        </button>
                      ))}
                    </div>

                    <button 
                      onClick={startAgentHuddle}
                      disabled={isTyping}
                      className="bg-white border-2 border-black text-[#0c0d0e] py-1.5 px-3.5 rounded-xl font-display font-black text-[10px] tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1.5px] active:translate-y-[1.5px] cursor-pointer hover:bg-black/5 disabled:opacity-50"
                    >
                      🗣️ AGENT HUDDLE
                    </button>
                  </div>
                </div>

                {/* Conversation board */}
                <div className="bg-white border-3 border-black rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] doodle-border flex flex-col flex-grow min-h-[380px] justify-between relative overflow-hidden">
                  
                  {/* Messages Feed */}
                  <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px] mb-4 pr-1">
                    {messages.map((msg, idx) => (
                      <div 
                        key={idx}
                        className={`flex gap-3.5 max-w-[85%] ${
                          msg.sender === "user" ? "ml-auto flex-row-reverse items-end" : "mr-auto flex-row items-start"
                        }`}
                      >
                        {msg.sender === "agent" && (
                          <div className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {msg.agentName === "Agent Parser" && "🔍"}
                            {msg.agentName === "Agent Trend Engine" && "📈"}
                            {msg.agentName === "Agent Builder" && "🛠️"}
                          </div>
                        )}

                        <div className="flex flex-col">
                          {msg.sender === "agent" && (
                            <span className="font-display font-black text-[9px] tracking-wider text-[#ff5722] uppercase mb-1">
                              {msg.agentName}
                            </span>
                          )}
                          <div 
                            className={`p-3.5 border-2 border-black rounded-2xl shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] font-sans text-xs font-bold leading-relaxed uppercase ${
                              msg.sender === "user"
                                ? "bg-[#ff5722]/10 text-black rounded-tr-none"
                                : "bg-[#faf9f6] text-[#0c0d0e] rounded-tl-none"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Typing state */}
                    {isTyping && (
                      <div className="flex gap-3.5 mr-auto flex-row items-start">
                        <div className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          💬
                        </div>
                        <div className="flex flex-col">
                          <span className="font-display font-black text-[9px] tracking-wider text-[#ff5722] uppercase mb-1">AI Agent</span>
                          <div className="p-3.5 border-2 border-black rounded-2xl shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] bg-[#faf9f6] flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" style={{ animationDelay: "0ms" }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" style={{ animationDelay: "150ms" }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" style={{ animationDelay: "300ms" }}></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendMessage} className="flex gap-3 mt-auto border-t-2 border-dashed border-black/15 pt-4">
                    <input 
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask the AI agents about IIT cutoffs, state quota rules..."
                      className="flex-grow border-2 border-black rounded-xl px-4 py-2.5 font-sans font-bold text-xs bg-[#faf9f6] text-[#0c0d0e] focus:outline-none focus:ring-0 focus:border-[#ff5722] transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isTyping}
                      className="bg-[#ff5722] text-[#faf9f6] border-2 border-black px-6 py-2 rounded-xl font-display font-black text-xs tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer disabled:opacity-50"
                    >
                      SEND
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Certified Reports Tab */}
            {activeTab === "reports" && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6 flex-grow"
              >
                <div className="flex items-center justify-between border-b-2 border-dashed border-black/15 pb-4 no-print">
                  <div>
                    <h2 className="font-display font-black text-2xl tracking-wider text-black uppercase">STRATEGY PDF REPORTS</h2>
                    <p className="font-sans text-[11px] font-bold text-black/55 uppercase tracking-wider">
                      Export your locked option preference order as a certified JoSAA counseling blueprint.
                    </p>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 bg-white text-black border-2 border-black rounded-xl font-display font-black text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1.5px] active:translate-y-[1.5px] transition-all cursor-pointer hover:bg-black/5"
                  >
                    🖨️ PRINT SHEET
                  </button>
                </div>

                {/* Whiteboard certified document */}
                <div className="bg-white border-3 border-black p-8 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] doodle-border-lg relative flex flex-col items-center max-w-2xl mx-auto w-full overflow-hidden print-card">
                  
                  {/* Security watermark/stamp */}
                  <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-3 border-dashed border-[#34a853]/30 flex items-center justify-center text-[#34a853]/30 rotate-[15deg] pointer-events-none font-display font-black text-[10px] tracking-widest select-none uppercase">
                    VERIFIED_LOCK
                  </div>

                  {/* Document header */}
                  <span className="font-display font-black text-xs tracking-wider text-[#ff5722] uppercase">
                    CounselAI Strategy Allocation Sheet
                  </span>
                  
                  <div className="w-full border-b-2 border-dashed border-black/15 my-4"></div>

                  <div className="w-full grid grid-cols-2 gap-4 text-left font-sans text-xs font-bold text-black/60 uppercase">
                    <div>Student Name: <span className="text-black font-black">Aarav Sharma</span></div>
                    <div>JEE CRL Rank: <span className="text-black font-black">{rankInput.toLocaleString()}</span></div>
                    <div>Category: <span className="text-black font-black">{category}</span></div>
                    <div>Quota / Pool: <span className="text-black font-black">{quota} // {gender} ({homeState})</span></div>
                  </div>

                  <div className="w-full border-b-2 border-dashed border-black/15 my-4"></div>

                  {/* Preference list summarized */}
                  <div className="w-full flex flex-col gap-2.5">
                    {choices.slice(0, 5).map((c) => {
                      const calc = calculatedColleges.find(col => col.id === c.id);
                      return (
                        <div key={c.id} className="flex justify-between items-center text-left font-sans text-[11px] font-bold uppercase">
                          <div className="flex gap-2">
                            <span className="text-[#ff5722] font-black">#{c.priority}</span>
                            <span className="text-black/80">{c.institute} — {c.branch}</span>
                          </div>
                          <span className="text-black font-black text-[10px] tracking-widest uppercase border border-black/10 px-1.5 py-0.5 rounded bg-black/[0.03]">
                            {calc?.safety || "moderate"}
                          </span>
                        </div>
                      );
                    })}
                    {choices.length > 5 && (
                      <div className="text-left font-sans text-[10.5px] font-bold text-black/40 uppercase italic">
                        + {choices.length - 5} more locked choice options included in blueprint dataset...
                      </div>
                    )}
                  </div>

                  <div className="w-full border-b-2 border-dashed border-black/15 my-5"></div>

                  {/* Barcode and signatures */}
                  <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Barcode */}
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-6 bg-[repeating-linear-gradient(to_right,black,black_2px,transparent_2px,transparent_6px,black_6px,black_10px)] opacity-70"></div>
                      <span className="font-mono text-[7px] text-black/55 tracking-widest mt-1">SECURE_REF: {rankInput * 3}</span>
                    </div>

                    {/* Signature */}
                    <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                      <span className="font-display font-black text-[11px] tracking-wider text-black">A. Verma</span>
                      <span className="font-sans text-[8px] font-bold text-black/40 uppercase">Certified AI Counsel Representative</span>
                    </div>
                  </div>

                  {/* Export Trigger */}
                  <div className="w-full mt-8 no-print">
                    {isExporting ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-full bg-black/5 border-2 border-black h-4 rounded-xl overflow-hidden relative">
                          <motion.div 
                            className="bg-[#34a853] h-full"
                            style={{ width: `${exportProgress}%` }}
                          />
                        </div>
                        <span className="font-display font-black text-[10px] tracking-widest text-[#34a853] uppercase">
                          GENERATING PDF BLUEPRINT ({exportProgress}%)
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={handleExportReport}
                        className="w-full bg-[#ff5722] text-[#faf9f6] border-2 border-black py-3 px-6 font-display font-black text-xs tracking-widest hover:scale-[1.01] active:translate-x-[2px] active:translate-y-[2px] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer rounded-xl"
                      >
                        EXPORT CERTIFIED BLUEPRINT PDF →
                      </button>
                    )}
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
