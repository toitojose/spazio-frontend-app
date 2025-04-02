import type { UpdateRenterStatusResult } from '@/interfaces/renter/Renter.interface.ts';
import { backendClient } from '@/api/backend-client.ts';

export class RenterClient {
  version = '/v1.0';

  async updateRenterStatus(userId: number, token: string, status: string): Promise<UpdateRenterStatusResult> {
    try {
      const response = await backendClient.put<UpdateRenterStatusResult>(
        `${this.version}/renter-status/${userId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return {
        success: response.data.success,
        message: response.data.message,
        error: null,
        data: response.data.data,
      };
    } catch (error: any) {
      const statusCode = error?.response?.status || 500;
      const message = error?.response?.data?.message || 'Error inesperado al registrar la propiedad';
      const key = error?.response?.data?.error || 'UNKNOWN_ERROR';
      return {
        success: false,
        message,
        error: {
          statusCode,
          key,
        },
        data: undefined,
      };
    }
  }
}
