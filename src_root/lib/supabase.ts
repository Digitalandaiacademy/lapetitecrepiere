import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  is_featured: boolean
  stock_quantity: number
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  name: string
  description: string
  image_url: string
  created_at: string
}

export type CartItem = {
  id: string
  product_id: string
  quantity: number
  user_id?: string
  created_at: string
}

export type Order = {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'processing' | 'delivered' | 'cancelled'
  payment_method: 'cash_on_delivery' | 'online'
  delivery_address: string
  phone_number: string
  notes?: string
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export type UserProfile = {
  id: string
  email: string
  first_name: string
  last_name: string
  phone_number: string
  whatsapp_number?: string
  location: string
  exact_address: string
  created_at: string
  updated_at: string
}

export type ProductLike = {
  id: string
  user_id: string
  product_id: string
  created_at: string
}

export type ProductView = {
  id: string
  product_id: string
  user_id?: string
  session_id: string
  created_at: string
}

export type Comment = {
  id: string
  product_id: string
  user_id: string
  user_name: string
  message: string
  created_at: string
}
