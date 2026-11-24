"use client";

import { useEffect, useState } from "react";
import LoadingImage from "@/components/LoadingImage";
import AdminShell from "@/components/AdminShell";
import { adminApi, GalleryImage, mediaUrl } from "@/lib/api";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("wildlife");
  const [uploading, setUploading] = useState(false);

  function load() {
    setLoading(true);
    adminApi
      .listGallery()
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      await adminApi.uploadGalleryImage(file, alt, category);
      setAlt("");
      load();
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this image?")) return;
    await adminApi.deleteGalleryImage(id);
    load();
  }

  return (
    <AdminShell>
      <h1 className="mb-6 text-3xl">Gallery</h1>

      <div className="mb-8 rounded-2xl bg-[var(--color-surface)] p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Upload New Image</h2>
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Alt Text</label>
            <input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="e.g. Lion in the Maasai Mara"
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
              <option value="wildlife">Wildlife</option>
              <option value="beach">Beach</option>
              <option value="experience">Experience</option>
              <option value="culture">Culture</option>
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
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl">
              <LoadingImage src={mediaUrl(img.image_path)} alt={img.alt} fill sizes="25vw" className="object-cover" />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                Delete
              </button>
              <span className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1 text-[10px] text-white">{img.category}</span>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
