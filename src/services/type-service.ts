import type { TypeResult, Type } from '@/interfaces/products/types.interface';
import type { Product, ProductResult } from '@/interfaces/products/product.interface';
import type { AxiosInstance } from 'axios';
import { useUserStore } from '@/store/user.ts';
const userStore = useUserStore();

export class TypeService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async getTypes(): Promise<TypeResult> {
    try {
      const response = await this.authBackendClient.get<Type[]>(`http://localhost:7000/products/types`);
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
          message: 'Error al obtener los tipos de producto',
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

  async getProductsByTypeId(id: number): Promise<ProductResult> {
    try {
      const response = await this.authBackendClient.get<Product[]>(`http://localhost:7000/products/type/${id}`, {
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
}
