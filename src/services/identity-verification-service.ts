import type { AxiosInstance } from 'axios';
import { useUserStore } from '@/store/user.ts';
import type { FileUploadResult, IdentityUpdateResult } from '@/interfaces/identity-verification.interface.ts';

export class IdentityVerificationService {
  private backendClient: AxiosInstance;

  constructor(backendClient: AxiosInstance) {
    this.backendClient = backendClient;
  }

  /**
   * Actualiza el número de cédula del usuario
   * @param userId ID del usuario
   * @param idNumber Número de cédula
   * @returns Promise<IdentityUpdateResult>
   */
  async updateIdentity(userId: number | null, idNumber: string): Promise<IdentityUpdateResult> {
    const userStore = useUserStore();
    const token = userStore.token;

    if (!token) throw new Error('Token de autenticación no disponible.');
    if (!userId) throw new Error('ID de usuario no disponible.');

    try {
      const response = await this.backendClient.put<IdentityUpdateResult>(
        `/v1.0/users/identity/${userId}`,
        { idNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('✅ Respuesta del backend (ID actualizado):', response.data);
      return response.data;
    } catch (error: any) {
      console.error('🚨 Error en updateIdentity:', error);
      throw error;
    }
  }

  /**
   * Sube una imagen al backend y devuelve su URL
   * @param userId
   * @param formData
   * @param type
   */
  async uploadPhoto(
    userId: number,
    formData: FormData,
    type: 'personalPhoto' | 'idCardPhoto',
  ): Promise<FileUploadResult> {
    const userStore = useUserStore();
    const token = userStore.token;

    console.log('=>(identity-verification-service.ts:59) formData', formData);

    if (!token) throw new Error('Token de autenticación no disponible.');
    if (!userId) throw new Error('ID de usuario no disponible.');

    try {
      const response = await this.backendClient.post<FileUploadResult>(
        `/v1.0/users/identity/${userId}/upload-photo/${type}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // ❌ No agregamos 'Content-Type' manualmente aquí
            // Axios lo manejará automáticamente para FormData
          },
        },
      );

      console.log('✅ Respuesta del backend (Foto subida):', response.data);
      return response.data;
    } catch (error: any) {
      console.error('🚨 Error en uploadPhoto:', error);
      throw error;
    }
  }
  
  /**
   * Obtiene la URL de carga de una imagen
   * @param userId
   * @param type
   */
  getUploadUrl(userId: number, type: 'personalPhoto' | 'idCardPhoto'): string {
    const baseURL = import.meta.env.VITE_SPAZIO_BACKEND_URL;
    return `${baseURL}/v1.0/users/identity/${userId}/upload-photo/${type}`;
  }
}
