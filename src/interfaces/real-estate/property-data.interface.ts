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
