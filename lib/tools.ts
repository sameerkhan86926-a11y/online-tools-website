import type { LucideIcon } from "lucide-react"
import {
  FileImage,
  Images,
  Combine,
  Scissors,
  FileArchive,
  Replace,
  RefreshCw,
  Minimize2,
  Scaling,
  QrCode,
} from "lucide-react"

export type ToolCategory = "PDF" | "Image" | "Convert" | "Generate"

export interface Tool {
  slug: string
  name: string
  description: string
  category: ToolCategory
  icon: LucideIcon
  /** Tailwind classes for the icon tile background + foreground */
  accent: string
}

export const tools: Tool[] = [
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    description: "Combine JPG, PNG and more into a single PDF document.",
    category: "PDF",
    icon: FileImage,
    accent: "bg-red-50 text-red-600",
  },
  {
    slug: "pdf-to-image",
    name: "PDF to Image",
    description: "Turn each page of a PDF into a high quality PNG image.",
    category: "PDF",
    icon: Images,
    accent: "bg-orange-50 text-orange-600",
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into one ordered document.",
    category: "PDF",
    icon: Combine,
    accent: "bg-amber-50 text-amber-600",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    description: "Extract a range of pages into a brand new PDF file.",
    category: "PDF",
    icon: Scissors,
    accent: "bg-rose-50 text-rose-600",
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce the file size of your PDF while keeping quality.",
    category: "PDF",
    icon: FileArchive,
    accent: "bg-red-50 text-red-600",
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG",
    description: "Convert JPG images to lossless PNG format instantly.",
    category: "Convert",
    icon: Replace,
    accent: "bg-sky-50 text-sky-600",
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG",
    description: "Convert PNG images to smaller JPG files with a white background.",
    category: "Convert",
    icon: RefreshCw,
    accent: "bg-indigo-50 text-indigo-600",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Shrink image file sizes with adjustable quality control.",
    category: "Image",
    icon: Minimize2,
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to exact dimensions while keeping aspect ratio.",
    category: "Image",
    icon: Scaling,
    accent: "bg-teal-50 text-teal-600",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Create custom QR codes for links, text, Wi-Fi and more.",
    category: "Generate",
    icon: QrCode,
    accent: "bg-violet-50 text-violet-600",
  },
]

export const categories: {
  name: ToolCategory
  label: string
  description: string
}[] = [
  { name: "PDF", label: "PDF Tools", description: "Merge, split, convert and compress documents." },
  { name: "Image", label: "Image Tools", description: "Compress and resize images in seconds." },
  { name: "Convert", label: "Converters", description: "Switch between popular file formats." },
  { name: "Generate", label: "Generators", description: "Create QR codes and other assets." },
]

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
