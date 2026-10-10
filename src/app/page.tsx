export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/logo-icon.png"
              alt="Bazar-Dor logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold tracking-tight text-green-700">
              Bazar-Dor
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="/" className="text-green-700">
              Home
            </a>
            <a
              href="/categories"
              className="transition hover:text-green-700"
            >
              Categories
            </a>
            <a
              href="/products"
              className="transition hover:text-green-700"
            >
              Products
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/signin"
              className="hidden px-3 py-2 font-medium transition hover:text-green-700 sm:inline-block"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-block rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            Your Smart Shopping Companion
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Compare Prices.
            <span className="mt-2 block text-green-700">
              Shop Smarter.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
            Discover products, compare prices, and find better deals
            for your everyday shopping—all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/categories"
              className="rounded-lg bg-green-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              Explore Products →
            </a>

            <a
              href="/signup"
              className="rounded-lg border border-gray-300 px-6 py-3.5 font-semibold transition hover:border-green-700 hover:text-green-700"
            >
              Get Started
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <span>✓ Easy Price Comparison</span>
            <span>✓ Smarter Shopping</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="/bazar-hero.png"
            alt="Shop and compare prices with Bazar-Dor"
            className="h-auto max-h-[480px] w-full rounded-2xl object-contain"
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="font-semibold text-green-700">
              WHY BAZAR-DOR?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Make Shopping Easier
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Everything you need to make smarter shopping decisions.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                🔎
              </div>
              <h3 className="text-xl font-bold">Find Products</h3>
              <p className="mt-3 leading-7 text-gray-600">
                Explore products and discover the items you need.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                🏷️
              </div>
              <h3 className="text-xl font-bold">Compare Prices</h3>
              <p className="mt-3 leading-7 text-gray-600">
                Compare available prices before making a purchase.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:col-span-2 lg:col-span-1">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                🛒
              </div>
              <h3 className="text-xl font-bold">Shop Smarter</h3>
              <p className="mt-3 leading-7 text-gray-600">
                Use product information to make informed shopping choices.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-green-700 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Shop Smarter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-green-50">
            Start exploring products and make more informed shopping decisions.
          </p>
          <a
            href="/categories"
            className="mt-7 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-green-800 transition hover:bg-green-50"
          >
            Explore Now →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <img
              src="/logo-icon.png"
              alt=""
              className="h-7 w-7 object-contain"
            />
            <span className="font-bold text-green-700">Bazar-Dor</span>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 Bazar-Dor. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
