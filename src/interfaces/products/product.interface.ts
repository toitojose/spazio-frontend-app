export interface ProductResult {
    result: boolean;
    message: string;
    error?: { statusCode: number; key: string } | null;
    data?: Product[];
}

export interface Product {
    
    id: number;
    name: string;
    description: string;
    precioCompra: number;
    precioVenta: number;
    stock: number;
    imagen: string;
        
}