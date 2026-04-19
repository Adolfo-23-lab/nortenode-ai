/**
 * NorteNode — Supabase Database Types
 *
 * Hand-authored in lockstep with supabase/migrations/20260417000001.
 * Regenerate after every migration with:
 *   supabase gen types typescript --linked > src/lib/database.types.ts
 *
 * Do NOT use `any` anywhere in this file — skill: backend-supabase.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// =====================================================================
// Enum literal unions (mirror Postgres enums)
// =====================================================================
export type OrgVertical       = "barbershop" | "tattoo_studio" | "emergency_service" | "gym" | "other";
export type OrgPlan           = "trial" | "starter" | "pro" | "agency";
export type OrgPlanStatus     = "trialing" | "active" | "past_due" | "canceled" | "paused";
export type MemberRole        = "owner" | "admin" | "agent" | "viewer";
export type ChannelType       = "whatsapp" | "web_widget" | "instagram";
export type ChannelStatus     = "active" | "pending_verification" | "disabled";
export type ConversationStatus = "open" | "snoozed" | "closed";
export type MessageDirection  = "inbound" | "outbound";
export type MessageSender     = "contact" | "bot" | "agent" | "system";
export type MessageContentType =
  | "text" | "image" | "audio" | "video" | "document"
  | "template" | "location" | "interactive" | "sticker";
export type MessageStatus     = "queued" | "sent" | "delivered" | "read" | "failed";
export type LeadSource        = "whatsapp" | "web_widget" | "manual" | "phone" | "instagram";
export type LeadTemperature   = "cold" | "warm" | "hot";
export type LeadStatus        = "new" | "contacted" | "qualified" | "converted" | "lost";
export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed" | "no_show" | "rescheduled";
export type AppointmentCreator = "bot" | "agent" | "contact";
export type NotificationEvent =
  | "hot_lead_captured"
  | "appointment_booked"
  | "appointment_cancelled"
  | "bot_escalation"
  | "new_message_after_hours"
  | "bot_error";
export type NotificationChannel = "whatsapp" | "email" | "both" | "none";
export type NotificationStatus  = "queued" | "sent" | "delivered" | "failed";
export type WebhookProvider     = "meta_whatsapp" | "internal_widget";

// =====================================================================
// Business-hours shape (stored in organizations.business_hours jsonb)
// =====================================================================
export interface BusinessHoursSlot {
  from: string; // "HH:mm"
  to:   string; // "HH:mm"
}
export interface BusinessHours {
  mon: BusinessHoursSlot[];
  tue: BusinessHoursSlot[];
  wed: BusinessHoursSlot[];
  thu: BusinessHoursSlot[];
  fri: BusinessHoursSlot[];
  sat: BusinessHoursSlot[];
  sun: BusinessHoursSlot[];
}

// =====================================================================
// Database shape (supabase-js generic)
// =====================================================================
export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          slug: string;
          name: string;
          vertical: OrgVertical;
          plan: OrgPlan;
          plan_status: OrgPlanStatus;
          trial_ends_at: string | null;
          locale: string;
          timezone: string;
          owner_contact_email: string | null;
          owner_contact_phone: string | null;
          notify_hot_lead: boolean;
          notify_appointments: boolean;
          notify_after_hours: boolean;
          notify_channel: NotificationChannel;
          business_hours: BusinessHours;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          vertical?: OrgVertical;
          plan?: OrgPlan;
          plan_status?: OrgPlanStatus;
          trial_ends_at?: string | null;
          locale?: string;
          timezone?: string;
          owner_contact_email?: string | null;
          owner_contact_phone?: string | null;
          notify_hot_lead?: boolean;
          notify_appointments?: boolean;
          notify_after_hours?: boolean;
          notify_channel?: NotificationChannel;
          business_hours?: BusinessHours;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["organizations"]["Insert"]>;
        Relationships: [];
      };

      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          locale: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          locale?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };

      memberships: {
        Row: {
          id: string;
          org_id: string;
          user_id: string;
          role: MemberRole;
          invited_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          user_id: string;
          role?: MemberRole;
          invited_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["memberships"]["Insert"]>;
        Relationships: [];
      };

      channels: {
        Row: {
          id: string;
          org_id: string;
          type: ChannelType;
          external_id: string | null;
          display_name: string;
          phone_e164: string | null;
          status: ChannelStatus;
          config: Json;
          webhook_secret: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          type: ChannelType;
          external_id?: string | null;
          display_name: string;
          phone_e164?: string | null;
          status?: ChannelStatus;
          config?: Json;
          webhook_secret?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["channels"]["Insert"]>;
        Relationships: [];
      };

      services: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          description: string | null;
          duration_minutes: number;
          price_cents: number | null;
          currency: string;
          active: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          name: string;
          description?: string | null;
          duration_minutes?: number;
          price_cents?: number | null;
          currency?: string;
          active?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
        Relationships: [];
      };

      contacts: {
        Row: {
          id: string;
          org_id: string;
          phone_e164: string | null;
          email: string | null;
          full_name: string | null;
          locale: string | null;
          tags: string[];
          metadata: Json;
          first_seen_at: string;
          last_seen_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          phone_e164?: string | null;
          email?: string | null;
          full_name?: string | null;
          locale?: string | null;
          tags?: string[];
          metadata?: Json;
          first_seen_at?: string;
          last_seen_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>;
        Relationships: [];
      };

      conversations: {
        Row: {
          id: string;
          org_id: string;
          contact_id: string;
          channel_id: string;
          status: ConversationStatus;
          bot_enabled: boolean;
          assignee_user_id: string | null;
          last_message_at: string;
          last_message_preview: string | null;
          unread_count: number;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          contact_id: string;
          channel_id: string;
          status?: ConversationStatus;
          bot_enabled?: boolean;
          assignee_user_id?: string | null;
          last_message_at?: string;
          last_message_preview?: string | null;
          unread_count?: number;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["conversations"]["Insert"]>;
        Relationships: [];
      };

      messages: {
        Row: {
          id: string;
          org_id: string;
          conversation_id: string;
          direction: MessageDirection;
          sender: MessageSender;
          sender_user_id: string | null;
          content_type: MessageContentType;
          text: string | null;
          media_url: string | null;
          media_metadata: Json | null;
          external_id: string | null;
          status: MessageStatus;
          error_text: string | null;
          token_usage: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          conversation_id: string;
          direction: MessageDirection;
          sender: MessageSender;
          sender_user_id?: string | null;
          content_type?: MessageContentType;
          text?: string | null;
          media_url?: string | null;
          media_metadata?: Json | null;
          external_id?: string | null;
          status?: MessageStatus;
          error_text?: string | null;
          token_usage?: Json | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
        Relationships: [];
      };

      leads: {
        Row: {
          id: string;
          org_id: string;
          contact_id: string;
          conversation_id: string | null;
          source: LeadSource;
          intent: string | null;
          temperature: LeadTemperature;
          status: LeadStatus;
          qualification: Json;
          assigned_to_user_id: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          contact_id: string;
          conversation_id?: string | null;
          source: LeadSource;
          intent?: string | null;
          temperature?: LeadTemperature;
          status?: LeadStatus;
          qualification?: Json;
          assigned_to_user_id?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };

      appointments: {
        Row: {
          id: string;
          org_id: string;
          contact_id: string;
          lead_id: string | null;
          service_id: string | null;
          starts_at: string;
          ends_at: string;
          status: AppointmentStatus;
          notes: string | null;
          created_by: AppointmentCreator;
          reminded_at: string | null;
          cancelled_at: string | null;
          cancel_reason: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          contact_id: string;
          lead_id?: string | null;
          service_id?: string | null;
          starts_at: string;
          ends_at: string;
          status?: AppointmentStatus;
          notes?: string | null;
          created_by?: AppointmentCreator;
          reminded_at?: string | null;
          cancelled_at?: string | null;
          cancel_reason?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["appointments"]["Insert"]>;
        Relationships: [];
      };

      bot_configs: {
        Row: {
          id: string;
          org_id: string;
          channel_id: string | null;
          persona_name: string;
          system_prompt: string;
          knowledge_base: Json;
          model: string;
          temperature: number;
          max_tokens: number;
          tools: Json;
          enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          channel_id?: string | null;
          persona_name?: string;
          system_prompt: string;
          knowledge_base?: Json;
          model?: string;
          temperature?: number;
          max_tokens?: number;
          tools?: Json;
          enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bot_configs"]["Insert"]>;
        Relationships: [];
      };

      notifications: {
        Row: {
          id: string;
          org_id: string;
          event_type: NotificationEvent;
          channel: NotificationChannel;
          recipient: string;
          subject: string | null;
          payload: Json;
          related_lead_id: string | null;
          related_appointment_id: string | null;
          related_conversation_id: string | null;
          status: NotificationStatus;
          attempts: number;
          last_error: string | null;
          scheduled_at: string;
          sent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          event_type: NotificationEvent;
          channel: NotificationChannel;
          recipient: string;
          subject?: string | null;
          payload?: Json;
          related_lead_id?: string | null;
          related_appointment_id?: string | null;
          related_conversation_id?: string | null;
          status?: NotificationStatus;
          attempts?: number;
          last_error?: string | null;
          scheduled_at?: string;
          sent_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
        Relationships: [];
      };

      notification_preferences: {
        Row: {
          id: string;
          org_id: string;
          user_id: string;
          event_type: NotificationEvent;
          channel: NotificationChannel;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          user_id: string;
          event_type: NotificationEvent;
          channel?: NotificationChannel;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["notification_preferences"]["Insert"]>;
        Relationships: [];
      };

      audit_log: {
        Row: {
          id: string;
          org_id: string | null;
          user_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          metadata: Json;
          ip: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          org_id?: string | null;
          user_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          metadata?: Json;
          ip?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["audit_log"]["Insert"]>;
        Relationships: [];
      };

      webhook_events: {
        Row: {
          id: string;
          provider: WebhookProvider;
          external_id: string;
          org_id: string | null;
          payload: Json;
          processed_at: string | null;
          error: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider: WebhookProvider;
          external_id: string;
          org_id?: string | null;
          payload: Json;
          processed_at?: string | null;
          error?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["webhook_events"]["Insert"]>;
        Relationships: [];
      };
    };

    Views: Record<string, never>;

    Functions: {
      is_member: {
        Args: { target_org: string };
        Returns: boolean;
      };
      has_role_in: {
        Args: { target_org: string; required_roles: MemberRole[] };
        Returns: boolean;
      };
      create_organization: {
        Args: {
          p_name: string;
          p_slug: string;
          p_vertical?: OrgVertical;
          p_owner_phone?: string | null;
          p_owner_email?: string | null;
        };
        Returns: string;
      };
      ingest_widget_message: {
        Args: {
          p_channel_token: string;
          p_session_id: string;
          p_text: string;
          p_visitor_name?: string | null;
          p_visitor_phone?: string | null;
          p_visitor_email?: string | null;
        };
        Returns: string;
      };
      append_bot_message: {
        Args: {
          p_conversation_id: string;
          p_text: string;
          p_token_usage?: Json | null;
          p_external_id?: string | null;
        };
        Returns: string;
      };
      submit_agency_lead: {
        Args: {
          p_agency_slug: string;
          p_name: string;
          p_email: string | null;
          p_phone: string | null;
          p_message: string | null;
        };
        Returns: string;
      };
      bot_find_service: {
        Args: { p_org_id: string; p_query: string };
        Returns: string | null;
      };
      bot_has_conflict: {
        Args: {
          p_org_id: string;
          p_starts_at: string;
          p_ends_at: string;
          p_ignore_appointment_id?: string | null;
        };
        Returns: boolean;
      };
      bot_within_business_hours: {
        Args: { p_org_id: string; p_starts_at: string; p_ends_at: string };
        Returns: boolean;
      };
      bot_qualify_lead: {
        Args: {
          p_conversation_id: string;
          p_intent: string;
          p_temperature: LeadTemperature;
          p_qualification?: Json;
          p_notes?: string | null;
        };
        Returns: Json;
      };
      bot_book_appointment: {
        Args: {
          p_conversation_id: string;
          p_service_query: string;
          p_starts_at: string;
          p_duration_minutes_override?: number | null;
          p_notes?: string | null;
        };
        Returns: Json;
      };
      bot_escalate_conversation: {
        Args: { p_conversation_id: string; p_reason: string };
        Returns: Json;
      };
    };

    Enums: {
      org_vertical: OrgVertical;
      org_plan: OrgPlan;
      org_plan_status: OrgPlanStatus;
      member_role: MemberRole;
      channel_type: ChannelType;
      channel_status: ChannelStatus;
      conversation_status: ConversationStatus;
      message_direction: MessageDirection;
      message_sender: MessageSender;
      message_content_type: MessageContentType;
      message_status: MessageStatus;
      lead_source: LeadSource;
      lead_temperature: LeadTemperature;
      lead_status: LeadStatus;
      appointment_status: AppointmentStatus;
      appointment_creator: AppointmentCreator;
      notification_event: NotificationEvent;
      notification_channel: NotificationChannel;
      notification_status: NotificationStatus;
      webhook_provider: WebhookProvider;
    };

    CompositeTypes: Record<string, never>;
  };
}

// Convenience row/insert/update aliases
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
