import { Lock, Gauge, Gift, MonitorSmartphone, Infinity as InfinityIcon, MousePointerClick } from "lucide-react"

const features = [
  {
    icon: Lock,
    title: "Private by design",
    description: "Files are processed locally in your browser. Nothing is uploaded to a server.",
  },
  {
    icon: Gauge,
    title: "Blazing fast",
    description: "No queues or waiting rooms. Conversions happen instantly on your device.",
  },
  {
    icon: Gift,
    title: "Free forever",
    description: "Every tool is completely free with no watermarks and no hidden limits.",
  },
  {
    icon: MonitorSmartphone,
    title: "Works everywhere",
    description: "A responsive experience that works on desktop, tablet and mobile alike.",
  },
  {
    icon: InfinityIcon,
    title: "No limits",
    description: "Convert as many files as you like, as often as you need to.",
  },
  {
    icon: MousePointerClick,
    title: "Effortless to use",
    description: "Drag, drop and download. No sign up or technical knowledge required.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold text-primary">Why Toolbox</p>
        <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Built for speed, privacy and simplicity
        </h2>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          A modern toolkit that respects your time and your data.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
