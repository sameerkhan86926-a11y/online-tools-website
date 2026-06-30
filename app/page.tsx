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

        {/* 🔥 AD 1 - Banner */}
        <AdBanner />

        <PopularTools />

        {/* 🔥 AD 2 - Native */}
        <AdNative />

        <CategoriesSection />

        {/* 🔥 AD 3 - Banner */}
        <AdBanner />

        <FeaturesSection />

        <FaqSection />

        {/* 🔥 AD 4 - Native */}
        <AdNative />

        {/* 🔥 AD 5 - Banner */}
        <AdBanner />

      </main>

      <SiteFooter />

      {/* ================= GLOBAL ADS ================= */}

      {/* 💣 POPUNDER */}
      <Script
        src="https://pl30134372.effectivecpmnetwork.com/34/83/e0/3483e0d77fe2736cd10304773fb4dd40.js"
        strategy="afterInteractive"
      />

      {/* 💬 SOCIAL BAR */}
      <Script
        src="https://pl30134374.effectivecpmnetwork.com/2f/09/8c/2f098cd5648e743f8ab52af9790d0f03.js"
        strategy="afterInteractive"
      />

      {/* 🔗 SMARTLINK (IMPORTANT) */}
      <Script id="smartlink">
        {`
          window.onload = function() {
            var a = document.createElement('a');
            a.href = "https://www.effectivecpmnetwork.com/sehw5reg4b?key=ab303d2a1d38d6cb58b00a758d6477ae";
            a.target = "_blank";
            a.style.display = "none";
            document.body.appendChild(a);
          }
        `}
      </Script>
    </div>
  );
}

/* ================= BANNER AD ================= */
function AdBanner() {
  return (
    <div className="my-8 flex justify-center">

      <Script id="banner-config">
        {`
          atOptions = {
            'key' : 'ecc4afc5b67ca88efe9cb93a11d4b9c5',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        `}
      </Script>

      <Script
        src="https://www.highperformanceformat.com/ecc4afc5b67ca88efe9cb93a11d4b9c5/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  );
}

/* ================= NATIVE AD ================= */
function AdNative() {
  return (
    <div className="my-10 flex justify-center">

      <div id="container-c483387c5ce2665f5c8dc04518be2c7c"></div>

      <Script
        src="https://pl30123077.effectivecpmnetwork.com/c483387c5ce2665f5c8dc04518be2c7c/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
