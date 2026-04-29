import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Read env manually since we're not in Vite context
const envContent = readFileSync('.env', 'utf-8');
const env: Record<string, string> = {};
for (const line of envContent.split('\n')) {
  const [k, v] = line.split('=');
  if (k && v) env[k.trim()] = v.trim();
}

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

// Import data directly
import('../src/data/comercios.js').catch(() => {
  // tsx handles .ts files
}).then(() => {});

async function run() {
  const { categorias, comercios } = await import('../src/data/comercios');

  // Seed categorias
  console.log(`Seeding ${categorias.length} categorias...`);
  const { error: catError } = await supabase.from('categorias').upsert(
    categorias.map((c: any) => ({
      id: c.id,
      nome: c.nome,
      descricao: c.descricao || '',
      icone: c.icone || 'Store',
      cor: c.cor || 'bg-blue-500',
    })),
    { onConflict: 'id' }
  );
  if (catError) console.error('categorias error:', catError.message);
  else console.log('Categorias done!');

  // Seed comercios
  console.log(`Seeding ${comercios.length} comercios...`);
  const comercioRows = comercios.map((c: any) => ({
    id: c.id,
    nome: c.nome,
    categoria: c.categoria || null,
    descricao: c.descricao || '',
    endereco: c.endereco || '',
    telefone: c.telefone || '',
    email: c.email || null,
    website: c.website || null,
    horarios: c.horarios || '',
    avaliacao: c.avaliacao || 0,
    total_avaliacoes: c.totalAvaliacoes || 0,
    imagem: c.imagem || '',
    video: c.video || null,
    media_type: c.mediaType || 'image',
    instagram: c.instagram || null,
    facebook: c.facebook || null,
    whatsapp: c.whatsapp || null,
    tipo_anuncio: c.tipoAnuncio || 'gratuito',
  }));

  const { error: comError } = await supabase.from('comercios').upsert(comercioRows, { onConflict: 'id' });
  if (comError) console.error('comercios error:', comError.message);
  else console.log('Comercios done!');

  // Seed galeria and especialidades
  for (const c of comercios as any[]) {
    if (c.galeria && c.galeria.length > 0) {
      await supabase.from('comercio_galeria').delete().eq('comercio_id', c.id);
      const rows = c.galeria.map((url: string, i: number) => ({ comercio_id: c.id, url, ordem: i }));
      const { error } = await supabase.from('comercio_galeria').insert(rows);
      if (error) console.error(`galeria error for ${c.id}:`, error.message);
    }
    if (c.especialidades && c.especialidades.length > 0) {
      await supabase.from('comercio_especialidades').delete().eq('comercio_id', c.id);
      const rows = c.especialidades.map((nome: string, i: number) => ({ comercio_id: c.id, nome, ordem: i }));
      const { error } = await supabase.from('comercio_especialidades').insert(rows);
      if (error) console.error(`especialidades error for ${c.id}:`, error.message);
    }
  }

  console.log('Seed complete!');
}

run().catch(console.error);
