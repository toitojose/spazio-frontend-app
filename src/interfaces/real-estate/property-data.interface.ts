import type { PropertySubtype, PropertyType, Zone } from '@/interfaces/real-estate/basic.interface.ts';

export interface PropertyAddress {
  id: number;
  mainStreet: string;
  propertyNumber?: string;
  secondaryStreet?: string;
  postalCode?: string;
  zone: Zone;
  zoneId: number;
  cityId: number;
}

export interface PropertyData {
  id: number;
  ownerId: number;
  mainStreet: string;
  propertyTypeId: number;
  propertySubtypeId?: number;
  bedrooms?: number;
  bathrooms?: number;
  halfBathrooms?: number;
  parkingSpaces?: number;
  constructedArea?: number;
  propertyArea?: number;
  condoFee?: number;
  propertyNumber: string;
  additionalInfo?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;

  // Relaciones
  propertyType: PropertyType;
  subtype?: PropertySubtype;
  address: PropertyAddress;
}

export interface PropertyCreationResult {
  success: boolean;
  message: string | string[];
  error: { statusCode: number; key: string } | null;
  data?: {
    status: string;
  };
}

export interface CreateSimplifiedPropertyDto {
  ownerId: number;
  zoneId: number | null;
  mainStreet: string;
  propertyNumber?: string;
  secondaryStreet?: string;
  propertyTypeId: number | null;
  propertySubtypeId?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  halfBathrooms?: number | null;
  parkingSpaces?: number | null;
  constructedArea?: number;
  propertyArea?: number;
  monthlyRent: number | null;
  currency?: string; // Default: USD
}
