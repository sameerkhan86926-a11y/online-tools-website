import Link from "next/link"
import { Wrench } from "lucide-react"
import { tools } from "@/lib/tools"

export function SiteFooter() {
  const pdfTools = tools.filter((t) => t.category === "PDF").slice(0, 5)
  const otherTools = tools.filter((t) => t.category !== "PDF").slice(0, 5)

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">

        {/* TOP */}
        <div className="grid gap-10 md:grid-cols-3">

          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wrench className="size-5" />
              </span>
              <span className="text-lg font-semibold">PDFToolbox</span>
            </Link>

            <p className="text-sm text-muted-foreground">
              Free online PDF & image tools for fast processing.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">PDF Tools</h3>
            <ul className="mt-4 space-y-2">
              {pdfTools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className="text-sm text-muted-foreground hover:text-foreground">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Image Tools</h3>
            <ul className="mt-4 space-y-2">
              {otherTools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className="text-sm text-muted-foreground hover:text-foreground">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-5">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PDFToolbox. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Support</Link>
          </div>

          {/* SOCIAL ICONS (SVG - GUARANTEED WORKING) */}
          <div className="flex items-center gap-4">

            {/* Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 0 0 1.88-2.35 8.3 8.3 0 0 1-2.7 1.03A4.15 4.15 0 0 0 16.11 4c-2.35 0-4.25 2.06-4.25 4.6 0 .36.04.71.11 1.04C8.1 9.5 5.1 7.8 3.1 5.3a4.77 4.77 0 0 0-.58 2.3c0 1.6.8 3 2.02 3.8a3.9 3.9 0 0 1-1.93-.56v.06c0 2.23 1.52 4.09 3.54 4.53a4.2 4.2 0 0 1-1.92.08c.54 1.8 2.11 3.12 3.97 3.16A8.34 8.34 0 0 1 2 19.54 11.7 11.7 0 0 0 8.29 21c7.55 0 11.68-6.68 11.68-12.47v-.57c.8-.63 1.49-1.4 2.04-2.3z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5zM17.5 6.5a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>
              </svg>
            </a>

            {/* GitHub */}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.4-4.04-1.4a3.18 3.18 0 0 0-1.33-1.76c-1.09-.75.08-.73.08-.73a2.5 2.5 0 0 1 1.82 1.23 2.53 2.53 0 0 0 3.45.99 2.53 2.53 0 0 1 .76-1.6c-2.66-.3-5.47-1.33-5.47-5.93a4.63 4.63 0 0 1 1.23-3.21 4.3 4.3 0 0 1 .12-3.17s1-.32 3.3 1.23a11.3 11.3 0 0 1 6 0C17.8 3.28 18.8 3.6 18.8 3.6a4.3 4.3 0 0 1 .12 3.17 4.63 4.63 0 0 1 1.23 3.21c0 4.6-2.81 5.63-5.48 5.92a2.83 2.83 0 0 1 .8 2.2v3.26c0 .32.21.69.82.58A12 12 0 0 0 12 .5z"/>
              </svg>
            </a>

          </div>

        </div>

      </div>
    </footer>
  )
}
