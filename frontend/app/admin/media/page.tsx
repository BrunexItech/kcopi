"use client";

import { useEffect, useState } from "react";
import LoadingImage from "@/components/LoadingImage";
import AdminShell from "@/components/AdminShell";
import { adminApi, MediaAsset, mediaUrl } from "@/lib/api";

const CATEGORIES = ["promotion", "poster", "general"];

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("promotion");
  const [uploading, setUploading] = useState(false);

  function load() {
    setLoading(true);
    adminApi
      .listMedia()
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      await adminApi.uploadMedia(file, title, category);
      setTitle("");
      load();
    } finally {
      setUploading(false);
    }
  }

  async function handleToggleActive(item: MediaAsset) {
    await adminApi.setMediaActive(item.id, item.active !== 1);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this media asset?")) return;
    await adminApi.deleteMedia(id);
    load();
  }

  return (
    <AdminShell>
      <h1 className="mb-2 text-3xl">Media Library</h1>
      <p className="mb-6 text-sm text-[var(--color-ink-soft)]">
        Upload posters, banners, and promotional images. Active items marked &ldquo;promotion&rdquo; appear in the
        homepage promotions strip automatically.
      </p>

      <div className="mb-8 rounded-2xl bg-[var(--color-surface)] p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Upload New Media</h2>
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. December Migration Offer"
              className="rounded-lg border border-[var(--color-line)] px-3 py-2.5"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-[var(--color-line)] px-3 py-2.5"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Image File</label>
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              className="text-sm"
            />
          </div>
          {uploading && <span className="text-sm text-[var(--color-ink-soft)]">Uploading…</span>}
        </div>
      </div>

      {loading ? (
        <p className="text-[var(--color-ink-soft)]">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-[var(--color-ink-soft)]">No media uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
              <LoadingImage src={mediaUrl(item.image_path)} alt={item.title} fill sizes="25vw" className="object-cover" />
              {item.active !== 1 && <div className="absolute inset-0 bg-black/50" />}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2">
                <span className="rounded-full bg-black/60 px-2 py-1 text-[10px] text-white">{item.category}</span>
                {item.active !== 1 && (
                  <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-[var(--color-ink)]">
                    Inactive
                  </span>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-black/60 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="truncate text-[10px] text-white">{item.title || "Untitled"}</span>
                <div className="flex flex-shrink-0 gap-1.5">
                  <button
                    onClick={() => handleToggleActive(item)}
                    className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-semibold text-white hover:bg-white/30"
                  >
                    {item.active === 1 ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-full bg-red-500/80 px-2 py-1 text-[10px] font-semibold text-white hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
