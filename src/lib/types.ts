export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  likes_count?: number;
  is_liked?: boolean;
  is_favorite?: boolean;
}

export interface Review {
  id: string;
  user_name: string;
  message: string;
  created_at: string;
}

export interface CartItem {
  product_id: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  user_id: string | null;
  total_amount: number;
  status: string;
  delivery_address: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}
