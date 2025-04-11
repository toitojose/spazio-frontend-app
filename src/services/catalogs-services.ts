import type {
  Catalog,
  CatalogDeleteResult,
  CatalogResult,
  CatalogSend,
  CatalogSendUpdate,
  CatalogSendUpdateProducts,
} from '@/interfaces/catalogs/catalogs.interface';

import type { AxiosInstance } from 'axios';
import { useUserStore } from '@/store/user.ts';

const userStore = useUserStore();

export class CatalogService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async catalogs(): Promise<CatalogResult> {
    try {
      const response = await this.authBackendClient.get<Catalog[]>(`http://localhost:7000/admin/catalog`, {
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
          message: 'Error al obtener el catalogo',
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
      const response = await this.authBackendClient.get<Catalog[]>(`http://localhost:7000/admin/catalog/${id}`, {
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
          message: 'Error al obtener el catalogo',
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

  async update(data: CatalogSendUpdate, catalogId: number): Promise<CatalogResult> {
    try {
      const response = await this.authBackendClient.put<Catalog>(
        `http://localhost:7000/admin/catalog/${catalogId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        },
      );
      return {
        result: true,
        message: 'Success',
        data: [response.data],
      };
    } catch (error: unknown) {
      console.error('Error al actualizar catalogo:', error);
      return {
        result: false,
        message: 'Error al actualizar el catalogo',
        error: { statusCode: 500, key: 'INTERNAL_SERVER_ERROR' },
        data: undefined,
      };
    }
  }

  async updateProducts(data: CatalogSendUpdateProducts, catalogId: number): Promise<CatalogResult> {
    try {
      const response = await this.authBackendClient.put<Catalog>(
        `http://localhost:7000/admin/catalog/${catalogId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        },
      );
      return {
        result: true,
        message: 'Success',
        data: [response.data],
      };
    } catch (error: unknown) {
      console.error('Error al actualizar catalogo:', error);
      return {
        result: false,
        message: 'Error al actualizar productos del catalogo',
        error: { statusCode: 500, key: 'INTERNAL_SERVER_ERROR' },
        data: undefined,
      };
    }
  }

  async create(data: CatalogSend): Promise<CatalogResult> {
    try {
      const response = await this.authBackendClient.post<Catalog>('http://localhost:7000/admin/catalog', data, {
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
      console.error('Error al crear el catalogo:', error);
      return {
        result: false,
        message: 'Error al crear el catalogo',
        error: { statusCode: 500, key: 'INTERNAL_SERVER_ERROR' },
        data: undefined,
      };
    }
  }

  async delete(catalogId: number): Promise<CatalogDeleteResult> {
    try {
      const response = await this.authBackendClient.delete<{ message: string }>(
        `http://localhost:7000/admin/catalog/${catalogId}`,
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
      console.error('Error al eliminar catalogo:', error);

      return {
        result: false,
        message: 'Error al eliminar el catalogo',
        error: { statusCode: 500, key: 'INTERNAL_SERVER_ERROR' },
      };
    }
  }
}
