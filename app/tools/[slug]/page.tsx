import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ToolShell } from "@/components/tool-shell"
import { ToolRunner } from "@/components/tools/tool-runner"
import { getTool, tools } from "@/lib/tools"
import { cn } from "@/lib/utils"

const BASE_URL = "https://pdftoolbox.shop"

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = getTool(params.slug)

  if (!tool) {
    return {
      title: "Tool Not Found",
      description: "Tool not found",
    }
  }

  return {
    title: `${tool.name} - PDFToolbox`,
    description: tool.description,
    alternates: {
      canonical: `${BASE_URL}/tools/${tool.slug}`,
    },
  }
}

export default function ToolPage({
  params,
}: {
  params: { slug: string }
}) {
  const tool = getTool(params.slug)

  if (!tool) return notFound()

  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3)

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">{tool.name}</h1>
          <p className="mt-3 text-gray-600">{tool.description}</p>
        </section>

        <ToolShell tool={tool}>
          <ToolRunner slug={tool.slug} />
        </ToolShell>

        {related.length > 0 && (
          <section className="border-t border-border bg-card">
            <div className="mx-auto max-w-3xl px-4 py-12">
              <h2 className="text-lg font-semibold">Related tools</h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {related.map((t) => {
                  const Icon = t.icon
                  return (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      className="flex items-center gap-3 rounded-xl border p-3"
                    >
                      <Icon className="size-4" />
                      <span className="text-sm">{t.name}</span>
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
