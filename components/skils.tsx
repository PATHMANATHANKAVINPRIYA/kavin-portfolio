"use client"

import { type ComponentType } from "react"
import { Braces, Cloud, Database, GitBranch, Monitor, Plug, Server, Webhook, Workflow } from "lucide-react"
import {
  SiAngular,
  SiCss,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiHostinger,
} from "react-icons/si"

import { useReveal } from "@/lib/hooks"

type IconType = ComponentType<{ size?: number; className?: string }>

type Skill = {
  name: string
  icon: IconType
  color?: string
}

type Group = {
  category: string
  icon: IconType
  skills: Skill[]
}

const GROUPS: Group[] = [
  {
    category: "Frontend",
    icon: Monitor,
    skills: [
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#1572B6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
    ],
  },
  {
    category: "Languages",
    icon: Braces,
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Java", icon: SiOpenjdk, color: "#E76F00" },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    ],
  },
  {
    category: "Database",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    ],
  },
  {
    category: "DevOps",
    icon: GitBranch,
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub },
      { name: "CI/CD Pipelines", icon: Workflow, color: "#2088FF" },
    ],
  },
  {
    category: "Integrations",
    icon: Plug,
    skills: [
      { name: "API Integration", icon: Webhook, color: "#F59E0B" },
      { name: "Stripe Payments", icon: SiStripe, color: "#635BFF" },
    ],
  },
  {
    category: "Hosting",
    icon: Cloud,
    skills: [
      { name: "Vercel", icon: SiVercel },
      { name: "Hostinger", icon: SiHostinger, color: "#673DE6" },
    ],
  },
]

function SkillItem({ skill, delay, visible }: { skill: Skill; delay: number; visible: boolean }) {
  const { icon: Icon, name, color } = skill

  return (
    <li
      className={`group relative inline-flex cursor-default items-center gap-2.5 transition-all duration-500 ease-out motion-reduce:transition-none ${visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
        }`}
      style={{ transitionDelay: `${delay}ms`, ...(color ? ({ "--brand": color } as React.CSSProperties) : {}) }}
    >
      <Icon
        size={12}
        className={`shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 ${color ? "group-hover:text-[var(--brand)]" : "group-hover:text-primary"
          }`}
      />
      <span className="relative text-xs font-medium text-surface-foreground">
        {name}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full"
        />
      </span>
    </li>
  )
}

function SkillRow({ group }: { group: Group }) {
  const { ref, visible } = useReveal<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: "0px 0px -5% 0px",
  })

  return (
    <div ref={ref} className="relative py-4 md:py-5">
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-px w-full origin-left bg-border transition-transform duration-700 ease-out motion-reduce:transition-none ${visible ? "scale-x-100" : "scale-x-0"
          }`}
      />

      <div className="grid gap-5 md:grid-cols-[12rem_1fr] md:gap-10">
        <div
          className={`flex items-center gap-3 transition-all duration-500 ease-out motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
        >
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <group.icon size={18} />
          </span>
          <h3 className="text-base font-semibold text-surface-foreground">{group.category}</h3>
        </div>

        <ul className="flex flex-wrap items-center gap-x-9 gap-y-5">
          {group.skills.map((skill, i) => (
            <SkillItem key={skill.name} skill={skill} delay={150 + i * 70} visible={visible} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function IconRail() {
  const items = GROUPS.flatMap((g) => g.skills)
  const loop = [...items, ...items] 

  return (
    <div aria-hidden className="relative hidden lg:block">
      <style>{`
        @keyframes skills-rail-down {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
        .skills-rail-track { animation: skills-rail-down 45s linear infinite; }
        .skills-rail:hover .skills-rail-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .skills-rail-track { animation: none; }
        }
      `}</style>

      <div
        className="skills-rail absolute inset-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <ul className="skills-rail-track flex flex-col items-center">
          {loop.map(({ icon: Icon, color }, i) => (
            <li
              key={i}
              className="group py-4"
              style={color ? ({ "--brand": color } as React.CSSProperties) : undefined}
            >
              <Icon
                size={20}
                className={`text-muted-foreground/70 transition-all duration-300 group-hover:scale-125 ${color ? "group-hover:text-[var(--brand)]" : "group-hover:text-primary"
                  }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <div className="lg:grid lg:grid-cols-[1fr_4rem] lg:gap-12">
      <div className="relative">
        {GROUPS.map((group) => (
          <SkillRow key={group.category} group={group} />
        ))}
        <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-border" />
      </div>

      <IconRail />
    </div>
  )
}