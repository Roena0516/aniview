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
      profiles: {
        Row: {
          id: string
          display_name: string
          username: string | null
          avatar_url: string | null
          favorite_anime: string | null
          rating: number
          tier_list_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name: string
          username?: string | null
          avatar_url?: string | null
          favorite_anime?: string | null
          rating?: number
          tier_list_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string
          username?: string | null
          avatar_url?: string | null
          favorite_anime?: string | null
          rating?: number
          tier_list_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      tierlists: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          tiers: Json
          thumbnail: string | null
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          tiers: Json
          thumbnail?: string | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          tiers?: Json
          thumbnail?: string | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Tierlist = Database['public']['Tables']['tierlists']['Row']
export type TierlistInsert = Database['public']['Tables']['tierlists']['Insert']
export type TierlistUpdate = Database['public']['Tables']['tierlists']['Update']
