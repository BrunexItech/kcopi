type IconName =
  | "phone"
  | "mail"
  | "map-pin"
  | "clock"
  | "whatsapp"
  | "compass"
  | "shield"
  | "chat"
  | "pencil"
  | "car"
  | "tent"
  | "utensils"
  | "ticket"
  | "sun"
  | "users"
  | "star"
  | "star-filled"
  | "globe"
  | "price-tag"
  | "check"
  | "check-circle"
  | "x"
  | "arrow-left"
  | "arrow-right"
  | "search";

// A single small, consistent stroke-icon set so nothing on the site needs an
// emoji — every icon shares the same viewBox, weight and line style.
export default function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const stroke = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "phone":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M4.5 4h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5v3c0 1-.8 1.8-1.8 1.7C9.9 19.6 4.4 14.1 3.8 6.8 3.7 5.8 4.5 5 5.5 4Z" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      );
    case "map-pin":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.4" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.004 2C6.486 2 2.01 6.476 2.01 11.994c0 2.113.55 4.09 1.51 5.808L2 22l4.323-1.489a9.95 9.95 0 0 0 5.68 1.774h.004c5.517 0 9.993-4.476 9.993-9.994C21.999 6.773 17.523 2.001 12.004 2Zm0 18.18h-.003a8.17 8.17 0 0 1-4.168-1.14l-.3-.178-3.1 1.068.998-3.023-.195-.31a8.166 8.166 0 0 1-1.254-4.351c0-4.53 3.687-8.218 8.226-8.218 2.196 0 4.26.857 5.814 2.412a8.163 8.163 0 0 1 2.408 5.816c0 4.53-3.687 8.173-8.223 8.173Z" />
        </svg>
      );
    case "compass":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8Z" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 3.5 5 6v5.5c0 4.7 3 7.8 7 9.5 4-1.7 7-4.8 7-9.5V6l-7-2.5Z" />
          <path d="M9 12l2 2 4-4.5" />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M4 5.5h16v10H9l-4 3.5v-3.5H4Z" />
        </svg>
      );
    case "pencil":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M4 20l.8-3.8L15.2 5.8a1.5 1.5 0 0 1 2.1 0l1 1a1.5 1.5 0 0 1 0 2.1L7.8 19.2 4 20Z" />
        </svg>
      );
    case "car":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M4 16V12l2-4.5h12L20 12v4" />
          <path d="M4 16h16" />
          <circle cx="7.5" cy="16.5" r="1.5" />
          <circle cx="16.5" cy="16.5" r="1.5" />
        </svg>
      );
    case "tent":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 4 3 19h18L12 4Z" />
          <path d="M12 10 7.5 19M12 10l4.5 9" />
        </svg>
      );
    case "utensils":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M7 3v7a1.5 1.5 0 0 1-3 0V3M5.5 10V21" />
          <path d="M17 3c-1.4 0-2.5 1.8-2.5 4s1.1 4 2.5 4v10" />
        </svg>
      );
    case "ticket":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.5a1.5 1.5 0 0 0 0 3V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5a1.5 1.5 0 0 0 0-3V9Z" />
          <path d="M9 7v10" strokeDasharray="2 2" />
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
          <circle cx="17" cy="9" r="2.3" />
          <path d="M16 14.3c2.3.4 4 2.2 4 4.7" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 3.5l2.6 5.5 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6-4.4-4.1 6-.7Z" />
        </svg>
      );
    case "star-filled":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 3.5l2.6 5.5 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6-4.4-4.1 6-.7Z" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.5 2.3 2.5 15.7 0 17M12 3.5c-2.5 2.3-2.5 15.7 0 17" />
        </svg>
      );
    case "price-tag":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M11 3.5h6a1.5 1.5 0 0 1 1.5 1.5v6L10 19.5 4.5 14 11 3.5Z" />
          <circle cx="15" cy="7.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M4.5 12.5l5 5 10-10.5" />
        </svg>
      );
    case "check-circle":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8 12.3l2.6 2.6 5-5.4" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M19.5 19.5 15 15" />
        </svg>
      );
    default:
      return null;
  }
}
