import { useUserStore } from '@/store/user.ts';
import type { PropertyOwnerClient } from '@/api/PropertyOwnerClient.ts';
import type { PropertyOwnerValidationResult } from '@/interfaces/property-owner/PropertyOwnerValidationResult.interface.ts';
import type { GeneralFormData, UserCreationResult } from '@/interfaces/User.interface.ts';

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

      return {
        success: response.success,
        message: response.message,
        error: response.error ?? null,
        data:
          response.success && response.data
            ? {
                status: response.data.status,
                properties: response.data.properties ?? [],
              }
            : null,
        statusCode: response.statusCode ?? 500,
      };
    } catch (error: any) {
      console.error('Error al validar el propietario:', error);
      return {
        success: false,
        message: 'Error al validar el propietario',
        error: {
          key: error.response?.data?.error?.key || 'UNKNOWN_ERROR',
        },
        data: null,
        statusCode: error.response?.status || 500,
      };
    }
  }

  async createPropertyOwner(propertyOwner: GeneralFormData): Promise<UserCreationResult> {
    try {
      return await this.propertyOwnerClient.createPropertyOwner(propertyOwner);
    } catch (error: any) {
      console.error('Error al registrar propietario:', error);
      return {
        result: false,
        message: 'Error al registrar propietario',
        error: {
          statusCode: error.response?.status || 500,
          key: error.response?.data?.error || 'UNKNOWN_ERROR',
        },
      };
    }
  }
}
