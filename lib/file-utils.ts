/** Format bytes to human readable size */
export function formatBytes(bytes: number): string {
  if (!bytes) return "0 B"

  const units = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  return `${(bytes / Math.pow(1024, i)).toFixed(
    i === 0 ? 0 : 1
  )} ${units[i]}`
}

/** Download blob as file */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")

  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  URL.revokeObjectURL(url)
}

/** Download data URL */
export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a")

  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/** SAFE image loader (USE ONLY IN COMPONENTS) */
export function createImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Could not load image. Try another file."))
    }

    img.src = url
  })
}

/** Remove file extension */
export function stripExtension(name: string): string {
  return name.replace(/\.[^/.]+$/, "")
}
