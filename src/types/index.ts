export interface Comercio {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  endereco: string;
  telefone: string;
  email?: string;
  website?: string;
  horarios: string;
  avaliacao: number;
  totalAvaliacoes: number;
  imagem: string;
  video?: string;
  mediaType?: "image" | "video";
  galeria?: string[];
  especialidades?: string[];
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  tipoAnuncio: "gratuito" | "pago" | "pago_promocional";
}

export interface Categoria {
  id: string;
  nome: string;
}
