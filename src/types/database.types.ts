
/**
 * Type definitions for Supabase database schema
 * Generated from Supabase CLI (supabase gen types typescript)
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'user'
          plan: 'free' | 'premium' | null
          status: 'active' | 'paused' | 'deleted'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'user'
          plan?: 'free' | 'premium' | null
          status?: 'active' | 'paused' | 'deleted'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'user'
          plan?: 'free' | 'premium' | null
          status?: 'active' | 'paused' | 'deleted'
          created_at?: string
        }
      }
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type NewUser = Database['public']['Tables']['users']['Insert'] 
export type UpdateUser = Database['public']['Tables']['users']['Update']
