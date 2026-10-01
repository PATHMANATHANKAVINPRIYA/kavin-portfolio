"use client"

import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";
import { useRef, useState, FormEvent,MouseEvent } from "react";
import emailjs from "@emailjs/browser";

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

function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [sending, setSending] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState<"success" | "error" | "">("");

    const EMAILJS_SERVICE_ID = "service_z0gnqy4";
    const EMAILJS_TEMPLATE_ID = "template_ix0hsph";
    const EMAILJS_PUBLIC_KEY = "33T0RePaWCLcrojQ3";
    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        setSending(true);

        emailjs
            .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
            .then(() => {
                setStatusMessage("Message sent successfully.");
                setStatusType("success");
                formRef.current?.reset();
                setSending(false);
                setTimeout(() => setStatusMessage(""), 3000);
            })
            .catch(() => {
                setStatusMessage("Failed to send message. Please try again.");
                setStatusType("error");
                setSending(false);
                setTimeout(() => setStatusMessage(""), 3000);
            });
    };


    
    
    return (
        <form
            ref={formRef}
            onSubmit={sendEmail}
            className="rounded-lg border border-border bg-surface p-6"
        >
            <div className="space-y-4">
                <div>
                    <label className="mb-1 block font-mono text-xs text-muted-foreground">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                </div>

                <div>
                    <label className="mb-1 block font-mono text-xs text-muted-foreground">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                </div>

                <div>
                    <label className="mb-1 block font-mono text-xs text-muted-foreground">
                        Message
                    </label>
                    <textarea
                        name="message"
                        rows={4}
                        required
                        placeholder="What would you like to say?"
                        className="w-full resize-none rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    {sending ? "Sending…" : "Send Message"}
                </button>

                {statusMessage && (
                    <div
                        className={`rounded-md px-4 py-2.5 text-sm ${statusType === "success"
                            ? "border border-primary/30 bg-primary/10 text-primary"
                            : "border border-destructive/30 bg-destructive/10 text-destructive"
                            }`}
                    >
                        {statusMessage}
                    </div>
                )}
            </div>
        </form>
    );
}

export default function hero() {
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
    return (
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
            <div>
                <p className="leading-relaxed text-muted-foreground">
                    I'm currently open to new opportunities. Whether you have a
                    question or just want to say hi, my inbox is always open —
                    or send a message directly using the form.
                </p>

                <a
                    href={`mailto:${SOCIAL_LINKS.email}`}
                    onClick={handleMailClick}
                    className="mt-8 inline-block rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                    Say Hello
                </a>

                <div className="mt-10 flex gap-6">
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
                        href={SOCIAL_LINKS.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                        aria-label="Instagram"
                    >
                        <FaInstagram size={20} />
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

            <ContactForm />
        </div>
    )
}