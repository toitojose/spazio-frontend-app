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
    const response = await this.propertyOwnerClient.validatePropertyOwner(data, token);

    if (!response.success) {
      throw {
        success: false,
        message: 'Error al validar el propietario',
        error: {
          key: response.error?.data?.error?.key || 'UNKNOWN_ERROR',
        },
        data: null,
        statusCode: response.error?.status || 500,
      };
    }
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
  }
}
