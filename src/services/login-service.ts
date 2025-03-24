import type { AxiosInstance } from 'axios';
import type { LoginResult } from '@/interfaces/auth/login.interface';


export class LoginService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async login(email: string, password: string): Promise<LoginResult> {
    const response = await this.authBackendClient.post<LoginResult>('/v1.0/auth/login', {
      email,
      password,
    });
    return response.data;
  }
}
