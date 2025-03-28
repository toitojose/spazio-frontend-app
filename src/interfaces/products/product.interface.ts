export interface ProductResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: Product[];
}

export interface ProductResultFindByID {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: Product;
}

export interface ProductCreateResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: string;
}

export interface ProductUpdateResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: string;
}

export interface ImageURL {
  id: number;
  url: string;
}

export interface ProductSend {
  name: string;
  imageURL?: ImageURL[];
  resume: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  type: string;
  status: boolean;
}

export interface ProductSendUpdate {
  id: number;
  name: string;
  imageURL?: ImageURL[];
  resume: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  type: string;
  status: boolean;
}

export interface Product {
  id: number;
  name: string;
  imageURL?: ImageURL[];
  resume: string;
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
