"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

export function SplashScreen() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const particles = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2.5}s`,
        animationDuration: `${2.5 + Math.random() * 3}s`,
        width: `${1.5 + Math.random() * 2.5}px`,
        height: `${1.5 + Math.random() * 2.5}px`,
      })),
    []
  );

  useEffect(() => {
    // Smooth progress animation
    const startTime = Date.now();
    const duration = 2200;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const raw = Math.min(elapsed / duration, 1);
      // Ease-out cubic for natural feel
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));
      if (raw < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);

    const exitTimer = setTimeout(() => setPhase("exiting"), 2600);
    const doneTimer = setTimeout(() => setPhase("done"), 3400);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ${
        phase === "exiting"
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{ background: "radial-gradient(ellipse at center, #0d0d2b 0%, #050510 70%)" }}
    >
      {/* Animated aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="splash-blob splash-blob-1" />
        <div className="splash-blob splash-blob-2" />
        <div className="splash-blob splash-blob-3" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:clamp(30px,5vw,60px)_clamp(30px,5vw,60px)] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="splash-particle"
            style={p}
          />
        ))}
      </div>

      {/* Central content — fully responsive */}
      <div className="relative flex flex-col items-center z-10 px-4 w-full max-w-[90vw] sm:max-w-md">
        
        {/* Orbital rings — scale with viewport */}
        <div className="absolute w-[60vw] h-[60vw] sm:w-[320px] sm:h-[320px] max-w-[320px] max-h-[320px] rounded-full border border-indigo-500/[0.07] animate-spin-slow" />
        <div className="absolute w-[48vw] h-[48vw] sm:w-[250px] sm:h-[250px] max-w-[250px] max-h-[250px] rounded-full border border-violet-500/[0.06] animate-spin-reverse" />
        <div className="absolute w-[36vw] h-[36vw] sm:w-[180px] sm:h-[180px] max-w-[180px] max-h-[180px] rounded-full border border-indigo-400/[0.04] splash-orbit-pulse" />

        {/* Multi-layer glow behind logo */}
        <div className="absolute w-[40vw] h-[40vw] sm:w-44 sm:h-44 max-w-44 max-h-44 rounded-full bg-indigo-600/25 blur-[80px] splash-glow-pulse" />
        <div className="absolute w-[30vw] h-[30vw] sm:w-32 sm:h-32 max-w-32 max-h-32 rounded-full bg-violet-500/20 blur-[50px] splash-glow-pulse-alt" />
        <div className="absolute w-[20vw] h-[20vw] sm:w-20 sm:h-20 max-w-20 max-h-20 rounded-full bg-fuchsia-500/10 blur-[30px] splash-glow-pulse" />

        {/* Logo container with premium frame */}
        <div className="splash-logo-enter relative mb-6 sm:mb-8">
          {/* Outer rotating ring */}
          <div className="absolute -inset-4 sm:-inset-5 rounded-[2rem] sm:rounded-[2.5rem] border border-white/[0.06] splash-ring-rotate" />
          {/* Inner glow ring */}
          <div className="absolute -inset-2 sm:-inset-3 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10 splash-logo-float" />
          
          {/* Logo */}
          <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/40 ring-1 ring-white/[0.12] splash-logo-float">
            <Image
              src="/phygital_ultra_logo.png"
              alt="Phygital"
              width={96}
              height={96}
              className="w-full h-full object-contain"
              priority
            />
            {/* Shimmer sweep over logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent splash-shimmer-sweep" />
          </div>
        </div>

        {/* Brand text */}
        <div className="splash-text-enter flex flex-col items-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Phygital
          </h1>
          <p className="text-[10px] sm:text-xs font-bold text-white/25 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
            Physical × Digital
          </p>
        </div>

        {/* Premium progress indicator */}
        <div className="splash-bar-enter w-full max-w-[200px] sm:max-w-[240px] flex flex-col items-center gap-3 sm:gap-4">
          {/* Track */}
          <div className="w-full h-[2px] sm:h-[3px] rounded-full bg-white/[0.06] overflow-hidden relative">
            {/* Fill */}
            <div
              className="h-full rounded-full transition-[width] duration-100 ease-linear relative"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa, #6366f1)",
                backgroundSize: "200% 100%",
                animation: "splash-gradient-shift 1.5s linear infinite",
              }}
            >
              {/* Glowing tip */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60 blur-[3px]" />
            </div>
          </div>

          {/* Status row */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400 splash-dot-pulse" />
            <span className="text-[9px] sm:text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] sm:tracking-[0.25em]">
              Initializing Protocol
            </span>
          </div>
        </div>
      </div>

      {/* Bottom watermark — responsive positioning */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center z-10 splash-text-enter">
        <span className="text-[8px] sm:text-[9px] font-bold text-white/10 uppercase tracking-[0.5em]">
          Base Sepolia Network
        </span>
      </div>
    </div>
  );
}
