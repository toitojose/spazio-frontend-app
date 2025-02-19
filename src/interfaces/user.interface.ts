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
  secondName?: string;
  firstLastName: string;
  secondLastName?: string;
  mobile: string;
  landline?: string;
  email: string;
}
