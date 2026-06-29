import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { PopularTools } from "@/components/popular-tools"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturesSection } from "@/components/features-section"
import { FaqSection } from "@/components/faq-section"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <PopularTools />
        <CategoriesSection />
        <FeaturesSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  )
}
