"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { mediaUrl } from "@/lib/api";
import Icon from "@/components/Icon";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import SiteSearch from "@/components/SiteSearch";
import NavLinkHint from "@/components/NavLinkHint";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: "compass" },
  { href: "/destinations", label: "Destinations", icon: "map-pin" },
  { href: "/tours", label: "Tours & Packages", icon: "tent" },
  { href: "/about", label: "About", icon: "users" },
  { href: "/blog", label: "Blog", icon: "pencil" },
  { href: "/faq", label: "FAQs", icon: "chat" },
  { href: "/contact", label: "Contact", icon: "mail" },
] as const;

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

  // Locks the page behind the mobile panel so the only things that work
  // while it's open are closing it or tapping a link. Plain
  // `overflow: hidden` on body doesn't reliably stop touch-drag scrolling
  // on iOS Safari, so the scroll position is pinned with `position: fixed`
  // instead and restored exactly on close. Escape is a second,
  // keyboard-reachable way to close it besides the toggle button.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body.style;
    const prev = { position: body.position, top: body.top, width: body.width, overflow: body.overflow };
    body.position = "fixed";
    body.top = `-${scrollY}px`;
    body.width = "100%";
    body.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.position = prev.position;
      body.top = prev.top;
      body.width = prev.width;
      body.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  const solid = scrolled || open;
  // The toggle button sits above the panel (so it stays put and just morphs
  // into an "X" instead of being hidden behind a second, different close
  // button) and is always over the dark panel once open, so it needs the
  // light-on-dark styling then regardless of scroll position.
  const triggerSolid = scrolled && !open;

  return (
    // No backdrop-filter here, deliberately: a `backdrop-filter` on this
    // element creates a new containing block for any `position: fixed`
    // descendant (the full-screen mobile panel below), which collapses it
    // down to this bar's own ~76px height instead of the viewport the
    // instant the page has been scrolled (scrolled state is what turns the
    // blur on). High opacity alone gives a near-identical solid look
    // without that risk.
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-[var(--color-line)] bg-[var(--color-bg)]/95 shadow-sm"
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
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{ touchAction: "manipulation" }}
            className={`relative z-[70] grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-300 active:scale-90 lg:hidden ${
              triggerSolid ? "border-[var(--color-line)]" : "border-white/40"
            }`}
          >
            <span className="relative block h-4 w-4">
              <span
                className={`absolute left-0 block h-0.5 w-4 transition-transform duration-300 ${
                  triggerSolid ? "bg-[var(--color-ink)]" : "bg-white"
                } ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-4 -translate-y-1/2 transition-opacity duration-200 ${
                  triggerSolid ? "bg-[var(--color-ink)]" : "bg-white"
                } ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-4 transition-transform duration-300 ${
                  triggerSolid ? "bg-[var(--color-ink)]" : "bg-white"
                } ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full -translate-y-full"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            // A plain two-stop gradient, not a blurred photo: a CSS blur
            // filter on a full-screen image is expensive to rasterize on
            // mobile GPUs and is exactly what was reading as "lag" before
            // the menu felt fully open.
            className="fixed inset-0 z-[60] overflow-y-auto bg-gradient-to-b from-[var(--color-primary-dark)] to-[#101d12] lg:hidden"
            style={{ overscrollBehavior: "contain" }}
          >
            <div className="flex min-h-full flex-col px-6 py-6 text-white">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="mb-8 flex items-center gap-2.5 font-[var(--font-display)] text-xl font-medium"
              >
                <img src={mediaUrl("/static/img/logo-icon.png")} alt="Kcopi Global" className="h-10 w-auto" />
                Kcopi Global
              </Link>

              <nav className="flex flex-col">
                {NAV_LINKS.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="relative flex items-center gap-4 border-b border-white/10 py-3.5"
                    >
                      <span aria-hidden className="font-[var(--font-display)] text-sm text-white/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full ${
                          active ? "bg-[var(--color-gold)] text-[var(--color-primary-dark)]" : "bg-white/10 text-[var(--color-gold)]"
                        }`}
                      >
                        <Icon name={link.icon} className="h-4 w-4" />
                      </span>
                      <span className={`font-[var(--font-display)] text-2xl ${active ? "text-[var(--color-gold)]" : "text-white"}`}>
                        {link.label}
                      </span>
                      <NavLinkHint />
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-7 flex items-center justify-between gap-4">
                <CurrencySwitcher />
                <a href="tel:+254712261111" className="flex items-center gap-2 text-sm font-medium text-white/85">
                  <Icon name="phone" className="h-4 w-4" /> +254 712 261 111
                </a>
              </div>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary mt-5 w-full">
                Plan My Safari
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
