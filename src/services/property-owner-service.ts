import { useUserStore } from '@/store/user.ts';
import type { PropertyOwnerClient } from '@/api/PropertyOwnerClient.ts';
import type { PropertyOwnerValidationResult } from '@/interfaces/property-owner/PropertyOwnerValidationResult.interface.ts';
import type { GeneralFormData } from '@/interfaces/User.interface.ts';

export class PropertyOwnerService {
  private propertyOwnerClient: PropertyOwnerClient;

  constructor(propertyOwnerClient: PropertyOwnerClient) {
    this.propertyOwnerClient = propertyOwnerClient;
  }

  async validatePropertyOwner(data: GeneralFormData): Promise<PropertyOwnerValidationResult> {
    const userStore = useUserStore();
    const token = userStore.token;
    if (!token) throw new Error('Token de autenticación no disponible.');
    try {
      const response = await this.propertyOwnerClient.validatePropertyOwner(data, token);

      if (!response.success) {
        return {
          success: false,
          message: response.message,
          error: response.error,
          data: null,
          statusCode: response.statusCode ?? 500,
        };
      }

      return {
        success: true,
        message: response.message,
        error: null,
        data: {
          status: response.data?.status ?? null,
          ownerId: response.data?.ownerId ?? null,
          properties: response.data?.properties ?? [],
        },
        statusCode: response.statusCode ?? 200,
      };
    } catch (error: any) {
      console.error('Error al validar propietario:', error);

      return {
        success: false,
        message: error?.message || 'Ocurrió un error inesperado al validar el propietario.',
        error: {
          key: error?.response?.data?.error?.error || 'UNKNOWN_ERROR',
        },
        data: null,
        statusCode: error?.response?.status || 500,
      };
    }
  }
}
