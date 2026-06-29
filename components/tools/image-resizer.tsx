"use client"

import { useState } from "react"
import { Download, RotateCcw, Link2, Link2Off } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { loadImage, downloadBlob, stripExtension } from "@/lib/file-utils"

export function ImageResizer() {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState("image")
  const [natural, setNatural] = useState({ w: 0, h: 0 })
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [lock, setLock] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function handleFiles(files: File[]) {
    setError(null)
    try {
      const file = files[0]
      const image = await loadImage(file)
      setImg(image)
      setFileName(stripExtension(file.name))
      setNatural({ w: image.naturalWidth, h: image.naturalHeight })
      setWidth(image.naturalWidth)
      setHeight(image.naturalHeight)
    } catch {
      setError("Could not load this image. Please try a different file.")
    }
  }

  function onWidth(value: number) {
    setWidth(value)
    if (lock && natural.w > 0) {
      setHeight(Math.round((value / natural.w) * natural.h))
    }
  }

  function onHeight(value: number) {
    setHeight(value)
    if (lock && natural.h > 0) {
      setWidth(Math.round((value / natural.h) * natural.w))
    }
  }

  function download() {
    if (!img || width < 1 || height < 1) return
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(img, 0, 0, width, height)
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `${fileName}-${width}x${height}.png`)
    }, "image/png")
  }

  function reset() {
    setImg(null)
    setError(null)
  }

  return (
    <div className="space-y-6">
      {!img && (
        <FileDropzone accept="image/*" onFiles={handleFiles} hint="Select an image to resize" />
      )}

      {error && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">{error}</p>}

      {img && (
        <div className="space-y-5">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt="Resize preview" className="max-h-64 w-full object-contain" />
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Original size: {natural.w} × {natural.h} px
          </p>

          <div className="flex items-end gap-3">
            <div className="flex-1 space-y-1.5">
              <label htmlFor="w" className="text-sm font-medium">
                Width (px)
              </label>
              <input
                id="w"
                type="number"
                min={1}
                value={width}
                onChange={(e) => onWidth(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <Button
              variant="outline"
              size="icon-lg"
              onClick={() => setLock((v) => !v)}
              aria-label={lock ? "Unlock aspect ratio" : "Lock aspect ratio"}
              aria-pressed={lock}
              className="mb-0.5"
            >
              {lock ? <Link2 className="size-4" /> : <Link2Off className="size-4" />}
            </Button>
            <div className="flex-1 space-y-1.5">
              <label htmlFor="h" className="text-sm font-medium">
                Height (px)
              </label>
              <input
                id="h"
                type="number"
                min={1}
                value={height}
                onChange={(e) => onHeight(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" onClick={download}>
              <Download className="size-4" /> Download PNG
            </Button>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="size-4" /> New image
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
