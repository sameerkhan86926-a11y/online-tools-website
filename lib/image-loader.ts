export function loadImageSafe(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.decoding = "async"
    img.loading = "eager"

    img.onload = async () => {
      await img.decode?.().catch(() => {})
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
