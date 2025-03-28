import type {
  Product,
  ProductCreateResult,
  ProductResult,
  ProductResultFindByID,
  ProductSend,
  ProductSendUpdate,
  ProductUpdateResult,
} from '@/interfaces/products/product.interface';
import type { AxiosInstance } from 'axios';

let resultadoCreate: ProductCreateResult = {
  result: true,
  message: 'Exito',
  error: undefined,
  data: '',
};

let resultadoUpdate: ProductUpdateResult = {
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
      imageURL: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        },
      ],
      resume: 'Laptop HP Pavilion con procesador Intel Core i5, 8GB RAM, SSD 256GB',
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
      imageURL: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
        },
      ],
      resume: 'Monitor Dell de 24 pulgadas, resolución Full HD, 144Hz',
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
      imageURL: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        },
      ],
      resume: 'Teclado mecánico con switches Cherry MX, retroiluminación RGB',
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
      imageURL: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
        },
      ],
      resume: 'Mouse gaming con sensor óptico de alta precisión, 6 botones programables',
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
      imageURL: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        },
      ],
      resume: 'Auriculares inalámbricos con cancelación de ruido activa',
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
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async products(): Promise<ProductResult> {
    return productosEjemplo;
  }

  async productsById(id: number): Promise<ProductResultFindByID> {
    const data: Product[] | undefined = productosEjemplo.data;
    let result: ProductResultFindByID = {
      result: false,
      message: 'Ninguno',
      error: { statusCode: 400, key: 'No se encontro' },
      data: undefined,
    };
    if (data) {
      for (let dato of data) {
        if (dato.id == id) {
          result = {
            result: true,
            message: 'Ninguno',
            error: null,
            data: dato,
          };
        }
      }
    }
    return result;
  }

  async create(data: ProductSend): Promise<ProductCreateResult> {
    /*const response = await this.authBackendClient.post<ProductResult>('/v1.0/products', {
      data,
    });
    return response.data;*/
    resultadoCreate.data = data.name;
    return resultadoCreate;
  }

  async update(data: ProductSendUpdate): Promise<ProductUpdateResult> {
    /*const response = await this.authBackendClient.post<ProductResult>('/v1.0/products', {
      data,
    });
    return response.data;*/
    resultadoUpdate.data = data.name;
    return resultadoUpdate;
  }
}
