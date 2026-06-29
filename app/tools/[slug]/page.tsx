import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ToolShell } from "@/components/tool-shell"
import { ToolRunner } from "@/components/tools/tool-runner"
import { getTool, tools } from "@/lib/tools"
import { cn } from "@/lib/utils"

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) return { title: "Tool not found — Toolbox" }
  return {
    title: `${tool.name} — Toolbox`,
    description: tool.description,
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) notFound()

  const related = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 3)

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ToolShell tool={tool}>
          <ToolRunner slug={tool.slug} />
        </ToolShell>

        {related.length > 0 && (
          <section className="border-t border-border bg-card">
            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
              <h2 className="text-lg font-semibold">Related tools</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {related.map((t) => {
                  const Icon = t.icon
                  return (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary/30"
                    >
                      <span className={cn("flex size-9 items-center justify-center rounded-lg", t.accent)}>
                        <Icon className="size-4" />
                      </span>
                      <span className="text-sm font-medium">{t.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
