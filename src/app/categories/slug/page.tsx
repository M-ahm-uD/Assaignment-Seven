
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getCategories, getProducts } from "../../lib/api";

type Category = {
  id?: string | number;
  name?: string;
  nameBn?: string;
  title?: string;
  slug?: string;
  emoji?: string;
  icon?: string;
};

type Product = {
  id?: string | number;
  name?: string;
  nameBn?: string;
  title?: string;
  slug?: string;
  category?: string | { name?: string; slug?: string };
  price?: number | string;
  currentPrice?: number | string;
  unit?: string;
  unitBn?: string;
  emoji?: string;
  icon?: string;
  priceChange?: number | string;
  change?: number | string;
  changePercent?: number | string;
};

type SortOption = "default" | "low" | "high";

function getName(item: Category | Product) {
  return item.nameBn ?? item.name ?? item.title ?? "পণ্য";
}

function getSlug(category: Category) {
  return (
    category.slug ??
    String(category.id ?? getName(category))
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
  );
}

function getPrice(product: Product): number {
  const value = product.currentPrice ?? product.price ?? 0;
  const price = Number(value);
  return Number.isFinite(price) ? price : 0;
}

function getEmoji(product: Product): string {
  if (product.emoji) return product.emoji;
  if (product.icon) return product.icon;

  const name = getName(product).toLowerCase();

  if (name.includes("চাল") || name.includes("rice")) return "🍚";
  if (name.includes("পেঁয়াজ") || name.includes("পেঁয়াজ")) return "🧅";
  if (name.includes("তেল") || name.includes("oil")) return "🫒";
  if (name.includes("ডাল") || name.includes("lentil")) return "🫘";
  if (name.includes("মাছ") || name.includes("fish")) return "🐟";
  if (name.includes("দুধ") || name.includes("milk")) return "🥛";
  if (name.includes("ডিম") || name.includes("egg")) return "🥚";
  if (name.includes("আলু") || name.includes("potato")) return "🥔";
  if (name.includes("পেঁয়াজ") || name.includes("onion")) return "🧅";
  if (name.includes("টমেটো") || name.includes("tomato")) return "🍅";
  if (name.includes("সবজি") || name.includes("vegetable")) return "🥦";

  return "🛒";
}

function getChange(product: Product): number | null {
  const value = product.priceChange ?? product.change ?? product.changePercent;

  if (value === undefined || value === null || value === "") return null;

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export default function CategoryDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(params.slug);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<SortOption>("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setError(false);

      try {
        const [categoryResult, productResult] = await Promise.all([
          getCategories(),
          getProducts(slug),
        ]);

        if (!active) return;

        setCategories(
          Array.isArray(categoryResult)
            ? (categoryResult as Category[])
            : [],
        );

        setProducts(
          Array.isArray(productResult) ? (productResult as Product[]) : [],
        );
      } catch (err) {
        console.error("Failed to load category products:", err);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [slug]);

  const category = categories.find(
    (item) => getSlug(item).toLowerCase() === slug.toLowerCase(),
  );

  const sortedProducts = useMemo(() => {
    const list = [...products];

    if (sort === "low") {
      list.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sort === "high") {
      list.sort((a, b) => getPrice(b) - getPrice(a));
    }

    return list;
  }, [products, sort]);

  const invalidCategory =
    !loading &&
    !error &&
    (!category || products.length === 0);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 font-semibold text-green-700">BAZAR-DOR</p>
          <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />
          <p className="mt-4 text-gray-600">Loading...</p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="h-16 w-16 rounded-xl bg-gray-200" />
                <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error || invalidCategory) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-5xl">🔎</p>
          <h1 className="mt-4 text-2xl font-extrabold">
            {error ? "পণ্য লোড করা যায়নি" : "ক্যাটাগরি পাওয়া যায়নি"}
          </h1>
          <p className="mt-3 text-gray-600">
            {error
              ? "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
              : "এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ঠিকানা ভুল।"}
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-green-700 px-6 py-3 font-bold text-white hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/categories" className="text-sm font-semibold text-green-700">
          ← সকল ক্যাটাগরি
        </Link>

        <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold tracking-widest text-green-700">
              BAZAR-DOR
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-4xl">
                {category?.emoji ?? category?.icon ?? "🛒"}
              </span>
              <h1 className="text-3xl font-extrabold sm:text-4xl">
                {category ? getName(category) : "ক্যাটাগরির পণ্য"}
              </h1>
            </div>
            <p className="mt-2 text-gray-600">
              মোট পণ্য: {sortedProducts.length}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="shrink-0 font-semibold">
              সাজান:
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="min-w-0 rounded-xl border border-gray-300 bg-white px-3 py-3 outline-none focus:border-green-600"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map((product, index) => {
            const change = getChange(product);
            const price = getPrice(product);

            return (
              <article
                key={String(product.id ?? product.slug ?? `${getName(product)}-${index}`)}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
              >
                <div className="flex h-24 items-center justify-center rounded-xl bg-green-50 text-5xl sm:h-32 sm:text-6xl">
                  {getEmoji(product)}
                </div>

                <h2 className="mt-4 text-lg font-bold">{getName(product)}</h2>

                <p className="mt-1 text-sm text-gray-500">
                  {product.unitBn ?? product.unit ?? "প্রতি একক"}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xl font-extrabold text-gray-900">
                    ৳{price.toLocaleString("bn-BD")}
                  </p>

                  {change !== null && (
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-bold ${
                        change > 0
                          ? "bg-red-50 text-red-700"
                          : change < 0
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {change > 0 ? "↑" : change < 0 ? "↓" : "—"}{" "}
                      {Math.abs(change).toLocaleString("bn-BD")}
                      {product.changePercent !== undefined ? "%" : ""}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
