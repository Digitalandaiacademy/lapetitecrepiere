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
  }
  
  export interface Review {
    id: string;
    user_name: string;
    message: string;
    created_at: string;
  }