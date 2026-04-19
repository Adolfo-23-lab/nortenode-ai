"use server";

import type { BotChannelKey } from "@/lib/tenant-config";

/**
 * LEGACY NO-OP (2026-04-17).
 *
 * The marketing-site widgets still call this action after `sendMessage`
 * for historical reasons, but all persistence for the web-widget flow
 * now lives in /api/chat (route.ts), which is the single authoritative
 * writer.  Keeping this as a typed no-op avoids:
 *   (a) double-writing the same inbound message (race with /api/chat)
 *   (b) having to patch the calling components in this phase
 *
 * Fase 4 will drop the call sites entirely when the widget SDK ships.
 */

export interface ChatLeadData {
  sessionId: string;
  userMessage: string;
  source: BotChannelKey;  // "sales" | "demo"
}

export async function saveChatLeadAction(_data: ChatLeadData): Promise<void> {
  // no-op — /api/chat owns widget persistence.
}
