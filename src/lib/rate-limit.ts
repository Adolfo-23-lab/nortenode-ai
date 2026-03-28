/**
 * Lightweight in-memory rate limiter.
 * No external dependencies — uses a simple Map with TTL cleanup.
 *
 * Usage:
 *   const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 20 });
 *   if (!limiter.check(clientIp)) return 429 response;
 */

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimiterConfig = {
  /** Time window in milliseconds */
  windowMs: number;
  /** Max requests per window */
  maxRequests: number;
};

export function createRateLimiter(config: RateLimiterConfig) {
  const store = new Map<string, RateLimitEntry>();

  // Cleanup stale entries every 2 minutes to avoid memory leaks
  if (typeof setInterval !== "undefined") {
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of store) {
        if (now > entry.resetAt) {
          store.delete(key);
        }
      }
    }, 120_000);
  }

  return {
    /**
     * Returns `true` if the request is allowed, `false` if rate-limited.
     */
    check(identifier: string): boolean {
      const now = Date.now();
      const existing = store.get(identifier);

      // First request or window expired → allow
      if (!existing || now > existing.resetAt) {
        store.set(identifier, { count: 1, resetAt: now + config.windowMs });
        return true;
      }

      // Within window → increment
      existing.count++;

      if (existing.count > config.maxRequests) {
        return false; // Rate limited
      }

      return true;
    },
  };
}
