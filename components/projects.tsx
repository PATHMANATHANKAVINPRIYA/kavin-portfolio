"use client"

import {
  ExternalLink,
  Code2,
} from "lucide-react";

const PROJECTS = [
  {
    title: "Bus Transport System",
    description:
      "A web application for managing bus transport operations, built with React on the frontend and Laravel powering the backend logic and API.",
    stack: ["React", "Laravel", "MySQL"],
    link: "https://github.com/PATHMANATHANKAVINPRIYA/publicTransport",
  },
  {
    title: "Sri Lankan Online Grocery",
    description:
      "An e-commerce style grocery platform enabling browsing, cart management, and order placement, built with core web technologies and PHP.",
    stack: ["HTML", "CSS", "JavaScript", "PHP"],
    link: "https://github.com/PATHMANATHANKAVINPRIYA/onlineGrocery",
  },
  {
    title: "Library Management System",
    description:
      "A desktop system for managing library records, book lending, and returns, built using Java with a focus on clean data handling.",
    stack: ["Java"],
    link: "#",
  },
];

export default function Projects() {
    return(
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <Code2 className="text-primary" size={22} />
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={`Open ${project.title}`}
                >
                  <ExternalLink size={18} />
                </a>
              </div>
              <h3 className="mb-2 font-semibold text-surface-foreground">
                {project.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 font-mono text-xs text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
    )
}