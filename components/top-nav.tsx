"use client";

import { useEffect, useState } from "react";
import { Eye, Menu, X } from "lucide-react";

import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/misc/themeToggler";
import { useSite } from "@/components/site-provider";
import { NAV_LINKS, sectionHref } from "@/lib/site";

const LINK_CLASS =
  "relative rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground";

const LINK_ACTIVE_CLASS = "bg-primary/10 text-foreground";

const RESUME_BTN_CLASS =
  "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-primary/60 px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:brightness-110 active:scale-95";

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollProgress, openResume } = useSite();

  const links = NAV_LINKS.filter((link) => link !== "Resume");

  // Highlight the link of the section currently in view
  useEffect(() => {
    const ids = links
      .map((link) => sectionHref(link))
      .filter((href) => href.startsWith("#") && href.length > 1)
      .map((href) => href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLink = (link: string, onNavigate?: () => void) => {
    const href = sectionHref(link);
    const isActive = active === href;

    return (
      <a
        key={link}
        href={href}
        onClick={onNavigate}
        className={`${LINK_CLASS} ${isActive ? LINK_ACTIVE_CLASS : ""}`}
      >
        {link}
        {isActive && (
          <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
        )}
      </a>
    );
  };

  return (
    <header className="sticky top-3 z-50 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-full border border-border bg-background/70 shadow-lg shadow-black/5 backdrop-blur-xl">
          <div className="flex items-center justify-between py-1.5 pl-3 pr-2">
            <a
              href="#"
              className="group flex items-center gap-2"
              aria-label="Kavin — home"
            >
              <Logo
                size={32}
                className="transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
              />
              <span className="font-mono text-base font-semibold tracking-tight">
                kavin<span className="text-primary">.dev</span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {links.map((link) => renderLink(link))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openResume();
                }}
                className={RESUME_BTN_CLASS}
              >
                <Eye size={14} />
                Resume
              </button>
              <ModeToggle />
              <button
                className="px-1 text-foreground md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-100"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {menuOpen && (
          <nav className="mt-2 flex flex-col gap-1 rounded-3xl border border-border bg-background/90 p-3 shadow-lg backdrop-blur-xl md:hidden">
            {links.map((link) => renderLink(link, () => setMenuOpen(false)))}
          </nav>
        )}
      </div>
    </header>
  );
}