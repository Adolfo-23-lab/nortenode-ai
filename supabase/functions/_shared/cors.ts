/**
 * CORS helper for Edge Functions.
 * Inbound Meta webhooks don't need this (Meta issues server-to-server
 * requests).  Kept here for future browser-facing endpoints.
 */

const ALLOWED_ORIGINS: ReadonlySet<string> = new Set([
  "https://nortenode.com",
  "https://www.nortenode.com",
  "http://localhost:3000",
]);

export function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : "null";
  return {
    "Access-Control-Allow-Origin":      allowed,
    "Access-Control-Allow-Methods":     "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers":     "authorization, x-client-info, apikey, content-type",
    "Access-Control-Max-Age":           "86400",
    "Vary":                             "Origin",
  };
}

export function preflightResponse(origin: string | null): Response {
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}
