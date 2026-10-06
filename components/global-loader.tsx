"use client";

import { useLayoutEffect, useState, useEffect } from "react";

const STORAGE_KEY = "global-loader-played";
const DURATION = 2500;
const FADE_DURATION = 600;

export default function GlobalLoader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible");
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}

    if (alreadyPlayed) {
      setPhase("hidden");
      document.documentElement.setAttribute("data-loader", "off");
      return;
    }

    document.body.style.overflow = "hidden";
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "visible") return;

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        document.body.style.overflow = "";
        setPhase("fading");
        setTimeout(() => setPhase("hidden"), FADE_DURATION);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  if (phase === "hidden") return null;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      data-global-loader
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Spinning ring */}
      <div className="relative flex items-center justify-center">
        <svg width="140" height="140" className="-rotate-90">
          {/* track */}
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke="#1a2e1a"
            strokeWidth="8"
          />
          {/* progress arc */}
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke="#a3e635"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>

        {/* percentage in center */}
        <span
          className="absolute text-2xl font-bold tabular-nums"
          style={{ color: "#a3e635" }}
        >
          {progress}%
        </span>
      </div>

      {/* label */}
      <p className="mt-4 text-sm tracking-widest uppercase text-white/50">
        Loading
      </p>
    </div>
  );
}
