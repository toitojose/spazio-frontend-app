import type { AxiosInstance } from 'axios';

interface SignupResult {
  result: boolean;
  message: string | string[];
  error: { statusCode: number; key: string } | null;
  data?: {
    user: {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      lastLoginAt: string | null;
      created_at: string;
      updated_at: string;
      roles: { id: number; name: string }[];
    };
    token: string;
  };
}

export class SignupService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async signup(firstname: string, lastname: string, email: string, password: string): Promise<SignupResult> {
    try {
      const response = await this.authBackendClient.post<SignupResult>('/v1.0/auth/signup', {
        firstname,
        lastname,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.log('=>(signup-service.ts:39) error', error);
      if (error.response && error.response.data) {
        return {
          result: false,
          message: error.response.data.message,
          error: {
            statusCode: error.response.status,
            key: error.response.data.error,
          },
        };
      }
      throw error;
    }
  }
}
