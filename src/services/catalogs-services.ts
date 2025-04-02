import type {
  CatalogDeleteResult,
  CatalogResult,
  CatalogSend,
  CatalogSendUpdate,
} from '@/interfaces/catalogs/catalogs.interface';

import type { AxiosInstance } from 'axios';

export class CatalogService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async catalogs(): Promise<CatalogResult> {
    try {
      const response = await this.authBackendClient.get<CatalogResult>(`http://localhost:7000/admin/catalog`);
      console.log('Catalogs response *******:', response); // Log para verificar la respuesta
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

  async catalogsById(id: number): Promise<CatalogResult> {
    try {
      const response = await this.authBackendClient.get<CatalogResult>(`http://localhost:7000/products/${id}`);
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

  async update(data: CatalogSendUpdate): Promise<CatalogResult> {
    try {
      const response = await this.authBackendClient.put<CatalogResult>(`http://localhost:7000/admin/product`, data);
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

  async create(data: CatalogSend): Promise<CatalogResult> {
    try {
      const response = await this.authBackendClient.post<CatalogResult>('http://localhost:7000/admin/product', data);
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

  async delete(catalogId: number): Promise<CatalogDeleteResult> {
    try {
      const response = await this.authBackendClient.delete<{ message: string }>(
        `http://localhost:7000/admin/catalog/${catalogId}`,
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
