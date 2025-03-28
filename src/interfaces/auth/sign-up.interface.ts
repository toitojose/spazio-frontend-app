export interface SignupInterface {
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
  email: string;
  password: string;
  roleType: 'RENTER' | 'PROPERTY_OWNER';
}
export interface SignupResult {
  result: boolean;
  message: string | string[];
  error: { statusCode: number; key: string } | null;
  data?: {
    user: {
      id: number;
      firstName: string;
      middleName?: string;
      lastName: string;
      secondLastName?: string;
      email: string;
      lastLoginAt: string | null;
      createdAt: string;
      updatedAt: string;
      idNumber?: string;
      landline?: string;
      mobile?: string;
      roles: { id: number; name: string }[];
    };
    token: string;
  };
}
