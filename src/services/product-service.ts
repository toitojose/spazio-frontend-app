import type {
  ProductResult,
  ProductSend,
  ProductDeleteResult,
  ProductSendUpdate,
  Product,
} from '@/interfaces/products/product.interface';
import type { AxiosInstance } from 'axios';
import { useUserStore } from '@/store/user.ts';
const userStore = useUserStore();

export class ProductService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async products(): Promise<ProductResult> {
    try {
      const response = await this.authBackendClient.get<Product[]>(`http://localhost:7000/products`, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      return {
        result: true,
        message: 'Success',
        data: response.data,
      };
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

  async productsById(id: number): Promise<ProductResult> {
    try {
      const response = await this.authBackendClient.get<Product[]>(`http://localhost:7000/products/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      return {
        result: true,
        message: 'Success',
        data: response.data,
      };
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

  async create(data: ProductSend): Promise<ProductResult> {
    try {
      const response = await this.authBackendClient.post<Product>('http://localhost:7000/admin/product', data, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      return {
        result: true,
        message: 'Success',
        data: [response.data],
      };
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

  async update(data: ProductSendUpdate): Promise<ProductResult> {
    try {
      const response = await this.authBackendClient.put<Product>(`http://localhost:7000/admin/product`, data, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      return {
        result: true,
        message: 'Success',
        data: [response.data],
      };
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

  async delete(productId: number): Promise<ProductDeleteResult> {
    try {
      const response = await this.authBackendClient.delete<{ message: string }>(
        `http://localhost:7000/admin/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        },
      );

      return {
        result: true,
        message: response.data.message, // Tomamos el mensaje del backend
        error: null,
      };
    } catch (error: unknown) {
      console.error('Error al eliminar producto:', error);

      return {
        result: false,
        message: 'Error al eliminar el producto',
        error: { statusCode: 500, key: 'INTERNAL_SERVER_ERROR' },
      };
    }
  }
}
