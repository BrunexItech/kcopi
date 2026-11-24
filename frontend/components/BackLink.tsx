import Link from "next/link";
import Icon from "@/components/Icon";

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative z-10 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] py-2.5 pl-3.5 pr-5 text-sm font-semibold text-[var(--color-ink)] shadow-sm transition-all hover:-translate-x-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent-dark)] hover:shadow-md"
    >
      <Icon name="arrow-left" className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      {label}
    </Link>
  );
}
