"use client";

import { ArrowUp, ArrowUpRight, Mail, MapPin } from "lucide-react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiDocker,
  SiGithubactions,
  SiVercel,
} from "react-icons/si";

import { Logo } from "@/components/logo";
import { useSite } from "@/components/site-provider";
import { useReveal } from "@/lib/hooks";
import {
  FOOTER_QUICK_LINKS,
  FOOTER_SECTION_LINKS,
  SOCIAL_LINKS,
  sectionHref,
} from "@/lib/site";

const STACK_TICKER = [
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "React", Icon: SiReact },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "Tailwind CSS", Icon: SiTailwindcss },
  { label: "Laravel", Icon: SiLaravel },
  { label: "Node.js", Icon: SiNodedotjs },
  { label: "MySQL", Icon: SiMysql },
  { label: "PostgreSQL", Icon: SiPostgresql },
  { label: "Supabase", Icon: SiSupabase },
  { label: "Docker", Icon: SiDocker },
  { label: "CI/CD", Icon: SiGithubactions },
  { label: "Vercel", Icon: SiVercel },
];

const SOCIALS = [
  { label: "GitHub", href: SOCIAL_LINKS.github, Icon: FaGithub },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, Icon: FaLinkedin },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: FaInstagram },
  { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FaFacebook },
  { label: "WhatsApp", href: SOCIAL_LINKS.whatsapp, Icon: FaWhatsapp },
];

function BackToTop({ progress }: { progress: number }) {
  const r = 19;
  const c = 2 * Math.PI * r;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="group relative flex h-12 w-12 items-center justify-center rounded-full text-primary transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r={r} fill="none" strokeWidth="2" className="stroke-border" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-primary"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress / 100)}
        />
      </svg>
      <ArrowUp size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}

function NavColumn({
  heading,
  links,
  onResume,
}: {
  heading: string;
  links: readonly string[];
  onResume: () => void;
}) {
  return (
    <div>
      <h5 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
        {heading}
      </h5>
      <ul className="mt-3 space-y-3">
        {links.map((link) => {
          const cls =
            "group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground";
          const arrow = (
            <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
          );
          return (
            <li key={link}>
              {link === "Resume" ? (
                <button type="button" onClick={onResume} className={cls}>
                  {arrow}
                  {link}
                </button>
              ) : (
                <a href={sectionHref(link)} className={cls}>
                  {arrow}
                  {link}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { scrollProgress, openResume } = useSite();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { ref: nameRef, visible: nameVisible } = useReveal<HTMLDivElement>();

  const rise = (delay: number) => ({
    className: `transition-all duration-700 ease-out motion-reduce:transition-none ${
      visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  const ticker = [...STACK_TICKER, ...STACK_TICKER];
  const bottomBarRise = rise(360);

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-border">
      <style>{`
        @keyframes footer-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .footer-marquee-track { animation: footer-marquee 40s linear infinite; }
        .footer-marquee:hover .footer-marquee-track { animation-play-state: paused; }

        @keyframes footer-name-in {
          from { transform: translateY(-16px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .footer-name-reveal { animation: footer-name-in 900ms cubic-bezier(0.16, 1, 0.3, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .footer-marquee-track { animation: none; }
          .footer-name-reveal { animation: none; }
        }
      `}</style>

      <div ref={nameRef} className="relative overflow-hidden">
        <p
          aria-hidden="true"
          className={`pointer-events-none -mt-[0.1em] select-none bg-gradient-to-b from-border to-transparent bg-clip-text text-center text-[22vw] font-bold leading-none tracking-tighter text-transparent md:text-[12rem] ${
            nameVisible ? "footer-name-reveal" : "opacity-0"
          }`}
        >
          KAVIN
        </p>
      </div>

      <div
        aria-hidden="true"
        className="footer-marquee border-y border-border py-3"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="footer-marquee-track flex w-max items-center">
          {ticker.map(({ label, Icon }, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              <Icon size={14} className="text-primary" />
              {label}
              <span className="mx-6 text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-6 pb-1 pt-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div {...rise(0)}>
            <div className="-my-3 flex justify-center md:justify-start">
              <Logo size={160} />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Full-stack developer building modern, scalable web applications —
              from responsive frontends to robust backends and deployment pipelines.
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div {...rise(120)}>
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary">Navigate</h4>
            <div className="mt-5 grid grid-cols-2 gap-x-6">
              <NavColumn heading="Sections" links={FOOTER_SECTION_LINKS} onResume={openResume} />
              <NavColumn heading="Quick Links" links={FOOTER_QUICK_LINKS} onResume={openResume} />
            </div>
          </div>

          <div {...rise(240)}>
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary">
              Let&apos;s talk
            </h4>
            <div className="mt-5 rounded-2xl border border-border bg-muted/30 p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Have a project or an idea? I&apos;d love to hear about it.
              </p>

              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="group mt-5 flex items-center justify-between gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Mail size={16} className="shrink-0" />
                  <span className="truncate">{SOCIAL_LINKS.email}</span>
                </span>
                <ArrowUpRight
                  size={15}
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <MapPin size={14} className="text-primary" />
                Sri Lanka
              </p>
            </div>
          </div>
        </div>

        <div
          className={`mt-14 flex flex-col items-center justify-between gap-5 border-t border-border pt-6 sm:flex-row ${bottomBarRise.className}`}
          style={bottomBarRise.style}
        >
          <div className="text-center sm:text-left">
            <p className="font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()} Pathmanathan Kavin Priya. All rights reserved.
            </p>
          </div>
          <BackToTop progress={scrollProgress} />
        </div>
      </div>
    </footer>
  );
}
