import Link from "next/link"
import { ShieldCheck, Zap, Sparkles } from "lucide-react"
import { ToolSearch } from "@/components/tool-search"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-10%,var(--accent),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          10+ free tools, no sign up required
        </div>

        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Every tool you need to work with{" "}
          <span className="text-primary">PDFs &amp; images</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Convert, compress, merge and edit your files in seconds. Everything runs right in your
          browser, so your documents never leave your device.
        </p>

        <div className="mt-9">
          <ToolSearch />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" /> 100% private &amp; secure
          </span>
          <span className="inline-flex items-center gap-2">
            <Zap className="size-4 text-primary" /> Lightning fast
          </span>
          <span className="inline-flex items-center gap-2">
            <Sparkles className="size-4 text-primary" /> Completely free
          </span>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Or{" "}
          <Link href="#tools" className="font-medium text-primary hover:underline">
            browse all tools
          </Link>{" "}
          below.
        </p>
      </div>
    </section>
  )
}
