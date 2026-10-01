"use client"

import { MouseEvent } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import {Mail} from "lucide-react";

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
            <p className="mb-4 font-mono text-sm text-[#A3E635]">
          Hi, my name is
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Pathmanathan Kavin Priya.
        </h1>
        <h2 className="mt-2 text-3xl font-bold leading-tight text-[#8FA396] md:text-5xl">
          I build things for the web.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#A6B3AC]">
          I'm a Full-Stack Developer who enjoys turning ideas into modern,
          scalable web applications — from responsive frontends to robust
          backend systems and deployment pipelines.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-md border border-[#A3E635] px-6 py-3 text-sm font-medium text-[#A3E635] transition-colors hover:bg-[#A3E635]/10"
          >
            View My Work
          </a>

          <a
            href="#contact"
            className="rounded-md bg-[#A3E635] px-6 py-3 text-sm font-medium text-[#0D1512] transition-opacity hover:opacity-90"
          >
            Get In Touch
          </a>
        </div>

        <div className="mt-10 flex gap-5">
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            onClick={handleMailClick}
            className="text-[#8FA396] transition-colors hover:text-[#A3E635]"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8FA396] transition-colors hover:text-[#A3E635]"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8FA396] transition-colors hover:text-[#A3E635]"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8FA396] transition-colors hover:text-[#A3E635]"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8FA396] transition-colors hover:text-[#A3E635]"
            aria-label="Facebook"
          >
            <FaFacebook size={20} />
          </a>

          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8FA396] transition-colors hover:text-[#A3E635]"
            aria-label="Whatsapp"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>
        </div>
    )
}