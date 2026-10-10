const categories = [
  {
    name: "Fruits",
    description: "Fresh fruits for everyday nutrition.",
    emoji: "🍎",
    color: "bg-red-50",
  },
  {
    name: "Vegetable",
    description: "Explore everyday fresh vegetables.",
    emoji: "🥦",
    color: "bg-green-50",
  },
  {
    name: "Groceries",
    description: "Rice and other daily essentials.",
    emoji: "🍚",
    color: "bg-amber-50",
  },
  {
    name: "Dairy",
    description: "Milk, eggs, and dairy products.",
    emoji: "🥛",
    color: "bg-blue-50",
  },
  {
    name: "Beverages",
    description: "Drinks for your everyday needs.",
    emoji: "🧃",
    color: "bg-orange-50",
  },
  {
    name: "Snacks",
    description: "Snacks for any time of day.",
    emoji: "🍪",
    color: "bg-purple-50",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-950">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-extrabold text-green-700">
            Bazar-Dor
          </a>

          <a
            href="/products"
            className="font-semibold text-gray-800 hover:text-green-700"
          >
            Products →
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-bold tracking-widest text-green-700">
          BROWSE BY CATEGORY
        </p>

        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
          Product Categories
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-gray-600">
          Explore different categories and find the products you need.
        </p>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`flex h-32 items-center justify-center rounded-xl ${category.color}`}
              >
                <span className="text-6xl" role="img" aria-label={category.name}>
                  {category.emoji}
                </span>
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-950">
                {category.name}
              </h2>

              <p className="mt-2 leading-6 text-gray-600">
                {category.description}
              </p>

              <a
                href="/products"
                className="mt-5 inline-block font-bold text-green-700 hover:text-green-900"
              >
                Explore Products →
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white px-6 py-6 text-center">
        <p className="text-sm text-gray-600">
          © 2026 Bazar-Dor. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
