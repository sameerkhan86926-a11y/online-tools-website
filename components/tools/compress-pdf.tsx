"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import { Download, RotateCcw, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { downloadBlob, formatBytes, stripExtension } from "@/lib/file-utils"

const levels = [
  { label: "Low", quality: 0.85, scale: 1.5, note: "Best quality" },
  { label: "Medium", quality: 0.65, scale: 1.2, note: "Recommended" },
  { label: "High", quality: 0.45, scale: 1, note: "Smallest size" },
]

interface Result {
  blob: Blob
  name: string
  originalSize: number
}

export function CompressPdf() {
  const [file, setFile] = useState<File | null>(null)
  const [level, setLevel] = useState(levels[1])
  const [result, setResult] = useState<Result | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFiles(files: File[]) {
    setError(null)
    setResult(null)
    setFile(files[0])
  }

  async function compress() {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const { pdfjsLib } = await import("@/lib/pdfjs")
      const buffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise

      let doc: jsPDF | null = null
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: level.scale })
        const canvas = document.createElement("canvas")
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Canvas not supported")
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        await page.render({ canvas, canvasContext: ctx, viewport }).promise
        const dataUrl = canvas.toDataURL("image/jpeg", level.quality)

        const orientation = viewport.width >= viewport.height ? "landscape" : "portrait"
        if (!doc) {
          doc = new jsPDF({ unit: "pt", orientation, format: [viewport.width, viewport.height] })
        } else {
          doc.addPage([viewport.width, viewport.height], orientation)
        }
        doc.addImage(dataUrl, "JPEG", 0, 0, viewport.width, viewport.height)
      }

      if (!doc) throw new Error("Empty PDF")
      const out = doc.output("blob")
      setResult({
        blob: out,
        name: `${stripExtension(file.name)}-compressed.pdf`,
        originalSize: file.size,
      })
    } catch {
      setError("Could not compress this PDF. Please try a different file.")
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setFile(null)
    setResult(null)
    setError(null)
  }

  const saved =
    result && result.originalSize > 0
      ? Math.round((1 - result.blob.size / result.originalSize) * 100)
      : 0

  return (
    <div className="space-y-6">
      {!file && <FileDropzone accept="application/pdf" onFiles={handleFiles} hint="Select a PDF file" />}

      {error && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">{error}</p>}

      {file && (
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
              <FileText className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{file.name}</span>
              <span className="block text-xs text-muted-foreground">{formatBytes(file.size)}</span>
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Compression level</span>
            <div className="grid grid-cols-3 gap-2">
              {levels.map((l) => (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    level.label === l.label
                      ? "border-primary bg-accent"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <span className="block text-sm font-semibold">{l.label}</span>
                  <span className="block text-xs text-muted-foreground">{l.note}</span>
                </button>
              ))}
            </div>
          </div>

          {result ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <Stat label="Original" value={formatBytes(result.originalSize)} />
                <Stat label="Compressed" value={formatBytes(result.blob.size)} />
                <Stat label="Saved" value={`${saved > 0 ? saved : 0}%`} highlight />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => downloadBlob(result.blob, result.name)}>
                  <Download className="size-4" /> Download
                </Button>
                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="size-4" /> New PDF
                </Button>
              </div>
            </div>
          ) : (
            <Button className="w-full" disabled={busy} onClick={compress}>
              {busy ? "Compressing…" : "Compress PDF"}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 text-sm font-semibold ${highlight ? "text-primary" : ""}`}>{value}</p>
    </div>
  )
}
