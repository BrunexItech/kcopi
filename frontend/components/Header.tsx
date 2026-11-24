"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mediaUrl } from "@/lib/api";
import Icon from "@/components/Icon";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import SiteSearch from "@/components/SiteSearch";
import NavLinkHint from "@/components/NavLinkHint";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tours & Packages" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const solid = scrolled || open;

  return (
    // Background/blur styling keys off `scrolled` only (not `open`): a
    // backdrop-filter on this element would create a new containing block
    // for its `position: fixed` descendants, collapsing the full-screen
    // mobile menu panel below down to this bar's own height instead of the
    // viewport. The panel already paints its own solid background once open.
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-[var(--color-line)] bg-[var(--color-bg)]/90 backdrop-blur-md shadow-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap font-[var(--font-display)] text-xl font-medium transition-colors duration-300 ${
            solid ? "text-[var(--color-primary-dark)]" : "text-white"
          }`}
        >
          <img src={mediaUrl("/static/img/logo-icon.png")} alt="Kcopi Global" className="h-10 w-auto shrink-0" />
          Kcopi Global
        </Link>

        <nav className="hidden items-center gap-3 lg:flex xl:gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative whitespace-nowrap py-1 text-sm font-medium transition-colors duration-300 ${
                solid
                  ? pathname === link.href
                    ? "text-[var(--color-accent-dark)]"
                    : "text-[var(--color-ink)] hover:text-[var(--color-accent)]"
                  : pathname === link.href
                    ? "text-white"
                    : "text-white/85 hover:text-white"
              }`}
            >
              {link.label}
              <NavLinkHint />
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 lg:gap-4">
          <SiteSearch solid={solid} />
          <div className="hidden sm:block">
            <CurrencySwitcher solid={solid} />
          </div>
          <a
            href="tel:+254712261111"
            className={`hidden items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-300 xl:flex ${
              solid ? "text-[var(--color-ink)]" : "text-white"
            }`}
          >
            <Icon name="phone" className="h-4 w-4" /> +254 712 261 111
          </a>
          <Link href="/contact" className="btn btn-primary hidden !px-5 !py-2.5 !text-xs whitespace-nowrap sm:inline-flex">
            Plan My Safari
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${
              solid ? "border-[var(--color-line)]" : "border-white/40"
            }`}
          >
            <span
              className={`relative block h-0.5 w-4 before:absolute before:-top-1.5 before:block before:h-0.5 before:w-4 after:absolute after:top-1.5 after:block after:h-0.5 after:w-4 ${
                solid
                  ? "bg-[var(--color-ink)] before:bg-[var(--color-ink)] after:bg-[var(--color-ink)]"
                  : "bg-white before:bg-white after:bg-white"
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[var(--color-bg)] px-6 py-6 lg:hidden">
          <div className="mb-10 flex items-center justify-between">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 font-[var(--font-display)] text-xl font-medium">
              <img src={mediaUrl("/static/img/logo-icon.png")} alt="Kcopi Global" className="h-10 w-auto" />
              Kcopi Global
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line)]"
            >
              <Icon name="x" className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="relative border-b border-[var(--color-line)] py-3.5 font-[var(--font-display)] text-2xl"
              >
                {link.label}
                <NavLinkHint />
              </Link>
            ))}
          </nav>
          <div className="mt-7 flex items-center justify-between gap-4">
            <CurrencySwitcher solid />
            <a href="tel:+254712261111" className="flex items-center gap-2 text-sm font-medium text-[var(--color-ink)]">
              <Icon name="phone" className="h-4 w-4" /> +254 712 261 111
            </a>
          </div>
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary mt-5 w-full">
            Plan My Safari
          </Link>
        </div>
      )}
    </header>
  );
}
