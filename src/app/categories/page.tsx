
import Link from "next/link";
import { getCategories } from "../lib/api";

type Category = {
  id?: string | number;
  name?: string;
  nameBn?: string;
  title?: string;
  slug?: string;
  icon?: string;
  emoji?: string;
};

function getCategoryName(category: Category) {
  return category.nameBn ?? category.name ?? category.title ?? "ক্যাটাগরি";
}

function getCategorySlug(category: Category) {
  return (
    category.slug ??
    String(category.id ?? getCategoryName(category))
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
  );
}

function getCategoryIcon(category: Category) {
  if (category.emoji) return category.emoji;
  if (category.icon) return category.icon;

  const name = getCategoryName(category).toLowerCase();

  if (name.includes("চাল") || name.includes("rice")) return "🍚";
  if (name.includes("পেঁয়াজ") || name.includes("পেঁয়াজ")) return "🧅";
  if (name.includes("তেল") || name.includes("oil")) return "🫒";
  if (name.includes("ডাল") || name.includes("lentil")) return "🫘";
  if (name.includes("মাছ") || name.includes("fish")) return "🐟";
  if (name.includes("দুধ") || name.includes("milk")) return "🥛";
  if (name.includes("ডিম") || name.includes("egg")) return "🥚";
  if (name.includes("সবজি") || name.includes("vegetable")) return "🥦";

  return "🛒";
}

export default async function CategoriesPage() {
  let categories: Category[] = [];
  let hasError = false;

  try {
    const result = await getCategories();
    categories = Array.isArray(result) ? (result as Category[]) : [];
  } catch (error) {
    console.error("Failed to load categories:", error);
    hasError = true;
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-bold tracking-widest text-green-700">
          BAZAR-DOR
        </p>

        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          সকল ক্যাটাগরি
        </h1>

        <p className="mt-3 text-gray-600">
          আপনার প্রয়োজনীয় পণ্য ক্যাটাগরি অনুযায়ী খুঁজে নিন।
        </p>

        {hasError ? (
          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="font-semibold text-red-600">
              ক্যাটাগরি লোড করা যায়নি।
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : categories.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-600">কোনো ক্যাটাগরি পাওয়া যায়নি।</p>
            <Link
              href="/"
              className="mt-4 inline-block font-semibold text-green-700"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, index) => {
              const name = getCategoryName(category);
              const slug = getCategorySlug(category);

              return (
                <Link
                  key={String(category.id ?? category.slug ?? `${name}-${index}`)}
                  href={`/categories/${encodeURIComponent(slug)}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
                    {getCategoryIcon(category)}
                  </span>

                  <h2 className="mt-4 font-bold">{name}</h2>

                  <p className="mt-2 text-sm font-semibold text-green-700">
                    পণ্য দেখুন →
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
