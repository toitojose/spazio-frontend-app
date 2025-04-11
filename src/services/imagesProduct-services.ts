import type { ImageResult } from '@/interfaces/products/imagesProduct.interface';
import type { AxiosInstance } from 'axios';
import { useUserStore } from '@/store/user.ts';
const userStore = useUserStore();
export class ImageService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async getImages(productId: number): Promise<ImageResult> {
    try {
      const response = await this.authBackendClient.get<string[]>(`http://localhost:7000/products/${productId}/photos`);
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
          message: 'Error al obtener las imagenes',
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

  async uploadImages(productId: number, files: File[]): Promise<ImageResult> {
    const uploadedImages: any[] = [];
    console.log('Entra por aca'), files;

    try {
      for (const file of files) {
        console.log('📤 Subiendo archivo:', file);
        if (!file || file.size === 0 || !file.type.startsWith('image/')) continue;

        const formData = new FormData();
        formData.append('file', file); // 👈 nombre exacto que espera el backend

        const response = await this.authBackendClient.post(
          `http://localhost:7000/products/${productId}/upload-photo`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${userStore.token}`,
            },
          },
        );

        uploadedImages.push(response.data);
      }

      return {
        result: true,
        message: 'Todas las imágenes fueron subidas exitosamente',
        data: uploadedImages,
      };
    } catch (error: unknown) {
      console.error('❌ Error al subir imagen:', error);
      return this.handleError(error, 'Error subiendo una o más imágenes');
    }
  }

  private handleError(error: unknown, defaultMessage: string): ImageResult {
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as any;
      return {
        result: false,
        message: defaultMessage,
        error: {
          statusCode: axiosError.response?.status || 500,
          key: axiosError.response?.statusText || 'INTERNAL_SERVER_ERROR',
        },
        data: undefined,
      };
    }

    return {
      result: false,
      message: defaultMessage,
      error: {
        statusCode: 500,
        key: 'UNKNOWN_ERROR',
      },
      data: undefined,
    };
  }
}
