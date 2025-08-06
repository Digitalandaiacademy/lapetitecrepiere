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
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          image_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          image_url?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          category: string
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          category: string
          image_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          category?: string
          image_url?: string | null
        }
      }
      product_likes: {
        Row: {
          id: string
          product_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string
        }
      }
      favorites: {
        Row: {
          id: string
          product_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string
        }
      }
      comments: {
        Row: {
          id: string
          product_id: string
          user_id: string | null
          user_name: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id?: string | null
          user_name: string
          message: string
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string | null
          user_name?: string
          message?: string
        }
      }
      product_views: {
        Row: {
          id: string
          product_id: string
          user_id: string | null
          session_id: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id?: string | null
          session_id: string
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string | null
          session_id?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string | null
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          product_id: string
          quantity: number
        }
        Update: {
          id?: string
          user_id?: string | null
          product_id?: string
          quantity?: number
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          total_amount: number
          status: string
          delivery_address: string
          payment_method: string
          payment_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          total_amount: number
          status?: string
          delivery_address: string
          payment_method: string
          payment_status?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          total_amount?: number
          status?: string
          delivery_address?: string
          payment_method?: string
          payment_status?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
        }
      }
    }
  }
}
