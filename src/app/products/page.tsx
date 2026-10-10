const products = [
  {
    id: 1,
    name: "Fresh Apples",
    category: "Fruits",
    price: 180,
    unit: "kg",
    emoji: "🍎",
  },
  {
    id: 2,
    name: "Fresh Milk",
    category: "Dairy",
    price: 90,
    unit: "liter",
    emoji: "🥛",
  },
  {
    id: 3,
    name: "Basmati Rice",
    category: "Groceries",
    price: 120,
    unit: "kg",
    emoji: "🍚",
  },
  {
    id: 4,
    name: "Fresh Eggs",
    category: "Dairy",
    price: 60,
    unit: "4 pcs",
    emoji: "🥚",
  },
  {
    id: 5,
    name: "Bananas",
    category: "Fruits",
    price: 80,
    unit: "dozen",
    emoji: "🍌",
  },
  {
    id: 6,
    name: "Potatoes",
    category: "Vegetables",
    price: 30,
    unit: "kg",
    emoji: "🥔",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-2xl font-extrabold text-green-700"
          >
            Bazar-Dor
          </a>

          <a
            href="/"
            className="font-semibold text-gray-800 transition hover:text-green-700"
          >
            ← Home
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-bold tracking-widest text-green-700">
          OUR PRODUCTS
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-gray-950 sm:text-4xl">
          Explore Products
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-700">
          Browse everyday products and compare their listed prices.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-44 items-center justify-center bg-green-50">
                <span
                  className="text-7xl"
                  role="img"
                  aria-label={product.name}
                >
                  {product.emoji}
                </span>
              </div>

              <div className="p-6">
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                  {product.category}
                </span>

                <h2 className="mt-4 text-xl font-bold text-gray-950">
                  {product.name}
                </h2>

                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Listed price
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-gray-950">
                      ৳{product.price}
                      <span className="ml-1 text-sm font-medium text-gray-600">
                        / {product.unit}
                      </span>
                    </p>
                  </div>

                  <span className="rounded-lg bg-green-700 px-3 py-2 text-sm font-bold text-white">
                    View Price
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-600">
          Showing {products.length} sample products.
        </p>
      </section>

      <footer className="border-t border-gray-200 bg-white px-6 py-6 text-center">
        <p className="text-sm font-medium text-gray-600">
          © 2026 Bazar-Dor. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
