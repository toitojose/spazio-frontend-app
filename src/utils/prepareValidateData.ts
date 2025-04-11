import type { GeneralFormData, User } from '@/interfaces/User.interface.ts';
import { RolesEnum } from '@/enums/roles.enum.ts';

export const prepareValidateData = (formData: GeneralFormData): GeneralFormData => ({
  firstName: formData.firstName.trim(),
  middleName: formData.middleName?.trim() || undefined,
  lastName: formData.lastName.trim(),
  secondLastName: formData.secondLastName?.trim() || undefined,
  email: formData.email ? formData.email.trim().toLowerCase() : undefined,
  idNumber: formData.idNumber ? formData.idNumber.trim() : undefined,
  landline: formData.landline ? formData.landline.trim() : undefined,
  mobile: formData.mobile ? formData.mobile.trim() : undefined,
});

export const prepareInitialFormData = (user: User | null, role: RolesEnum = RolesEnum.RENTER): GeneralFormData => {
  if (!user) {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      secondLastName: '',
      idNumber: '',
      mobile: '',
      landline: '',
      email: '',
      roleType: role,
    };
  }

  return {
    firstName: user.firstName || '',
    middleName: user.middleName || '',
    lastName: user.lastName || '',
    secondLastName: user.secondLastName || '',
    idNumber: user.idNumber || '',
    mobile: user.mobile || '',
    landline: user.landline || '',
    email: user.email || '',
    roleType: role,
  };
};
