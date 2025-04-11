import type { TypeProduct } from './types.interface';

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
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'; // Valores validos para status
}

export interface ProductSendUpdate {
  id: number;
  name: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  productType: number;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'; // Valores validos para status
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
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'; // Valores validos para status  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  productType: TypeProduct;
}

export interface ProductCart {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  quantity: number;
  image_url: string;
}
