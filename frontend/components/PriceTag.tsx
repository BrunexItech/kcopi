"use client";

import { useCurrency } from "@/lib/currency";

// Small client-component wrapper so server-rendered pages (tour/destination
// detail) can drop in a currency-aware price without becoming client
// components themselves.
export default function PriceTag({ usdAmount, className }: { usdAmount: number; className?: string }) {
  const { format } = useCurrency();
  return <span className={className}>{format(usdAmount)}</span>;
}
