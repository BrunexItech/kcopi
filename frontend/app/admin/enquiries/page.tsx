"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { adminApi, Enquiry } from "@/lib/api";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-[var(--color-accent)] text-white",
  contacted: "bg-[var(--color-gold)] text-[var(--color-primary-dark)]",
  closed: "bg-[var(--color-ink-soft)] text-white",
};

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    adminApi
      .listEnquiries()
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function updateStatus(id: number, status: string) {
    await adminApi.updateEnquiryStatus(id, status);
    load();
  }

  return (
    <AdminShell>
      <h1 className="mb-6 text-3xl">Enquiries</h1>

      {loading ? (
        <p className="text-[var(--color-ink-soft)]">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-[var(--color-ink-soft)]">No enquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((e) => (
            <div key={e.id} className="rounded-2xl bg-[var(--color-surface)] p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{e.name}</h3>
                  <p className="text-sm text-[var(--color-ink-soft)]">
                    {e.email} {e.phone && `· ${e.phone}`}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[e.status] || ""}`}>
                  {e.status}
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-xs uppercase text-[var(--color-ink-soft)]">Destination</dt>
                  <dd>{e.destination || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-[var(--color-ink-soft)]">Dates</dt>
                  <dd>{e.dates || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-[var(--color-ink-soft)]">Guests</dt>
                  <dd>{e.guests ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-[var(--color-ink-soft)]">Received</dt>
                  <dd>{new Date(e.created_at).toLocaleDateString()}</dd>
                </div>
              </dl>
              {e.message && <p className="mt-3 text-sm text-[var(--color-ink-soft)]">{e.message}</p>}
              <div className="mt-4 flex gap-2">
                {["new", "contacted", "closed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(e.id, s)}
                    disabled={e.status === s}
                    className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs font-semibold capitalize disabled:opacity-40"
                  >
                    Mark {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
