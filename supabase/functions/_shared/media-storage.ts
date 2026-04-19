/**
 * Thin wrapper around supabase-js Storage for WhatsApp media uploads.
 * Keeps the path convention (`{org}/{conv}/{msg}.{ext}`) in one place.
 */

import type { SharedEnv } from "./env.ts";
import type { TypedSupabase } from "./supabase.ts";
import type { DownloadedMedia } from "./meta.ts";

export interface StoredMedia {
  bucket:       string;
  storage_path: string;      // bucket-relative path
  mime_type:    string;
  bytes:        number;
  sha256?:      string;
}

export async function uploadConversationMedia(
  env: SharedEnv,
  sb: TypedSupabase,
  ctx: { orgId: string; conversationId: string; messageId: string },
  media: DownloadedMedia,
): Promise<StoredMedia> {
  const storagePath = `${ctx.orgId}/${ctx.conversationId}/${ctx.messageId}.${media.ext}`;

  const { error } = await sb.storage
    .from(env.STORAGE_MEDIA_BUCKET)
    .upload(storagePath, media.bytes, {
      contentType: media.mimeType,
      upsert:      false,
      cacheControl: "private, max-age=31536000, immutable",
    });

  if (error) {
    throw new Error(`storage_upload_failed:${error.message}`);
  }

  return {
    bucket:       env.STORAGE_MEDIA_BUCKET,
    storage_path: storagePath,
    mime_type:    media.mimeType,
    bytes:        media.sizeBytes,
    sha256:       media.sha256,
  };
}
