export interface CatalogResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: Catalog[];
}

export interface Catalog {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  category: string;
}
