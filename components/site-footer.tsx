import Link from "next/link"
import { Wrench } from "lucide-react"
import { tools, categories } from "@/lib/tools"

export function SiteFooter() {
  const pdfTools = tools.filter((t) => t.category === "PDF").slice(0, 5)
  const otherTools = tools.filter((t) => t.category !== "PDF").slice(0, 5)

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wrench className="size-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">Toolbox</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Free, private online tools for your documents and images. Everything runs in your browser.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">PDF Tools</h3>
            <ul className="mt-4 space-y-2.5">
              {pdfTools.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/tools/${t.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Image & Convert</h3>
            <ul className="mt-4 space-y-2.5">
              {otherTools.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/tools/${t.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Categories</h3>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c.name}>
                  <Link
                    href="/#tools"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Toolbox. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground">
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
