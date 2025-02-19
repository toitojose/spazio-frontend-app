export interface CreatePropertyOwnerResult {
  result: boolean;
  message: string | string[];
  error: { statusCode: number; key: string } | null;
  data?: {
    owner: {
      id: number;
      firstName: string;
      middleName?: string;
      lastName: string;
      secondLastName?: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      idNumber?: string;
      landline?: string;
      mobile?: string;
      status: 'pre-registered';
    };
  };
}
