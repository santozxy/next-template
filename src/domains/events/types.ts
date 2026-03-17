 

// Apenas afim de exemplificar a estrutura para o template, não necessariamente reflete a estrutura real da API


export interface Address {
  id: string;
  number: string | null;
  street: string | null;
  neighborhood: string | null;
  complement: string | null;
  zipCode: string | null;
  latitude: number;
  longitude: number;
  municipalityId: string;
  municipality: {
    id: string;
    name: string;
  };
}

export interface CreateAddress {
  number?: string | null;
  street?: string | null;
  neighborhood?: string | null;
  zipCode?: string | null;
  latitude: number;
  longitude: number;
  municipalityId: string;
}

export interface Tag {
  id: string;
  name: string;
  category: unknown;
}


 interface Image {
  id: string;
  url: string;
  description: string | null;
}


export interface EventsFilters {
  search?: string;
  municipalityId?: string;
  orderByDate?: "asc" | "desc";
}

export interface Event {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  startDate: string;
  endDate: string;
  typePrice: "free" | "paid";
  address: Address;
  tags: Tag[];
}

export interface CreateEvent {
  name: string;
  description: string;
  coverUrl: string;
  bannerUrl: string | null;
  priceType: PriceType;
  startDate: string;
  endDate: string;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  address: CreateAddress;
  tagsId: string[];
  images: string[];
}

export interface UpdateEvent {
  name: string;
  description: string;
  coverUrl: string;
  bannerUrl: string | null;
  priceType: PriceType;
  startDate: Date;
  endDate: Date;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  address: CreateAddress;
  tagsId: string[];
}

export interface EventDetails extends Event {
  priceType: PriceType;
  bannerUrl: string | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  images: Image[];
}

export enum PriceType {
  free = "free",
  paid = "paid",
}
