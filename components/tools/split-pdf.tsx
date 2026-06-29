"use client"

import { useState } from "react"
import { PDFDocument } from "pdf-lib"
import { Download, RotateCcw, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { downloadBlob, formatBytes, stripExtension } from "@/lib/file-utils"

export function SplitPdf() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(1)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFiles(files: File[]) {
    setError(null)
    try {
      const f = files[0]
      const bytes = await f.arrayBuffer()
      const doc = await PDFDocument.load(bytes)
      const count = doc.getPageCount()
      setFile(f)
      setPageCount(count)
      setFrom(1)
      setTo(count)
    } catch {
      setError("Could not read this PDF. Please try a different file.")
    }
  }

  async function split() {
    if (!file) return
    const start = Math.max(1, Math.min(from, pageCount))
    const end = Math.max(start, Math.min(to, pageCount))
    setBusy(true)
    setError(null)
    try {
      const bytes = await file.arrayBuffer()
      const src = await PDFDocument.load(bytes)
      const out = await PDFDocument.create()
      const indices = Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i)
      const copied = await out.copyPages(src, indices)
      copied.forEach((p) => out.addPage(p))
      const result = await out.save()
      downloadBlob(
        new Blob([result as BlobPart], { type: "application/pdf" }),
        `${stripExtension(file.name)}-pages-${start}-${end}.pdf`,
      )
    } catch {
      setError("Could not split this PDF. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setFile(null)
    setPageCount(0)
    setError(null)
  }

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
              <span className="block text-xs text-muted-foreground">
                {pageCount} pages · {formatBytes(file.size)}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="from" className="text-sm font-medium">
                From page
              </label>
              <input
                id="from"
                type="number"
                min={1}
                max={pageCount}
                value={from}
                onChange={(e) => setFrom(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="to" className="text-sm font-medium">
                To page
              </label>
              <input
                id="to"
                type="number"
                min={1}
                max={pageCount}
                value={to}
                onChange={(e) => setTo(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" disabled={busy} onClick={split}>
              <Download className="size-4" /> {busy ? "Splitting…" : "Extract pages"}
            </Button>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="size-4" /> New PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
