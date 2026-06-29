import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Tool } from "@/lib/tools"

export function ToolShell({ tool, children }: { tool: Tool; children: React.ReactNode }) {
  const Icon = tool.icon
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="size-4" />
        <Link href="/#tools" className="hover:text-foreground">
          Tools
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <header className="mt-8 flex flex-col items-center gap-4 text-center">
        <span className={cn("flex size-16 items-center justify-center rounded-2xl", tool.accent)}>
          <Icon className="size-8" />
        </span>
        <div className="space-y-2">
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{tool.name}</h1>
          <p className="mx-auto max-w-lg text-pretty leading-relaxed text-muted-foreground">
            {tool.description}
          </p>
        </div>
      </header>

      <div className="mt-10">{children}</div>
    </div>
  )
}
