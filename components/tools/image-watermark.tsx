"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { loadImage } from "@/lib/file-utils"

export function ImageWatermark() {
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState("My Watermark")
  const [result, setResult] = useState<string | null>(null)

  async function handleFiles(files: File[]) {
    const f = files[0]
    setFile(f)
    const url = URL.createObjectURL(f)
    setImgUrl(url)
  }

  async function addWatermark() {
    if (!file) return

    const img = await loadImage(file)

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    ctx.drawImage(img, 0, 0)

    // watermark text
    ctx.font = `${Math.floor(canvas.width / 20)}px Arial`
    ctx.fillStyle = "rgba(255,255,255,0.6)"
    ctx.textAlign = "center"

    ctx.fillText(text, canvas.width / 2, canvas.height - 40)

    setResult(canvas.toDataURL("image/png"))
  }

  return (
    <div className="space-y-6">

      {!imgUrl && (
        <FileDropzone accept="image/*" onFiles={handleFiles} />
      )}

      {imgUrl && (
        <div className="space-y-4">

          {/* preview */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgUrl} className="rounded-xl" />

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Watermark text"
          />

          <Button className="w-full" onClick={addWatermark}>
            Add Watermark
          </Button>
        </div>
      )}

      {result && (
        <div className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result} className="rounded-xl" />

          <a download="watermarked.png" href={result}>
            <Button className="w-full">
              <Download className="size-4" /> Download
            </Button>
          </a>
        </div>
      )}
    </div>
  )
}
