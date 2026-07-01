import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Terms() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Terms of Service</h1>

        <p className="mt-4 text-gray-600">
          By using PDFToolbox, you agree to use our services responsibly and legally.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Use of Service</h2>
        <p className="text-gray-600">
          You agree not to misuse or attempt to damage our tools or services.
        </p>

        <h2 className="mt-6 text-xl font-semibold">No Warranty</h2>
        <p className="text-gray-600">
          All tools are provided "as is" without any guarantees.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Changes</h2>
        <p className="text-gray-600">
          We may update these terms at any time without prior notice.
        </p>
      </main>

      <SiteFooter />
    </div>
  )
}
