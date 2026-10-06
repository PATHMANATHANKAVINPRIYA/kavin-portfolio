"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Download, X } from "lucide-react";

import { useScrollProgress } from "@/lib/hooks";
import { RESUME_PREVIEW_URL, SOCIAL_LINKS } from "@/lib/site";

type SiteContextValue = {
  scrollProgress: number;
  openResume: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}

function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-border bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4">
          <h3 className="font-mono text-sm text-primary">Resume Preview</h3>
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Download size={14} />
              Download
            </a>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-muted">
          <iframe
            src={RESUME_PREVIEW_URL}
            title="Resume Preview"
            className="h-full w-full"
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const scrollProgress = useScrollProgress();
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <SiteContext.Provider
      value={{ scrollProgress, openResume: () => setResumeOpen(true) }}
    >
      {children}
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </SiteContext.Provider>
  );
}
