/**
 * Tenant & channel configuration for server-side code.
 *
 * The marketing site talks to two widgets:
 *   * "sales"  => NorteNode agency — captures commercial leads.
 *   * "demo"   => Barbearia Silva tenant — shows prospects what their
 *                 own receptionist will feel like.
 *
 * Widget tokens MUST match a row in public.channels (type='web_widget',
 * external_id=<token>, status='active').  Seeded in supabase/seed.sql.
 *
 * Env overrides allow rotating tokens without touching source.
 */

export type BotChannelKey = "sales" | "demo";

export interface BotChannel {
  key: BotChannelKey;
  widgetToken: string;   // channels.external_id
  description: string;
}

export function resolveBotChannel(key: BotChannelKey): BotChannel {
  switch (key) {
    case "sales":
      return {
        key,
        widgetToken:
          process.env.NORTENODE_AGENCY_WIDGET_TOKEN ??
          "widget_nortenode_live_01",
        description: "NorteNode agency — commercial intake",
      };
    case "demo":
      return {
        key,
        widgetToken:
          process.env.NORTENODE_DEMO_WIDGET_TOKEN ??
          "widget_barbearia_silva_01",
        description: "Demo tenant — Barbearia Silva",
      };
  }
}

/**
 * Slug of the agency org that owns marketing-form leads.
 * Used by `submit_agency_lead` RPC.
 */
export function agencyOrgSlug(): string {
  return process.env.NORTENODE_AGENCY_SLUG ?? "nortenode-ai";
}
