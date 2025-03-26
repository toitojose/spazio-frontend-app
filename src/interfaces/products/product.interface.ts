export interface ProductResult {
  result: boolean;
  message: string;
  error?: { statusCode: number; key: string } | null;
  data?: Product[];
}

export interface Product {
  id: number;
  name: string;
  imageURL: string;
  description: string;
  precioCompra: number;
  precioVenta: number;
  tipo: string;
  estado: boolean;
  pedidos: number;
  ratio: number;
}
/*Traducir nombres*/
