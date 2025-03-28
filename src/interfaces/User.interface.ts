import type { RolesEnum } from '@/enums/roles.enum.ts';

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
  email: string;
  password?: string; // No se debe enviar desde el backend en respuestas
  idNumber?: string;
  landline?: string;
  mobile?: string;
  lastLoginAt?: string | null;
  personalPhoto?: string; // URL de la foto (si aplica)
  idCardPhoto?: string; // URL de la foto de identificación (si aplica)
  roles?: Role[];
}

export interface GeneralFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
  idNumber?: string;
  mobile?: string;
  landline?: string;
  email?: string;
  roleType: RolesEnum;
}

export interface UserCreationResult {
  success: boolean;
  message: string | string[];
  error: { statusCode: number; key: string } | null;
  data?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Array<{ id: number; name: RolesEnum }>;
  };
}
