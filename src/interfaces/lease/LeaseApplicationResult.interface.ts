import { LeaseApplicationStatusEnum } from '@/enums/lease-application-status-enum.ts';

export interface LeaseApplicationResult {
  success: boolean;
  message: string;
  error: any;
  data?: LeaseApplication | null;
}
export interface LeaseApplication {
  id: number;
  propertyid: number;
  renterId: number;
  ownerId: number;
  status: LeaseApplicationStatusEnum;
  updatedAt: Date;
  createdAt: Date;
}
