import type { PropertyData } from '@/interfaces/real-estate/property-data.interface.ts';
import type { UserValidationStatus } from '@/enums/user-validation-status.enum.ts';

export interface PropertyOwnerValidationResult {
  success: boolean;
  message: string;
  error: any;
  data?: {
    status: UserValidationStatus | null;
    ownerId: number | null;
    properties: PropertyData[];
  } | null;
  statusCode?: number;
}
