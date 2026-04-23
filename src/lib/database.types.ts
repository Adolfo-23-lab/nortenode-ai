export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          cancel_reason: string | null
          cancelled_at: string | null
          contact_id: string
          created_at: string
          created_by: Database["public"]["Enums"]["appointment_creator"]
          ends_at: string
          id: string
          lead_id: string | null
          metadata: Json
          notes: string | null
          org_id: string
          reminded_at: string | null
          service_id: string | null
          starts_at: string
          status: Database["public"]["Enums"]["appointment_status"]
          updated_at: string
        }
        Insert: {
          cancel_reason?: string | null
          cancelled_at?: string | null
          contact_id: string
          created_at?: string
          created_by?: Database["public"]["Enums"]["appointment_creator"]
          ends_at: string
          id?: string
          lead_id?: string | null
          metadata?: Json
          notes?: string | null
          org_id: string
          reminded_at?: string | null
          service_id?: string | null
          starts_at: string
          status?: Database["public"]["Enums"]["appointment_status"]
          updated_at?: string
        }
        Update: {
          cancel_reason?: string | null
          cancelled_at?: string | null
          contact_id?: string
          created_at?: string
          created_by?: Database["public"]["Enums"]["appointment_creator"]
          ends_at?: string
          id?: string
          lead_id?: string | null
          metadata?: Json
          notes?: string | null
          org_id?: string
          reminded_at?: string | null
          service_id?: string | null
          starts_at?: string
          status?: Database["public"]["Enums"]["appointment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip: unknown
          metadata: Json
          org_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip?: unknown
          metadata?: Json
          org_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip?: unknown
          metadata?: Json
          org_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_configs: {
        Row: {
          channel_id: string | null
          created_at: string
          enabled: boolean
          id: string
          knowledge_base: Json
          max_tokens: number
          model: string
          org_id: string
          persona_name: string
          system_prompt: string
          temperature: number
          tools: Json
          updated_at: string
        }
        Insert: {
          channel_id?: string | null
          created_at?: string
          enabled?: boolean
          id?: string
          knowledge_base?: Json
          max_tokens?: number
          model?: string
          org_id: string
          persona_name?: string
          system_prompt: string
          temperature?: number
          tools?: Json
          updated_at?: string
        }
        Update: {
          channel_id?: string | null
          created_at?: string
          enabled?: boolean
          id?: string
          knowledge_base?: Json
          max_tokens?: number
          model?: string
          org_id?: string
          persona_name?: string
          system_prompt?: string
          temperature?: number
          tools?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_configs_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bot_configs_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          config: Json
          created_at: string
          display_name: string
          external_id: string | null
          id: string
          org_id: string
          phone_e164: string | null
          status: Database["public"]["Enums"]["channel_status"]
          type: Database["public"]["Enums"]["channel_type"]
          updated_at: string
          webhook_secret: string | null
        }
        Insert: {
          config?: Json
          created_at?: string
          display_name: string
          external_id?: string | null
          id?: string
          org_id: string
          phone_e164?: string | null
          status?: Database["public"]["Enums"]["channel_status"]
          type: Database["public"]["Enums"]["channel_type"]
          updated_at?: string
          webhook_secret?: string | null
        }
        Update: {
          config?: Json
          created_at?: string
          display_name?: string
          external_id?: string | null
          id?: string
          org_id?: string
          phone_e164?: string | null
          status?: Database["public"]["Enums"]["channel_status"]
          type?: Database["public"]["Enums"]["channel_type"]
          updated_at?: string
          webhook_secret?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string
          email: string | null
          external_ref: string | null
          first_seen_at: string
          full_name: string | null
          id: string
          last_seen_at: string
          locale: string | null
          metadata: Json
          org_id: string
          phone_e164: string | null
          tags: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          external_ref?: string | null
          first_seen_at?: string
          full_name?: string | null
          id?: string
          last_seen_at?: string
          locale?: string | null
          metadata?: Json
          org_id: string
          phone_e164?: string | null
          tags?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          external_ref?: string | null
          first_seen_at?: string
          full_name?: string | null
          id?: string
          last_seen_at?: string
          locale?: string | null
          metadata?: Json
          org_id?: string
          phone_e164?: string | null
          tags?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          assignee_user_id: string | null
          bot_enabled: boolean
          channel_id: string
          contact_id: string
          created_at: string
          id: string
          last_message_at: string
          last_message_preview: string | null
          metadata: Json
          org_id: string
          status: Database["public"]["Enums"]["conversation_status"]
          unread_count: number
          updated_at: string
        }
        Insert: {
          assignee_user_id?: string | null
          bot_enabled?: boolean
          channel_id: string
          contact_id: string
          created_at?: string
          id?: string
          last_message_at?: string
          last_message_preview?: string | null
          metadata?: Json
          org_id: string
          status?: Database["public"]["Enums"]["conversation_status"]
          unread_count?: number
          updated_at?: string
        }
        Update: {
          assignee_user_id?: string | null
          bot_enabled?: boolean
          channel_id?: string
          contact_id?: string
          created_at?: string
          id?: string
          last_message_at?: string
          last_message_preview?: string | null
          metadata?: Json
          org_id?: string
          status?: Database["public"]["Enums"]["conversation_status"]
          unread_count?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to_user_id: string | null
          contact_id: string
          conversation_id: string | null
          created_at: string
          id: string
          intent: string | null
          notes: string | null
          org_id: string
          qualification: Json
          source: Database["public"]["Enums"]["lead_source"]
          status: Database["public"]["Enums"]["lead_status"]
          temperature: Database["public"]["Enums"]["lead_temperature"]
          updated_at: string
        }
        Insert: {
          assigned_to_user_id?: string | null
          contact_id: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          intent?: string | null
          notes?: string | null
          org_id: string
          qualification?: Json
          source: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["lead_status"]
          temperature?: Database["public"]["Enums"]["lead_temperature"]
          updated_at?: string
        }
        Update: {
          assigned_to_user_id?: string | null
          contact_id?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          intent?: string | null
          notes?: string | null
          org_id?: string
          qualification?: Json
          source?: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["lead_status"]
          temperature?: Database["public"]["Enums"]["lead_temperature"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          created_at: string
          id: string
          invited_by: string | null
          org_id: string
          role: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          invited_by?: string | null
          org_id: string
          role?: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          invited_by?: string | null
          org_id?: string
          role?: Database["public"]["Enums"]["member_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content_type: Database["public"]["Enums"]["message_content_type"]
          conversation_id: string
          created_at: string
          direction: Database["public"]["Enums"]["message_direction"]
          error_text: string | null
          external_id: string | null
          id: string
          media_metadata: Json | null
          media_url: string | null
          org_id: string
          sender: Database["public"]["Enums"]["message_sender"]
          sender_user_id: string | null
          status: Database["public"]["Enums"]["message_status"]
          text: string | null
          token_usage: Json | null
        }
        Insert: {
          content_type?: Database["public"]["Enums"]["message_content_type"]
          conversation_id: string
          created_at?: string
          direction: Database["public"]["Enums"]["message_direction"]
          error_text?: string | null
          external_id?: string | null
          id?: string
          media_metadata?: Json | null
          media_url?: string | null
          org_id: string
          sender: Database["public"]["Enums"]["message_sender"]
          sender_user_id?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          text?: string | null
          token_usage?: Json | null
        }
        Update: {
          content_type?: Database["public"]["Enums"]["message_content_type"]
          conversation_id?: string
          created_at?: string
          direction?: Database["public"]["Enums"]["message_direction"]
          error_text?: string | null
          external_id?: string | null
          id?: string
          media_metadata?: Json | null
          media_url?: string | null
          org_id?: string
          sender?: Database["public"]["Enums"]["message_sender"]
          sender_user_id?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          text?: string | null
          token_usage?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          channel: Database["public"]["Enums"]["notification_channel"]
          created_at: string
          event_type: Database["public"]["Enums"]["notification_event"]
          id: string
          org_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          channel?: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          event_type: Database["public"]["Enums"]["notification_event"]
          id?: string
          org_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          channel?: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          event_type?: Database["public"]["Enums"]["notification_event"]
          id?: string
          org_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          attempts: number
          channel: Database["public"]["Enums"]["notification_channel"]
          created_at: string
          event_type: Database["public"]["Enums"]["notification_event"]
          id: string
          last_error: string | null
          org_id: string
          payload: Json
          recipient: string
          related_appointment_id: string | null
          related_conversation_id: string | null
          related_lead_id: string | null
          scheduled_at: string
          sent_at: string | null
          status: Database["public"]["Enums"]["notification_status"]
          subject: string | null
        }
        Insert: {
          attempts?: number
          channel: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          event_type: Database["public"]["Enums"]["notification_event"]
          id?: string
          last_error?: string | null
          org_id: string
          payload?: Json
          recipient: string
          related_appointment_id?: string | null
          related_conversation_id?: string | null
          related_lead_id?: string | null
          scheduled_at?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          subject?: string | null
        }
        Update: {
          attempts?: number
          channel?: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          event_type?: Database["public"]["Enums"]["notification_event"]
          id?: string
          last_error?: string | null
          org_id?: string
          payload?: Json
          recipient?: string
          related_appointment_id?: string | null
          related_conversation_id?: string | null
          related_lead_id?: string | null
          scheduled_at?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_appointment_id_fkey"
            columns: ["related_appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_conversation_id_fkey"
            columns: ["related_conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_lead_id_fkey"
            columns: ["related_lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          business_hours: Json
          created_at: string
          id: string
          locale: string
          metadata: Json
          name: string
          notify_after_hours: boolean
          notify_appointments: boolean
          notify_channel: Database["public"]["Enums"]["notification_channel"]
          notify_hot_lead: boolean
          owner_contact_email: string | null
          owner_contact_phone: string | null
          plan: Database["public"]["Enums"]["org_plan"]
          plan_status: Database["public"]["Enums"]["org_plan_status"]
          slug: string
          timezone: string
          trial_ends_at: string | null
          updated_at: string
          vertical: Database["public"]["Enums"]["org_vertical"]
        }
        Insert: {
          business_hours?: Json
          created_at?: string
          id?: string
          locale?: string
          metadata?: Json
          name: string
          notify_after_hours?: boolean
          notify_appointments?: boolean
          notify_channel?: Database["public"]["Enums"]["notification_channel"]
          notify_hot_lead?: boolean
          owner_contact_email?: string | null
          owner_contact_phone?: string | null
          plan?: Database["public"]["Enums"]["org_plan"]
          plan_status?: Database["public"]["Enums"]["org_plan_status"]
          slug: string
          timezone?: string
          trial_ends_at?: string | null
          updated_at?: string
          vertical?: Database["public"]["Enums"]["org_vertical"]
        }
        Update: {
          business_hours?: Json
          created_at?: string
          id?: string
          locale?: string
          metadata?: Json
          name?: string
          notify_after_hours?: boolean
          notify_appointments?: boolean
          notify_channel?: Database["public"]["Enums"]["notification_channel"]
          notify_hot_lead?: boolean
          owner_contact_email?: string | null
          owner_contact_phone?: string | null
          plan?: Database["public"]["Enums"]["org_plan"]
          plan_status?: Database["public"]["Enums"]["org_plan_status"]
          slug?: string
          timezone?: string
          trial_ends_at?: string | null
          updated_at?: string
          vertical?: Database["public"]["Enums"]["org_vertical"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          locale: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          created_at: string
          currency: string
          description: string | null
          duration_minutes: number
          id: string
          metadata: Json
          name: string
          org_id: string
          price_cents: number | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          currency?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          metadata?: Json
          name: string
          org_id: string
          price_cents?: number | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          currency?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          metadata?: Json
          name?: string
          org_id?: string
          price_cents?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          created_at: string
          error: string | null
          external_id: string
          id: string
          org_id: string | null
          payload: Json
          processed_at: string | null
          provider: Database["public"]["Enums"]["webhook_provider"]
        }
        Insert: {
          created_at?: string
          error?: string | null
          external_id: string
          id?: string
          org_id?: string | null
          payload: Json
          processed_at?: string | null
          provider: Database["public"]["Enums"]["webhook_provider"]
        }
        Update: {
          created_at?: string
          error?: string | null
          external_id?: string
          id?: string
          org_id?: string | null
          payload?: Json
          processed_at?: string | null
          provider?: Database["public"]["Enums"]["webhook_provider"]
        }
        Relationships: [
          {
            foreignKeyName: "webhook_events_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      append_bot_message: {
        Args: {
          p_conversation_id: string
          p_external_id?: string
          p_text: string
          p_token_usage?: Json
        }
        Returns: string
      }
      bot_book_appointment: {
        Args: {
          p_conversation_id: string
          p_duration_minutes_override?: number
          p_notes?: string
          p_service_query: string
          p_starts_at: string
        }
        Returns: Json
      }
      bot_escalate_conversation: {
        Args: { p_conversation_id: string; p_reason: string }
        Returns: Json
      }
      bot_find_service: {
        Args: { p_org_id: string; p_query: string }
        Returns: string
      }
      bot_has_conflict: {
        Args: {
          p_ends_at: string
          p_ignore_appointment_id?: string
          p_org_id: string
          p_starts_at: string
        }
        Returns: boolean
      }
      bot_qualify_lead: {
        Args: {
          p_conversation_id: string
          p_intent: string
          p_notes?: string
          p_qualification?: Json
          p_temperature: Database["public"]["Enums"]["lead_temperature"]
        }
        Returns: Json
      }
      bot_within_business_hours: {
        Args: { p_ends_at: string; p_org_id: string; p_starts_at: string }
        Returns: boolean
      }
      claim_pending_notifications: {
        Args: { p_batch_size?: number }
        Returns: {
          attempts: number
          channel: Database["public"]["Enums"]["notification_channel"]
          created_at: string
          event_type: Database["public"]["Enums"]["notification_event"]
          id: string
          last_error: string | null
          org_id: string
          payload: Json
          recipient: string
          related_appointment_id: string | null
          related_conversation_id: string | null
          related_lead_id: string | null
          scheduled_at: string
          sent_at: string | null
          status: Database["public"]["Enums"]["notification_status"]
          subject: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "notifications"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      create_organization: {
        Args: {
          p_name: string
          p_owner_email?: string
          p_owner_phone?: string
          p_slug: string
          p_vertical?: Database["public"]["Enums"]["org_vertical"]
        }
        Returns: string
      }
      has_role_in: {
        Args: {
          required_roles: Database["public"]["Enums"]["member_role"][]
          target_org: string
        }
        Returns: boolean
      }
      ingest_widget_message: {
        Args: {
          p_channel_token: string
          p_session_id: string
          p_text: string
          p_visitor_email?: string
          p_visitor_name?: string
          p_visitor_phone?: string
        }
        Returns: string
      }
      is_member: { Args: { target_org: string }; Returns: boolean }
      mark_notification_failed: {
        Args: { p_error: string; p_id: string }
        Returns: undefined
      }
      mark_notification_sent: {
        Args: { p_external_id?: string; p_id: string }
        Returns: undefined
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      submit_agency_lead: {
        Args: {
          p_agency_slug: string
          p_email?: string
          p_message?: string
          p_name: string
          p_phone?: string
          p_sector?: string
        }
        Returns: string
      }
      unaccent: { Args: { "": string }; Returns: string }
    }
    Enums: {
      appointment_creator: "bot" | "agent" | "contact"
      appointment_status:
        | "pending"
        | "confirmed"
        | "cancelled"
        | "completed"
        | "no_show"
        | "rescheduled"
      channel_status: "active" | "pending_verification" | "disabled"
      channel_type: "whatsapp" | "web_widget" | "instagram"
      conversation_status: "open" | "snoozed" | "closed"
      lead_source: "whatsapp" | "web_widget" | "manual" | "phone" | "instagram"
      lead_status: "new" | "contacted" | "qualified" | "converted" | "lost"
      lead_temperature: "cold" | "warm" | "hot"
      member_role: "owner" | "admin" | "agent" | "viewer"
      message_content_type:
        | "text"
        | "image"
        | "audio"
        | "video"
        | "document"
        | "template"
        | "location"
        | "interactive"
        | "sticker"
      message_direction: "inbound" | "outbound"
      message_sender: "contact" | "bot" | "agent" | "system"
      message_status: "queued" | "sent" | "delivered" | "read" | "failed"
      notification_channel: "whatsapp" | "email" | "both" | "none"
      notification_event:
        | "hot_lead_captured"
        | "appointment_booked"
        | "appointment_cancelled"
        | "bot_escalation"
        | "new_message_after_hours"
        | "bot_error"
      notification_status:
        | "queued"
        | "sending"
        | "sent"
        | "delivered"
        | "failed"
      org_plan: "trial" | "starter" | "pro" | "agency"
      org_plan_status:
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "paused"
      org_vertical:
        | "barbershop"
        | "tattoo_studio"
        | "emergency_service"
        | "gym"
        | "other"
      webhook_provider: "meta_whatsapp" | "internal_widget"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      appointment_creator: ["bot", "agent", "contact"],
      appointment_status: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
        "no_show",
        "rescheduled",
      ],
      channel_status: ["active", "pending_verification", "disabled"],
      channel_type: ["whatsapp", "web_widget", "instagram"],
      conversation_status: ["open", "snoozed", "closed"],
      lead_source: ["whatsapp", "web_widget", "manual", "phone", "instagram"],
      lead_status: ["new", "contacted", "qualified", "converted", "lost"],
      lead_temperature: ["cold", "warm", "hot"],
      member_role: ["owner", "admin", "agent", "viewer"],
      message_content_type: [
        "text",
        "image",
        "audio",
        "video",
        "document",
        "template",
        "location",
        "interactive",
        "sticker",
      ],
      message_direction: ["inbound", "outbound"],
      message_sender: ["contact", "bot", "agent", "system"],
      message_status: ["queued", "sent", "delivered", "read", "failed"],
      notification_channel: ["whatsapp", "email", "both", "none"],
      notification_event: [
        "hot_lead_captured",
        "appointment_booked",
        "appointment_cancelled",
        "bot_escalation",
        "new_message_after_hours",
        "bot_error",
      ],
      notification_status: ["queued", "sending", "sent", "delivered", "failed"],
      org_plan: ["trial", "starter", "pro", "agency"],
      org_plan_status: ["trialing", "active", "past_due", "canceled", "paused"],
      org_vertical: [
        "barbershop",
        "tattoo_studio",
        "emergency_service",
        "gym",
        "other",
      ],
      webhook_provider: ["meta_whatsapp", "internal_widget"],
    },
  },
} as const
