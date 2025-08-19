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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string
          current_balance: number | null
          id: string
          name: string
          org_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          current_balance?: number | null
          id?: string
          name: string
          org_id: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          current_balance?: number | null
          id?: string
          name?: string
          org_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_logs: {
        Row: {
          amount: number | null
          created_at: string
          id: string
          kind: string
          message: string
          org_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: string
          kind: string
          message: string
          org_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: string
          kind?: string
          message?: string
          org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      bills: {
        Row: {
          board: string
          category_id: string | null
          contact_id: string | null
          created_at: string
          description: string
          due_date: string
          external_ref: string | null
          file_url: string | null
          id: string
          installments: number | null
          notes: string | null
          org_id: string
          status: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          board: string
          category_id?: string | null
          contact_id?: string | null
          created_at?: string
          description: string
          due_date: string
          external_ref?: string | null
          file_url?: string | null
          id?: string
          installments?: number | null
          notes?: string | null
          org_id: string
          status: string
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          board?: string
          category_id?: string | null
          contact_id?: string | null
          created_at?: string
          description?: string
          due_date?: string
          external_ref?: string | null
          file_url?: string | null
          id?: string
          installments?: number | null
          notes?: string | null
          org_id?: string
          status?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bills_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bills_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_events: {
        Row: {
          created_at: string
          datetime: string
          id: string
          link_transaction: string | null
          notes: string | null
          org_id: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          datetime: string
          id?: string
          link_transaction?: string | null
          notes?: string | null
          org_id: string
          title: string
          type: string
        }
        Update: {
          created_at?: string
          datetime?: string
          id?: string
          link_transaction?: string | null
          notes?: string | null
          org_id?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_link_transaction_fkey"
            columns: ["link_transaction"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          kind: string
          name: string
          org_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          name: string
          org_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          name?: string
          org_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          address: string | null
          city: string | null
          cnpj: string | null
          created_at: string
          email: string | null
          external_id: string | null
          id: string
          name: string
          org_id: string
          phone: string | null
          state: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          created_at?: string
          email?: string | null
          external_id?: string | null
          id?: string
          name: string
          org_id: string
          phone?: string | null
          state?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          created_at?: string
          email?: string | null
          external_id?: string | null
          id?: string
          name?: string
          org_id?: string
          phone?: string | null
          state?: string | null
          type?: string
          updated_at?: string | null
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
      integrations: {
        Row: {
          created_at: string
          id: string
          last_sync_at: string | null
          org_id: string
          provider: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_sync_at?: string | null
          org_id: string
          provider: string
          status: string
        }
        Update: {
          created_at?: string
          id?: string
          last_sync_at?: string | null
          org_id?: string
          provider?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrations_org_id_fkey"
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
          org_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          org_id: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          org_id?: string
          role?: string
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
      organizations: {
        Row: {
          cnpj: string | null
          created_at: string
          id: string
          name: string
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          cnpj?: string | null
          created_at?: string
          id?: string
          name: string
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          cnpj?: string | null
          created_at?: string
          id?: string
          name?: string
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      SQL: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      transactions: {
        Row: {
          account_id: string | null
          amount_gross: number
          amount_net: number | null
          category_id: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          date: string
          description: string
          external_ref: string | null
          fees: number | null
          id: string
          kind: string
          org_id: string
          platform: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          amount_gross: number
          amount_net?: number | null
          category_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          date: string
          description: string
          external_ref?: string | null
          fees?: number | null
          id?: string
          kind: string
          org_id: string
          platform?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          amount_gross?: number
          amount_net?: number | null
          category_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string
          external_ref?: string | null
          fees?: number | null
          id?: string
          kind?: string
          org_id?: string
          platform?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_org_id_fkey"
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
