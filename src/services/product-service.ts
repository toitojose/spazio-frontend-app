import type { AxiosInstance } from 'axios';
import type { ProductResult } from '@/interfaces/products/product.interface';

const productosEjemplo: ProductResult = {
    result: true,
    message: "Ninguno",
    error: null,
    data: [
      {
        id: 1,
        name: 'Laptop HP Pavilion',
        imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        description: 'Laptop HP Pavilion con procesador Intel Core i5, 8GB RAM, SSD 256GB',
        precioCompra: 450.00,
        precioVenta: 699.99,
        stock: 15
      },
      {
        id: 2,
        name: 'Monitor Dell 24"',
        imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
        description: 'Monitor Dell de 24 pulgadas, resolución Full HD, 144Hz',
        precioCompra: 180.00,
        precioVenta: 249.99,
        stock: 20
      },
      {
        id: 3,
        name: 'Teclado Mecánico RGB',
        imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        description: 'Teclado mecánico con switches Cherry MX, retroiluminación RGB',
        precioCompra: 45.00,
        precioVenta: 79.99,
        stock: 30
      },
      {
        id: 4,
        name: 'Mouse Gaming',
        imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
        description: 'Mouse gaming con sensor óptico de alta precisión, 6 botones programables',
        precioCompra: 25.00,
        precioVenta: 49.99,
        stock: 25
      },
      {
        id: 5,
        name: 'Auriculares Bluetooth',
        imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        description: 'Auriculares inalámbricos con cancelación de ruido activa',
        precioCompra: 60.00,
        precioVenta: 99.99,
        stock: 18
      }
    ],
}



export class ProductService {
  /*private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }*/

    

  async products(): Promise<ProductResult> {
    /*const response = await this.authBackendClient.post<LoginResult>('/v1.0/products', {
      email,
      password,
    });*/
    return productosEjemplo;
  }
}
