"use client"

import { useState } from "react"
import { Download, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { downloadDataUrl } from "@/lib/file-utils"

interface RenderedPage {
  index: number
  dataUrl: string
}

export function PdfToImage() {
  const [pages, setPages] = useState<RenderedPage[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [baseName, setBaseName] = useState("page")

  async function handleFiles(files: File[]) {
    setError(null)
    setBusy(true)
    setPages([])
    try {
      const file = files[0]
      setBaseName(file.name.replace(/\.pdf$/i, "") || "page")
      const { pdfjsLib } = await import("@/lib/pdfjs")
      const buffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
      const rendered: RenderedPage[] = []
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement("canvas")
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Canvas not supported")
        await page.render({ canvas, canvasContext: ctx, viewport }).promise
        rendered.push({ index: i, dataUrl: canvas.toDataURL("image/png") })
      }
      setPages(rendered)
    } catch {
      setError("Could not read this PDF. Please make sure it is a valid file.")
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setPages([])
    setError(null)
  }

  return (
    <div className="space-y-6">
      {pages.length === 0 && (
        <FileDropzone accept="application/pdf" onFiles={handleFiles} hint="Select a PDF file" />
      )}

      {busy && <p className="text-center text-sm text-muted-foreground">Rendering pages…</p>}
      {error && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">{error}</p>}

      {pages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{pages.length} page{pages.length === 1 ? "" : "s"}</h2>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="size-4" /> New PDF
            </Button>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {pages.map((p) => (
              <li key={p.index} className="overflow-hidden rounded-xl border border-border bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.dataUrl} alt={`Page ${p.index}`} className="w-full object-contain" />
                <div className="flex items-center justify-between gap-2 p-2.5">
                  <span className="text-xs text-muted-foreground">Page {p.index}</span>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => downloadDataUrl(p.dataUrl, `${baseName}-${p.index}.png`)}
                  >
                    <Download className="size-3" /> PNG
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
