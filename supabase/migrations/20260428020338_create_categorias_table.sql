/*
  # Create categorias table

  1. New Tables
    - `categorias`
      - `id` (text, primary key) - slug identifier like "restaurante", "padaria"
      - `nome` (text, not null) - display name
      - `descricao` (text) - optional description
      - `icone` (text) - lucide icon name
      - `cor` (text) - tailwind color class
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `categorias` table
    - Public read access (directory data is public)
    - No write access for anonymous users
*/

CREATE TABLE IF NOT EXISTS categorias (
  id text PRIMARY KEY,
  nome text NOT NULL,
  descricao text DEFAULT '',
  icone text DEFAULT 'Store',
  cor text DEFAULT 'bg-blue-500',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read categorias"
  ON categorias FOR SELECT
  TO anon, authenticated
  USING (true);
