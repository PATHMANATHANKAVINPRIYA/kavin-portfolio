"use client"

import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

import { handleMailClick } from "@/lib/mail";
import { SOCIAL_LINKS } from "@/lib/site";
import { SocialLinks } from "@/components/social-links";

const EMAILJS_SERVICE_ID = "service_z0gnqy4";
const EMAILJS_TEMPLATE_ID = "template_ix0hsph";
const EMAILJS_PUBLIC_KEY = "33T0RePaWCLcrojQ3";

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
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
            className={`rounded-md px-4 py-2.5 text-sm ${
              statusType === "success"
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

export default function Contact() {
  return (
    <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
      <div>
        <p className="leading-relaxed text-muted-foreground">
          I&apos;m currently open to new opportunities. Whether you have a
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
          <SocialLinks />
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
