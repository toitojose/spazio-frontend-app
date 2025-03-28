import { realEstateClient } from '@/api/real-estate-client.ts';
import type { CreatePropertyDto, PropertyCreationResult } from '@/interfaces/real-estate/property-data.interface.ts';

export class PropertiesClient {
  async createProperty(data: CreatePropertyDto, token: string): Promise<PropertyCreationResult> {
    const response = await realEstateClient.post<PropertyCreationResult>('/v1.0/real-estate/create', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }
}
