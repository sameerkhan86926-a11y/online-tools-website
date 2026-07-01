import Script from "next/script";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { PopularTools } from "@/components/popular-tools";
import { CategoriesSection } from "@/components/categories-section";
import { FeaturesSection } from "@/components/features-section";
import { FaqSection } from "@/components/faq-section";

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <Hero />

        {/* 🔥 AD 1 - TOP BANNER */}
        <AdBanner />

        <PopularTools />

        {/* 🔥 AD 2 - NATIVE (High CTR zone) */}
        <AdNative />

        <CategoriesSection />

        {/* 🔥 AD 3 - MID BANNER */}
        <AdBanner />

        <FeaturesSection />

        <FaqSection />

        {/* 🔥 AD 4 - FINAL NATIVE */}
        <AdNative />

        {/* 🔥 EXIT BANNER */}
        <AdBanner />
      </main>

      <SiteFooter />

      {/* ================= GLOBAL ADS ================= */}

      {/* POPUNDER */}
      <Script
        src="https://pl30153795.effectivecpmnetwork.com/29/7a/34/297a34a7b1c689eb98a34afc94895343.js"
        strategy="afterInteractive"
      />

      {/* SOCIAL BAR */}
      <Script
        src="https://pl30153793.effectivecpmnetwork.com/f6144708d0cb8a2e0db4f9e8eb847487/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  );
}

/* ================= BANNER AD ================= */
function AdBanner() {
  return (
    <div className="my-10 flex justify-center">
      <Script id="banner-config" strategy="afterInteractive">
        {`
          window.atOptions = {
            key: '750f18151b48bf117eb6e23da4081f0b',
            format: 'iframe',
            height: 250,
            width: 300,
            params: {}
          };
        `}
      </Script>

      <Script
        src="https://www.highperformanceformat.com/750f18151b48bf117eb6e23da4081f0b/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  );
}

/* ================= NATIVE AD ================= */
function AdNative() {
  return (
    <div className="my-12 flex justify-center">
      <Script
        src="https://pl30153792.effectivecpmnetwork.com/29/8a/9d/298a9dc6555ab3c78c419cbefe39beb3.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
