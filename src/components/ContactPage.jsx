import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TiLocationArrow } from "react-icons/ti";
import { FaChevronLeft, FaCheck, FaEnvelope, FaExclamationTriangle } from "react-icons/fa";
import AnimatedTitle from "./AnimatedTitle";

const UPLINK_CHANNELS = [
  { id: "general", title: "General Inquiry", desc: "For basic questions regarding Zentry multiversal IP." },
  { id: "partnership", title: "Realm Partnership", desc: "For creators, brands, and developer integrations." },
  { id: "recruitment", title: "Guild Recruitment", desc: "For creators, moderators, and core contributors." },
  { id: "support", title: "Vault & Staking Support", desc: "For technical queries regarding $ZENT or Staking portal." }
];

const ContactPage = ({ onClose }) => {
  const [channel, setChannel] = useState(UPLINK_CHANNELS[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const containerRef = useRef(null);
  const successRef = useRef(null);

  // Stagger entry transitions on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power4.out" }
      );

      gsap.fromTo(
        ".animate-reveal-contact",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validation checks
    if (!name.trim()) {
      setErrorMsg("Player identification name is required.");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Email address is required to maintain the uplink.");
      return;
    }
    if (!message.trim()) {
      setErrorMsg("Transmission message content cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Success reveal animation
      setTimeout(() => {
        if (successRef.current) {
          gsap.fromTo(
            successRef.current.querySelectorAll(".animate-success-item"),
            { scale: 0.8, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }
          );
        }
      }, 50);
    }, 1800);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-screen overflow-x-hidden bg-black px-4 py-16 text-blue-50 md:px-10"
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,#5542ff/20,transparent_50%)] opacity-20" />

      {/* Close button */}
      <div className="animate-reveal-contact absolute inset-x-6 top-6 z-20 flex items-center justify-between">
        <button
          onClick={handleClose}
          id="back-home-contact-btn"
          className="group flex cursor-pointer items-center gap-2 border-none bg-transparent font-general text-sm uppercase tracking-widest text-neutral-400 transition duration-300 hover:text-white"
        >
          <FaChevronLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to realms
        </button>
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="logo" className="size-8" />
          <span className="font-zentry text-xl font-bold tracking-widest text-violet-300">ZENTRY</span>
        </div>
      </div>

      {!isSuccess ? (
        <div className="container relative z-10 mx-auto mt-12 max-w-6xl">
          {/* Page Title */}
          <div className="animate-reveal-contact mb-16 text-center">
            <p className="font-general text-xs uppercase tracking-widest text-violet-300">
              Establish Uplink Connection
            </p>
            <AnimatedTitle
              title="CONTACT THE <br /> METAGAME <b>A</b>UTHORITY"
              containerClass="pointer-events-none mt-2 relative z-10 font-zentry uppercase text-center"
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            
            {/* Left: Department Selector (6 cols) */}
            <div className="animate-reveal-contact flex flex-col gap-6 lg:col-span-6">
              <h2 className="font-general text-lg font-semibold uppercase tracking-wider text-neutral-400">
                1. Choose Uplink Channel
              </h2>

              <div className="flex flex-col gap-4">
                {UPLINK_CHANNELS.map((ch) => {
                  const isSelected = channel === ch.id;
                  return (
                    <div
                      key={ch.id}
                      onClick={() => setChannel(ch.id)}
                      className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-all duration-300 ${
                        isSelected 
                          ? "border-violet-400 bg-neutral-900/80 text-white shadow-[0_0_25px_rgba(85,66,255,0.15)]" 
                          : "border-white/5 bg-neutral-900/20 text-neutral-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex-1 pr-4">
                        <h3 className="font-general text-sm font-bold uppercase tracking-wider">
                          {ch.title}
                        </h3>
                        <p className="mt-1 font-circular-web text-xs leading-relaxed text-neutral-500">
                          {ch.desc}
                        </p>
                      </div>
                      
                      <div className={`flex size-5 items-center justify-center rounded-full border transition-all duration-300 ${
                        isSelected 
                          ? "border-violet-400 bg-violet-400" 
                          : "border-white/20 group-hover:border-white/40"
                      }`}>
                        {isSelected && <FaCheck className="text-[10px] text-black" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Message Details Form (6 cols) */}
            <div className="animate-reveal-contact lg:col-span-6">
              <h2 className="mb-6 font-general text-lg font-semibold uppercase tracking-wider text-neutral-400">
                2. Transmission Payload
              </h2>

              <div className="relative rounded-3xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur-md md:p-8">
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label 
                      htmlFor="full-name" 
                      className="font-general text-[10px] uppercase tracking-wider text-neutral-500"
                    >
                      Player Name
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="ARTHUR PENDRAGON"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 font-circular-web text-sm uppercase transition duration-300 placeholder:text-neutral-700 focus:border-violet-400 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label 
                      htmlFor="email-address" 
                      className="font-general text-[10px] uppercase tracking-wider text-neutral-500"
                    >
                      Email Address
                    </label>
                    <input
                      id="email-address"
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

                  {/* Message Payload */}
                  <div className="flex flex-col gap-2">
                    <label 
                      htmlFor="payload" 
                      className="font-general text-[10px] uppercase tracking-wider text-neutral-500"
                    >
                      Transmission Message
                    </label>
                    <textarea
                      id="payload"
                      name="message"
                      rows={5}
                      required
                      placeholder="State your business, player. May the Metagame rules guide your inquiry..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-circular-web text-sm transition duration-300 placeholder:text-neutral-700 focus:border-violet-400 focus:outline-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-circular-web text-xs text-red-400">
                      <FaExclamationTriangle className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Security/Access tag */}
                  <div className="flex items-center justify-center gap-2 py-1 font-circular-web text-[10px] text-neutral-500">
                    <FaEnvelope className="text-[8px] text-violet-400" />
                    <span>ENCRYPTED SECURE LINK TRANSMISSION TERMINAL</span>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-yellow-300 py-4 font-general text-xs font-bold uppercase tracking-wider text-black transition duration-300 hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="size-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        Initiating Uplink...
                      </span>
                    ) : (
                      <>
                        <span>Broadcast Transmission</span>
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
          ref={successRef}
          className="container relative z-10 mx-auto flex max-w-xl flex-col items-center justify-center py-20 text-center"
        >
          {/* Pulsing Hologram Glow */}
          <div className="animate-success-item relative mb-8 flex size-24 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/10 shadow-[0_0_50px_rgba(85,66,255,0.4)]">
            <FaCheck className="animate-bounce text-3xl text-violet-300" />
            <div className="absolute inset-0 animate-ping rounded-full border border-violet-400/20 opacity-60" />
          </div>

          <div className="animate-success-item">
            <p className="font-general text-xs uppercase tracking-widest text-violet-300">
              Transmission Confirmed
            </p>
            <AnimatedTitle
              title="uplink b<b>r</b>oadc<b>a</b>st"
              containerClass="mt-4 pointer-events-none relative z-10 font-zentry uppercase"
            />
          </div>

          <div className="animate-success-item mt-10 w-full space-y-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-6 text-left backdrop-blur-md">
            <h3 className="border-b border-white/5 pb-2 font-general text-xs uppercase tracking-widest text-neutral-400">
              Secure Ledger Transmission
            </h3>
            
            <div className="flex items-center justify-between font-circular-web text-xs">
              <span className="text-neutral-500">Transmitter Player:</span>
              <span className="font-bold uppercase text-white">{name}</span>
            </div>
            
            <div className="flex items-center justify-between font-circular-web text-xs">
              <span className="text-neutral-500">Uplink Gateway:</span>
              <span className="font-mono text-white">{email}</span>
            </div>

            <div className="flex items-center justify-between font-circular-web text-xs">
              <span className="text-neutral-500">Selected Channel:</span>
              <span className="font-general font-bold uppercase text-yellow-300">
                {UPLINK_CHANNELS.find((c) => c.id === channel)?.title}
              </span>
            </div>

            <div className="flex items-center justify-between font-circular-web text-xs">
              <span className="text-neutral-500">Transmission Status:</span>
              <span className="font-general font-semibold text-violet-300">ESTABLISHED & BROADCASTED</span>
            </div>
          </div>

          <div className="animate-success-item mt-12 w-full max-w-xs">
            <button
              onClick={handleClose}
              id="back-home-success-btn"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-violet-400 py-4 font-general text-xs font-bold uppercase tracking-wider text-black transition duration-300 hover:bg-violet-300"
            >
              <span>Return to realms</span>
              <TiLocationArrow />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
