export default function SigninPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 text-gray-900">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <a
          href="/"
          className="block text-center text-2xl font-extrabold text-green-700"
        >
          Bazar-Dor
        </a>

        <h1 className="mt-8 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Sign in to continue to your account.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm font-semibold text-green-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-bold text-white transition hover:bg-green-800"
          >
            Sign In
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 font-semibold transition hover:bg-gray-50"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="font-bold text-green-700 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
