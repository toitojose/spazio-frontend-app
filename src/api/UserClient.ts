import { backendClient } from '@/api/backend-client.ts';
import type { GeneralFormData, UserCreationResult } from '@/interfaces/User.interface.ts';
import type { UserValidationResult } from '@/interfaces/UserValidationResult.interface.ts';

export class UserClient {
  async createUserWithRole(body: GeneralFormData): Promise<UserCreationResult> {
    const response = await backendClient.post<UserCreationResult>('/v1.0/user/create', body);
    return response.data;
  }

  async validateUser(body: GeneralFormData): Promise<UserValidationResult> {
    const response = await backendClient.post<UserValidationResult>('/v1.0/user/validate', body);
    return response.data;
  }
}
