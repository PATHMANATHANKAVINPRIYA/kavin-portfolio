"use client"


const EXPERIENCE = [
  {
    role: "Associate Full Stack Developer",
    company: "Growmore Solutions (Pvt) Ltd",
    period: "2026 — Present",
    points: [
      "Contribute to end-to-end feature development and deployment across the stack.",
      "Work hands-on with CI/CD pipelines, Laravel, Next.js, and Node.js.",
      "Manage data with MySQL and PostgreSQL, and containerize applications with Docker.",
      "Collaborate using Git/GitHub for version control and code review workflows.",
    ],
  },
  {
    role: "Fullstack Developer — Intern",
    company: "Amez Cloud (Pvt) Ltd",
    period: "Aug 2025 — Jan 2026",
    points: [
      "Completed a 6-month training program covering the full development lifecycle.",
      "Built, tested, and deployed web applications using Next.js, TypeScript, and Supabase.",
      "Worked on frontend development, backend integration, and performance optimization.",
    ],
  },
];

export default function hero(){
    return(
        <div className="space-y-10">
          {EXPERIENCE.map((job) => (
            <div
              key={job.role}
              className="relative border-l border-border pl-6"
            >
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
              <p className="font-mono text-xs text-muted-foreground">
                {job.period}
              </p>
              <h3 className="mt-1 font-semibold text-foreground">
                {job.role} ·{" "}
                <span className="text-primary">{job.company}</span>
              </h3>
              <ul className="mt-3 space-y-2">
                {job.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1 text-primary">▹</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
    )
}