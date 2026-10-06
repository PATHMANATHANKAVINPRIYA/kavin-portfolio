"use client"

import { CSSProperties, useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiLaravel,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiDocker,
  SiGit,
  SiGithubactions,
} from "react-icons/si";
import { ArrowRight } from "lucide-react";

import { SocialLinks } from "@/components/social-links";

const ROLES = [
  {
    title: "Full-Stack Developer",
    description:
      "I enjoy turning ideas into modern, scalable web applications — from responsive frontends to robust backends and deployment pipelines.",
    tagline: "I build things for the web.",
  },
  {
    title: "UI/UX Designer",
    description:
      "I design clean, intuitive interfaces that feel great to use — with clear layouts, smooth interactions and accessible experiences.",
    tagline: "I design things people enjoy using.",
  },
  {
    title: "Frontend Developer",
    description:
      "I build fast, responsive interfaces with React, Next.js and Tailwind CSS, turning designs into polished, interactive experiences.",
    tagline: "I bring interfaces to life.",
  },
  {
    title: "Backend Developer",
    description:
      "I build reliable APIs and data layers with Laravel and Node.js, backed by MySQL and PostgreSQL and shipped with Docker and CI/CD.",
    tagline: "I power what happens behind the screen.",
  },
];

const ROLE_TITLES = ROLES.map((r) => r.title);

type Phase = "hold" | "deleting" | "typing";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_MOTION_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

function useTypewriter(words: string[], typeSpeed = 80, deleteSpeed = 40, hold = 1800) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [phase, setPhase] = useState<Phase>("hold");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;

    if (phase === "hold") {
      t = setTimeout(() => setPhase("deleting"), hold);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      } else {
        t = setTimeout(() => {
          setIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, 300);
      }
    } else {
      const word = words[index];
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), typeSpeed);
      } else {
        t = setTimeout(() => setPhase("hold"), 0);
      }
    }

    return () => clearTimeout(t);
  }, [text, phase, index, reduced, words, typeSpeed, deleteSpeed, hold]);

  return { text, index, phase, reduced };
}

function RoleTitle({ text, index, phase }: { text: string; index: number; phase: Phase }) {
  const target = ROLE_TITLES[index];
  const splitAt = target.lastIndexOf(" ") + 1;
  const head = text.slice(0, Math.min(text.length, splitAt));
  const tail = text.length > splitAt ? text.slice(splitAt) : "";
  const steady = phase === "hold";

  const caret = <span className={`hero-caret ${steady ? "hero-caret-blink" : ""}`} />;

  return (
    <>
      <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground md:text-4xl">
        <span className="sr-only">{ROLE_TITLES.join(", ")}</span>
        <span aria-hidden="true" className="block min-h-[2.2em]">
          <span className="block">
            {head}
            {!tail && caret}
          </span>
          <span className="block text-primary">
            {tail}
            {tail && caret}
          </span>
        </span>
      </h2>

      <div aria-hidden="true" className="mt-4 flex justify-center gap-2 lg:justify-start">
        {ROLE_TITLES.map((role, i) => (
          <span
            key={role}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-primary" : "w-3 bg-border"
            }`}
          />
        ))}
      </div>
    </>
  );
}

type FloatingIcon = {
  Icon: IconType;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
  rot: number;
  mobile?: boolean;
};

const FLOATING_ICONS: FloatingIcon[] = [
  { Icon: SiNextdotjs,    top: "6%",  left: "8%",  size: 38, duration: 14, delay: 0,   dx: 16,  dy: -20, rot: 8,   mobile: true },
  { Icon: SiReact,        top: "14%", left: "30%", size: 34, duration: 17, delay: -4,  dx: -14, dy: 18,  rot: -10 },
  { Icon: SiTypescript,   top: "5%",  left: "58%", size: 30, duration: 15, delay: -7,  dx: 18,  dy: 14,  rot: 6,   mobile: true },
  { Icon: SiTailwindcss,  top: "10%", left: "84%", size: 36, duration: 18, delay: -2,  dx: -16, dy: -16, rot: -8 },
  { Icon: SiJavascript,   top: "42%", left: "3%",  size: 30, duration: 16, delay: -9,  dx: 14,  dy: 20,  rot: 10 },
  { Icon: SiLaravel,      top: "46%", left: "93%", size: 34, duration: 19, delay: -5,  dx: -18, dy: -14, rot: -6,  mobile: true },
  { Icon: SiNodedotjs,    top: "72%", left: "10%", size: 36, duration: 15, delay: -11, dx: 16,  dy: -18, rot: 7,   mobile: true },
  { Icon: SiMysql,        top: "86%", left: "28%", size: 32, duration: 18, delay: -3,  dx: -12, dy: -20, rot: -9 },
  { Icon: SiPostgresql,   top: "80%", left: "52%", size: 34, duration: 16, delay: -8,  dx: 14,  dy: 16,  rot: 8 },
  { Icon: SiSupabase,     top: "88%", left: "72%", size: 30, duration: 20, delay: -6,  dx: -16, dy: -12, rot: -7,  mobile: true },
  { Icon: SiDocker,       top: "70%", left: "90%", size: 38, duration: 17, delay: -1,  dx: 12,  dy: -22, rot: 6 },
  { Icon: SiGit,          top: "26%", left: "93%", size: 28, duration: 14, delay: -10, dx: -14, dy: 16,  rot: -10 },
  { Icon: SiGithubactions,top: "28%", left: "5%",  size: 30, duration: 18, delay: -12, dx: 16,  dy: 14,  rot: 9 },
];

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-[-5rem] left-1/2 w-screen -translate-x-1/2 overflow-hidden"
    >
      <div
        className="absolute inset-0 text-primary opacity-[0.14]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />

      <div className="hero-glow absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div
        className="hero-glow absolute bottom-[8%] right-[10%] h-80 w-80 rounded-full bg-primary/15 blur-3xl"
        style={{ animationDelay: "-4s" }}
      />

      {FLOATING_ICONS.map(
        ({ Icon, top, left, size, duration, delay, dx, dy, rot, mobile }, i) => (
          <span
            key={i}
            className={`hero-float absolute text-primary ${mobile ? "" : "hidden sm:block"}`}
            style={
              {
                top,
                left,
                opacity: 0.18,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                "--dx": `${dx}px`,
                "--dy": `${dy}px`,
                "--rot": `${rot}deg`,
              } as CSSProperties
            }
          >
            <Icon size={size} />
          </span>
        )
      )}
    </div>
  );
}

export default function Hero() {
  const typing = useTypewriter(ROLE_TITLES);
  const isActive = (i: number) => i === typing.index && typing.phase !== "deleting";

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%      { transform: translate3d(var(--dx), var(--dy), 0) rotate(var(--rot)); }
        }
        @keyframes hero-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes hero-rise {
          from { opacity: 0; transform: translate3d(0, 24px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes hero-pop {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes hero-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes hero-blink {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes hero-bob {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(0, -10px, 0); }
        }
        @keyframes hero-outline {
          0%, 100% { transform: translate3d(12px, 12px, 0); }
          50%      { transform: translate3d(6px, 6px, 0); }
        }
        @keyframes hero-orbit {
          to { transform: rotate(360deg); }
        }
        @keyframes hero-orbit-rev {
          to { transform: rotate(-360deg); }
        }
        .hero-bob     { animation: hero-bob 6s ease-in-out infinite; }
        .hero-outline { transform: translate3d(12px, 12px, 0); animation: hero-outline 6s ease-in-out infinite; }
        .hero-orbit     { animation: hero-orbit 30s linear infinite; }
        .hero-orbit-rev { animation: hero-orbit-rev 30s linear infinite; }
        .hero-float { animation: hero-float ease-in-out infinite; will-change: transform; }
        .hero-glow  { animation: hero-glow 10s ease-in-out infinite; }
        .hero-rise  { animation: hero-rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
        .hero-pop   { animation: hero-pop 1s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
        .hero-fade  { animation: hero-fade 1s ease-out both; }
        .hero-caret {
          display: inline-block;
          width: 3px;
          height: 0.85em;
          margin-left: 4px;
          vertical-align: baseline;
          border-radius: 1px;
          background: currentColor;
        }
        .hero-caret-blink { animation: hero-blink 1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-float, .hero-glow, .hero-rise, .hero-pop, .hero-fade, .hero-caret-blink,
          .hero-bob, .hero-outline, .hero-orbit, .hero-orbit-rev { animation: none; }
        }
      `}</style>

      <HeroBackground />

      <div className="relative z-10 grid items-center gap-10 lg:min-h-[480px] lg:grid-cols-[1fr_320px_1fr] lg:gap-14">
        <div
          className="hero-fade absolute left-0 top-[60%] hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex"
          style={{ animationDelay: "0.8s" }}
        >
          <SocialLinks className="text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary" />
          <span className="mt-2 h-24 w-px bg-border" />
        </div>

        <div
          className="hero-rise order-2 text-center lg:order-none lg:pl-16 lg:text-right"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="mb-3 font-mono text-sm text-primary">Hi, my name is</p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-4xl xl:text-[2.6rem]">
            Pathmanathan
            <br />
            Kavin Priya.
          </h1>
          <div className="mx-auto mt-5 grid max-w-sm lg:ml-auto lg:mr-0">
            {ROLES.map((role, i) => (
              <p
                key={role.title}
                aria-hidden={!isActive(i)}
                className={`col-start-1 row-start-1 text-sm leading-relaxed text-muted-foreground transition-all duration-500 ease-out ${
                  isActive(i) ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                {role.description}
              </p>
            ))}
          </div>
        </div>

        <div className="hero-pop order-1 flex justify-center lg:order-none">
          <div className="hero-bob relative h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            <div aria-hidden="true" className="hero-orbit absolute -inset-8 hidden rounded-full border border-dashed border-primary/25 sm:block">
              {[
                { Icon: SiReact,      pos: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" },
                { Icon: SiNodedotjs,  pos: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2" },
                { Icon: SiTypescript, pos: "left-1/2 top-full -translate-x-1/2 -translate-y-1/2" },
                { Icon: SiLaravel,    pos: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" },
              ].map(({ Icon, pos }, i) => (
                <span key={i} className={`absolute ${pos}`}>
                  <span className="hero-orbit-rev flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md">
                    <Icon size={16} />
                  </span>
                </span>
              ))}
            </div>

            <div className="absolute -inset-6 rounded-full bg-primary/15 blur-3xl" />
            <div className="hero-outline absolute inset-0 rounded-2xl border-2 border-primary" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-muted">
              <Image
                src="/my.jpg"
                alt="Pathmanathan Kavin Priya"
                fill
                priority
                sizes="(min-width: 1024px) 320px, 288px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div
          className="hero-rise order-3 text-center lg:order-none lg:pl-4 lg:text-left"
          style={{ animationDelay: "0.4s" }}
        >
          <RoleTitle text={typing.text} index={typing.index} phase={typing.phase} />

          <div className="mt-4 grid">
            {ROLES.map((role, i) => (
              <p
                key={role.title}
                aria-hidden={!isActive(i)}
                className={`col-start-1 row-start-1 text-sm text-muted-foreground transition-all duration-500 ease-out ${
                  isActive(i) ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                {role.tagline}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="#projects"
              className="rounded-md border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg hover:shadow-primary/25"
            >
              Get In Touch
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        <div
          className="hero-fade order-4 flex justify-center gap-5 lg:hidden"
          style={{ animationDelay: "0.8s" }}
        >
          <SocialLinks className="text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary" />
        </div>
      </div>
    </div>
  );
}
