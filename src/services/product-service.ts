import type {
  ProductCreateResult,
  ProductResult,
  ProductResultFindByID,
  ProductSend,
  ProductSendUpdate,
  ProductUpdateResult,
} from '@/interfaces/products/product.interface';
import type { AxiosInstance } from 'axios';

export class ProductService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async products(): Promise<ProductResult> {
    try {
      const response = await this.authBackendClient.get<ProductResult>(`http://localhost:7000/products`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as any; // Cast a 'any' o un tipo más específico si usas Axios
        return {
          result: false,
          message: 'Error al obtener el producto',
          error: {
            statusCode: axiosError.response?.status || 500,
            key: axiosError.response?.statusText || 'INTERNAL_SERVER_ERROR',
          },
          data: undefined,
        };
      }

      // Manejo genérico para otros tipos de errores
      return {
        result: false,
        message: 'Error desconocido',
        error: {
          statusCode: 500,
          key: 'UNKNOWN_ERROR',
        },
        data: undefined,
      };
    }
  }

  async productsById(id: number): Promise<ProductResultFindByID> {
    try {
      const response = await this.authBackendClient.get<ProductResultFindByID>(`http://localhost:7000/products/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as any; // Cast a 'any' o un tipo más específico si usas Axios
        return {
          result: false,
          message: 'Error al obtener el producto',
          error: {
            statusCode: axiosError.response?.status || 500,
            key: axiosError.response?.statusText || 'INTERNAL_SERVER_ERROR',
          },
          data: undefined,
        };
      }

      // Manejo genérico para otros tipos de errores
      return {
        result: false,
        message: 'Error desconocido',
        error: {
          statusCode: 500,
          key: 'UNKNOWN_ERROR',
        },
        data: undefined,
      };
    }
  }

  async create(data: ProductSend): Promise<ProductCreateResult> {
    try {
      const response = await this.authBackendClient.post<ProductCreateResult>(
        'http://localhost:7000/admin/product',
        data,
      );
      return response.data;
    } catch (error: unknown) {
      console.error('Error al crear producto:', error);
      return {
        result: false,
        message: 'Error al crear el producto',
        error: { statusCode: 500, key: 'INTERNAL_SERVER_ERROR' },
        data: undefined,
      };
    }
  }

  async update(data: ProductSendUpdate): Promise<ProductUpdateResult> {
    try {
      const response = await this.authBackendClient.put<ProductUpdateResult>(
        `http://localhost:7000/admin/product`,
        data,
      );
      return response.data;
    } catch (error: unknown) {
      console.error('Error al actualizar producto:', error);
      return {
        result: false,
        message: 'Error al actualizar el producto',
        error: { statusCode: 500, key: 'INTERNAL_SERVER_ERROR' },
        data: undefined,
      };
    }
  }
}
