import { realEstateClient } from '@/api/real-estate-client.ts';
import type {
  CreateSimplifiedPropertyDto,
  PropertyCreationResult,
} from '@/interfaces/real-estate/property-data.interface.ts';
import type { PropertyInitialData } from '@/interfaces/real-estate/basic.interface.ts';

export class PropertiesClient {
  async createProperty(data: CreateSimplifiedPropertyDto, token: string): Promise<PropertyCreationResult> {
    try {
      const response = await realEstateClient.post<PropertyCreationResult>('/v1.0/properties/create/simple', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

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

  async getInitialPropertyData(token: string): Promise<PropertyInitialData> {
    try {
      const response = await realEstateClient.get<{
        success: boolean;
        message: string | string[];
        error: any;
        data?: PropertyInitialData;
        statusCode: number;
      }>('/v1.0/properties-setup', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data;

      if (!result.success || !result.data) {
        throw {
          success: result.success,
          message: result.message,
          error: result.error,
          statusCode: result.statusCode,
        };
      }

      return result.data;
    } catch (error: any) {
      // Si el error vino del servidor en formato esperado
      if (error?.response?.data) {
        throw {
          success: false,
          message: error.response.data.message || 'Error inesperado.',
          error: error.response.data.error || error,
          statusCode: error.response.data.statusCode || 500,
        };
      }

      // Si fue un error de red u otro inesperado
      throw {
        success: false,
        message: error.message || 'Error inesperado al conectar con el servidor.',
        error,
        statusCode: 500,
      };
    }
  }
}
