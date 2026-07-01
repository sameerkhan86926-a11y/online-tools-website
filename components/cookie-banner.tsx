"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted")
    if (!accepted) setVisible(true)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", "true")
    setClosing(true)

    setTimeout(() => {
      setVisible(false)
    }, 250)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div
        className={`
          mx-auto max-w-3xl rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow-lg
          transition-all duration-300
          ${closing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
        `}
      >
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">

          {/* TEXT */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            We use cookies to improve your experience and analyze traffic. By continuing, you agree to our{" "}
            <Link
              href="/privacy-policy"
              className="text-foreground font-medium hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>

          {/* BUTTON */}
          <div className="flex items-center gap-2">
            <button
              onClick={acceptCookies}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 active:scale-95 transition"
            >
              Accept
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
