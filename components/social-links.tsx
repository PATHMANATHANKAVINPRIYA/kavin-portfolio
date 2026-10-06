"use client";

import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";

import { handleMailClick } from "@/lib/mail";
import { SOCIAL_LINKS } from "@/lib/site";

const DEFAULT_CLASS =
  "text-muted-foreground transition-colors hover:text-primary";

const LINKS = [
  { label: "GitHub", href: SOCIAL_LINKS.github, Icon: FaGithub },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, Icon: FaLinkedin },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: FaInstagram },
  { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FaFacebook },
  { label: "Whatsapp", href: SOCIAL_LINKS.whatsapp, Icon: FaWhatsapp },
];

export function SocialLinks({ className = DEFAULT_CLASS }: { className?: string }) {
  return (
    <>
      <a
        href={`mailto:${SOCIAL_LINKS.email}`}
        onClick={handleMailClick}
        className={className}
        aria-label="Email"
      >
        <Mail size={20} />
      </a>
      {LINKS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          aria-label={label}
        >
          <Icon size={20} />
        </a>
      ))}
    </>
  );
}
