import { realEstateClient } from '@/api/real-estate-client.ts';
import type { LeaseApplicationResult } from '@/interfaces/lease/LeaseApplicationResult.interface.ts';

export class LeasingApplicationClient {
  version = '/v1.0';
  async leaseApplication(ownerId: number, propertyId: number, token: string): Promise<LeaseApplicationResult> {
    try {
      const response = await realEstateClient.post<LeaseApplicationResult>(
        `${this.version}/leasing/application`,
        {
          ownerId,
          propertyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
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
      const message = error?.response?.data?.message || 'Error inesperado al crear la solicitud de arrendamiento';
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
