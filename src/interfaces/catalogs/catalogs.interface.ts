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
  products: number[];
  deleted_at?: string | null;
}
export interface CatalogSend {
  name: string;
  description: string;
  categoryLevel: number;
  isPublic: boolean;
  startDate: string;
  endDate: string;
  products: number[];
}

export interface CatalogSendUpdate {
  name: string;
  description: string;
  categoryLevel: number;
  isPublic: boolean;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
}

export interface CatalogSendUpdateProducts {
  name: string;
  description: string;
  categoryLevel: number;
  isPublic: boolean;
  startDate: string;
  endDate: string;
  products: number[];
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
}