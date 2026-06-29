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

        {/* HERO */}
        <Hero />

        {/* 🔥 AD 1 (after hero - high CTR) */}
        <div className="my-6 flex justify-center">
          <Script
            src="https://pl30123077.effectivecpmnetwork.com/c483387c5ce2665f5c8dc04518be2c7c/invoke.js"
            strategy="afterInteractive"
          />
          <div id="container-c483387c5ce2665f5c8dc04518be2c7c"></div>
        </div>

        {/* POPULAR TOOLS */}
        <PopularTools />

        {/* 🔥 AD 2 (middle - best revenue spot) */}
        <div className="my-10 flex justify-center">
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <script>
                  atOptions = {
                    'key' : 'ecc4afc5b67ca88efe9cb93a11d4b9c5',
                    'format' : 'iframe',
                    'height' : 250,
                    'width' : 300,
                    'params' : {}
                  };
                </script>
                <script src="https://www.highperformanceformat.com/ecc4afc5b67ca88efe9cb93a11d4b9c5/invoke.js"></script>
              `,
            }}
          />
        </div>

        {/* बाकी sections */}
        <CategoriesSection />
        <FeaturesSection />
        <FaqSection />

      </main>

      <SiteFooter />
    </div>
  )
}
