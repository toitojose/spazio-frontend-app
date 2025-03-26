export interface ProductResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: Product[];
}

export interface ProductCreateResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: string;
}

export interface ProductSend {
  name: string;
  imageURL: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  type: string;
  status: boolean;
}

export interface Product {
  id: number;
  name: string;
  imageURL: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  type: string;
  status: boolean;
  orders: number;
  ratio: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
