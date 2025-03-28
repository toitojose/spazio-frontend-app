export interface PropertyData {
  id: number;
  country: string;
  city: string;
  mainStreet: string;
  number: string;
  secondaryStreet?: string;
  neighborhood?: string;
  propertyTypeId: number;
  propertyArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  propertyNumber: string;
  additionalInfo?: any;
}
export interface CreatePropertyDto {
  ownerId: number;
  city: string;
  neighborhood: string;
  mainStreet: string;
  numeration: string;
  secondaryStreet?: string;
  type: 'department' | 'house' | 'warehouse' | 'parking' | 'land';
  buildingName?: string;
  apartmentNumber?: string;
  tower?: string;
  lotSize?: string;
  garageSpaces?: string;
  warehouseNumber?: string;
  parkingNumber?: string;
}

export interface PropertyCreationResult {
  success: boolean;
  message: string | string[];
  error: { statusCode: number; key: string } | null;
  data?: {
    id: number;
    ownerId: number;
    city: string;
    neighborhood: string;
    mainStreet: string;
    numeration: string;
    secondaryStreet?: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    // Se pueden incluir los campos adicionales guardados según el tipo
    [key: string]: any;
  };
}
