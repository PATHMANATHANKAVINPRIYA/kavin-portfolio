"use client"

import { useEffect, useRef, useState, type ComponentType, type RefObject } from "react"
import { ExternalLink, Mail, Webhook, Workflow } from "lucide-react"
import {
  SiDocker,
  SiGit,
  SiGithub,
  SiHostinger,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si"

type TechIcon = ComponentType<{ size?: number; className?: string }>

type Tech = { name: string; icon: TechIcon }

type Job = {
  role: string
  company: string
  website: string
  period: string
  current?: boolean
  points: string[]
  tech: Tech[]
}

const EXPERIENCE: Job[] = [
  {
    role: "Associate Full Stack Developer",
    company: "Growmore Solutions (Pvt) Ltd",
    website: "https://growmoresolutions.lk/",
    period: "2026 — Present",
    current: true,
    points: [
      "Contribute to end-to-end feature development and deployment across the stack.",
      "Work hands-on with CI/CD pipelines, Laravel, Next.js, and Node.js.",
      "Manage data with MySQL and PostgreSQL, and containerize applications with Docker.",
      "Collaborate using Git/GitHub for version control and code review workflows.",
    ],
    tech: [
      { name: "Laravel", icon: SiLaravel },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "MySQL", icon: SiMysql },
      { name: "Hostinger", icon: SiHostinger },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Docker", icon: SiDocker },
      { name: "CI/CD", icon: Workflow },
      { name: "Git", icon: SiGit },
    ],
  },
  {
    role: "Fullstack Developer — Intern",
    company: "Amez Cloud (Pvt) Ltd",
    website: "https://amezcloud.com",
    period: "Aug 2025 — Jan 2026",
    points: [
      "Completed a 6-month training program covering the full development lifecycle.",
      "Built, tested, and deployed web applications using Next.js, TypeScript, and Supabase.",
      "Worked on frontend development, backend integration, and performance optimization.",
    ],
    tech: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Supabase", icon: SiSupabase },
      { name: "API", icon: Webhook },
      { name: "Vercel Deployment", icon: SiVercel },
      { name: "GitHub", icon: SiGithub },
    ],
  },
]

/** True once, the first time the element scrolls into view. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, visible }
}

/** 0 → 1 as the timeline scrolls through the viewport. */
function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const start = window.innerHeight * 0.7
      setProgress(Math.min(1, Math.max(0, (start - rect.top) / rect.height)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref])

  return progress
}

function CurrentBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      Current
    </span>
  )
}

function ExperienceItem({ job }: { job: Job }) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const host = new URL(job.website).hostname.replace(/^www\./, "")

  return (
    <div ref={ref} className="relative pl-8 md:pl-10">
      {/* Timeline dot */}
      <span
        aria-hidden
        className={`absolute -left-[5px] top-[30px] flex h-2.5 w-2.5 transition-all duration-500 motion-reduce:transition-none ${
          visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{ transitionDelay: "150ms", transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {job.current && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
        )}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
      </span>

      {/* Card */}
      <div
        className={`group relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition-all duration-700 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 motion-reduce:transition-none md:grid md:grid-cols-[17rem_1fr] md:gap-x-10 md:gap-y-6 md:p-8 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/70 via-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Left: who / when */}
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="font-mono text-xs text-muted-foreground">{job.period}</p>
            {job.current && <CurrentBadge />}
          </div>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-surface-foreground">{job.role}</h3>
          <a
            href={job.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-sm text-primary transition-opacity hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={`${job.company} website (opens in a new tab)`}
          >
            {job.company}
            <ExternalLink size={13} className="shrink-0" />
          </a>
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">{host}</p>
        </div>

        {/* Right: what */}
        <div className="mt-5 md:mt-0">
          <ul className="space-y-2.5">
            {job.points.map((point, i) => (
              <li
                key={i}
                className={`group/item flex gap-2 text-sm leading-relaxed text-muted-foreground transition-all duration-500 ease-out motion-reduce:transition-none ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: `${300 + i * 90}ms` }}
              >
                <span className="mt-1 text-primary transition-transform duration-200 group-hover/item:translate-x-1">
                  ▹
                </span>
                <span className="transition-colors duration-200 group-hover/item:text-surface-foreground">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies: full-width row under both columns */}
        <div
          className={`mt-6 border-t border-border pt-5 transition-all duration-500 ease-out motion-reduce:transition-none md:col-span-2 md:mt-0 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{ transitionDelay: `${300 + job.points.length * 90}ms` }}
        >
          <div className="flex flex-wrap gap-2">
            {job.tech.map(({ name, icon: Icon }, i) => (
              <span
                key={name}
                className={`inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary motion-reduce:transition-none ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + job.points.length * 90 + i * 50}ms` }}
              >
                <Icon size={14} className="shrink-0" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience({ showHeading = true }: { showHeading?: boolean }) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(timelineRef)
  const heading = useReveal<HTMLDivElement>()

  return (
    // Full-page section: fills the viewport height and centres its content
    <section id="experience" className="flex min-h-screen w-full items-center">
      <div className="mx-auto w-full max-w-5xl px-6">
        {showHeading && (
          <div
            ref={heading.ref}
            className={`mb-12 transition-all duration-700 ease-out motion-reduce:transition-none ${
              heading.visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">Where I've worked</h2>
          </div>
        )}

        <div ref={timelineRef} className="relative space-y-8 md:space-y-10">
          {/* Track */}
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-border" />
          {/* Fill follows scroll */}
          <span
            aria-hidden
            className="absolute left-0 top-0 w-px bg-primary shadow-[0_0_8px] shadow-primary/60 motion-reduce:hidden"
            style={{ height: `${progress * 100}%` }}
          />

          {EXPERIENCE.map((job) => (
            <ExperienceItem key={job.role} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}