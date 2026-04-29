/*
  # Create comercios table and related tables

  1. New Tables
    - `comercios`
      - `id` (text, primary key) - slug identifier
      - `nome` (text, not null)
      - `categoria` (text, FK -> categorias.id)
      - `descricao` (text)
      - `endereco` (text)
      - `telefone` (text)
      - `email` (text, nullable)
      - `website` (text, nullable)
      - `horarios` (text)
      - `avaliacao` (numeric, default 0)
      - `total_avaliacoes` (integer, default 0)
      - `imagem` (text) - main image URL
      - `video` (text, nullable) - video URL
      - `media_type` (text, default 'image') - 'image' | 'video'
      - `instagram` (text, nullable)
      - `facebook` (text, nullable)
      - `whatsapp` (text, nullable)
      - `tipo_anuncio` (text, default 'gratuito') - 'gratuito' | 'pago' | 'pago_promocional'
      - `created_at` (timestamptz)

    - `comercio_galeria`
      - `id` (uuid, primary key)
      - `comercio_id` (text, FK -> comercios.id)
      - `url` (text, not null)
      - `ordem` (integer, default 0)

    - `comercio_especialidades`
      - `id` (uuid, primary key)
      - `comercio_id` (text, FK -> comercios.id)
      - `nome` (text, not null)
      - `ordem` (integer, default 0)

  2. Indexes
    - Index on comercios.categoria for fast filtering by category
    - Index on comercios.tipo_anuncio for filtering by plan

  3. Security
    - Enable RLS on all tables
    - Public read access (directory data is public)
    - No write access for anonymous users
*/

CREATE TABLE IF NOT EXISTS comercios (
  id text PRIMARY KEY,
  nome text NOT NULL,
  categoria text REFERENCES categorias(id) ON DELETE SET NULL,
  descricao text DEFAULT '',
  endereco text DEFAULT '',
  telefone text DEFAULT '',
  email text,
  website text,
  horarios text DEFAULT '',
  avaliacao numeric(3,1) DEFAULT 0,
  total_avaliacoes integer DEFAULT 0,
  imagem text DEFAULT '',
  video text,
  media_type text DEFAULT 'image',
  instagram text,
  facebook text,
  whatsapp text,
  tipo_anuncio text DEFAULT 'gratuito',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS comercios_categoria_idx ON comercios(categoria);
CREATE INDEX IF NOT EXISTS comercios_tipo_anuncio_idx ON comercios(tipo_anuncio);

ALTER TABLE comercios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read comercios"
  ON comercios FOR SELECT
  TO anon, authenticated
  USING (true);

-- Gallery table
CREATE TABLE IF NOT EXISTS comercio_galeria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comercio_id text NOT NULL REFERENCES comercios(id) ON DELETE CASCADE,
  url text NOT NULL,
  ordem integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS comercio_galeria_comercio_idx ON comercio_galeria(comercio_id);

ALTER TABLE comercio_galeria ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read comercio_galeria"
  ON comercio_galeria FOR SELECT
  TO anon, authenticated
  USING (true);

-- Especialidades table
CREATE TABLE IF NOT EXISTS comercio_especialidades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comercio_id text NOT NULL REFERENCES comercios(id) ON DELETE CASCADE,
  nome text NOT NULL,
  ordem integer DEFAULT 0
);

CREATE INDEX IF NOT EXISTS comercio_especialidades_comercio_idx ON comercio_especialidades(comercio_id);

ALTER TABLE comercio_especialidades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read comercio_especialidades"
  ON comercio_especialidades FOR SELECT
  TO anon, authenticated
  USING (true);
