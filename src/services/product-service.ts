import type { ProductCreateResult, ProductResult, ProductSend } from '@/interfaces/products/product.interface';
import type { AxiosInstance } from 'axios';

let resultadoCreate: ProductCreateResult = {
  result: true,
  message: 'Exito',
  error: undefined,
  data: '',
};

const productosEjemplo: ProductResult = {
  result: true,
  message: 'Ninguno',
  error: null,
  data: [
    {
      id: 1,
      name: 'Laptop HP Pavilion',
      imageURL: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
      description: 'Laptop HP Pavilion con procesador Intel Core i5, 8GB RAM, SSD 256GB',
      purchasePrice: 450.0,
      salePrice: 699.99,
      type: 'General',
      status: true,
      orders: 0,
      ratio: 55.55,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Monitor Dell 24"',
      imageURL: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
      description: 'Monitor Dell de 24 pulgadas, resolución Full HD, 144Hz',
      purchasePrice: 180.0,
      salePrice: 249.99,
      type: 'General',
      status: true,
      orders: 0,
      ratio: 38.88,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Teclado Mecánico RGB',
      imageURL: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
      description: 'Teclado mecánico con switches Cherry MX, retroiluminación RGB',
      purchasePrice: 45.0,
      salePrice: 79.99,
      type: 'General',
      status: false,
      orders: 0,
      ratio: 77.76,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'Mouse Gaming',
      imageURL: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
      description: 'Mouse gaming con sensor óptico de alta precisión, 6 botones programables',
      purchasePrice: 25.0,
      salePrice: 49.99,
      type: 'General',
      status: true,
      orders: 0,
      ratio: 99.96,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 5,
      name: 'Auriculares Bluetooth',
      imageURL: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      description: 'Auriculares inalámbricos con cancelación de ruido activa',
      purchasePrice: 60.0,
      salePrice: 99.99,
      type: 'General',
      status: false,
      orders: 0,
      ratio: 66.65,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

export class ProductService {
  async products(): Promise<ProductResult> {
    return productosEjemplo;
  }
}

export class CreateProductService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async create(data: ProductSend): Promise<ProductCreateResult> {
    /*const response = await this.authBackendClient.post<ProductResult>('/v1.0/products', {
      data,
    });
    return response.data;*/
    resultadoCreate.data = data.name;
    return resultadoCreate;
  }
}
