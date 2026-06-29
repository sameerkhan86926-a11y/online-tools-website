"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { downloadDataUrl } from "@/lib/file-utils"

const presets = [
  { label: "Black", fg: "#1a1a1a", bg: "#ffffff" },
  { label: "Red", fg: "#dc2626", bg: "#ffffff" },
  { label: "Blue", fg: "#2563eb", bg: "#ffffff" },
  { label: "Inverted", fg: "#ffffff", bg: "#1a1a1a" },
]

export function QrGenerator() {
  const [text, setText] = useState("https://toolbox.app")
  const [colors, setColors] = useState(presets[0])
  const [size, setSize] = useState(512)
  const [dataUrl, setDataUrl] = useState<string>("")

  useEffect(() => {
    let active = true
    const value = text.trim() || " "
    QRCode.toDataURL(value, {
      width: size,
      margin: 2,
      color: { dark: colors.fg, light: colors.bg },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (active) setDataUrl(url)
      })
      .catch(() => {
        if (active) setDataUrl("")
      })
    return () => {
      active = false
    }
  }, [text, colors, size])

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="qr-text" className="text-sm font-medium">
            Content
          </label>
          <textarea
            id="qr-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Enter a URL, text, Wi-Fi details…"
            className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Color</span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setColors(p)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  colors.label === p.label
                    ? "border-primary bg-accent text-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className="size-3.5 rounded-full border border-border"
                  style={{ backgroundColor: p.fg }}
                />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="qr-size" className="text-sm font-medium">
              Size
            </label>
            <span className="text-sm text-muted-foreground">{size}px</span>
          </div>
          <input
            id="qr-size"
            type="range"
            min={128}
            max={1024}
            step={32}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-[var(--primary)]"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-2xl border border-border bg-card p-5">
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={dataUrl} alt="Generated QR code" className="size-full object-contain" />
          ) : (
            <p className="text-sm text-muted-foreground">Enter content to preview</p>
          )}
        </div>
        <Button
          className="w-full max-w-xs"
          disabled={!dataUrl}
          onClick={() => downloadDataUrl(dataUrl, "qr-code.png")}
        >
          <Download className="size-4" /> Download PNG
        </Button>
      </div>
    </div>
  )
}
