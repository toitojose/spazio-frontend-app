import { useUserStore } from '@/store/user.ts';
import type { RenterStatusEnum } from '@/enums/renter-status.enum.ts';
import type { RenterClient } from '@/api/RenterClient.ts';
import type { UpdateRenterStatusResult } from '@/interfaces/renter/Renter.interface.ts';

export class RenterStatusService {
  private backendClient: RenterClient;

  constructor(backendClient: RenterClient) {
    this.backendClient = backendClient;
  }

  /**
   * Actualiza el estado del inquilino dado el estado (body) y el id del inquilino
   * @param status
   */
  async updateRenterStatus(status: RenterStatusEnum): Promise<UpdateRenterStatusResult> {
    const userStore = useUserStore();
    const userId = userStore.user?.id;
    const token = userStore.token;
    if (!token) throw new Error('Token de autenticación no disponible.');
    if (!userId) throw new Error('ID de usuario no disponible.');

    return this.backendClient.updateRenterStatus(userId, token, status);
  }
}
