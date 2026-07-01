import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ToolShell } from "@/components/tool-shell"
import { ToolRunner } from "@/components/tools/tool-runner"
import { getTool, tools } from "@/lib/tools"
import { cn } from "@/lib/utils"

const BASE_URL = "https://toolboxar-project.vercel.app"

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

  if (!tool) {
    return {
      title: "Tool Not Found | PDFToolbox",
      description: "The requested tool could not be found.",
    }
  }

  const url = `${BASE_URL}/tools/${tool.slug}`

  return {
    title: `${tool.name} - Free Online Tool | PDFToolbox`,
    description: tool.description,
    alternates: { canonical: url },

    openGraph: {
      title: `${tool.name} - Free Online Tool`,
      description: tool.description,
      url,
      siteName: "PDFToolbox",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${tool.name} - Free Online Tool`,
      description: tool.description,
    },

    robots: {
      index: true,
      follow: true,
    },
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

  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3)

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">

        {/* 🔥 SEO INTRO */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">
            {tool.name}
          </h1>

          <p className="mt-3 text-gray-600">
            {tool.description} This free online tool helps you process files instantly in your browser without installing any software.
            Fast, secure and easy to use on all devices.
          </p>
        </section>

        {/* 🔥 AD 1 */}
        <div className="my-6 flex justify-center">
          <AdBanner />
        </div>

        {/* 🔥 TOOL */}
        <ToolShell tool={tool}>
          <ToolRunner slug={tool.slug} />
        </ToolShell>

        {/* 🔥 AD 2 */}
        <div className="my-10 flex justify-center">
          <AdNative />
        </div>

        {/* 🔥 FAQ SECTION */}
        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-xl font-semibold">
            How to use {tool.name}?
          </h2>

          <p className="text-gray-600 mt-2">
            Upload your file, click process button and download your result instantly. No signup required.
          </p>

          <h2 className="text-xl font-semibold mt-6">
            Is this tool free?
          </h2>

          <p className="text-gray-600 mt-2">
            Yes, all tools are 100% free to use.
          </p>
        </section>

        {/* 🔥 RELATED TOOLS */}
        {related.length > 0 && (
          <section className="border-t border-border bg-card">
            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
              <h2 className="text-lg font-semibold">
                Related tools
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {related.map((t) => {
                  const Icon = t.icon

                  return (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 hover:border-primary/30"
                    >
                      <span
                        className={cn(
                          "flex size-9 items-center justify-center rounded-lg",
                          t.accent
                        )}
                      >
                        <Icon className="size-4" />
                      </span>

                      <span className="text-sm font-medium">
                        {t.name}
                      </span>
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

/* ================= ADS ================= */
function AdBanner() {
  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.atOptions = {
              key: '750f18151b48bf117eb6e23da4081f0b',
              format: 'iframe',
              height: 250,
              width: 300,
              params: {}
            };
          `,
        }}
      />
      <script src="https://www.highperformanceformat.com/750f18151b48bf117eb6e23da4081f0b/invoke.js"></script>
    </div>
  )
}

function AdNative() {
  return (
    <script src="https://pl30153792.effectivecpmnetwork.com/29/8a/9d/298a9dc6555ab3c78c419cbefe39beb3.js"></script>
  )
}
