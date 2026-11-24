"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

export const CURRENCIES = [
  { code: "USD", label: "US Dollar", flag: "🇺🇸" },
  { code: "KES", label: "Kenyan Shilling", flag: "🇰🇪" },
  { code: "EUR", label: "Euro", flag: "🇪🇺" },
  { code: "GBP", label: "British Pound", flag: "🇬🇧" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

const STORAGE_KEY = "kcopi_currency";
const FALLBACK_RATES: Record<string, number> = { USD: 1, KES: 129, EUR: 0.92, GBP: 0.79 };

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  /** Converts a USD amount (as stored in the database) to the selected
   *  currency and formats it with the right symbol/decimals. */
  format: (usdAmount: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && CURRENCIES.some((c) => c.code === saved)) {
        setCurrencyState(saved as CurrencyCode);
      }
    } catch {
      // ignore
    }
    api
      .getFxRates()
      .then((data) => setRates(data.rates))
      .catch(() => {
        // keep FALLBACK_RATES — the feature still works, just with slightly
        // stale conversion, rather than breaking price display entirely.
      });
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // ignore
    }
  };

  const format = useMemo(() => {
    return (usdAmount: number) => {
      const rate = rates[currency] ?? 1;
      const converted = usdAmount * rate;
      try {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
          maximumFractionDigits: currency === "KES" ? 0 : 2,
        }).format(converted);
      } catch {
        return `${currency} ${converted.toFixed(0)}`;
      }
    };
  }, [currency, rates]);

  return <CurrencyContext.Provider value={{ currency, setCurrency, format }}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}
