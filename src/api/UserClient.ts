import { backendClient } from '@/api/backend-client.ts';
import type { GeneralFormData, UserCreationResult } from '@/interfaces/User.interface.ts';

export class UserClient {
  async createUserWithRole(body: GeneralFormData, token: string): Promise<UserCreationResult> {
    const response = await backendClient.post<UserCreationResult>('/v1.0/user/create', body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  async updateUser(body: GeneralFormData, token: string): Promise<UserCreationResult> {
    const response = await backendClient.put<UserCreationResult>('/v1.0/user/update', body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
}
