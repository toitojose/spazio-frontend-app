import type { AxiosInstance } from 'axios';
interface LoginResult {
  result: boolean;
  message: string;
  error: { statusCode: number; key: string } | null;
  data?: {
    user: {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      lastLoginAt: string;
      created_at: string;
      updated_at: string;
      roles: { id: number; name: string }[];
    };
    token: string;
  };
}

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
