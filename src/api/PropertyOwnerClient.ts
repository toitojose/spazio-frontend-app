import { backendClient } from '@/api/backend-client.ts';
import type { GeneralFormData, UserCreationResult } from '@/interfaces/User.interface.ts';
import type { PropertyOwnerValidationResult } from '@/interfaces/property-owner/PropertyOwnerValidationResult.interface.ts';

export class PropertyOwnerClient {
  async validatePropertyOwner(data: GeneralFormData, token: string): Promise<PropertyOwnerValidationResult> {
    const response = await backendClient.post<PropertyOwnerValidationResult>('/v1.0/property-owner/validate', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  async createPropertyOwner(data: GeneralFormData): Promise<UserCreationResult> {
    const response = await backendClient.post<UserCreationResult>('/v1.0/property-owner/create', data);
    return response.data;
  }
}
