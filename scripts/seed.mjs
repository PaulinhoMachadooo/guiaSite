import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

// Use service role key if available, fallback to anon key
const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey);

async function seed() {
  console.log('Seeding database from static data...');

  // Dynamically import the data
  const { categorias, comercios } = await import('../src/data/comercios.ts');

  // Seed categorias
  console.log(`Inserting ${categorias.length} categorias...`);
  const { error: catError } = await supabase
    .from('categorias')
    .upsert(categorias.map(c => ({
      id: c.id,
      nome: c.nome,
      descricao: c.descricao || '',
      icone: c.icone || 'Store',
      cor: c.cor || 'bg-blue-500',
    })), { onConflict: 'id' });

  if (catError) {
    console.error('Error seeding categorias:', catError);
  } else {
    console.log('Categorias seeded!');
  }

  // Seed comercios
  console.log(`Inserting ${comercios.length} comercios...`);
  for (const c of comercios) {
    const { error: comError } = await supabase
      .from('comercios')
      .upsert({
        id: c.id,
        nome: c.nome,
        categoria: c.categoria,
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
      }, { onConflict: 'id' });

    if (comError) {
      console.error(`Error seeding comercio ${c.id}:`, comError);
      continue;
    }

    // Seed galeria
    if (c.galeria && c.galeria.length > 0) {
      // Delete existing galeria first to avoid duplicates
      await supabase.from('comercio_galeria').delete().eq('comercio_id', c.id);
      const galeriaRows = c.galeria.map((url, i) => ({
        comercio_id: c.id,
        url,
        ordem: i,
      }));
      const { error: galError } = await supabase.from('comercio_galeria').insert(galeriaRows);
      if (galError) console.error(`Error seeding galeria for ${c.id}:`, galError);
    }

    // Seed especialidades
    if (c.especialidades && c.especialidades.length > 0) {
      await supabase.from('comercio_especialidades').delete().eq('comercio_id', c.id);
      const espRows = c.especialidades.map((nome, i) => ({
        comercio_id: c.id,
        nome,
        ordem: i,
      }));
      const { error: espError } = await supabase.from('comercio_especialidades').insert(espRows);
      if (espError) console.error(`Error seeding especialidades for ${c.id}:`, espError);
    }
  }

  console.log('Seed complete!');
}

seed().catch(console.error);
