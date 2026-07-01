import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Contact() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Contact Us</h1>

        <p className="mt-4 text-gray-600">
          If you have any questions, feedback or business inquiries, feel free to contact us.
        </p>

        <div className="mt-6 space-y-3 text-gray-600">
          <p>Email: support@pdftoolbox.shop</p>
          <p>We usually respond within 24–48 hours.</p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
