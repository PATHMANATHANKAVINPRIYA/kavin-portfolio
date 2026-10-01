"use client";

import {  useState, } from "react";
import {
  Download,
  Menu,
  X,
} from "lucide-react";
import Hero from "@/components/home";
import About from "@/components/about"
import Skils from "@/components/skils"
import Projects from "@/components/projects";
import Experiance from "@/components/experiance";
import Certification from "@/components/certification";
import Contact from "@/components/contact";
import { ModeToggle } from "@/components/misc/themeToggler";
// ─────────────────────────────────────────────
// DATA — edit this section to update your content
// ─────────────────────────────────────────────

const NAV_LINKS = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Certifications",
  "Resume",
  "Contact",
];

const SOCIAL_LINKS = {
  email: "pathmanathankavinpriya@gmail.com",
  github: "https://github.com/PATHMANATHANKAVINPRIYA",
  linkedin:
    "https://www.linkedin.com/in/pathmanathan-kavin-priya-33628b23a/?originalSubdomain=lk",
  resume:
    "https://drive.google.com/uc?export=download&id=1GPvFR6F0duiFhYRpUd4YPCOGrDINt2SE",
  instagram: "https://instagram.com/kavinpriya_0429",
  whatsapp: "https://wa.me/94769893182",
  facebook: "https://web.facebook.com/people/Kavin-Kavin/pfbid02jAipsB86sF5o3F2xMZhB8UANEqDrmBVjbp1HvLxfwWupcemAu8tNHyVU4sC2Mknhl/",
};

const RESUME_FILE_ID = "1GPvFR6F0duiFhYRpUd4YPCOGrDINt2SE";
const RESUME_PREVIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/preview`;




export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="font-mono text-lg font-semibold tracking-tight">
            kavin<span className="text-primary">.dev</span>
          </a>

          <nav className="hidden gap-8 md:flex">
            {NAV_LINKS.map((link) =>
              link === "Resume" ? (
                <button
                  key={link}
                  onClick={() => setResumeOpen(true)}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link}
                </button>
              ) : (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />

            <button
              className="text-foreground md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-border px-6 py-4 md:hidden">
            {NAV_LINKS.map((link) =>
              link === "Resume" ? (
                <button
                  key={link}
                  onClick={() => {
                    setMenuOpen(false);
                    setResumeOpen(true);
                  }}
                  className="text-left text-sm text-muted-foreground hover:text-primary"
                >
                  {link}
                </button>
              ) : (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              )
            )}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="mx-auto flex max-w-6xl flex-col items-start px-6 py-24 md:py-32">
        <Hero/>
      </section>

      {/* ABOUT */}
      <SectionWrapper id="about" title="About Me" number="01">
        <About/>
      </SectionWrapper>

      {/* SKILLS */}
      <SectionWrapper id="skills" title="Skills" number="02">
        <Skils/>
      </SectionWrapper>

      {/* PROJECTS */}
      <SectionWrapper id="projects" title="Projects" number="03">
        <Projects/>
      </SectionWrapper>

      {/* EXPERIENCE */}
      <SectionWrapper id="experience" title="Experience" number="04">
        <Experiance/>
      </SectionWrapper>

      {/* CERTIFICATIONS */}
      <SectionWrapper id="certifications" title="Certifications" number="05">
        <Certification/>
      </SectionWrapper>

      {/* CONTACT */}
      <SectionWrapper id="contact" title="Get In Touch" number="06">
        <Contact/>
      </SectionWrapper>

      <footer className="border-t border-border py-8 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          Built by Pathmanathan Kavin Priya — {new Date().getFullYear()}
        </p>
      </footer>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
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

// ─────────────────────────────────────────────
// REUSABLE PIECES
// ─────────────────────────────────────────────

function SectionWrapper({
  id,
  title,
  number,
  children,
}: {
  id: string;
  title: string;
  number: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex items-center gap-3">
        <span className="font-mono text-primary">{number}.</span>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="ml-4 h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  );
}



