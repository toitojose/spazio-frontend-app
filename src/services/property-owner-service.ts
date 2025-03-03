import type { GeneralFormData, UserCreationResult } from '@/interfaces/user.interface.ts';
import { UserValidationStatus } from '@/enums/src/enums/user-validation-status.enum.ts';
import type { UserValidationResult } from '@/interfaces/user-validation-result.interface.ts';
import type { AxiosInstance } from 'axios';
import type { PropertyOwnerValidationResult } from '@/interfaces/property-owner/property-owner-validation.result.ts';
import { useUserStore } from '@/store/user.ts';

export interface PropertyOwnerPayload {
  idNumber?: string;
  landline?: string;
  mobile?: string;
  email?: string;
  secondLastName?: string;
  middleName?: string;
  firstName: string;
  lastName: string;
  roleType: string;
}

export class PropertyOwnerService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }
  /**
   * Busca un propietario basado en los criterios proporcionados.
   * Simula una respuesta del backend para manejar la lógica del semáforo.
   */

  async validatePropertyOwner(data: GeneralFormData): Promise<UserValidationResult> {
    const userStore = useUserStore();
    const token = userStore.token;
    if (!token) throw new Error('Token de autenticación no disponible.');
    try {
      // Llamamos al UserClient para validar la existencia del usuario
      const response = await this.authBackendClient.post<PropertyOwnerValidationResult>(
        '/v1.0/property-owner/validate',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return {
        result: response.result,
        message: response.message,
        error: response.error,
        data: {
          status: response.data?.status || UserValidationStatus.NOT_FOUND,
          user: response.data?.user,
        },
      };
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

  /**
   * Servicio para crear un nuevo propietario
   * El registro lo crea el inquilino por lo que no se registra el password y otros campos adicionales.
   */
  async createPropertyOwner(propertyOwner: GeneralFormData): Promise<UserCreationResult> {
    try {
      const payload = {
        firstName: propertyOwner.firstName,
        lastName: propertyOwner.lastName,
        email: propertyOwner.email,
        roleType: propertyOwner.roleType,
        ...(propertyOwner.middleName ? { middleName: propertyOwner.middleName } : {}),
        ...(propertyOwner.secondLastName ? { secondLastName: propertyOwner.secondLastName } : {}),
        ...(propertyOwner.idNumber ? { idNumber: propertyOwner.idNumber } : {}),
        ...(propertyOwner.mobile ? { mobile: propertyOwner.mobile } : {}),
        ...(propertyOwner.landline ? { landline: propertyOwner.landline } : {}),
      };
      return this.userClient.createUserWithRole(payload);
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
