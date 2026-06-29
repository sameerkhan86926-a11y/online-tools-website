import Script from "next/script"
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

        {/* ADS PLACE HERE 👇 */}
        <Script
          src="https://pl30123077.effectivecpmnetwork.com/c483387c5ce2665f5c8dc04518be2c7c/invoke.js"
          strategy="afterInteractive"
        />
        <div id="container-c483387c5ce2665f5c8dc04518be2c7c"></div>

        <PopularTools />
        <CategoriesSection />
        <FeaturesSection />
        <FaqSection />
      </main>

      <SiteFooter />
    </div>
  )
}
