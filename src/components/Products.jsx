import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TiLocationArrow } from "react-icons/ti";
import { FaChevronLeft, FaCheck } from "react-icons/fa";
import { BentoTilt } from "./Features";
import AnimatedTitle from "./AnimatedTitle";

const PRODUCT_ITEMS = [
  {
    id: "access-pass",
    title: "zentry p<b>a</b>ss",
    tagline: "Nexus Gate Key",
    price: "$99",
    ethPrice: "0.05 ETH",
    description: "Your foundational credential to enter the Play Economy. Unlock play-to-earn rewards, join the gamified social hub, and claim standard weekly drop allocations.",
    features: [
      "Access to Zentry Nexus Portal",
      "Standard Staking Rights",
      "Weekly Drop Package",
      "Basic Multiplier (1.0x)"
    ],
    buttonText: "Acquire Pass",
    isAvailable: true,
    bgClass: "from-violet-900/40 to-neutral-900/60"
  },
  {
    id: "obsidian-key",
    title: "obsidian k<b>e</b>y",
    tagline: "Alpha Infusion Core",
    price: "$299",
    ethPrice: "0.15 ETH",
    description: "The ultimate power booster for advanced players. Amplify your earnings with a permanent 2.5x infusion multiplier and secure guaranteed whitelists for partner airdrops.",
    features: [
      "Permanent 2.5x Multiplier",
      "Obsidian Level Key Drops",
      "Exclusive Alpha WL Priority",
      "Partner Airdrop Rewards"
    ],
    buttonText: "Acquire Key",
    isAvailable: true,
    isPopular: true,
    bgClass: "from-indigo-900/50 to-neutral-900/60"
  },
  {
    id: "zent-bundle",
    title: "zent b<b>u</b>ndle",
    tagline: "Token Starter Pack",
    price: "$149",
    ethPrice: "0.08 ETH",
    description: "Inject 5,000 $ZENT tokens directly into your vault balance. Instantly qualify for advanced portal tiers, stake to earn fragments, and vote on crucial metagame decisions.",
    features: [
      "5,000 $ZENT Tokens",
      "Immediate Vault Infusion",
      "Staking Fragment Booster",
      "DAO Governance Voting"
    ],
    buttonText: "Acquire Bundle",
    isAvailable: true,
    bgClass: "from-blue-900/40 to-neutral-900/60"
  },
  {
    id: "azul-companion",
    title: "az<b>u</b>l a<b>i</b>",
    tagline: "Autonomous Agent",
    price: "TBA",
    ethPrice: "Coming Soon",
    description: "A cross-world artificial intelligence companion tailored to elevate your daily gameplay. Analyzes stats, helps execute smart strategies, and automatically claims web drops.",
    features: [
      "Personal Autonomous Companion",
      "Stated-Based Strategy Insights",
      "Auto-Farming Smart Actions",
      "Customizable Avatar Shells"
    ],
    buttonText: "Coming Soon",
    isAvailable: false,
    bgClass: "from-emerald-950/20 to-neutral-900/60"
  }
];

const Products = ({ onClose, onBuyClick }) => {
  const containerRef = useRef(null);

  // Stagger entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power4.out" }
      );

      gsap.fromTo(
        ".animate-reveal-prod",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.04, ease: "power2.out", delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    gsap.to(containerRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.35,
      ease: "power3.inOut",
      onComplete: onClose
    });
  };

  const handleBuyClick = (productId) => {
    gsap.to(containerRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.35,
      ease: "power3.inOut",
      onComplete: () => onBuyClick(productId)
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-screen overflow-x-hidden bg-black px-4 py-16 text-blue-50 md:px-10"
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,#5542ff/20,transparent_50%)] opacity-20" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        {/* Header Bar */}
        <div className="animate-reveal-prod mb-10 flex items-center justify-between border-b border-white/10 pb-6">
          <button
            onClick={handleClose}
            id="back-home-products-btn"
            className="group flex items-center gap-2 font-general text-sm uppercase tracking-widest text-neutral-400 transition duration-300 hover:text-white"
          >
            <FaChevronLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to realms
          </button>
          <div className="flex items-center gap-3">
            <img src="/img/logo.png" alt="logo" className="size-8" />
            <span className="font-zentry text-xl font-bold tracking-widest text-violet-300">ZENTRY</span>
          </div>
        </div>

        {/* Heading */}
        <div className="animate-reveal-prod mb-16 text-center">
          <p className="font-general text-xs uppercase tracking-widest text-violet-300">
            Unleash the Play Economy
          </p>
          <AnimatedTitle
            title="the prod<b>u</b>ct<br />m<b>u</b>ltiverse"
            containerClass="pointer-events-none mt-2 relative z-10 font-zentry uppercase"
          />
        </div>

        {/* Products Grid */}
        <div className="animate-reveal-prod grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          {PRODUCT_ITEMS.map((item) => (
            <BentoTilt 
              key={item.id} 
              className={`rounded-3xl border border-white/5 bg-gradient-to-br ${item.bgClass} group relative flex flex-col justify-between overflow-hidden p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/10 md:p-10`}
            >
              {/* Popular Accent Glow */}
              {item.isPopular && (
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-violet-400/20 shadow-[inset_0_0_30px_rgba(85,66,255,0.15)]" />
              )}

              {/* Card Top */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-general text-[10px] uppercase tracking-wider text-violet-300">
                    {item.tagline}
                  </span>
                  {item.isPopular && (
                    <span className="rounded-full border border-violet-400/30 bg-violet-400/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-violet-300">
                      Top Tier
                    </span>
                  )}
                </div>

                <h3 
                  className="mb-4 font-zentry text-3xl font-black uppercase leading-none text-white md:text-4xl"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />

                <p className="mb-6 font-circular-web text-xs leading-relaxed text-neutral-400 md:text-sm">
                  {item.description}
                </p>

                {/* Features List */}
                <div className="mb-8 space-y-2 border-t border-white/5 pt-6">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 font-circular-web text-xs text-neutral-300">
                      <div className="flex size-4 items-center justify-center rounded-full border border-violet-400/25 bg-violet-400/10">
                        <FaCheck className="text-[8px] text-violet-300" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Bottom */}
              <div className="flex items-end justify-between border-t border-white/5 pt-6">
                <div>
                  <span className="block font-general text-[9px] uppercase tracking-wider text-neutral-500">Price</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-zentry text-3xl font-black text-yellow-300">{item.price}</span>
                    <span className="font-general text-[10px] text-neutral-500">{item.ethPrice}</span>
                  </div>
                </div>

                {item.isAvailable ? (
                  <button
                    onClick={() => handleBuyClick(item.id)}
                    id={`buy-btn-${item.id}`}
                    className="group flex items-center gap-2 rounded-full bg-yellow-300 px-6 py-3 font-general text-xs font-bold uppercase tracking-wider text-black transition duration-300 hover:bg-yellow-400"
                  >
                    <span>{item.buttonText}</span>
                    <TiLocationArrow className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    disabled
                    id={`buy-btn-${item.id}`}
                    className="flex cursor-not-allowed items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-general text-xs font-bold uppercase tracking-wider text-neutral-500"
                  >
                    <span>{item.buttonText}</span>
                  </button>
                )}
              </div>
            </BentoTilt>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
