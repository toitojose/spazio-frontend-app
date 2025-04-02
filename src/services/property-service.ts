import type { PropertiesClient } from '@/api/PropertiesClient.ts';
import type { PropertyInitialData } from '@/interfaces/real-estate/basic.interface.ts';
import { useUserStore } from '@/store/user.ts';
import type {
  CreateSimplifiedPropertyDto,
  PropertyCreationResult,
} from '@/interfaces/real-estate/property-data.interface.ts';

export class PropertyService {
  private client: PropertiesClient;

  constructor(client: PropertiesClient) {
    this.client = client;
  }

  async getInitialPropertyData(): Promise<PropertyInitialData> {
    const token = useUserStore().token;
    if (!token) throw new Error('Token de autenticación no disponible.');
    return this.client.getInitialPropertyData(token);
  }

  async createPropertyFromRenter(data: CreateSimplifiedPropertyDto): Promise<PropertyCreationResult> {
    const token = useUserStore().token;
    if (!token) throw new Error('Token de autenticación no disponible.');
    return this.client.createProperty(data, token);
  }
}
