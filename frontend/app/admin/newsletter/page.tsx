"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { adminApi } from "@/lib/api";

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<{ id: number; email: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .listNewsletterSubscribers()
      .then(setSubscribers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl">Newsletter Subscribers</h1>
        {!loading && <span className="text-sm text-[var(--color-ink-soft)]">{subscribers.length} total</span>}
      </div>

      {loading ? (
        <p className="text-[var(--color-ink-soft)]">Loading…</p>
      ) : subscribers.length === 0 ? (
        <p className="text-[var(--color-ink-soft)]">No subscribers yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-sm">
          {subscribers.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] p-4 last:border-0">
              <span>{s.email}</span>
              <span className="text-xs text-[var(--color-ink-soft)]">{new Date(s.created_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
