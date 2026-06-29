"use client"

import { useRef, useState, type DragEvent } from "react"
import { UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileDropzoneProps {
  accept?: string
  multiple?: boolean
  onFiles: (files: File[]) => void
  hint?: string
}

export function FileDropzone({ accept, multiple = false, onFiles, hint }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return
    onFiles(Array.from(list))
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card px-6 py-16 text-center transition-colors hover:border-primary/40 hover:bg-accent/40",
        dragging && "border-primary bg-accent/60",
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-primary">
        <UploadCloud className="size-7" />
      </span>
      <div className="space-y-1">
        <p className="font-medium">
          <span className="text-primary">Click to upload</span> or drag and drop
        </p>
        {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ""
        }}
      />
    </div>
  )
}
