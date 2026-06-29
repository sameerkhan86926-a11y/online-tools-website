"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "Are these tools really free?",
    a: "Yes. Every tool on Toolbox is completely free to use with no watermarks, no account, and no hidden limits.",
  },
  {
    q: "Are my files safe and private?",
    a: "Absolutely. All processing happens directly in your browser. Your files are never uploaded to any server, so they stay on your device.",
  },
  {
    q: "Do I need to install anything?",
    a: "No installation is required. Toolbox runs entirely in your web browser on any modern device.",
  },
  {
    q: "Is there a file size limit?",
    a: "Because everything is processed locally, the only limit is your device's available memory. Most everyday documents and images work without issue.",
  },
  {
    q: "Which file formats are supported?",
    a: "We support common formats including PDF, JPG, PNG and more. Each tool lists the exact formats it accepts on its page.",
  },
  {
    q: "Can I use Toolbox on mobile?",
    a: "Yes. The interface is fully responsive and works smoothly on phones, tablets and desktops.",
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20 border-t border-border bg-card">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">FAQ</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Everything you need to know about using Toolbox.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-border bg-background"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
