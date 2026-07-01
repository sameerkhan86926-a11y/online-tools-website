"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted")
    if (!accepted) setVisible(true)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-2xl border border-border bg-card shadow-xl backdrop-blur-md">
      
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">

        {/* TEXT */}
        <div className="text-sm text-muted-foreground">
          We use cookies to improve your experience, analyze traffic and show relevant ads.
          By continuing, you agree to our{" "}
          <Link href="/privacy-policy" className="text-foreground underline">
            Privacy Policy
          </Link>.
        </div>

        {/* BUTTON */}
        <div className="flex gap-2">
          <button
            onClick={acceptCookies}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Accept
          </button>
        </div>

      </div>

    </div>
  )
}
