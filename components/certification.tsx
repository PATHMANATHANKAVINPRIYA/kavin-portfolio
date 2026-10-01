"use client"

import { Award } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa, Sri Lanka (Online Learning)",
  },
  {
    title: "Web Development",
    issuer: "University of Moratuwa, Sri Lanka (Online Learning)",
  },
  {
    title: "Python Programming for Beginners",
    issuer: "University of Moratuwa, Sri Lanka (Online Learning)",
  },
];

export default function hero(){
    return(
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.title}
              className="flex items-start gap-3 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary/40"
            >
              <Award className="mt-0.5 shrink-0 text-primary" size={20} />
              <div>
                <p className="text-sm font-medium text-surface-foreground">
                  {cert.title}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
    )
}