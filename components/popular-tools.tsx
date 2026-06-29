"use client"

import { useState } from "react"
import { tools, categories, type ToolCategory } from "@/lib/tools"
import { ToolCard } from "@/components/tool-card"
import { cn } from "@/lib/utils"

type Filter = "All" | ToolCategory

const filters: Filter[] = ["All", ...categories.map((c) => c.name)]

export function PopularTools() {
  const [active, setActive] = useState<Filter>("All")

  const visible = active === "All" ? tools : tools.filter((t) => t.category === active)

  return (
    <section id="tools" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-primary">Popular tools</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            The most loved tools, ready to use
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Pick a tool to get started. No installs, no watermarks, no waiting.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f === "All" ? "All" : categories.find((c) => c.name === f)?.label ?? f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  )
}
