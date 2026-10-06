"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Award, Check, Copy, ExternalLink, FileText, ShieldCheck, X } from "lucide-react"

type Certification = {
  title: string
  issuer: string
  issuedDate?: string
  pdf?: string
  verifyUrl?: string
  verifyCode?: string
  pending?: boolean
}

const CARD_IMAGE = "/certificates/certificate-top.jpg"

const VERIFY_URL = "https://open.uom.lk/verify"

const CERTIFICATIONS: Certification[] = [
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa, Sri Lanka (Online Learning)",
    pdf: "/certificates/Web_Design_for_Beginners_E-Certificate.pdf",
    verifyUrl: VERIFY_URL,
    verifyCode: "EDBu6EGqjp",
  },
  {
    title: "Python Programming for Beginners",
    issuer: "University of Moratuwa, Sri Lanka (Online Learning)",
    issuedDate: "February 13, 2023",
    pdf: "/certificates/Python_for_Beginners_E-Certificate.pdf",
    verifyUrl: VERIFY_URL,
    verifyCode: "Trne51odcp",
  },
  {
    title: "Web Development",
    issuer: "University of Moratuwa, Sri Lanka (Online Learning)",
    pending: true,
  },
]

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      aria-label={`Copy verification code ${code}`}
    >
      {code}
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  )
}

function PdfModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} certificate`}
    >
      <div
        className="flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-border bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-surface-foreground">{cert.title}</p>
            {cert.issuedDate && (
              <p className="text-xs text-muted-foreground">Issued {cert.issuedDate}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <ShieldCheck size={14} />
                Verify certificate
              </a>
            )}
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-surface-foreground transition-colors hover:border-primary/40"
            >
              <ExternalLink size={14} />
              Open in new tab
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-surface-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {cert.verifyCode && (
          <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-2 text-xs text-muted-foreground">
            Verification code
            <CopyCode code={cert.verifyCode} />
            <span>Paste it on the verification page.</span>
          </div>
        )}

        <iframe
          src={`${cert.pdf}#toolbar=0&navpanes=0`}
          title={`${cert.title} certificate PDF`}
          className="w-full flex-1 bg-white"
        />
      </div>
    </div>
  )
}

export default function Certifications() {
  const [active, setActive] = useState<Certification | null>(null)

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {CERTIFICATIONS.map((cert) => {
          const canOpen = Boolean(cert.pdf) && !cert.pending

          return (
            <div
              key={cert.title}
              className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-primary/40"
            >
              <button
                type="button"
                onClick={() => setActive(cert)}
                disabled={!canOpen}
                className="group relative block aspect-[1964/563] w-full overflow-hidden border-b border-border bg-[#f9f7f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary enabled:cursor-zoom-in disabled:cursor-default"
                aria-label={canOpen ? `View ${cert.title} certificate` : cert.title}
              >
                <Image
                  src={CARD_IMAGE}
                  alt="University of Moratuwa certificate"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </button>

              <div className="flex flex-1 items-start gap-3 p-5">
                <Award className="mt-0.5 shrink-0 text-primary" size={20} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-surface-foreground">{cert.title}</p>
                    {cert.pending && (
                      <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{cert.issuer}</p>
                  {cert.issuedDate && (
                    <p className="mt-1 text-xs text-muted-foreground">Issued {cert.issuedDate}</p>
                  )}
                </div>
              </div>

              {canOpen && (
                <div className="flex items-center justify-end border-t border-border px-5 py-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setActive(cert)}
                    className="inline-flex items-center gap-1.5 text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <FileText size={14} />
                    View certificate
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {active && <PdfModal cert={active} onClose={() => setActive(null)} />}
    </>
  )
}