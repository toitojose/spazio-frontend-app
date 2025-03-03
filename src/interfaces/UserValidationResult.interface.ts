import type { UserValidationStatus } from '@/enums/user-validation-status.enum.ts';
import type { User } from '@/interfaces/User.interface.ts';

export interface UserValidationResult {
  success: boolean;
  message: string;
  error: { statusCode: number; key: string } | null;
  data?: {
    status: UserValidationStatus;
    user?: User;
  } | null;
}
