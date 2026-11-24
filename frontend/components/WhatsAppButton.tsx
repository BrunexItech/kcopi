"use client";

import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "254712261111";

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Kcopi Global, I'd like to plan a safari.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.004 2C6.486 2 2.01 6.476 2.01 11.994c0 2.113.55 4.09 1.51 5.808L2 22l4.323-1.489a9.95 9.95 0 0 0 5.68 1.774h.004c5.517 0 9.993-4.476 9.993-9.994C21.999 6.773 17.523 2.001 12.004 2Zm0 18.18h-.003a8.17 8.17 0 0 1-4.168-1.14l-.3-.178-3.1 1.068.998-3.023-.195-.31a8.166 8.166 0 0 1-1.254-4.351c0-4.53 3.687-8.218 8.226-8.218 2.196 0 4.26.857 5.814 2.412a8.163 8.163 0 0 1 2.408 5.816c0 4.53-3.687 8.173-8.223 8.173Z" />
      </svg>
      <span className="hidden sm:inline">Talk to us on WhatsApp</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}
