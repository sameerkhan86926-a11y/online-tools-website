"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import { tools } from "@/lib/tools"
import { cn } from "@/lib/utils"

export function ToolSearch() {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return tools
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      )
      .slice(0, 6)
  }, [query])

  const showResults = focused && query.trim().length > 0

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm transition-all",
          focused && "border-primary/40 ring-4 ring-primary/10",
        )}
      >
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (blurTimeout.current) clearTimeout(blurTimeout.current)
            setFocused(true)
          }}
          onBlur={() => {
            blurTimeout.current = setTimeout(() => setFocused(false), 150)
          }}
          placeholder="Search for a tool, e.g. merge PDF, resize image…"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          aria-label="Search tools"
        />
      </div>

      {showResults && (
        <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-border bg-popover p-2 text-left shadow-xl">
          {results.length > 0 ? (
            results.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
                >
                  <span className={cn("flex size-9 items-center justify-center rounded-lg", tool.accent)}>
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{tool.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{tool.description}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              )
            })
          ) : (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No tools found for &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
