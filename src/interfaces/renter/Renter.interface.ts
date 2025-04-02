import type { RenterStatusEnum } from '@/enums/renter-status.enum.ts';

export interface UpdateRenterStatusResult {
  success: boolean;
  message: string;
  error: any;
  data?: {
    renterStatus: RenterStatusEnum;
  };
}
