import { PropertyOwnersValidationStatus } from '@/enums/property-owners-validation-status.enum.ts';
import type { PropertyData } from '@/interfaces/real-estate/property-data.interface.ts';

export interface PropertyOwnerValidationResult {
  result: boolean;
  message: string;
  error: { statusCode: number; key: string } | null;
  data?: {
    status: PropertyOwnersValidationStatus;
    properties: PropertyData[];
  };
}
