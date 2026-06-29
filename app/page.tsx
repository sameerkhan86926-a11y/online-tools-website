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

        {/* 🔥 BANNER AD (1) */}
        <AdBanner />

        <PopularTools />

        {/* 🔥 NATIVE AD (1) */}
        <AdNative />

        <CategoriesSection />

        {/* 🔥 BANNER AD (2) */}
        <AdBanner />

        <FeaturesSection />

        <FaqSection />

        {/* 🔥 NATIVE AD (2) */}
        <AdNative />

        {/* 🔥 BANNER AD (3 - Footer safe) */}
        <AdBanner />

      </main>

      <SiteFooter />
    </div>
  )
}

/* ================= BANNER AD ================= */
function AdBanner() {
  return (
    <div className="my-8 flex justify-center">
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <script async="async" data-cfasync="false"
              src="https://www.highperformanceformat.com/ecc4afc5b67ca88efe9cb93a11d4b9c5/invoke.js"></script>

            <script>
              atOptions = {
                'key' : 'ecc4afc5b67ca88efe9cb93a11d4b9c5',
                'format' : 'iframe',
                'height' : 250,
                'width' : 300,
                'params' : {}
              };
            </script>
          `,
        }}
      />
    </div>
  )
}

/* ================= NATIVE AD ================= */
function AdNative() {
  return (
    <div className="my-10 flex justify-center">
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <script async="async" data-cfasync="false"
              src="https://pl30123077.effectivecpmnetwork.com/c483387c5ce2665f5c8dc04518be2c7c/invoke.js"></script>

            <div id="container-c483387c5ce2665f5c8dc04518be2c7c"></div>
          `,
        }}
      />
    </div>
  )
}
