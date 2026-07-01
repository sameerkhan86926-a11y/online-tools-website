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

/** Download base64/dataURL */
export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a")

  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/** SAFE image loader (FIXED FOR ALL IMAGE TOOLS) */
export function loadImage(src: Blob | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.crossOrigin = "anonymous"

    const url =
      typeof src === "string" ? src : URL.createObjectURL(src)

    let loaded = false

    img.onload = () => {
      loaded = true

      // small delay ensures canvas ready
      setTimeout(() => {
        if (typeof src !== "string") {
          URL.revokeObjectURL(url)
        }
        resolve(img)
      }, 30)
    }

    img.onerror = () => {
      if (!loaded && typeof src !== "string") {
        URL.revokeObjectURL(url)
      }
      reject(new Error("Could not load image. Please try another file."))
    }

    img.src = url
  })
}

/** Remove file extension */
export function stripExtension(name: string): string {
  return name.replace(/\.[^/.]+$/, "")
}
