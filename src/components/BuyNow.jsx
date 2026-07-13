import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TiLocationArrow } from "react-icons/ti";
import { FaChevronLeft, FaCheck, FaCreditCard, FaLock } from "react-icons/fa";
import { BentoTilt } from "./Features";
import AnimatedTitle from "./AnimatedTitle";

const PRODUCTS = [
  {
    id: "access-pass",
    title: "zentry p<b>a</b>ss",
    price: 99,
    ethPrice: "0.05",
    description: "Begin your adventure. Unlock the core play-to-earn features and Zentry Nexus social hub access.",
    badge: "Starter",
    features: ["Nexus Portal Access", "Basic Multiplier (1.0x)", "Weekly Drops"]
  },
  {
    id: "obsidian-key",
    title: "obsidian k<b>e</b>y",
    price: 299,
    ethPrice: "0.15",
    description: "Secure priority drops. Includes 2.5x infusion multiplier and priority whitelisting for upcoming realms.",
    badge: "Most Popular",
    features: ["Priority Nexus Access", "Infusion Multiplier (2.5x)", "Exclusive Partner Drops", "Alpha WL Access"]
  },
  {
    id: "zent-bundle",
    title: "zent b<b>u</b>ndle",
    price: 149,
    ethPrice: "0.08",
    description: "Get 5,000 $ZENT tokens directly infused. Ready for staking and governance voting in the metagame portal.",
    badge: "Token Pack",
    features: ["5,000 $ZENT Tokens", "Immediate Infusion", "Governance Rights", "Staking Ready"]
  }
];

const BuyNow = ({ onClose, preSelectedProductId }) => {
  const [selectedProduct, setSelectedProduct] = useState(() => {
    if (preSelectedProductId) {
      const found = PRODUCTS.find((p) => p.id === preSelectedProductId);
      if (found) return found;
    }
    return PRODUCTS[1]; // Default to Obsidian Key
  });
  const [email, setEmail] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const pageContainerRef = useRef(null);
  const successContainerRef = useRef(null);

  // Stagger entry animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageContainerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power4.out" }
      );

      gsap.fromTo(
        ".animate-reveal",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.04, ease: "power2.out", delay: 0.2 }
      );
    }, pageContainerRef);
    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    gsap.to(pageContainerRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.35,
      ease: "power3.inOut",
      onComplete: onClose
    });
  };

  // Format Card Number (space separation every 4 digits)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let formatted = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += " ";
      formatted += value[i];
    }
    setCardNumber(formatted.substring(0, 19));
  };

  // Format Expiration Date (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setExpiry(value.substring(0, 5));
  };

  // Handle card security code input (max 4 digits)
  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, "");
    setCvc(value.substring(0, 4));
  };

  // Simulate Payment Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validation checks
    if (!email || !cardName || !cardNumber || !expiry || !cvc) {
      setErrorMsg("Please fill in all payment details.");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length < 13) {
      setErrorMsg("Card number is invalid.");
      return;
    }

    const expiryMatch = expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/);
    if (!expiryMatch) {
      setErrorMsg("Expiry must be in MM/YY format.");
      return;
    }

    if (cvc.length < 3) {
      setErrorMsg("Security code (CVC) is invalid.");
      return;
    }

    setIsProcessing(true);

    // Simulate network latency
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Animate success screen entrance
      setTimeout(() => {
        if (successContainerRef.current) {
          gsap.fromTo(
            successContainerRef.current.querySelectorAll(".animate-success-item"),
            { scale: 0.8, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }
          );
        }
      }, 50);
    }, 1800);
  };

  return (
    <div 
      ref={pageContainerRef}
      className="relative min-h-screen w-screen overflow-x-hidden bg-black px-4 py-16 text-blue-50 md:px-10"
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,#5542ff/25,transparent_50%)] opacity-30" />

      {/* Main Flow: Selection and Form */}
      {!isSuccess ? (
        <div className="container relative z-10 mx-auto max-w-6xl">
          {/* Header Bar */}
          <div className="animate-reveal mb-10 flex items-center justify-between border-b border-white/10 pb-6">
            <button
              onClick={handleClose}
              id="back-home-btn"
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
          <div className="animate-reveal mb-16 text-center">
            <p className="font-general text-xs uppercase tracking-widest text-violet-300">
              The Metagame Ledger
            </p>
            <h1 className="special-font hero-heading mt-2 text-blue-700">
              SECURE YOUR <b>E</b>NTRY
            </h1>
          </div>

          {/* Checkout Grid */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            
            {/* Left: Product Selection (7 Cols) */}
            <div className="animate-reveal flex flex-col gap-6 lg:col-span-7">
              <h2 className="font-general text-lg font-semibold uppercase tracking-wider text-neutral-400">
                1. Select your Package
              </h2>
              
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {PRODUCTS.map((prod) => {
                  const isSelected = selectedProduct.id === prod.id;
                  return (
                    <BentoTilt 
                      key={prod.id} 
                      className={`cursor-pointer rounded-2xl transition-all duration-300 ${
                        isSelected 
                          ? "bg-neutral-900/80 shadow-[0_0_30px_rgba(85,66,255,0.2)] ring-2 ring-violet-400" 
                          : "border border-white/5 bg-neutral-900/30 hover:border-white/20"
                      }`}
                    >
                      <div 
                        onClick={() => setSelectedProduct(prod)}
                        className="flex h-[360px] flex-col justify-between p-5"
                        id={`prod-card-${prod.id}`}
                      >
                        <div>
                          {/* Badge */}
                          <div className="mb-4 flex items-center justify-between">
                            <span className={`rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider ${
                              isSelected 
                                ? "border border-violet-400/30 bg-violet-400/20 text-violet-300" 
                                : "border border-white/10 bg-white/5 text-neutral-400"
                            }`}>
                              {prod.badge}
                            </span>
                            {isSelected && (
                              <div className="flex size-4 items-center justify-center rounded-full bg-violet-400">
                                <FaCheck className="text-[8px] text-black" />
                              </div>
                            )}
                          </div>

                          {/* Title */}
                          <h3 
                            className="special-font mb-2 text-2xl font-black font-zentry uppercase leading-none text-white md:text-3xl animate-reveal"
                            dangerouslySetInnerHTML={{ __html: prod.title }}
                          />
                          
                          {/* Description */}
                          <p className="mt-2 font-circular-web text-xs leading-relaxed text-neutral-400">
                            {prod.description}
                          </p>
                        </div>

                        {/* Bottom stats/pricing */}
                        <div className="mt-6 border-t border-white/5 pt-4">
                          <p className="font-general text-[10px] uppercase text-neutral-500">Price</p>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="font-zentry text-3xl font-black text-yellow-300">
                              ${prod.price}
                            </span>
                            <span className="font-general text-xs text-neutral-500">
                              (~{prod.ethPrice} ETH)
                            </span>
                          </div>
                        </div>
                      </div>
                    </BentoTilt>
                  );
                })}
              </div>

              {/* Package Details / Features Bulletpoints */}
              <div className="mt-4 rounded-2xl border border-white/5 bg-neutral-900/20 p-6">
                <h4 className="mb-4 font-general text-sm uppercase tracking-wider text-violet-300">
                  Included with this tier:
                </h4>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {selectedProduct.features.map((feat, index) => (
                    <li key={index} className="flex items-center gap-3 font-circular-web text-xs text-neutral-300">
                      <div className="flex size-4 items-center justify-center rounded-full border border-violet-400/30 bg-violet-400/10">
                        <FaCheck className="text-[8px] text-violet-300" />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Checkout Billing Form (5 Cols) */}
            <div className="animate-reveal lg:col-span-5">
              <h2 className="mb-6 font-general text-lg font-semibold uppercase tracking-wider text-neutral-400">
                2. Payment Details
              </h2>
              
              <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur-md md:p-8">
                
                {/* Product Summary */}
                <div className="mb-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <span className="font-general text-[9px] uppercase tracking-widest text-neutral-500">Selected Product</span>
                    <h4 
                      className="mt-0.5 font-zentry text-lg font-bold text-white"
                      dangerouslySetInnerHTML={{ __html: selectedProduct.title }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="font-general text-[9px] uppercase tracking-widest text-neutral-500">Total Due</span>
                    <h4 className="mt-0.5 font-zentry text-xl font-bold text-yellow-300">${selectedProduct.price}</h4>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label 
                      htmlFor="email" 
                      className="font-general text-[10px] uppercase tracking-wider text-neutral-500"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="noble_warrior@realm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 font-circular-web text-sm transition duration-300 placeholder:text-neutral-700 focus:border-violet-400 focus:outline-none"
                    />
                  </div>

                  {/* Card Name */}
                  <div className="flex flex-col gap-2">
                    <label 
                      htmlFor="cc-name" 
                      className="font-general text-[10px] uppercase tracking-wider text-neutral-500"
                    >
                      Cardholder Name
                    </label>
                    <input
                      id="cc-name"
                      type="text"
                      name="cc-name"
                      autoComplete="cc-name"
                      required
                      maxLength="50"
                      pattern="[\p{L} \-\.]+"
                      placeholder="ARTHUR PENDRAGON"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 font-circular-web text-sm uppercase transition duration-300 placeholder:text-neutral-700 focus:border-violet-400 focus:outline-none"
                    />
                  </div>

                  {/* Card Number */}
                  <div className="flex flex-col gap-2">
                    <label 
                      htmlFor="cc-number" 
                      className="font-general text-[10px] uppercase tracking-wider text-neutral-500"
                    >
                      Card Number
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="cc-number"
                        type="text"
                        name="cc-number"
                        autoComplete="cc-number"
                        inputMode="numeric"
                        maxLength="19"
                        pattern="[\d ]{13,19}"
                        required
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-5 pr-12 font-circular-web text-sm transition duration-300 placeholder:text-neutral-700 focus:border-violet-400 focus:outline-none"
                      />
                      <FaCreditCard className="absolute right-4 text-neutral-600" />
                    </div>
                  </div>

                  {/* Expiry & CVC Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label 
                        htmlFor="cc-exp" 
                        className="flex justify-between font-general text-[10px] uppercase tracking-wider text-neutral-500"
                      >
                        <span>Expiry Date</span>
                        <span id="exp-hint" className="font-circular-web text-[9px] lowercase text-neutral-600">MM/YY</span>
                      </label>
                      <input
                        id="cc-exp"
                        type="text"
                        name="cc-exp"
                        autoComplete="cc-exp"
                        aria-describedby="exp-hint"
                        maxLength="5"
                        placeholder="12/28"
                        required
                        value={expiry}
                        onChange={handleExpiryChange}
                        className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center font-circular-web text-sm transition duration-300 placeholder:text-neutral-700 focus:border-violet-400 focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label 
                        htmlFor="cc-csc" 
                        className="font-general text-[10px] uppercase tracking-wider text-neutral-500"
                      >
                        CVC / CVV
                      </label>
                      <input
                        id="cc-csc"
                        type="text"
                        name="cc-csc"
                        autoComplete="cc-csc"
                        inputMode="numeric"
                        maxLength="4"
                        pattern="[0-9]{3,4}"
                        placeholder="123"
                        required
                        value={cvc}
                        onChange={handleCvcChange}
                        className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center font-circular-web text-sm transition duration-300 placeholder:text-neutral-700 focus:border-violet-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {errorMsg && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center font-circular-web text-xs text-red-400">
                      {errorMsg}
                    </div>
                  )}

                  {/* Security Note */}
                  <div className="flex items-center justify-center gap-2 py-1 font-circular-web text-[10px] text-neutral-500">
                    <FaLock className="text-[8px]" />
                    <span>SECURED SSL TRANSACTION GATEWAY</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="submit-payment"
                    disabled={isProcessing}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-yellow-300 py-4 font-general text-xs font-bold uppercase tracking-wider text-black transition duration-300 hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <div className="size-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        <span>Secure Package for ${selectedProduct.price}</span>
                        <TiLocationArrow className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Success Screen State */
        <div 
          ref={successContainerRef}
          className="container relative z-10 mx-auto flex max-w-xl flex-col items-center justify-center py-20 text-center"
        >
          {/* Pulsing Glowing Circle */}
          <div className="animate-success-item relative mb-8 flex size-24 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/10 shadow-[0_0_50px_rgba(85,66,255,0.4)]">
            <FaCheck className="animate-bounce text-3xl text-violet-300" />
            <div className="absolute inset-0 animate-ping rounded-full border border-violet-400/20 opacity-60" />
          </div>

          <div className="animate-success-item">
            <p className="font-general text-xs uppercase tracking-widest text-violet-300">
              Transaction Succeeded
            </p>
            <AnimatedTitle
              title="p<b>u</b>rchase s<b>e</b>cured"
              containerClass="mt-4 pointer-events-none relative z-10 font-zentry uppercase"
            />
          </div>

          <div className="animate-success-item mt-10 w-full space-y-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-6 text-left backdrop-blur-md">
            <h3 className="border-b border-white/5 pb-2 font-general text-xs uppercase tracking-widest text-neutral-400">
              Ledger Entry Summary
            </h3>
            
            <div className="flex items-center justify-between font-circular-web text-xs">
              <span className="text-neutral-500">Asset Acquired:</span>
              <span 
                className="font-bold uppercase text-white"
                dangerouslySetInnerHTML={{ __html: selectedProduct.title }}
              />
            </div>
            
            <div className="flex items-center justify-between font-circular-web text-xs">
              <span className="text-neutral-500">Player Wallet:</span>
              <span className="font-mono text-white">{email}</span>
            </div>

            <div className="flex items-center justify-between font-circular-web text-xs">
              <span className="text-neutral-500">Amount Charged:</span>
              <span className="font-general font-bold text-yellow-300">${selectedProduct.price}.00 USD</span>
            </div>

            <div className="flex items-center justify-between font-circular-web text-xs">
              <span className="text-neutral-500">Multiplier Activated:</span>
              <span className="font-general font-semibold text-violet-300">
                {selectedProduct.id === "obsidian-key" ? "2.5x Multiplier" : "Standard 1.0x"}
              </span>
            </div>
          </div>

          <div className="animate-success-item mt-12 w-full max-w-xs">
            <button
              onClick={handleClose}
              id="back-realms-btn"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-violet-400 py-4 font-general text-xs font-bold uppercase tracking-wider text-black transition duration-300 hover:bg-violet-300"
            >
              <span>Back to Realms</span>
              <TiLocationArrow />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyNow;
