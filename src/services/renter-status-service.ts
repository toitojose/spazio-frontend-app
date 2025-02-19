import type { AxiosInstance } from 'axios';
import type { RenterStatusEnum } from '@/enums/RenterStatusEnum.ts';
import { useUserStore } from '@/store/user.ts';
interface UpdateRenterStatusResult {
  result: boolean;
  message: string;
  error: { statusCode: number; key: string } | null;
  data?: {
    renterStatus: RenterStatusEnum;
  };
}

export class RenterStatusService {
  private backendClient: AxiosInstance;
  version = '/v1.0';

  constructor(backendClient: AxiosInstance) {
    this.backendClient = backendClient;
  }

  /**
   * Actualiza el estado del inquilino dado el estado (body) y el id del inquilino
   * @param renterId
   * @param status
   */
  async updateRenterStatus(status: RenterStatusEnum): Promise<UpdateRenterStatusResult> {
    const userStore = useUserStore();
    const userId = userStore.user?.id;
    const token = userStore.token;
    if (!token) throw new Error('Token de autenticación no disponible.');
    if (!userId) throw new Error('ID de usuario no disponible.');

    const response = await this.backendClient.put<UpdateRenterStatusResult>(
      `${this.version}/renter-status/${userId}`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }
}
