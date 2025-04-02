export interface CatalogResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: Catalog[];
}

export interface CatalogDeleteResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
}

export interface Catalog {
  id: number;
  name: string;
  description: string;
  category_level: string;
  is_public: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'; // Valores validos para status
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
  deleted_at?: string | null;
}
export interface CatalogSend {
  name: string;
  description: string;
  category_level: string;
  is_public: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
  start_date: string;
  end_date: string;
}

export interface CatalogSendUpdate {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  category: string;
}
