"use client";

import { Code2, ExternalLink, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
  linkType?: "live" | "github";
  isPrivate?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "Personal Portfolio",
    description:
      "My personal portfolio website with a responsive layout, dark and light themes, scroll progress, an animated footer and an in-page resume viewer.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://kavin-portfolio-flax.vercel.app/",
    linkType: "live",
  },
  {
    title: "IT Asset Management System",
    description:
      "An internal system for tracking company IT assets across 16+ asset types, with assignment logic, audit logs and an overview dashboard.",
    stack: ["Next.js", "TypeScript", "MongoDB"],
    isPrivate: true,
  },
  {
    title: "Online Store",
    description:
      "A full e-commerce store with product browsing, cart management, secure checkout and an admin panel for managing products and orders.",
    stack: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    // link: "https://your-store-link.com",
    // linkType: "live",
  },
  {
    title: "Company Marketing Website",
    description:
      "A production marketing website built for a company, with a mega menu, animated sections, a payments landing page and an AI assistant chatbot, deployed with Docker on a VPS.",
    stack: ["Next.js", "TypeScript", "Docker"],
    // link: "https://company-site.com",
    // linkType: "live",
  },
  {
    title: "Bus Transport System",
    description:
      "A web application for managing bus transport operations, built with React on the frontend and Laravel powering the backend logic and API.",
    stack: ["React", "Laravel", "MySQL"],
    link: "https://github.com/PATHMANATHANKAVINPRIYA/publicTransport",
    linkType: "github",
  },
  {
    title: "Sri Lankan Online Grocery",
    description:
      "An e-commerce style grocery platform enabling browsing, cart management, and order placement, built with core web technologies and PHP.",
    stack: ["HTML", "CSS", "JavaScript", "PHP"],
    link: "https://github.com/PATHMANATHANKAVINPRIYA/onlineGrocery",
    linkType: "github",
  },
  {
    title: "Library Management System",
    description:
      "A desktop system for managing library records, book lending, and returns, built using Java with a focus on clean data handling.",
    stack: ["Java"],
  },
];

function ProjectAction({ project }: { project: Project }) {
  if (project.isPrivate) {
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
        title="Private project — source code is not public"
      >
        <Lock size={12} />
        Private
      </span>
    );
  }

  if (!project.link) return null;

  const Icon = project.linkType === "github" ? FaGithub : ExternalLink;

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground transition-colors hover:text-primary"
      aria-label={`Open ${project.title}`}
    >
      <Icon size={18} />
    </a>
  );
}

export default function Projects() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((project) => (
        <div
          key={project.title}
          className="flex min-w-0 flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/40"
        >
          <div className="mb-4 flex items-center justify-between">
            <Code2 className="text-primary" size={22} />
            <ProjectAction project={project} />
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
  );
}