export interface LoginResult {
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