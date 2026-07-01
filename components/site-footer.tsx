import Link from "next/link"
import { Wrench, Github, Twitter, Instagram } from "lucide-react"
import { tools } from "@/lib/tools"

export function SiteFooter() {
  const pdfTools = tools.filter((t) => t.category === "PDF").slice(0, 5)
  const otherTools = tools.filter((t) => t.category !== "PDF").slice(0, 5)

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">

        {/* TOP GRID */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* BRAND */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wrench className="size-5" />
              </span>
              <span className="text-lg font-semibold">PDFToolbox</span>
            </Link>

            <p className="text-sm text-muted-foreground">
              Free online PDF & image tools for fast and secure file processing.
            </p>
          </div>

          {/* TOOLS */}
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

          {/* OTHER */}
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

        {/* BOTTOM SECTION */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* COPYRIGHT */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PDFToolbox. All rights reserved.
          </p>

          {/* LINKS */}
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/contact" className="hover:text-foreground">Support</Link>
          </div>

          {/* SOCIAL ICONS (FIXED) */}
          <div className="flex items-center gap-4">

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground transition" />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground transition" />
            </a>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 text-muted-foreground hover:text-foreground transition" />
            </a>

          </div>

        </div>

      </div>
    </footer>
  )
}
