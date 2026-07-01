"use client"

import { ImageToPdf } from "@/components/tools/image-to-pdf"
import { PdfToImage } from "@/components/tools/pdf-to-image"
import { MergePdf } from "@/components/tools/merge-pdf"
import { SplitPdf } from "@/components/tools/split-pdf"
import { CompressPdf } from "@/components/tools/compress-pdf"
import { ImageConverter } from "@/components/tools/image-converter"
import { ImageCompressor } from "@/components/tools/image-compressor"
import { ImageResizer } from "@/components/tools/image-resizer"
import { QrGenerator } from "@/components/tools/qr-generator"
import { ImageWatermark } from "@/components/tools/image-watermark"

export function ToolRunner({ slug }: { slug: string }) {
  switch (slug?.toLowerCase()) {

    case "image-to-pdf":
      return <ImageToPdf />

    case "pdf-to-image":
      return <PdfToImage />

    case "merge-pdf":
      return <MergePdf />

    case "split-pdf":
      return <SplitPdf />

    case "compress-pdf":
      return <CompressPdf />

    case "jpg-to-png":
      return <ImageConverter target="png" />

    case "png-to-jpg":
      return <ImageConverter target="jpg" />

    case "image-compressor":
      return <ImageCompressor />

    case "image-resizer":
      return <ImageResizer />

    case "image-watermark":
      return <ImageWatermark />

    case "qr-code-generator":
      return <QrGenerator />

    default:
      return (
        <p className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          This tool is coming soon.
        </p>
      )
  }
}
