"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { adminApi, Tour, ItineraryDay } from "@/lib/api";

const EMPTY: Partial<Tour> = {
  slug: "",
  title: "",
  category: "wildlife",
  destination_name: "",
  hero_image: "",
  days: 1,
  nights: 0,
  price_usd: 0,
  group_size: "",
  style: "",
  summary: "",
  itinerary: [],
};

export default function AdminToursPage() {
  const [items, setItems] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Tour> | null>(null);
  const [error, setError] = useState("");

  function load() {
    setLoading(true);
    adminApi
      .listTours()
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave() {
    if (!editing) return;
    setError("");
    try {
      if (editing.id) {
        await adminApi.updateTour(editing.id, editing);
      } else {
        await adminApi.createTour(editing as Tour);
      }
      setEditing(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this tour? This cannot be undone.")) return;
    await adminApi.deleteTour(id);
    load();
  }

  async function handleUpload(file: File) {
    const { path } = await adminApi.uploadImage(file);
    setEditing((prev) => (prev ? { ...prev, hero_image: path } : prev));
  }

  function updateDay(i: number, field: keyof ItineraryDay, value: string) {
    if (!editing) return;
    const itinerary = [...(editing.itinerary || [])];
    itinerary[i] = { ...itinerary[i], [field]: value };
    setEditing({ ...editing, itinerary });
  }

  function addDay() {
    if (!editing) return;
    setEditing({ ...editing, itinerary: [...(editing.itinerary || []), { label: "", title: "", desc: "" }] });
  }

  function removeDay(i: number) {
    if (!editing) return;
    setEditing({ ...editing, itinerary: (editing.itinerary || []).filter((_, idx) => idx !== i) });
  }

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl">Tours</h1>
        <button onClick={() => setEditing({ ...EMPTY })} className="btn btn-primary !px-5 !py-2.5 !text-sm">
          + Add Tour
        </button>
      </div>

      {loading ? (
        <p className="text-[var(--color-ink-soft)]">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-[var(--color-surface)] shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-[var(--color-line)] text-[var(--color-ink-soft)]">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Days</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id} className="border-b border-[var(--color-line)] last:border-0">
                  <td className="px-5 py-3 font-medium">{t.title}</td>
                  <td className="px-5 py-3 capitalize">{t.category}</td>
                  <td className="px-5 py-3">{t.days}</td>
                  <td className="px-5 py-3">${t.price_usd.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setEditing(t)} className="mr-3 font-semibold text-[var(--color-accent-dark)]">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="font-semibold text-red-600">
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
          <div className="w-full max-w-3xl rounded-2xl bg-[var(--color-surface)] p-7 shadow-xl">
            <h2 className="mb-5 text-2xl">{editing.id ? "Edit" : "Add"} Tour</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              <TextField label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Category</label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="rounded-lg border border-[var(--color-line)] px-3 py-2.5"
                >
                  <option value="wildlife">Wildlife</option>
                  <option value="family">Family</option>
                  <option value="honeymoon">Honeymoon</option>
                </select>
              </div>
              <TextField
                label="Destination Name"
                value={editing.destination_name}
                onChange={(v) => setEditing({ ...editing, destination_name: v })}
              />
              <TextField
                label="Days"
                value={String(editing.days ?? 0)}
                onChange={(v) => setEditing({ ...editing, days: Number(v) || 0 })}
              />
              <TextField
                label="Nights"
                value={String(editing.nights ?? 0)}
                onChange={(v) => setEditing({ ...editing, nights: Number(v) || 0 })}
              />
              <TextField
                label="Price (USD)"
                value={String(editing.price_usd ?? 0)}
                onChange={(v) => setEditing({ ...editing, price_usd: Number(v) || 0 })}
              />
              <TextField label="Group Size" value={editing.group_size} onChange={(v) => setEditing({ ...editing, group_size: v })} />
              <TextField label="Style" value={editing.style} onChange={(v) => setEditing({ ...editing, style: v })} />
            </div>
            <TextArea label="Summary" value={editing.summary} onChange={(v) => setEditing({ ...editing, summary: v })} rows={3} />

            <div className="mt-4 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Hero Image</label>
              {editing.hero_image && <p className="truncate text-xs text-[var(--color-ink-soft)]">{editing.hero_image}</p>}
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} className="text-xs" />
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Itinerary</label>
                <button onClick={addDay} className="text-sm font-semibold text-[var(--color-accent-dark)]">
                  + Add Day
                </button>
              </div>
              <div className="space-y-3">
                {(editing.itinerary || []).map((day, i) => (
                  <div key={i} className="rounded-lg border border-[var(--color-line)] p-3">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[100px_1fr_auto]">
                      <input
                        value={day.label}
                        onChange={(e) => updateDay(i, "label", e.target.value)}
                        placeholder="Day 1"
                        className="rounded border border-[var(--color-line)] px-2 py-1.5 text-sm"
                      />
                      <input
                        value={day.title}
                        onChange={(e) => updateDay(i, "title", e.target.value)}
                        placeholder="Title"
                        className="rounded border border-[var(--color-line)] px-2 py-1.5 text-sm"
                      />
                      <button onClick={() => removeDay(i)} className="text-sm font-semibold text-red-600">
                        Remove
                      </button>
                    </div>
                    <textarea
                      value={day.desc}
                      onChange={(e) => updateDay(i, "desc", e.target.value)}
                      placeholder="Description"
                      rows={2}
                      className="mt-2 w-full rounded border border-[var(--color-line)] px-2 py-1.5 text-sm"
                    />
                  </div>
                ))}
              </div>
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
