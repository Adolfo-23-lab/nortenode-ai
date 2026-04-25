/**
 * Environment reader for Supabase Edge Functions (Deno).
 * Fails fast if a required secret is missing so we never ship a
 * half-configured function to production.
 *
 * All variables must be provisioned via:
 *   supabase secrets set KEY=value
 */

export interface SharedEnv {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;

  // Meta WhatsApp Cloud API
  META_APP_SECRET: string;           // for X-Hub-Signature-256 HMAC
  META_VERIFY_TOKEN: string;         // for GET challenge handshake
  META_WHATSAPP_TOKEN: string;       // Bearer access token (long-lived)
  META_GRAPH_API_VERSION: string;    // e.g. 'v20.0'

  // LLM
  GROQ_API_KEY: string;
  GROQ_MODEL_DEFAULT: string;        // fallback when bot_config.model unset

  // Email (Resend)
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;         // must be a verified sender
  RESEND_FROM_NAME: string;          // e.g. "NorteNode"
  RESEND_REPLY_TO: string;           // address shown when recipient hits Reply

  // Storage
  STORAGE_MEDIA_BUCKET: string;      // bucket id for WhatsApp media

  // Operations
  EDGE_LOG_LEVEL: "debug" | "info" | "warn" | "error";
}

function read(key: keyof SharedEnv, fallback?: string): string {
  const v = Deno.env.get(key);
  if (v && v.length > 0) return v;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required env var: ${key}`);
}

export function loadEnv(): SharedEnv {
  return {
    SUPABASE_URL:              read("SUPABASE_URL"),
    SUPABASE_SERVICE_ROLE_KEY: read("SUPABASE_SERVICE_ROLE_KEY"),
    META_APP_SECRET:           read("META_APP_SECRET"),
    META_VERIFY_TOKEN:         read("META_VERIFY_TOKEN"),
    META_WHATSAPP_TOKEN:       read("META_WHATSAPP_TOKEN"),
    META_GRAPH_API_VERSION:    read("META_GRAPH_API_VERSION", "v20.0"),
    GROQ_API_KEY:              read("GROQ_API_KEY"),
    GROQ_MODEL_DEFAULT:        read("GROQ_MODEL_DEFAULT", "llama-3.3-70b-versatile"),
    RESEND_API_KEY:            read("RESEND_API_KEY", ""),
    RESEND_FROM_EMAIL:         read("RESEND_FROM_EMAIL", "notify@nortenode.com"),
    RESEND_FROM_NAME:          read("RESEND_FROM_NAME",  "NorteNode"),
    RESEND_REPLY_TO:           read("RESEND_REPLY_TO",   "contacto@nortenode.com"),
    STORAGE_MEDIA_BUCKET:      read("STORAGE_MEDIA_BUCKET", "conversation-media"),
    EDGE_LOG_LEVEL:            (read("EDGE_LOG_LEVEL", "info") as SharedEnv["EDGE_LOG_LEVEL"]),
  };
}
