const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8010";

export interface Destination {
  id: number;
  slug: string;
  name: string;
  country: string;
  tagline: string;
  best_time: string;
  blurb: string;
  highlights: string[];
  hero_image: string;
  split_image: string;
  cta_image: string;
  tour_count: number;
}

export interface ItineraryDay {
  label: string;
  title: string;
  desc: string;
}

export interface Tour {
  id: number;
  slug: string;
  title: string;
  category: string;
  destination_name: string;
  hero_image: string;
  days: number;
  nights: number;
  price_usd: number;
  group_size: string;
  style: string;
  summary: string;
  itinerary: ItineraryDay[];
}

export interface GalleryImage {
  id: number;
  image_path: string;
  alt: string;
  category: string;
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  destination?: string;
  dates?: string;
  guests?: number | null;
  message?: string;
  status: string;
  created_at: string;
}

export function mediaUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status} on ${path}: ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export interface FxRates {
  base: string;
  rates: Record<string, number>;
  source: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string;
  category: string;
  published: number;
  created_at: string;
}

export interface MediaAsset {
  id: number;
  title: string;
  image_path: string;
  category: string;
  active: number;
  created_at: string;
}

export const api = {
  getFxRates: () => apiFetch<FxRates>("/api/fx-rates"),
  getDestinations: () => apiFetch<Destination[]>("/api/destinations"),
  getDestination: (slug: string) => apiFetch<Destination>(`/api/destinations/${slug}`),
  getTours: (category?: string) =>
    apiFetch<Tour[]>(`/api/tours${category && category !== "all" ? `?category=${category}` : ""}`),
  getTour: (slug: string) => apiFetch<Tour>(`/api/tours/${slug}`),
  getGallery: () => apiFetch<GalleryImage[]>("/api/gallery"),
  getBlogPosts: () => apiFetch<BlogPost[]>("/api/blog"),
  getBlogPost: (slug: string) => apiFetch<BlogPost>(`/api/blog/${slug}`),
  getPromotions: () => apiFetch<MediaAsset[]>("/api/promotions"),
  subscribeNewsletter: (email: string) =>
    apiFetch<{ status: string }>("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) }),
  createEnquiry: (data: {
    name: string;
    email: string;
    phone?: string;
    destination?: string;
    dates?: string;
    guests?: number;
    message?: string;
  }) =>
    apiFetch<Enquiry>("/api/enquiries", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ---------- Admin ----------
function authHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("tt_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("tt_admin_token");
      window.location.href = "/admin/login";
    }
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status} on ${path}: ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const adminApi = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid email or password");
    const data = await res.json();
    window.localStorage.setItem("tt_admin_token", data.access_token);
    return data;
  },
  logout: () => {
    window.localStorage.removeItem("tt_admin_token");
  },
  isAuthed: () => typeof window !== "undefined" && !!window.localStorage.getItem("tt_admin_token"),

  listDestinations: () => adminFetch<Destination[]>("/api/admin/destinations"),
  createDestination: (data: Partial<Destination>) =>
    adminFetch<Destination>("/api/admin/destinations", { method: "POST", body: JSON.stringify(data) }),
  updateDestination: (id: number, data: Partial<Destination>) =>
    adminFetch<Destination>(`/api/admin/destinations/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteDestination: (id: number) => adminFetch<void>(`/api/admin/destinations/${id}`, { method: "DELETE" }),

  listTours: () => adminFetch<Tour[]>("/api/admin/tours"),
  createTour: (data: Partial<Tour>) =>
    adminFetch<Tour>("/api/admin/tours", { method: "POST", body: JSON.stringify(data) }),
  updateTour: (id: number, data: Partial<Tour>) =>
    adminFetch<Tour>(`/api/admin/tours/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteTour: (id: number) => adminFetch<void>(`/api/admin/tours/${id}`, { method: "DELETE" }),

  listGallery: () => adminFetch<GalleryImage[]>("/api/admin/gallery"),
  deleteGalleryImage: (id: number) => adminFetch<void>(`/api/admin/gallery/${id}`, { method: "DELETE" }),
  uploadGalleryImage: async (file: File, alt: string, category: string) => {
    const form = new FormData();
    form.append("file", file);
    form.append("alt", alt);
    form.append("category", category);
    const res = await fetch(`${API_URL}/api/admin/gallery/upload`, {
      method: "POST",
      headers: { ...authHeaders() },
      body: form,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },
  uploadImage: async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_URL}/api/admin/upload`, {
      method: "POST",
      headers: { ...authHeaders() },
      body: form,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json() as Promise<{ path: string }>;
  },

  listEnquiries: () => adminFetch<Enquiry[]>("/api/admin/enquiries"),
  updateEnquiryStatus: (id: number, status: string) =>
    adminFetch<Enquiry>(`/api/admin/enquiries/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),

  listBlogPosts: () => adminFetch<BlogPost[]>("/api/admin/blog"),
  createBlogPost: (data: Partial<BlogPost>) =>
    adminFetch<BlogPost>("/api/admin/blog", { method: "POST", body: JSON.stringify(data) }),
  updateBlogPost: (id: number, data: Partial<BlogPost>) =>
    adminFetch<BlogPost>(`/api/admin/blog/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteBlogPost: (id: number) => adminFetch<void>(`/api/admin/blog/${id}`, { method: "DELETE" }),

  listMedia: () => adminFetch<MediaAsset[]>("/api/admin/media"),
  uploadMedia: async (file: File, title: string, category: string) => {
    const form = new FormData();
    form.append("file", file);
    form.append("title", title);
    form.append("category", category);
    const res = await fetch(`${API_URL}/api/admin/media/upload`, {
      method: "POST",
      headers: { ...authHeaders() },
      body: form,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json() as Promise<MediaAsset>;
  },
  setMediaActive: (id: number, active: boolean) => {
    const form = new FormData();
    form.append("active", active ? "1" : "0");
    return fetch(`${API_URL}/api/admin/media/${id}`, {
      method: "PATCH",
      headers: { ...authHeaders() },
      body: form,
    }).then((res) => {
      if (!res.ok) throw new Error("Update failed");
      return res.json() as Promise<MediaAsset>;
    });
  },
  deleteMedia: (id: number) => adminFetch<void>(`/api/admin/media/${id}`, { method: "DELETE" }),

  listNewsletterSubscribers: () =>
    adminFetch<{ id: number; email: string; created_at: string }[]>("/api/admin/newsletter"),
};
