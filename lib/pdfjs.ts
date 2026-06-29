"use client"

import * as pdfjsLib from "pdfjs-dist"

// Configure the worker once, using a bundled URL so it works offline / in-browser.
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString()

export { pdfjsLib }
