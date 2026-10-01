"use client"

import {MouseEvent} from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import {Mail} from "lucide-react";

const SOCIAL_LINKS = {
  email: "pathmanathankavinpriya@gmail.com",
  github: "https://github.com/PATHMANATHANKAVINPRIYA",
  linkedin:
    "https://www.linkedin.com/in/pathmanathan-kavin-priya-33628b23a/?originalSubdomain=lk",
  resume:
    "https://drive.google.com/file/d/1YamJMqmySLokoJ8wLCbHKyNFTU46jpw5/view?usp=drive_link",
  instagram: "https://instagram.com/kavinpriya_0429",
  whatsapp: "https://wa.me/94769893182",
  facebook: "https://web.facebook.com/people/Kavin-Kavin/pfbid02jAipsB86sF5o3F2xMZhB8UANEqDrmBVjbp1HvLxfwWupcemAu8tNHyVU4sC2Mknhl/",
};

function handleMailClick(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();

  let handedOff = false;
  const markHandedOff = () => {
    handedOff = true;
  };
  window.addEventListener("blur", markHandedOff, { once: true });
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) markHandedOff();
    },
    { once: true }
  );

  window.location.href = `mailto:${SOCIAL_LINKS.email}`;

  setTimeout(() => {
    window.removeEventListener("blur", markHandedOff);
    if (!handedOff) {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }, 1200);
}

export default function hero(){
    return(
        <div>
            <p className="mb-4 font-mono text-sm text-primary">
          Hi, my name is
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
          Pathmanathan Kavin Priya.
        </h1>
        <h2 className="mt-2 text-3xl font-bold leading-tight text-muted-foreground md:text-5xl">
          I build things for the web.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          I&apos;m a Full-Stack Developer who enjoys turning ideas into modern,
          scalable web applications — from responsive frontends to robust
          backend systems and deployment pipelines.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-md border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            View My Work
          </a>

          <a
            href="#contact"
            className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get In Touch
          </a>
        </div>

        <div className="mt-10 flex gap-5">
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            onClick={handleMailClick}
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="Facebook"
          >
            <FaFacebook size={20} />
          </a>

          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="Whatsapp"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>
        </div>
    )
}
