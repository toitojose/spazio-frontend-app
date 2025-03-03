import type { UserValidationStatus } from '@/enums/src/enums/user-validation-status.enum.ts';
import type { User } from '@/interfaces/user.interface.ts';

export interface UserValidationResult {
  result: boolean;
  message: string;
  error: { statusCode: number; key: string } | null;
  data?: {
    status: UserValidationStatus;
    user?: User;
  };
}
