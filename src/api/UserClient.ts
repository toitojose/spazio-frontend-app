import type { AxiosInstance } from 'axios';
import type { GeneralFormData, UserCreationResult } from '@/interfaces/user.interface.ts';

export class UserClient {
  private backendClient: AxiosInstance;

  constructor(backendClient: AxiosInstance) {
    this.backendClient = backendClient;
  }

  async createUserWithRole(body: GeneralFormData): Promise<UserCreationResult> {
    const response = await this.backendClient.post<UserCreationResult>('/v1.0/user/create', body);
    return response.data;
  }

  async validateUser(body: GeneralFormData): Promise<UserCreationResult> {
    const response = await this.backendClient.post<UserCreationResult>('/v1.0/user/validate', body);
    return response.data;
  }
}
