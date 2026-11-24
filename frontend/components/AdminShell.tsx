"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { adminApi } from "@/lib/api";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/tours", label: "Tours" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/media", label: "Media Library" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/newsletter", label: "Newsletter" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!adminApi.isAuthed()) {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return <div className="container-page py-24 text-center text-[var(--color-ink-soft)]">Checking session…</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-alt)]">
      <div className="border-b border-[var(--color-line)] bg-[var(--color-primary-dark)] text-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-[var(--font-display)] text-lg font-bold">
              Kcopi Global Admin
            </Link>
            <nav className="hidden flex-wrap gap-6 sm:flex">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-sm font-medium ${pathname === l.href ? "text-[var(--color-gold)]" : "text-white/80 hover:text-white"}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <button
            onClick={() => {
              adminApi.logout();
              router.replace("/admin/login");
            }}
            className="rounded-full border border-white/30 px-4 py-1.5 text-sm"
          >
            Log out
          </button>
        </div>
        <nav className="flex gap-5 overflow-x-auto px-6 pb-3 sm:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap text-sm font-medium ${pathname === l.href ? "text-[var(--color-gold)]" : "text-white/80"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container-page py-10">{children}</div>
    </div>
  );
}
