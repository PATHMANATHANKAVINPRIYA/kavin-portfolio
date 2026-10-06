"use client";

import { useLayoutEffect, useState, useEffect } from "react";

const STORAGE_KEY = "global-loader-played";
const DURATION = 2500;
const FADE_DURATION = 600;

export default function GlobalLoader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible");

  useLayoutEffect(() => {
    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}

    if (alreadyPlayed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync read of sessionStorage must set phase before paint
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
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      setPhase("fading");
      setTimeout(() => setPhase("hidden"), FADE_DURATION);
    }, DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      data-global-loader
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex items-center justify-center w-56 h-56">
        {/* Spinning ring */}
        <svg className="absolute inset-0 animate-spin" viewBox="0 0 224 224" fill="none">
          <circle cx="112" cy="112" r="104" stroke="#1a2e1a" strokeWidth="8" />
          <circle
            cx="112" cy="112" r="104"
            stroke="#a3e635"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="653"
            strokeDashoffset="490"
          />
        </svg>

        {/* GIF in center */}
        <div className="rounded-full bg-white/10 p-1">
          <video
            src="/loading.mp4"
            className="h-40 w-40 rounded-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
}
