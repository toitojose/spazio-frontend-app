import type { AxiosInstance } from 'axios';
import type { SignupInterface, SignupResult } from '@/interfaces/auth/sign-up.interface.ts';

export class SignupService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async signup(signupData: SignupInterface): Promise<SignupResult> {
    try {
      const response = await this.authBackendClient.post<SignupResult>('/v1.0/auth/signup', signupData);
      return response.data;
    } catch (error: any) {
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
