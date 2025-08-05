-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL, -- Price in FCFA
    category VARCHAR(100) NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table
CREATE TABLE user_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    whatsapp_number VARCHAR(20),
    location VARCHAR(255) NOT NULL,
    exact_address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table
CREATE TABLE cart_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Orders table
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    total_amount INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'delivered', 'cancelled')),
    payment_method VARCHAR(20) CHECK (payment_method IN ('cash_on_delivery', 'online')),
    delivery_address TEXT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price INTEGER NOT NULL, -- Price at time of order
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product likes table
CREATE TABLE product_likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Product views table
CREATE TABLE product_views (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments table
CREATE TABLE comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_cart_items_user ON cart_items(user_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_product_likes_user ON product_likes(user_id);
CREATE INDEX idx_product_likes_product ON product_likes(product_id);
CREATE INDEX idx_product_views_product ON product_views(product_id);
CREATE INDEX idx_comments_product ON comments(product_id);

-- Insert sample categories
INSERT INTO categories (name, description, image_url) VALUES
('Crêpes', 'Délicieuses crêpes préparées avec amour', 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500'),
('Burgers & Snacks', 'Burgers savoureux et snacks rapides', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'),
('Boissons', 'Boissons fraîches et rafraîchissantes', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500');

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, is_featured, stock_quantity) VALUES
-- Crêpes
('12 Crêpes Nature', '12 délicieuses crêpes nature, parfaites pour le petit-déjeuner', 2000, 'Crêpes', 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500', true, 50),
('12 Crêpes Tartina', '12 crêpes garnies de pâte à tartiner au choix', 3000, 'Crêpes', 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500', false, 30),
('12 Crêpes Nutella', '12 crêpes généreusement garnies de Nutella', 4000, 'Crêpes', 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500', true, 25),
('5 Crêpes Viande Hachée', '5 crêpes garnies de viande hachée savoureuse', 3000, 'Crêpes', 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500', false, 20),
('5 Crêpes Fromage & Viande', '5 crêpes avec fromage fondant et viande hachée', 5000, 'Crêpes', 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500', false, 15),
('5 Crêpes Jambon & Fromage', '5 crêpes garnies de jambon et fromage', 5000, 'Crêpes', 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500', true, 20),

-- Burgers & Snacks
('Burger Classique', 'Burger avec pain frais, steak juteux et légumes croquants', 1000, 'Burgers & Snacks', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', true, 40),
('Shawarma', 'Shawarma traditionnel avec viande tendre et sauce spéciale', 1000, 'Burgers & Snacks', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', false, 35),
('Salade de Crudité', 'Salade fraîche avec légumes de saison', 1000, 'Burgers & Snacks', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500', false, 25),
('Salade de Fruit', 'Salade de fruits frais et colorés', 500, 'Burgers & Snacks', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500', false, 30),

-- Boissons
('Jus de Baobab', 'Jus naturel de baobab 250ml, riche en vitamines', 500, 'Boissons', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500', true, 100),
('Jus de Bissap', 'Jus de bissap (foléré) 0.5L, rafraîchissant et savoureux', 500, 'Boissons', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500', false, 80);
