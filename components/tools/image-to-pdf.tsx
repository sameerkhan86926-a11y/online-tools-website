"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import { Download, RotateCcw, X, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"

interface Page {
  id: string
  name: string
  file: File
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
      .map((f) => ({
        id: crypto.randomUUID(),
        name: f.name,
        file: f,
        url: URL.createObjectURL(f),
      }))

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

  // ✅ SAFE IMAGE LOADER (IMPORTANT FIX)
  function fileToImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)

      img.onload = () => {
        URL.revokeObjectURL(url)
        resolve(img)
      }

      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error("Image load failed"))
      }

      img.src = url
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
        const img = await fileToImage(pages[i].file)

        const maxW = pw - margin * 2
        const maxH = ph - margin * 2

        const ratio = Math.min(
          maxW / img.naturalWidth,
          maxH / img.naturalHeight
        )

        const w = img.naturalWidth * ratio
        const h = img.naturalHeight * ratio

        const x = (pw - w) / 2
        const y = (ph - h) / 2

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) throw new Error("Canvas not supported")

        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight

        // white background (fix transparency crash)
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.drawImage(img, 0, 0)

        const dataUrl = canvas.toDataURL("image/jpeg", 1.0)

        if (!dataUrl || dataUrl.length < 1000) {
          throw new Error("Invalid image conversion")
        }

        if (i > 0) doc.addPage()

        doc.addImage(dataUrl, "JPEG", x, y, w, h)
      }

      doc.save("images.pdf")
    } catch (e) {
      console.error("PDF ERROR:", e)
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

      <FileDropzone
        accept="image/*"
        multiple
        onFiles={handleFiles}
        hint="Select images (JPG/PNG only recommended)"
      />

      {error && (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
          {error}
        </p>
      )}

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
              <li key={p.id} className="relative rounded-xl border bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} className="aspect-square w-full object-cover" />

                <span className="absolute left-2 top-2 bg-black text-white px-2 rounded">
                  {i + 1}
                </span>

                <button
                  onClick={() => remove(p.id)}
                  className="absolute right-2 top-2 bg-white px-2 rounded"
                >
                  <X className="size-4" />
                </button>

                <div className="absolute bottom-2 flex w-full gap-2 px-2">
                  <button onClick={() => move(i, -1)}>⬆</button>
                  <button onClick={() => move(i, 1)}>⬇</button>
                </div>
              </li>
            ))}
          </ul>

          <Button className="w-full" disabled={busy} onClick={generate}>
            <Download className="size-4" />
            {busy ? "Building PDF..." : "Download PDF"}
          </Button>

        </div>
      )}
    </div>
  )
}
