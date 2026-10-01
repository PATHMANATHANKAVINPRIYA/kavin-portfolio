"use client"

const SKILLS = [
  { name: "Next.js / React", category: "Frontend" },
  { name: "TypeScript / JavaScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Laravel", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "MySQL / PostgreSQL", category: "Database" },
  { name: "Supabase", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "Git / GitHub", category: "DevOps" },
  { name: "CI/CD Pipelines", category: "DevOps" },
];

export default function hero(){
    return(
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="group rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary/40"
            >
              <p className="text-sm font-medium text-surface-foreground">
                {skill.name}
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {skill.category}
              </p>
            </div>
          ))}
        </div>
    )
}