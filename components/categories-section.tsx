import Link from "next/link"
import { FileText, ImageIcon, Repeat, Sparkles, ArrowRight } from "lucide-react"
import { categories, tools, type ToolCategory } from "@/lib/tools"

const icons: Record<ToolCategory, typeof FileText> = {
  PDF: FileText,
  Image: ImageIcon,
  Convert: Repeat,
  Generate: Sparkles,
}

export function CategoriesSection() {
  return (
    <section id="categories" className="scroll-mt-20 border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold text-primary">Categories</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Find tools by category
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Whether you&apos;re working with documents or images, there&apos;s a category for that.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = icons[category.name]
            const count = tools.filter((t) => t.category === category.name).length
            return (
              <Link
                key={category.name}
                href="/#tools"
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="size-6" />
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold">{category.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {count} tool{count === 1 ? "" : "s"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
