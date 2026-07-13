import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";
import { BentoTilt } from "./Features";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Vault = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakedBalance, setStakedBalance] = useState(1500);
  const [fragments, setFragments] = useState(3750);
  const [isStaking, setIsStaking] = useState(false);

  const galleryRef = useRef(null);

  const handleStake = (e) => {
    e.preventDefault();
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) return;

    setIsStaking(true);
    setStakeAmount("");

    // Simulate staking transaction
    setTimeout(() => {
      const newStaked = stakedBalance + amount;
      const rewardMultiplier = 2.5; // 2.5 fragments per $ZENT staked
      const additionalFragments = Math.floor(amount * rewardMultiplier);
      const newFragments = fragments + additionalFragments;

      // Animate numbers counting up
      animateCounter(stakedBalance, newStaked, setStakedBalance);
      animateCounter(fragments, newFragments, setFragments);

      setIsStaking(false);
    }, 1000);
  };

  const animateCounter = (start, end, setter) => {
    const obj = { value: start };
    gsap.to(obj, {
      value: end,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        setter(Math.floor(obj.value));
      },
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance scroll animation for gallery cards
      gsap.fromTo(
        ".vault-gallery-card",
        { y: 80, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtle float animation for asymmetry and interest
      gsap.to(".float-slow", {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.4,
      });

      gsap.to(".float-fast", {
        y: -8,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.25,
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="vault" className="relative min-h-screen w-screen bg-black py-24 text-blue-50 overflow-hidden">
      <div className="container mx-auto px-5 md:px-10">

        {/* Title Section */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="font-general text-sm uppercase tracking-widest text-violet-300 md:text-[10px]">
            The Staking and Rewards Portal
          </p>
          <AnimatedTitle
            title="the va<b>u</b>lt of z<b>e</b>nt"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
        </div>

        {/* Content Layout */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">

          {/* Staking Widget Dashboard (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <BentoTilt className="border-hsla bg-neutral-900/40 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between min-h-[450px]">
              <div>
                <h3 className="bento-title special-font text-3xl">
                  Infu<b>s</b>ion C<b>h</b>amber
                </h3>
                <p className="mt-3 text-xs md:text-sm text-neutral-400 font-circular-web leading-relaxed">
                  Infuse your $ZENT tokens into the Vault of Zent. Unlock mystical Fragments, gain access to exclusive partner airdrops, and secure priority whitelisting for upcoming realms.
                </p>

                {/* Staking Stats Grid */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-[10px] uppercase text-neutral-500 font-general">Staked $ZENT</p>
                    <h4 className="text-2xl font-black font-zentry mt-1 text-violet-300">
                      {stakedBalance.toLocaleString()}
                    </h4>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-[10px] uppercase text-neutral-500 font-general">Multiplier</p>
                    <h4 className="text-2xl font-black font-zentry mt-1 text-violet-300">2.5x</h4>
                  </div>
                  <div className="bg-white/5 border border-white/10 col-span-2 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase text-neutral-500 font-general">Fragments Earned</p>
                      <h4 className="text-3xl font-black font-zentry mt-1 text-yellow-300">
                        {fragments.toLocaleString()}
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-yellow-300/10 flex-center border border-yellow-300/30">
                      <span className="text-yellow-300 font-bold text-sm">✨</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stake Form */}
              <form onSubmit={handleStake} className="mt-8">
                <div className="flex flex-col gap-3">
                  <label htmlFor="stake-amount" className="text-[10px] uppercase text-neutral-500 font-general tracking-wider">
                    Enter $ZENT to Stake
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="stake-amount"
                      type="number"
                      placeholder="0.00"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      disabled={isStaking}
                      className="w-full bg-white/5 border border-white/10 focus:border-violet-400 focus:outline-none rounded-full px-5 py-3 text-sm placeholder:text-neutral-600 font-circular-web transition duration-300"
                    />
                    <button
                      type="submit"
                      disabled={isStaking || !stakeAmount}
                      className="absolute right-2 px-5 py-2 rounded-full bg-violet-400 text-black font-general text-xs uppercase font-semibold hover:bg-violet-300 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isStaking ? "Processing..." : "Infuse"}
                    </button>
                  </div>
                </div>
              </form>
            </BentoTilt>

            {/* Quick Rewards Claim Widget */}
            <BentoTilt className="border-hsla bg-neutral-900/40 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold font-general uppercase tracking-wider">Vault Drops Available</h4>
                <p className="text-xs text-neutral-500 font-circular-web mt-1">Claim your weekly staking bonus package.</p>
              </div>
              <Button
                id="claim-btn"
                title="Claim Drops"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-violet-300 text-black py-2.5 px-5 hover:bg-violet-400"
              />
            </BentoTilt>
          </div>

          {/* Collage Gallery Showcase (Right) */}
          <div ref={galleryRef} className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative w-full h-[550px] rounded-2xl bg-neutral-950/50 border border-white/5 overflow-hidden flex items-center justify-center p-8">

              {/* Floating Grid Collage */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent z-0" />

              {/* Gallery Image 4: Center Main Card */}
              <BentoTilt className="vault-gallery-card float-slow z-20 shadow-2xl relative">
                <div className="gallery-img-container gallery-img-4 overflow-hidden border border-white/10 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition duration-500" />
                  <img
                    src="/img/gallery-4.webp"
                    alt="Main Vault Drop"
                    className="gallery-img transition duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-[9px] uppercase tracking-widest text-violet-300">Featured Drop</p>
                    <h5 className="font-zentry text-lg font-bold">The Obsidian Key</h5>
                  </div>
                </div>
              </BentoTilt>

              {/* Gallery Image 1: Top Left */}
              <div className="absolute top-10 left-10 z-10 vault-gallery-card float-fast hidden sm:block">
                <BentoTilt>
                  <div className="gallery-img-container w-36 h-36 border border-white/10 rounded-lg group">
                    <img
                      src="/img/gallery-1.webp"
                      alt="Vault Drop 1"
                      className="gallery-img transition duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </BentoTilt>
              </div>

              {/* Gallery Image 2: Bottom Left */}
              <div className="absolute bottom-8 left-12 z-30 vault-gallery-card float-slow hidden sm:block">
                <BentoTilt>
                  <div className="gallery-img-container w-40 h-40 border border-white/10 rounded-lg group">
                    <img
                      src="/img/gallery-2.webp"
                      alt="Vault Drop 2"
                      className="gallery-img transition duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </BentoTilt>
              </div>

              {/* Gallery Image 3: Top Right */}
              <div className="absolute top-8 right-16 z-10 vault-gallery-card float-slow hidden sm:block">
                <BentoTilt>
                  <div className="gallery-img-container w-44 h-44 border border-white/10 rounded-lg group">
                    <img
                      src="/img/gallery-3.webp"
                      alt="Vault Drop 3"
                      className="gallery-img transition duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </BentoTilt>
              </div>

              {/* Gallery Image 5: Bottom Right */}
              <div className="absolute bottom-10 right-10 z-30 vault-gallery-card float-fast hidden sm:block">
                <BentoTilt>
                  <div className="gallery-img-container w-36 h-36 border border-white/10 rounded-lg group">
                    <img
                      src="/img/gallery-5.webp"
                      alt="Vault Drop 5"
                      className="gallery-img transition duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </BentoTilt>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Vault;
