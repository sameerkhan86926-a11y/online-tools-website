import Link from "next/link"
import { Wrench } from "lucide-react"
import { tools, categories } from "@/lib/tools"

export function SiteFooter() {
  const pdfTools = tools.filter((t) => t.category === "PDF").slice(0, 5)
  const otherTools = tools.filter((t) => t.category !== "PDF").slice(0, 5)

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">

        {/* TOP GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wrench className="size-5" />
              </span>
              <span className="text-lg font-semibold">PDFToolbox</span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Free online PDF and image tools. Compress, merge, split and convert files instantly in your browser.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Twitter
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Instagram
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                GitHub
              </a>
            </div>
          </div>

          {/* PDF TOOLS */}
          <div>
            <h3 className="text-sm font-semibold">PDF Tools</h3>
            <ul className="mt-4 space-y-2.5">
              {pdfTools.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/tools/${t.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* OTHER TOOLS */}
          <div>
            <h3 className="text-sm font-semibold">Image & Convert</h3>
            <ul className="mt-4 space-y-2.5">
              {otherTools.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/tools/${t.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES + PAGES */}
          <div>
            <h3 className="text-sm font-semibold">Pages</h3>
            <ul className="mt-4 space-y-2.5">

              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>

            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PDFToolbox. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Support
            </Link>
          </div>

        </div>

      </div>
    </footer>
  )
}
