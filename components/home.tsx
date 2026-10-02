"use client"

import { MouseEvent, CSSProperties } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
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
import { Mail } from "lucide-react";

const SOCIAL_LINKS = {
  email: "pathmanathankavinpriya@gmail.com",
  github: "https://github.com/PATHMANATHANKAVINPRIYA",
  linkedin:
    "https://www.linkedin.com/in/pathmanathan-kavin-priya-33628b23a/?originalSubdomain=lk",
  resume:
    "https://drive.google.com/file/d/1YamJMqmySLokoJ8wLCbHKyNFTU46jpw5/view?usp=drive_link",
  instagram: "https://instagram.com/kavinpriya_0429",
  whatsapp: "https://wa.me/94769893182",
  facebook: "https://web.facebook.com/people/Kavin-Kavin/pfbid02jAipsB86sF5o3F2xMZhB8UANEqDrmBVjbp1HvLxfwWupcemAu8tNHyVU4sC2Mknhl/",
};

function handleMailClick(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();

  let handedOff = false;
  const markHandedOff = () => {
    handedOff = true;
  };
  window.addEventListener("blur", markHandedOff, { once: true });
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) markHandedOff();
    },
    { once: true }
  );

  window.location.href = `mailto:${SOCIAL_LINKS.email}`;

  setTimeout(() => {
    window.removeEventListener("blur", markHandedOff);
    if (!handedOff) {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }, 1200);
}

const iconClass =
  "text-muted-foreground transition-colors hover:text-primary";

function SocialIcons() {
  return (
    <>
      <a
        href={`mailto:${SOCIAL_LINKS.email}`}
        onClick={handleMailClick}
        className={iconClass}
        aria-label="Email"
      >
        <Mail size={20} />
      </a>
      <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="GitHub">
        <FaGithub size={20} />
      </a>
      <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="LinkedIn">
        <FaLinkedin size={20} />
      </a>
      <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Instagram">
        <FaInstagram size={20} />
      </a>
      <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Facebook">
        <FaFacebook size={20} />
      </a>
      <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Whatsapp">
        <FaWhatsapp size={20} />
      </a>
    </>
  );
}

/* ---------- Background: floating tech icons ---------- */

type FloatingIcon = {
  Icon: IconType;
  top: string;
  left: string;
  size: number;
  duration: number; // seconds
  delay: number; // seconds
  dx: number; // drift px
  dy: number;
  rot: number; // deg
  mobile?: boolean; // show on small screens too
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
      {/* dotted grid, faded toward the edges */}
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

      {/* soft glow blobs */}
      <div className="hero-glow absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div
        className="hero-glow absolute bottom-[8%] right-[10%] h-80 w-80 rounded-full bg-primary/15 blur-3xl"
        style={{ animationDelay: "-4s" }}
      />

      {/* floating tech icons */}
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

/* ---------- Hero ---------- */

export default function Hero() {
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
        .hero-float { animation: hero-float ease-in-out infinite; will-change: transform; }
        .hero-glow  { animation: hero-glow 10s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-float, .hero-glow { animation: none; }
        }
      `}</style>

      <HeroBackground />

      <div className="relative z-10 grid items-center gap-10 lg:min-h-[480px] lg:grid-cols-[1fr_320px_1fr] lg:gap-14">
        {/* Social rail (desktop only), pinned to the far left so the photo stays truly centered */}
        <div className="absolute left-0 top-[60%] hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
          <SocialIcons />
          <span className="mt-2 h-24 w-px bg-border" />
        </div>

        {/* LEFT: name + short description */}
        <div className="order-2 text-center lg:order-none lg:pl-16 lg:text-right">
          <p className="mb-3 font-mono text-sm text-primary">Hi, my name is</p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-4xl xl:text-[2.6rem]">
            Pathmanathan
            <br />
            Kavin Priya.
          </h1>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground lg:ml-auto lg:mr-0">
            I enjoy turning ideas into modern, scalable web applications — from
            responsive frontends to robust backends and deployment pipelines.
          </p>
        </div>

        {/* CENTER: photo */}
        <div className="order-1 flex justify-center lg:order-none">
          <div className="relative h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            {/* glow behind photo */}
            <div className="absolute -inset-6 rounded-full bg-primary/15 blur-3xl" />
            {/* offset outline */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-primary" />
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

        {/* RIGHT: position + buttons */}
        <div className="order-3 text-center lg:order-none lg:pl-4 lg:text-left">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground md:text-4xl">
            Full-Stack
            <br />
            <span className="text-primary">Developer</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            I build things for the web.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="#projects"
              className="rounded-md border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Social icons for mobile/tablet */}
        <div className="order-4 flex justify-center gap-5 lg:hidden">
          <SocialIcons />
        </div>
      </div>
    </div>
  );
}