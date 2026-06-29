import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Tool } from "@/lib/tools"

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <span className={cn("flex size-11 items-center justify-center rounded-xl", tool.accent)}>
        <Icon className="size-5" />
      </span>
      <div className="space-y-1">
        <h3 className="font-semibold leading-tight">{tool.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Open tool
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
