"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { adminApi, Destination } from "@/lib/api";

const EMPTY: Partial<Destination> = {
  slug: "",
  name: "",
  country: "",
  tagline: "",
  best_time: "",
  blurb: "",
  highlights: [],
  hero_image: "",
  split_image: "",
  cta_image: "",
  tour_count: 0,
};

export default function AdminDestinationsPage() {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Destination> | null>(null);
  const [error, setError] = useState("");

  function load() {
    setLoading(true);
    adminApi
      .listDestinations()
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave() {
    if (!editing) return;
    setError("");
    try {
      const payload = {
        ...editing,
        highlights: Array.isArray(editing.highlights)
          ? editing.highlights
          : String(editing.highlights || "")
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean),
      };
      if (editing.id) {
        await adminApi.updateDestination(editing.id, payload);
      } else {
        await adminApi.createDestination(payload as Destination);
      }
      setEditing(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this destination? This cannot be undone.")) return;
    await adminApi.deleteDestination(id);
    load();
  }

  async function handleUpload(file: File, field: "hero_image" | "split_image" | "cta_image") {
    const { path } = await adminApi.uploadImage(file);
    setEditing((prev) => (prev ? { ...prev, [field]: path } : prev));
  }

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl">Destinations</h1>
        <button onClick={() => setEditing({ ...EMPTY })} className="btn btn-primary !px-5 !py-2.5 !text-sm">
          + Add Destination
        </button>
      </div>

      {loading ? (
        <p className="text-[var(--color-ink-soft)]">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-[var(--color-surface)] shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-[var(--color-line)] text-[var(--color-ink-soft)]">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Country</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Tours</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((d) => (
                <tr key={d.id} className="border-b border-[var(--color-line)] last:border-0">
                  <td className="px-5 py-3 font-medium">{d.name}</td>
                  <td className="px-5 py-3">{d.country}</td>
                  <td className="px-5 py-3 text-[var(--color-ink-soft)]">{d.slug}</td>
                  <td className="px-5 py-3">{d.tour_count}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setEditing(d)} className="mr-3 font-semibold text-[var(--color-accent-dark)]">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(d.id)} className="font-semibold text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/50 p-6 py-12">
          <div className="w-full max-w-2xl rounded-2xl bg-[var(--color-surface)] p-7 shadow-xl">
            <h2 className="mb-5 text-2xl">{editing.id ? "Edit" : "Add"} Destination</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
              <TextField label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <TextField label="Country" value={editing.country} onChange={(v) => setEditing({ ...editing, country: v })} />
              <TextField label="Tagline" value={editing.tagline} onChange={(v) => setEditing({ ...editing, tagline: v })} />
              <TextField label="Best Time" value={editing.best_time} onChange={(v) => setEditing({ ...editing, best_time: v })} />
              <TextField
                label="Tour Count"
                value={String(editing.tour_count ?? 0)}
                onChange={(v) => setEditing({ ...editing, tour_count: Number(v) || 0 })}
              />
            </div>
            <TextArea label="Blurb" value={editing.blurb} onChange={(v) => setEditing({ ...editing, blurb: v })} rows={3} />
            <TextArea
              label="Highlights (one per line)"
              value={Array.isArray(editing.highlights) ? editing.highlights.join("\n") : String(editing.highlights || "")}
              onChange={(v) => setEditing({ ...editing, highlights: v as unknown as string[] })}
              rows={4}
            />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <ImageField label="Hero Image" value={editing.hero_image} onUpload={(f) => handleUpload(f, "hero_image")} />
              <ImageField label="Split Image" value={editing.split_image} onUpload={(f) => handleUpload(f, "split_image")} />
              <ImageField label="CTA Image" value={editing.cta_image} onUpload={(f) => handleUpload(f, "cta_image")} />
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditing(null)} className="btn btn-outline !px-5 !py-2.5">
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn-primary !px-5 !py-2.5">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function TextField({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">{label}</label>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[var(--color-line)] px-3 py-2.5"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="mt-4 flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">{label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="rounded-lg border border-[var(--color-line)] px-3 py-2.5"
      />
    </div>
  );
}

function ImageField({ label, value, onUpload }: { label: string; value?: string; onUpload: (f: File) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">{label}</label>
      {value && <p className="truncate text-xs text-[var(--color-ink-soft)]">{value}</p>}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
        className="text-xs"
      />
    </div>
  );
}
