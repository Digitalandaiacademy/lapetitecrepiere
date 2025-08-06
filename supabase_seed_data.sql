-- Seed data for modern-reviews component
-- Insert sample reviews with ratings

INSERT INTO public.reviews (id, user_name, message, rating, created_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Marie Dupont', 'Les crêpes sont délicieuses ! Service impeccable et ambiance chaleureuse. Je recommande vivement !', 5, '2024-01-15 10:30:00+00'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Jean Martin', 'Très bonne expérience, le personnel est très accueillant. Les crêpes au chocolat sont à tomber !', 4, '2024-01-16 14:20:00+00'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Sophie Bernard', 'Ambiance cosy et crêpes savoureuses. Un peu d''attente mais ça vaut le coup !', 4, '2024-01-17 09:15:00+00'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Pierre Leroy', 'Excellente découverte ! Les crêpes bretonnes sont authentiques et délicieuses.', 5, '2024-01-18 16:45:00+00'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Claire Petit', 'Un vrai plaisir ! Le café accompagne parfaitement les crêpes. Service rapide et souriant.', 5, '2024-01-19 11:30:00+00'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Lucas Moreau', 'Très bon rapport qualité-prix. Les crêpes sont généreuses et bien garnies.', 4, '2024-01-20 13:00:00+00'),
  ('550e8400-e29b-41d4-a716-446655440007', 'Emma Rousseau', 'Décor charmant et crêpes excellentes. J''ai adoré la crêpe complète !', 5, '2024-01-21 15:30:00+00'),
  ('550e8400-e29b-41d4-a716-446655440008', 'Antoine Dubois', 'Première visite et je suis conquis ! Le service est top et les crêpes fondantes.', 5, '2024-01-22 12:15:00+00');

-- Insert sample products for featured display
INSERT INTO public.products (id, name, description, price, category, image_url, is_featured, stock_quantity) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Crêpe Complète', 'Crêpe garnie de jambon, fromage et œuf', 2500, 'Sucrée', 'https://images.unsplash.com/photo-1574368862964-86b9c1e6c1f7?w=500', true, 50),
  ('660e8400-e29b-41d4-a716-446655440002', 'Crêpe Nutella', 'Crêpe au Nutella avec banane', 2000, 'Sucrée', 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500', true, 30),
  ('660e8400-e29b-41d4-a716-446655440003', 'Crêpe Salée Jambon Fromage', 'Crêpe salée garnie de jambon et fromage', 2800, 'Salée', 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500', true, 40),
  ('660e8400-e29b-41d4-a716-446655440004', 'Crêpe Suzette', 'Crêpe flambée au Grand Marnier', 3500, 'Sucrée', 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500', true, 20),
  ('660e8400-e29b-41d4-a716-446655440005', 'Crêpe Forestière', 'Crêpe aux champignons et crème', 3000, 'Salée', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500', true, 35),
  ('660e8400-e29b-41d4-a716-446655440006', 'Crêpe Caramel Beurre Salé', 'Crêpe avec caramel maison', 2200, 'Sucrée', 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500', true, 25);

-- Insert sample categories
INSERT INTO public.categories (id, name, description, image_url) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'Crêpes Sucrées', 'Délicieuses crêpes sucrées pour tous les goûts', 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500'),
  ('770e8400-e29b-41d4-a716-446655440002', 'Crêpes Salées', 'Crêpes salées garnies pour les repas', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500'),
  ('770e8400-e29b-41d4-a716-446655440003', 'Boissons', 'Cafés, thés et jus frais', 'https://images.unsplash.com/photo-1514432324607-a08d5309d4ff?w=500');
