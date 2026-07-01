"use client"

import { useState } from "react"
import { Download, RotateCcw, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import {
  downloadBlob,
  formatBytes,
  stripExtension,
} from "@/lib/file-utils"

interface Converted {
  name: string
  url: string
  size: number
}

export function ImageConverter({ target }: { target: "png" | "jpg" }) {
  const [items, setItems] = useState<Converted[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mime = target === "png" ? "image/png" : "image/jpeg"
  const ext = target === "png" ? "png" : "jpg"

  // ✅ SAFE IMAGE LOADER (FIXED)
  function loadImageSafe(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)

      img.onload = () => {
        URL.revokeObjectURL(url)
        resolve(img)
      }

      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error("Image failed to load"))
      }

      img.src = url
    })
  }

  async function handleFiles(files: File[]) {
    setBusy(true)
    setError(null)

    try {
      const results: Converted[] = []

      for (const file of files) {
        const img = await loadImageSafe(file)

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) throw new Error("Canvas not supported")

        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight

        // white background for JPG
        if (target === "jpg") {
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        ctx.drawImage(img, 0, 0)

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => {
              if (!b) reject(new Error("Conversion failed"))
              else resolve(b)
            },
            mime,
            target === "jpg" ? 0.92 : undefined
          )
        })

        const url = URL.createObjectURL(blob)

        results.push({
          name: `${stripExtension(file.name)}.${ext}`,
          url,
          size: blob.size,
        })
      }

      setItems((prev) => [...prev, ...results])
    } catch (e) {
      console.error(e)
      setError("Could not convert images. Please try a different file.")
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    items.forEach((i) => URL.revokeObjectURL(i.url))
    setItems([])
    setError(null)
  }

  return (
    <div className="space-y-6">
      <FileDropzone
        accept="image/*"
        multiple
        onFiles={handleFiles}
        hint={`Select images to convert to ${ext.toUpperCase()}`}
      />

      {busy && (
        <p className="text-center text-sm text-muted-foreground">
          Converting…
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
          {error}
        </p>
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              Converted files ({items.length})
            </h2>

            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="size-4" />
              Clear
            </Button>
          </div>

          <ul className="space-y-2">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <ImageIcon className="size-5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {item.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {formatBytes(item.size)}
                  </span>
                </span>

                <Button
                  size="sm"
                  onClick={() =>
                    fetch(item.url)
                      .then((r) => r.blob())
                      .then((b) => downloadBlob(b, item.name))
                  }
                >
                  <Download className="size-4" />
                  Download
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
