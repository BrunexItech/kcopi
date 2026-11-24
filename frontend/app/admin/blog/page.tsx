"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { adminApi, BlogPost } from "@/lib/api";

const EMPTY: Partial<BlogPost> = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  cover_image: "",
  category: "guide",
  published: 1,
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    adminApi
      .listBlogPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await adminApi.updateBlogPost(editing.id, editing);
      } else {
        await adminApi.createBlogPost(editing);
      }
      setEditing(null);
      load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this article?")) return;
    await adminApi.deleteBlogPost(id);
    load();
  }

  async function togglePublished(post: BlogPost) {
    await adminApi.updateBlogPost(post.id, { published: post.published === 1 ? 0 : 1 });
    load();
  }

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl">Blog</h1>
        <button onClick={() => setEditing(EMPTY)} className="btn btn-primary !px-5 !py-2.5 !text-sm">
          New Article
        </button>
      </div>

      {editing && (
        <div className="mb-8 rounded-2xl bg-[var(--color-surface)] p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">{editing.id ? "Edit Article" : "New Article"}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Slug</label>
              <input
                value={editing.slug || ""}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                className="rounded-lg border border-[var(--color-line)] px-3 py-2.5"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Category</label>
              <select
                value={editing.category || "guide"}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="rounded-lg border border-[var(--color-line)] px-3 py-2.5"
              >
                <option value="guide">Guide</option>
                <option value="planning">Planning</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Title</label>
              <input
                value={editing.title || ""}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="rounded-lg border border-[var(--color-line)] px-3 py-2.5"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Excerpt</label>
              <input
                value={editing.excerpt || ""}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                className="rounded-lg border border-[var(--color-line)] px-3 py-2.5"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">Cover Image Path</label>
              <input
                value={editing.cover_image || ""}
                onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })}
                placeholder="/static/img/..."
                className="rounded-lg border border-[var(--color-line)] px-3 py-2.5"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">
                Body (paragraphs separated by a blank line)
              </label>
              <textarea
                value={editing.body || ""}
                onChange={(e) => setEditing({ ...editing, body: e.target.value })}
                rows={10}
                className="rounded-lg border border-[var(--color-line)] px-3 py-2.5"
              />
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={handleSave} disabled={saving} className="btn btn-primary !px-5 !py-2.5 !text-sm">
              {saving ? "Saving…" : "Save"}
            </button>
            <button onClick={() => setEditing(null)} className="btn btn-outline !px-5 !py-2.5 !text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-[var(--color-ink-soft)]">Loading…</p>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-sm">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] p-4 last:border-0">
              <div>
                <b className="block">{post.title}</b>
                <span className="text-xs text-[var(--color-ink-soft)]">
                  /{post.slug} &middot; {post.category} &middot; {post.published === 1 ? "Published" : "Draft"}
                </span>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <button onClick={() => togglePublished(post)} className="btn btn-outline !px-3 !py-1.5 !text-xs">
                  {post.published === 1 ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => setEditing(post)} className="btn btn-outline !px-3 !py-1.5 !text-xs">
                  Edit
                </button>
                <button onClick={() => handleDelete(post.id)} className="rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500/20">
                  Delete
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p className="p-6 text-[var(--color-ink-soft)]">No articles yet.</p>}
        </div>
      )}
    </AdminShell>
  );
}
