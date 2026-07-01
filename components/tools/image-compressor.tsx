"use client"

import { useState } from "react"
import { Download, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { downloadBlob, formatBytes, stripExtension } from "@/lib/file-utils"

interface Result {
  name: string
  blob: Blob
  url: string
  originalSize: number
}

export function ImageCompressor() {
  const [quality, setQuality] = useState(70)
  const [original, setOriginal] = useState<File | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        reject(new Error("Image load failed"))
      }

      img.src = url
    })
  }

  // ✅ COMPRESS FUNCTION
  async function compress(file: File, q: number) {
    const img = await loadImageSafe(file)

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) throw new Error("Canvas not supported")

    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(img, 0, 0)

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) reject(new Error("Compression failed"))
          else resolve(blob)
        },
        "image/jpeg",
        q / 100
      )
    })
  }

  async function handleFiles(files: File[]) {
    setError(null)
    setBusy(true)

    try {
      const file = files[0]
      setOriginal(file)

      const blob = await compress(file, quality)

      setResult({
        name: `${stripExtension(file.name)}-compressed.jpg`,
        blob,
        url: URL.createObjectURL(blob),
        originalSize: file.size,
      })
    } catch (e) {
      console.error(e)
      setError("Could not compress this image. Please try a different file.")
    } finally {
      setBusy(false)
    }
  }

  async function reCompress(q: number) {
    if (!original) return
    setBusy(true)

    try {
      const blob = await compress(original, q)

      setResult((prev) =>
        prev
          ? {
              ...prev,
              blob,
              url: URL.createObjectURL(blob),
            }
          : null
      )
    } catch (e) {
      console.error(e)
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    if (result) URL.revokeObjectURL(result.url)
    setOriginal(null)
    setResult(null)
    setError(null)
  }

  const saved =
    result && result.originalSize
      ? Math.max(
          0,
          Math.round((1 - result.blob.size / result.originalSize) * 100)
        )
      : 0

  return (
    <div className="space-y-6">
      {/* QUALITY SLIDER */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Quality</label>
          <span className="text-sm font-semibold text-primary">{quality}%</span>
        </div>

        <input
          type="range"
          min={10}
          max={100}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          onMouseUp={() => reCompress(quality)}
          onTouchEnd={() => reCompress(quality)}
          className="mt-3 w-full"
        />

        <p className="mt-2 text-xs text-muted-foreground">
          Lower quality = smaller file size
        </p>
      </div>

      {/* UPLOAD */}
      {!result && (
        <FileDropzone
          accept="image/*"
          onFiles={handleFiles}
          hint="Select an image to compress"
        />
      )}

      {/* LOADING */}
      {busy && (
        <p className="text-center text-sm text-muted-foreground">
          Compressing...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
          {error}
        </p>
      )}

      {/* RESULT */}
      {result && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.url}
              alt="Compressed"
              className="max-h-72 w-full object-contain"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat label="Original" value={formatBytes(result.originalSize)} />
            <Stat label="Compressed" value={formatBytes(result.blob.size)} />
            <Stat label="Saved" value={`${saved}%`} highlight />
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1"
              onClick={() =>
                downloadBlob(result.blob, result.name)
              }
            >
              <Download className="size-4" /> Download
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

function Stat({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={`mt-1 text-sm font-semibold ${
          highlight ? "text-primary" : ""
        }`}
      >
        {value}
      </p>
    </div>
  )
}
