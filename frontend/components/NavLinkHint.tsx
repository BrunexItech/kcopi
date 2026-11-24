"use client";

import { useLinkStatus } from "next/link";

export default function NavLinkHint() {
  const { pending } = useLinkStatus();
  return <span aria-hidden className={`nav-link-spinner${pending ? " is-pending" : ""}`} />;
}
