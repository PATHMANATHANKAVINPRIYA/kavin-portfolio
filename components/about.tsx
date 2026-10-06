"use client"

import { Mail, MapPin, Phone } from "lucide-react";

import { SOCIAL_LINKS } from "@/lib/site";

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div>
        <p className="font-mono text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-surface-foreground">{children}</p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      <div className="md:col-span-2">
        <p className="leading-relaxed text-muted-foreground">
          I am a positive and confident Full-Stack Developer with a
          strong passion for building modern web applications. Known for
          my practical approach and problem-solving mindset, I perform
          effectively both independently and as a motivated team player.
        </p>
        <p className="mt-4 leading-relaxed text-[#A6B3AC]">
          I adapt quickly to new technologies and development
          environments, consistently delivering high-quality and
          scalable solutions — currently working across Next.js,
          Laravel, and Node.js in my day-to-day role.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <InfoCard icon={<MapPin size={18} />} label="Location">
          Bogawanthalawa, Sri Lanka
        </InfoCard>
        <InfoCard icon={<Mail size={18} />} label="Email">
          {SOCIAL_LINKS.email}
        </InfoCard>
        <InfoCard icon={<Phone size={18} />} label="Phone">
          +94 76 989 3182
        </InfoCard>
      </div>
    </div>
  );
}
