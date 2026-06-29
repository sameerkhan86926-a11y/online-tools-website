"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import { Download, RotateCcw, X, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { loadImage } from "@/lib/file-utils"

interface Page {
  id: string
  name: string
  url: string
}

export function ImageToPdf() {
  const [pages, setPages] = useState<Page[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFiles(files: File[]) {
    setError(null)
    const next = files
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ id: crypto.randomUUID(), name: f.name, url: URL.createObjectURL(f) }))
    setPages((prev) => [...prev, ...next])
  }

  function remove(id: string) {
    setPages((prev) => prev.filter((p) => p.id !== id))
  }

  function move(index: number, dir: -1 | 1) {
    setPages((prev) => {
      const next = [...prev]
      const target = index + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  async function generate() {
    if (pages.length === 0) return
    setBusy(true)
    setError(null)
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" })
      const pw = doc.internal.pageSize.getWidth()
      const ph = doc.internal.pageSize.getHeight()
      const margin = 24

      for (let i = 0; i < pages.length; i++) {
        const img = await loadImage(pages[i].url)
        const maxW = pw - margin * 2
        const maxH = ph - margin * 2
        const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight)
        const w = img.naturalWidth * ratio
        const h = img.naturalHeight * ratio
        const x = (pw - w) / 2
        const y = (ph - h) / 2

        // Render onto a canvas to normalize format
        const canvas = document.createElement("canvas")
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Canvas not supported")
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92)

        if (i > 0) doc.addPage()
        doc.addImage(dataUrl, "JPEG", x, y, w, h)
      }
      doc.save("images.pdf")
    } catch {
      setError("Something went wrong while building the PDF. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    pages.forEach((p) => URL.revokeObjectURL(p.url))
    setPages([])
    setError(null)
  }

  return (
    <div className="space-y-6">
      <FileDropzone accept="image/*" multiple onFiles={handleFiles} hint="Select images, one per page" />

      {error && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">{error}</p>}

      {pages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Pages ({pages.length})</h2>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="size-4" /> Clear
            </Button>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {pages.map((p, i) => (
              <li key={p.id} className="group relative overflow-hidden rounded-xl border border-border bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.name} className="aspect-square w-full object-cover" />
                <span className="absolute left-2 top-2 flex size-6 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-md bg-background/90 text-foreground"
                  aria-label={`Remove ${p.name}`}
                >
                  <X className="size-4" />
                </button>
                <div className="absolute inset-x-2 bottom-2 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    className="flex flex-1 items-center justify-center rounded-md bg-background/90 py-1 text-foreground"
                    aria-label="Move earlier"
                  >
                    <ArrowUp className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    className="flex flex-1 items-center justify-center rounded-md bg-background/90 py-1 text-foreground"
                    aria-label="Move later"
                  >
                    <ArrowDown className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Button className="w-full" disabled={busy} onClick={generate}>
            <Download className="size-4" /> {busy ? "Building PDF…" : "Download PDF"}
          </Button>
        </div>
      )}
    </div>
  )
}
