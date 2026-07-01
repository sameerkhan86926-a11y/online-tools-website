"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const [analytics, setAnalytics] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("cookieConsent")
    if (!saved) setVisible(true)
  }, [])

  const saveConsent = (value: any) => {
    localStorage.setItem("cookieConsent", JSON.stringify(value))
    setVisible(false)
    setShowSettings(false)
  }

  const acceptAll = () => {
    saveConsent({ analytics: true })
  }

  const rejectAll = () => {
    saveConsent({ analytics: false })
  }

  const saveSettings = () => {
    saveConsent({ analytics })
  }

  if (!visible) return null

  return (
    <>
      {/* BANNER */}
      <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow-lg p-4">

          <p className="text-sm text-muted-foreground mb-3">
            We use cookies to improve experience and analyze traffic. Read our{" "}
            <Link href="/privacy-policy" className="text-foreground underline">
              Privacy Policy
            </Link>
          </p>

          <div className="flex flex-wrap gap-2 justify-end">

            <button
              onClick={() => setShowSettings(true)}
              className="px-3 py-1.5 text-sm rounded-lg border hover:bg-muted transition"
            >
              Settings
            </button>

            <button
              onClick={rejectAll}
              className="px-3 py-1.5 text-sm rounded-lg border hover:bg-muted transition"
            >
              Reject
            </button>

            <button
              onClick={acceptAll}
              className="px-4 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              Accept All
            </button>

          </div>
        </div>
      </div>

      {/* SETTINGS MODAL */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-card border border-border p-5">

            <h2 className="text-lg font-semibold mb-4">
              Cookie Settings
            </h2>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm">Analytics Cookies</span>

              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
            </div>

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowSettings(false)}
                className="px-3 py-1.5 text-sm border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveSettings}
                className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg"
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  )
}
