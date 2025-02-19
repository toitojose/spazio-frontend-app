import type { AxiosInstance } from 'axios';
import type { PropertyOwnerValidationResult } from '@/interfaces/property-owner-validation-result.interface.ts';
import type { PropertyOwnersValidationStatus } from '@/enums/property-owners-validation-status.enum.ts';
import type { GeneralFormData } from '@/interfaces/user.interface.ts';

export class PropertyOwnerService {
  private backendClient: AxiosInstance;

  constructor(backendClient: AxiosInstance) {
    this.backendClient = backendClient;
  }
  /**
   * Busca un propietario basado en los criterios proporcionados.
   * Simula una respuesta del backend para manejar la lógica del semáforo.
   */
  async validatePropertyOwner(data: any): Promise<PropertyOwnerValidationResult> {
    console.log('=>(PropertyOwnerService.ts:16) data', [data, this.backendClient]);

    return {
      result: true,
      message: 'Propietario encontrado y confirmado.',
      error: null,
      data: {
        status: 'OWNER_NOT_FOUND' as PropertyOwnersValidationStatus,
        properties: [],
      },
    };
  }

  /**
   * Servicio para crear un nuevo propietario
   * El registro lo crea el inquilino por lo que no se registra el password y otros campos adicionales.
   */
  async createPropertyOwner(propertyOwner: GeneralFormData, status: any): Promise<void> {
    try {
      /*const response = await this.backendClient.post<CreatePropertyOwnerResult>('/v1.0/property-owner', {
        ...propertyOwner,
        status,
      });*/
      const response = {
        data: {
          result: true,
          message: 'Propietario creado con éxito.',
          error: null,
          data: {
            id: 1,
            name: propertyOwner.name,
            email: propertyOwner.email,
            status,
          },
        },
      };

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return {
          result: false,
          message: error.response.data.message,
          error: {
            statusCode: error.response.status,
            key: error.response.data.error,
          },
        };
      }
      throw error;
    }
  }
}
