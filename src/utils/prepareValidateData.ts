import type { GeneralFormData, User } from '@/interfaces/User.interface.ts';
import { RolesEnum } from '@/enums/roles.enum.ts';

export const prepareValidateData = (
  formData: { values: GeneralFormData },
  role: RolesEnum = RolesEnum.RENTER,
): GeneralFormData => ({
  firstName: formData.values.firstName.trim(),
  middleName: formData.values.middleName?.trim() || undefined,
  lastName: formData.values.lastName.trim(),
  secondLastName: formData.values.secondLastName?.trim() || undefined,
  email: formData.values.email ? formData.values.email.trim().toLowerCase() : undefined,
  idNumber: formData.values.idNumber ? formData.values.idNumber.trim() : undefined,
  landline: formData.values.landline ? formData.values.landline.trim() : undefined,
  mobile: formData.values.mobile ? formData.values.mobile.trim() : undefined,
  roleType: role,
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
    mobile: user.phone || '',
    landline: user.landline || '',
    email: user.email || '',
    roleType: role,
  };
};
