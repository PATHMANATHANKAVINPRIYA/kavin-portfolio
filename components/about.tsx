"use client";

import {
  ArrowUpRight,
  Globe,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  ShoppingCart,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { SOCIAL_LINKS } from "@/lib/site";

function InfoCard({
  icon,
  label,
  href,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <>
      <div className="mt-0.5 shrink-0 text-primary">{icon}</div>
      <div className="min-w-0">
        <p className="font-mono text-xs text-muted-foreground">{label}</p>
        <p className="break-words text-sm text-surface-foreground">{children}</p>
      </div>
    </>
  );

  const base =
    "flex items-start gap-3 rounded-lg border border-border bg-surface p-4 transition-colors";

  return href ? (
    <a href={href} className={`${base} hover:border-primary/40`}>
      {content}
    </a>
  ) : (
    <div className={base}>{content}</div>
  );
}

const SERVICES = [
  { label: "Business websites", Icon: Globe },
  { label: "Admin dashboards", Icon: LayoutDashboard },
  { label: "E-commerce stores", Icon: ShoppingCart },
  { label: "Custom web apps & APIs", Icon: ServerCog },
];

export default function About() {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      <div className="min-w-0 md:col-span-2">
        <p className="leading-relaxed text-muted-foreground">
          I&apos;m a Full-Stack Developer who builds modern, scalable web
          applications — from clean, responsive frontends to reliable backends
          and deployment. I have a practical, problem-solving approach and work
          well both independently and as part of a team.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          I pick up new tools quickly and focus on delivering high-quality
          work that is easy to maintain. In my day-to-day role I work across
          Next.js, Laravel and Node.js, building real products such as
          dashboards, online stores and internal business systems.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SERVICES.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-surface-foreground"
            >
              <Icon size={16} className="shrink-0 text-primary" />
              {label}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${SOCIAL_LINKS.email}?subject=${encodeURIComponent(
              "Project inquiry"
            )}`}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:brightness-110 active:scale-95"
          >
            Hire me
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/60 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground active:scale-95"
          >
            <FaWhatsapp size={16} />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <InfoCard icon={<MapPin size={18} />} label="Location">
          Bogawanthalawa, Sri Lanka
        </InfoCard>
        <InfoCard
          icon={<Mail size={18} />}
          label="Email"
          href={`mailto:${SOCIAL_LINKS.email}`}
        >
          {SOCIAL_LINKS.email}
        </InfoCard>
        <InfoCard
          icon={<Phone size={18} />}
          label="Phone"
          href="tel:+94769893182"
        >
          +94 76 989 3182
        </InfoCard>
      </div>
    </div>
  );
}