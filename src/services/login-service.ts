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

const result: LoginResult = {
  result: true,
  message: "string",
  error:  null,
  data: {
    user: {
      id: 1,
      firstName: "Juan",
      middleName: "Carlos",
      lastName: "Perez",
      secondLastName: "Gomez",
      email: "juan.perez@example.com",
      idNumber: undefined,
      landline: undefined,
      mobile: undefined,
      lastLoginAt: "2025-03-23 16:44:39.31",
      createdAt: "2025-03-23 20:33:53.897746",
      updatedAt: "2025-03-23 21:44:39.324473",
      roles: [{ id: 3, name: "ADMIN" }],
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW4ucGVyZXpAZXhhbXBsZS5jb20iLCJyZW50ZXJJZCI6MSwiaWF0IjoxNzQyNzY1NTA2LCJleHAiOjE3NDMzNzAzMDZ9.Gksda90RqPpWqD5_Ubz3kWnGXi0gDYbmHFHypZVTuLc",
  },
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
