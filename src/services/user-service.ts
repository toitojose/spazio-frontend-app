import { UserClient } from '@/api/UserClient.ts';
import type { GeneralFormData } from '@/interfaces/User.interface.ts';
import type { UserValidationResult } from '@/interfaces/UserValidationResult.interface.ts';

export class UserService {
  private userClient: UserClient;

  constructor(userClient: UserClient) {
    this.userClient = userClient;
  }

  async registerUser(data: GeneralFormData) {
    // Aquí podrías hacer validaciones previas
    return this.userClient.createUserWithRole(data);
  }

  async verifyUser(data: GeneralFormData): Promise<UserValidationResult> {
    try {
      const response = await this.userClient.validateUser(data);

      if (!response || typeof response !== 'object' || !('success' in response)) {
        throw new Error('Formato de respuesta no válido');
      }

      return {
        success: response.success,
        message: response.message,
        error: response.error || null,
        data:
          response.success && response.data
            ? {
                status: response.data.status,
                user: response.data.user ?? undefined,
              }
            : null,
      };
    } catch (error: any) {
      console.error('Error al verificar usuario:', error);

      return {
        success: false,
        message: 'Error al validar el usuario',
        error: {
          statusCode: error.response?.status || 500,
          key: error.response?.data?.error || 'UNKNOWN_ERROR',
        },
        data: null,
      };
    }
  }
}
