"use client";

import { useLayoutEffect, useRef, useState } from "react";

const STORAGE_KEY = "global-loader-played";
const MAX_DURATION = 8000;
const FADE_DURATION = 600;

export default function GlobalLoader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible");
  const videoRef = useRef<HTMLVideoElement>(null);
  const doneRef = useRef(false);

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

    const video = videoRef.current;
    video?.play().catch(() => {});

    let fadeTimer: number | undefined;
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      window.clearTimeout(maxTimer);
      document.body.style.overflow = "";
      setPhase("fading");
      fadeTimer = window.setTimeout(() => setPhase("hidden"), FADE_DURATION);
    };

    const maxTimer = window.setTimeout(finish, MAX_DURATION);
    video?.addEventListener("ended", finish);

    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") finish();
    }
    window.addEventListener("keydown", onEscape);

    return () => {
      window.clearTimeout(maxTimer);
      window.clearTimeout(fadeTimer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
      video?.removeEventListener("ended", finish);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      data-global-loader
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src="/loading.mp4"
        playsInline
        preload="auto"
        className="max-h-[80vh] max-w-[80vw] object-contain"
      />
    </div>
  );
}
