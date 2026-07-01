import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Privacy Policy</h1>

        <p className="mt-4 text-gray-600">
          At PDFToolbox, we respect your privacy. We do not store or share your files.
          All processing is done securely in your browser.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Information We Collect</h2>
        <p className="text-gray-600">
          We may collect basic analytics data like page visits to improve user experience.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Cookies</h2>
        <p className="text-gray-600">
          We may use cookies for performance and advertising purposes.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Third-party Ads</h2>
        <p className="text-gray-600">
          We may display ads from third-party networks such as Adsterra. These networks may use cookies.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Contact</h2>
        <p className="text-gray-600">
          If you have any questions, contact us via the contact page.
        </p>
      </main>

      <SiteFooter />
    </div>
  )
}
