"use client";

import Link from "next/link";

const tickerItems = [
  "🍚 চাল — ৭০ টাকা/কেজি ▲ ২.১%",
  "🥔 আলু — ৪০ টাকা/কেজি ▼ ১.৫%",
  "🧅 পেঁয়াজ — ৬০ টাকা/কেজি ▲ ৩.০%",
  "🥚 ডিম — ৫৫ টাকা/হালি — ০.০%",
  "🐟 মাছ — ৩০০ টাকা/কেজি ▼ ২.০%",
];

export default function Navbar() {
  const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-50 border-b border-green-100 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <Link href="/" className="shrink-0">
            <div className="text-2xl font-extrabold text-green-800">
              🛒 বাজার দর
            </div>

            <p className="mt-1 text-xs text-gray-500">
              {banglaDate}
            </p>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="rounded-lg border border-green-700 px-3 py-2 text-sm font-semibold text-green-800 hover:bg-green-50"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800"
            >
              সাইন আপ
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-green-800 py-2 text-white">
        <div className="price-marquee flex w-max">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={`${index}-${item}`}
              className="whitespace-nowrap px-6 text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
