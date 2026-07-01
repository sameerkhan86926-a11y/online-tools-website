"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/tools"

const navLinks = [
  { label: "All Tools", href: "/#tools" },
  { label: "Categories", href: "/#categories" },
  { label: "Features", href: "/#features" },
  { label: "FAQ", href: "/#faq" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">

        <Link href="/" className="flex items-center gap-3" aria-label="PDFToolbox Home">
          <Image
            src="/logo.png"
            alt="PDFToolbox"
            width={42}
            height={42}
            priority
          />
          <span className="text-xl font-bold tracking-tight">
            PDFToolbox
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="lg" nativeButton={false} render={<Link href="/#tools" />}>
            Log in
          </Button>
          <Button size="lg" nativeButton={false} render={<Link href="/#tools" />}>
            Get started
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mb-3 flex items-center gap-3"
            >
              <Image
                src="/logo.png"
                alt="PDFToolbox"
                width={36}
                height={36}
              />
              <span className="text-lg font-bold">
                PDFToolbox
              </span>
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <Link
                  key={c.name}
                  href="/#tools"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground"
                >
                  {c.label}
                </Link>
              ))}
            </div>

            <Button
              className="mt-3 w-full"
              size="lg"
              nativeButton={false}
              render={<Link href="/#tools" onClick={() => setOpen(false)} />}
            >
              Get started
            </Button>

          </nav>
        </div>
      )}
    </header>
  )
}
