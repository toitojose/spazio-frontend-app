import type { LeasingApplicationClient } from '@/api/LeasingApplicationClient.ts';
import { useUserStore } from '@/store/user.ts';
import type { LeaseApplicationResult } from '@/interfaces/lease/LeaseApplicationResult.interface.ts';

export class LeaseApplicationService {
  private client: LeasingApplicationClient;

  constructor(client: LeasingApplicationClient) {
    this.client = client;
  }
  async createLeaseApplication(ownerId: number, propertyId: number): Promise<LeaseApplicationResult> {
    const token = useUserStore().token;
    if (!token) throw new Error('Token de autenticación no disponible.');
    return this.client.leaseApplication(ownerId, propertyId, token);
  }
}
