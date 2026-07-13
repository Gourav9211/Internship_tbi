import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { 
  FaPlay, 
  FaPause, 
  FaVolumeMute, 
  FaVolumeUp, 
  FaExpand, 
  FaTimes 
} from "react-icons/fa";

const WatchTrailer = ({ onClose }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isHoveredControls, setIsHoveredControls] = useState(false);

  // Stagger entry transitions on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background overlay fade in
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      // Video box slide up
      gsap.fromTo(
        ".video-box",
        { scale: 0.8, y: 100, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );
    }, containerRef);

    // Auto-play the video when opened
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay blocked by browser. User action required.", err);
      });
    }

    // Keyboard controls listener
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }, []);

  // Update time and duration metadata
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Play/Pause controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Skip/Seek progress
  const handleProgressClick = (e) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      videoRef.current.currentTime = percentage * duration;
      setCurrentTime(percentage * duration);
    }
  };

  // Volume slider control
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  // Mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (nextMuted) {
        videoRef.current.volume = 0;
      } else {
        videoRef.current.volume = volume || 0.5;
      }
    }
  };

  // Expand / Fullscreen
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  // Format MM:SS strings
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // GSAP Exit animation
  const handleClose = () => {
    // Pause video
    if (videoRef.current) {
      videoRef.current.pause();
    }
    gsap.to(".video-box", {
      scale: 0.8,
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    });
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: onClose
    });
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex size-full items-center justify-center overflow-hidden bg-black/95 backdrop-blur-md"
    >
      {/* Background ambient light match glow */}
      <div className="pointer-events-none absolute inset-0 z-0 animate-pulse bg-[radial-gradient(circle_at_center,#5542ff/20,transparent_60%)] opacity-40" />

      {/* Top Header Close button */}
      <div className="absolute inset-x-6 top-6 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="logo" className="size-8" />
          <span className="font-zentry text-lg font-bold tracking-widest text-violet-300">ZENTRY TRAILER</span>
        </div>
        <button
          onClick={handleClose}
          id="close-trailer-btn"
          className="group flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 hover:scale-110 hover:bg-white/20 active:scale-95"
        >
          <FaTimes className="transition-transform duration-500 group-hover:rotate-90" />
        </button>
      </div>

      {/* Cinematic Aspect-Ratio Video Container */}
      <div className="video-box relative z-10 aspect-video w-full max-w-5xl px-4 md:px-0">
        
        {/* Border Glow element */}
        <div className="absolute -inset-0.5 z-0 rounded-2xl bg-gradient-to-r from-violet-500/30 to-indigo-500/30 opacity-75 blur transition duration-1000 group-hover:opacity-100" />

        <div 
          className="relative flex size-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
          onMouseEnter={() => setIsHoveredControls(true)}
          onMouseLeave={() => setIsHoveredControls(false)}
        >
          {/* Main Video Frame */}
          <video
            ref={videoRef}
            src="/videos/hero-1.mp4"
            loop
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="size-full cursor-pointer object-contain"
          />

          {/* Large Center Play Indicator (when paused) */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute z-20 flex size-20 cursor-pointer items-center justify-center rounded-full bg-yellow-300 text-2xl text-black shadow-lg transition duration-300 hover:scale-110 active:scale-95"
            >
              <FaPlay className="ml-1" />
            </div>
          )}

          {/* Custom controls bar overlay */}
          <div 
            className={`absolute inset-x-0 bottom-0 z-20 flex flex-col gap-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-6 pt-16 transition-all duration-500 ease-in-out ${
              isHoveredControls || !isPlaying ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
            }`}
          >
            {/* Custom Seek Progress Slider */}
            <div className="flex w-full flex-col gap-1">
              <div 
                ref={progressBarRef}
                onClick={handleProgressClick}
                className="group relative h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/10 transition-all duration-200 hover:h-2.5"
              >
                <div 
                  className="relative h-full bg-violet-400 transition-all duration-100"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 size-3 -translate-y-1/2 scale-0 rounded-full bg-white transition duration-200 group-hover:scale-100" />
                </div>
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between">
              
              {/* Left Play/Pause and Time status */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={togglePlay} 
                  className="cursor-pointer text-white transition duration-200 hover:text-yellow-300 focus:outline-none"
                >
                  {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                </button>

                <div className="font-mono text-xs text-neutral-400">
                  <span>{formatTime(currentTime)}</span>
                  <span className="mx-1">/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Right Volume slider & Fullscreen */}
              <div className="flex items-center gap-6">
                
                {/* Volume Slider Section */}
                <div className="group/vol flex items-center gap-2">
                  <button 
                    onClick={toggleMute} 
                    className="cursor-pointer text-white transition duration-200 hover:text-yellow-300 focus:outline-none"
                  >
                    {isMuted || volume === 0 ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="h-1 w-0 cursor-pointer appearance-none rounded-lg bg-white/20 accent-violet-400 opacity-0 transition-all duration-300 group-hover/vol:w-20 group-hover/vol:opacity-100"
                  />
                </div>

                <button 
                  onClick={toggleFullscreen} 
                  className="cursor-pointer text-white transition duration-200 hover:text-yellow-300 focus:outline-none"
                >
                  <FaExpand size={16} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchTrailer;
