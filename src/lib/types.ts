export type IconName =
  | "carrot"
  | "sprout"
  | "utensils"
  | "cooking"
  | "palette"
  | "flower"
  | "fish"
  | "watch"
  | "paw"
  | "moon"
  | "party"
  | "gift"
  | "citrus"
  | "leaf"
  | "apple"
  | "star"
  | "calendar"
  | "tag"
  | "heart"
  | "bookmark"
  | "basket"
  | "cart"
  | "store"
  | "search-x"
  | "sparkles"
  | "hand"
  | "folder"
  | "burger"
  | "strawberry"
  | "search";

export type Weekday = "Dom" | "Seg" | "Ter" | "Qua" | "Qui" | "Sex" | "Sáb";

export type CategoryId =
  | "gastronomica"
  | "artesanal"
  | "organica"
  | "mista"
  | "noturna"
  | "flores"
  | "antiguidades";

export type StatusFeira = "aberta" | "quase" | "fechada" | "futura";

export interface Category {
  id: CategoryId;
  label: string;
  icon: IconName;
}

export interface Feira {
  id: string;
  nome: string;
  bairro: string;
  cidade: string;
  tags: string[]; // rótulos exibidos (ex.: "Artesanato", "Mista")
  categorias: CategoryId[]; // para filtro
  status: StatusFeira;
  statusLabel: string; // "Aberta até 14h00", "Encerra às 16h00", "Abre hoje às 18h00"
  horario: string;
  dias: Weekday[];
  periodo: "dia" | "noite";
  distanciaKm: number;
  tempo: string; // "~5 min de carro"
  nota: number;
  avaliacoes: number;
  bancas: number;
  descricao: string;
  endereco: string;
  prefeituraUrl: string;
  foto: string;
  icon: IconName;
  mapX: number;
  mapY: number;
  especial?: boolean;
}

export interface Feirante {
  id: string;
  nome: string;
  feiraId: string;
  categoria: CategoryId;
  produtos: string[];
  nota: number;
  icon: IconName;
}

export interface Evento {
  id: string;
  nome: string;
  data: string; // ISO
  tipo: "feira" | "celebracao";
  local: string;
  icon: IconName;
}

export interface Pasta {
  id: string;
  nome: string;
  icon: IconName;
}
