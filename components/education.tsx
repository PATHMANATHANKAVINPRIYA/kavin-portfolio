"use client"

import { MapPin } from "lucide-react"

import { useReveal } from "@/lib/hooks"

type Education = {
  degree: string
  institution: string
  location: string
  start: number
  end: number
}

const EDUCATION: Education[] = [
  {
    degree: "Higher National Diploma in Information Technology",
    institution: "Sri Lanka Institute in Advance Technological Education",
    location: "Kandy",
    start: 2022,
    end: 2025,
  },
]

function EducationItem({ item }: { item: Education }) {
  const years = item.end - item.start

  return (
    <article className="group grid gap-4 item border-b border-border py-8 transition-colors duration-300 hover:bg-primary/[0.03] md:grid-cols-[12rem_1fr] md:gap-10 md:py-10 text-center items-center">
      <div>
        <p className="font-mono text-sm text-primary">
          {item.start} — {item.end}
        </p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {years} {years === 1 ? "year" : "years"}
        </p>
      </div>

      <div className="relative">
        <h4 className="text-xl font-medium leading-snug text-surface-foreground md:text-2xl">{item.degree}</h4>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.institution}</p>
        <p className="mt-3 inline-flex items-center justify-center gap-1.5 font-mono text-sm text-muted-foreground">
          <MapPin size={14} className="text-primary" />
          {item.location}
        </p>
      </div>
    </article>
  )
}

export default function Education({
  description = "My academic background in information technology, where I built the foundation for my work in software development.",
}: {
  description?: string
}) {
  const { ref, visible } = useReveal<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -5% 0px",
  })

  return (
    <div ref={ref} className="w-full">
      {description && (
        <p
          className={`mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground transition-all duration-500 ease-out motion-reduce:transition-none md:text-base ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {description}
        </p>
      )}

      <span
        aria-hidden
        className={`block h-px w-full origin-left bg-border transition-transform duration-700 ease-out motion-reduce:transition-none ${
          visible ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ transitionDelay: "100ms" }}
      />

      {EDUCATION.map((item, i) => (
        <div
          key={item.degree}
          className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: `${250 + i * 120}ms` }}
        >
          <EducationItem item={item} />
        </div>
      ))}
    </div>
  )
}