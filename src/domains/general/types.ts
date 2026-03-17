export interface Image {
  id: string;
  url: string;
  description: string | null;
}

export interface CreateImage {
  url: string;
  description?: string | null;
}
