"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import { adminApi } from "@/lib/api";

export default function AdminDashboard() {
  const [counts, setCounts] = useState<{ destinations: number; tours: number; gallery: number; enquiries: number } | null>(null);

  useEffect(() => {
    Promise.all([adminApi.listDestinations(), adminApi.listTours(), adminApi.listGallery(), adminApi.listEnquiries()])
      .then(([d, t, g, e]) =>
        setCounts({ destinations: d.length, tours: t.length, gallery: g.length, enquiries: e.length })
      )
      .catch(() => {});
  }, []);

  const cards = [
    { label: "Destinations", value: counts?.destinations, href: "/admin/destinations" },
    { label: "Tours", value: counts?.tours, href: "/admin/tours" },
    { label: "Gallery Images", value: counts?.gallery, href: "/admin/gallery" },
    { label: "Enquiries", value: counts?.enquiries, href: "/admin/enquiries" },
  ];

  return (
    <AdminShell>
      <h1 className="mb-6 text-3xl">Dashboard</h1>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded-2xl bg-[var(--color-surface)] p-6 shadow-sm hover:shadow-md">
            <span className="block text-sm text-[var(--color-ink-soft)]">{c.label}</span>
            <b className="font-[var(--font-display)] text-3xl">{c.value ?? "…"}</b>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-[var(--color-ink-soft)]">
        Manage destinations, tours, gallery photos, and incoming enquiries from the navigation above. Changes made
        here are reflected on the public site immediately.
      </p>
    </AdminShell>
  );
}
