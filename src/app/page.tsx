import Link from "next/link";
import { getProducts } from "./lib/api";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number | string;
  slug?: string;
  nameBn?: string;
  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit?: string;
  image?: string;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets?: Market[];
};

function formatPrice(price: number | undefined) {
  const value = Number(price ?? 0);

  return `৳${value.toLocaleString("bn-BD")}`;
}

function formatChange(change: number) {
  return `${Math.abs(Number(change || 0)).toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  })}%`;
}

function getUnit(unit?: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "টি",
    gm: "গ্রাম",
    gram: "গ্রাম",
    packet: "প্যাকেট",
  };

  return units[unit?.toLowerCase() ?? ""] ?? unit ?? "একক";
}

function ProductCard({ product }: { product: Product }) {
  const direction = product.change?.dir ?? "flat";
  const percentage = Number(product.change?.pct ?? 0);

  const badgeStyle =
    direction === "up"
      ? "bg-red-50 text-red-600"
      : direction === "down"
        ? "bg-green-50 text-green-700"
        : "bg-gray-100 text-gray-600";

  const badgeIcon =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  const badgeText =
    direction === "flat"
      ? "দাম অপরিবর্তিত"
      : `${badgeIcon} ${formatChange(percentage)}`;

  const productSlug = product.slug
    ? `/product/${encodeURIComponent(product.slug)}`
    : "#সব-পণ্য";

  return (
    <Link
      href={productSlug}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg sm:p-5"
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeStyle}`}
        >
          {badgeText}
        </span>
      </div>

      <p className="mb-1 text-xs text-gray-500">
        {product.categoryNameBn || product.category || "অন্যান্য"}
      </p>

      <h3 className="mb-2 text-base font-bold text-gray-900 transition group-hover:text-green-700 sm:text-lg">
        {product.nameBn || "পণ্যের নাম নেই"}
      </h3>

      <p className="mb-4 text-sm text-gray-500">
        প্রতি {getUnit(product.unit)}
      </p>

      <div className="mt-auto border-t border-gray-100 pt-3">
        <p className="text-xs text-gray-500">আজকের দাম</p>
        <p className="mt-1 text-xl font-extrabold text-gray-900 sm:text-2xl">
          {formatPrice(product.today)}
        </p>
      </div>
    </Link>
  );
}

function ProductSection({
  title,
  products,
  description,
}: {
  title: string;
  products: Product[];
  description?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-5">
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={`${product.id}-${index}`}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default async function Home() {
  let products: Product[] = [];
  let hasError = false;

  try {
    const result: unknown = await getProducts();

    if (Array.isArray(result)) {
      products = result as Product[];
    } else if (
      result &&
      typeof result === "object" &&
      "products" in result &&
      Array.isArray(result.products)
    ) {
      products = result.products as Product[];
    } else {
      hasError = true;
    }
  } catch (error) {
    console.error("Products loading error:", error);
    hasError = true;
  }

  const risers = [...products]
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        Number(b.change?.pct ?? 0) -
        Number(a.change?.pct ?? 0)
    )
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        Number(a.change?.pct ?? 0) -
        Number(b.change?.pct ?? 0)
    )
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-br from-green-50 via-white to-amber-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
              🛒 প্রতিদিনের বাজারদর, এক জায়গায়
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              আজকের বাজারদর জানুন,
              <span className="mt-2 block text-green-700">
                কেনাকাটা করুন বুঝে-শুনে।
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              চাল, ডাল, মাছ, মাংস, সবজি ও নিত্যপ্রয়োজনীয়
              পণ্যের দাম দেখুন এক নজরে।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 font-bold text-white shadow-md transition hover:bg-green-800"
            >
              সব পণ্যের দাম দেখুন ↓
            </a>

            <p className="mt-4 text-sm text-gray-500">
              {products.length.toLocaleString("bn-BD")}টি
              পণ্যের দাম এক জায়গায়
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg rounded-3xl bg-white p-3 shadow-xl ring-1 ring-gray-100">
              <img
                src="/bazar-hero.png"
                alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
                className="h-auto max-h-[420px] w-full rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {hasError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="text-lg font-bold text-red-700">
              পণ্যের তথ্য লোড করা যায়নি
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              ইন্টারনেট সংযোগ পরীক্ষা করে পৃষ্ঠাটি আবার রিফ্রেশ করো।
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 p-8 text-center">
            <p className="text-gray-600">
              এখন কোনো পণ্যের তথ্য পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <>
            <ProductSection
              title="আজ দাম বেড়েছে 🔺"
              description="যেসব পণ্যের দাম গতকালের তুলনায় বেড়েছে"
              products={risers}
            />

            <ProductSection
              title="আজ দাম কমেছে 🔻"
              description="যেসব পণ্যের দাম গতকালের তুলনায় কমেছে"
              products={fallers}
            />

            <section id="সব-পণ্য" className="scroll-mt-6">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold sm:text-3xl">
                    সব পণ্য
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম
                  </p>
                </div>

                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-800">
                  মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => (
                  <ProductCard
                    key={`${product.id}-${index}`}
                    product={product}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </section>

      {/* Features */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              কেন বাজার দর ব্যবহার করবে?
            </h2>

            <p className="mt-3 text-gray-600">
              বাজারের হিসাব রাখো সহজে, কেনাকাটার সিদ্ধান্ত নাও বুঝে-শুনে।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-3 text-3xl">📊</div>
              <h3 className="font-bold">দামের তুলনা</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                পণ্যের আজকের দাম ও দামের পরিবর্তন এক নজরে দেখো।
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-3 text-3xl">🧺</div>
              <h3 className="font-bold">সব পণ্য এক জায়গায়</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                চাল, ডাল, তেল, মাছ, মাংস, সবজি ও অন্যান্য পণ্য খুঁজে নাও।
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-3 text-3xl">💰</div>
              <h3 className="font-bold">সচেতন কেনাকাটা</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                দামের ওঠানামা দেখে তোমার কেনাকাটার পরিকল্পনা করো।
              </p>
            </div>
          </div>
        </div>
      </section>

{/* Footer */}
<footer className="border-t border-gray-200 bg-gray-50">
  <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-gray-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
    <p className="font-semibold text-green-800">
      বাজার দর — Essential Product Prices at a Glance.
    </p>

    <p className="leading-6 md:text-right">
      All prices are indicative and may change depending on market conditions.
    </p>

    <p className="text-center md:text-right">
      © 2026 Bazar-Dor. All rights reserved.
    </p>
  </div>
</footer>
    </main>
  );
}
