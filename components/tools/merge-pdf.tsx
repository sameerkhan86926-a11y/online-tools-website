"use client"

import { useState } from "react"
import { PDFDocument } from "pdf-lib"
import { Download, RotateCcw, X, ArrowUp, ArrowDown, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { downloadBlob, formatBytes } from "@/lib/file-utils"

interface Item {
  id: string
  file: File
}

export function MergePdf() {
  const [items, setItems] = useState<Item[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFiles(files: File[]) {
    setError(null)
    const next = files
      .filter((f) => f.type === "application/pdf")
      .map((f) => ({ id: crypto.randomUUID(), file: f }))
    setItems((prev) => [...prev, ...next])
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function move(index: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev]
      const target = index + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  async function merge() {
    if (items.length < 2) {
      setError("Add at least two PDF files to merge.")
      return
    }
    setBusy(true)
    setError(null)
    try {
      const out = await PDFDocument.create()
      for (const item of items) {
        const bytes = await item.file.arrayBuffer()
        const src = await PDFDocument.load(bytes)
        const copied = await out.copyPages(src, src.getPageIndices())
        copied.forEach((p) => out.addPage(p))
      }
      const merged = await out.save()
      downloadBlob(new Blob([merged as BlobPart], { type: "application/pdf" }), "merged.pdf")
    } catch {
      setError("Could not merge these files. Make sure they are all valid PDFs.")
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setItems([])
    setError(null)
  }

  return (
    <div className="space-y-6">
      <FileDropzone accept="application/pdf" multiple onFiles={handleFiles} hint="Select two or more PDF files" />

      {error && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">{error}</p>}

      {items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Files ({items.length})</h2>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="size-4" /> Clear
            </Button>
          </div>
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={item.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary">
                  <FileText className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{item.file.name}</span>
                  <span className="block text-xs text-muted-foreground">{formatBytes(item.file.size)}</span>
                </span>
                <div className="flex items-center gap-1">
                  <Button size="icon-sm" variant="ghost" onClick={() => move(i, -1)} aria-label="Move up">
                    <ArrowUp className="size-4" />
                  </Button>
                  <Button size="icon-sm" variant="ghost" onClick={() => move(i, 1)} aria-label="Move down">
                    <ArrowDown className="size-4" />
                  </Button>
                  <Button size="icon-sm" variant="ghost" onClick={() => remove(item.id)} aria-label="Remove">
                    <X className="size-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <Button className="w-full" disabled={busy} onClick={merge}>
            <Download className="size-4" /> {busy ? "Merging…" : "Merge & download"}
          </Button>
        </div>
      )}
    </div>
  )
}
