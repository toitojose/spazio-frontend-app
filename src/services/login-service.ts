import type { AxiosInstance } from 'axios';
interface LoginResult {
  result: boolean;
  message: string;
  error: { statusCode: number; key: string } | null;
  data?: {
    user: {
      id: number;
      firstName: string;
      middleName?: string;
      lastName: string;
      secondLastName?: string;
      email: string;
      idNumber?: string;
      landline?: string;
      mobile?: string;
      lastLoginAt: string;
      createdAt: string;
      updatedAt: string;
      roles: { id: number; name: string }[];
    };
    token: string;
  };
}

const result = {
  result: true,
  message: "string",
  error:  null,
  data?: {
    user: {
      id: number;
      firstName: string;
      middleName?: string;
      lastName: string;
      secondLastName?: string;
      email: string;
      idNumber?: string;
      landline?: string;
      mobile?: string;
      lastLoginAt: string;
      createdAt: string;
      updatedAt: string;
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
   /* const response = await this.authBackendClient.post<LoginResult>('/v1.0/auth/login', {
      email,
      password,
    });*/
    return result;
  }
}
