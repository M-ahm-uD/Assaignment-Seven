const API_URL = "https://api.abcz.workers.dev/api/bazardor";

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function fetchAPI(endpoint: string): Promise<unknown> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        cache: "no-store",
      });

      if (response.status === 429) {
        const retryAfter = Number(response.headers.get("Retry-After"));
        const delay =
          Number.isFinite(retryAfter) && retryAfter > 0
            ? Math.min(retryAfter * 1000, 10000)
            : 2000 * (attempt + 1);

        if (attempt < 2) {
          await wait(delay);
          continue;
        }

        throw new Error(
          "API rate limit exceeded. কিছুক্ষণ পর আবার চেষ্টা করো।"
        );
      }

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error("Unknown API error");

      if (
        lastError.message.includes("rate limit") ||
        lastError.message.includes("429") ||
        attempt === 2
      ) {
        throw lastError;
      }

      await wait(1000 * (attempt + 1));
    }
  }

  throw lastError ?? new Error("API request failed");
}

function extractList(data: unknown, key: string): unknown[] {
  if (Array.isArray(data)) return data;

  if (!data || typeof data !== "object") {
    throw new Error("Invalid API response");
  }

  const obj = data as Record<string, unknown>;

  if (Array.isArray(obj[key])) return obj[key];
  if (Array.isArray(obj.data)) return obj.data;

  if (obj.data && typeof obj.data === "object") {
    const nested = obj.data as Record<string, unknown>;
    if (Array.isArray(nested[key])) return nested[key];
  }

  throw new Error(`Could not find ${key} in API response`);
}

export async function getCategories() {
  return extractList(await fetchAPI("/categories"), "categories");
}

export async function getProducts(category?: string) {
  const endpoint = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";

  return extractList(await fetchAPI(endpoint), "products");
}
