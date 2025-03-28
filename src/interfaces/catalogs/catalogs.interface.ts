export interface CatalogResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: Catalog[];
}

export interface CatalogResultFindByID {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: Catalog;
}
export interface Catalog {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  category: string;
}

export interface CatalogSend {
  name: string;
  description: string;
  isPublic: boolean;
  category: string;
}

export interface CatalogCreateResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: string;
}

export interface Catalog {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}