export interface ProductResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: Product[];
}

export interface ProductDeleteResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
}

export interface ImageURL {
  id: number;
  url: string;
}

export interface ProductSend {
  name: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  productType: number;
}

export interface ProductSendUpdate {
  id: number;
  name: number;
  description: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  productType: number;
  status: string;
  deletedAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  purchase_price: number;
  sale_price: number;
  stock: number;
  ratio: number;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}
